import { merge } from "lodash-es";
import { BaseService, service } from "../service";
import { path2Obj } from "../utils";
import { config, isDev } from "/@/config";
import { eps } from "virtual:eps";

// 读取本地所有 service
const files = import.meta.glob("/service/**/*", {
	eager: true,
});

// 数据集合
const services: any[] = [];

// 取值
for (const i in files) {
	try {
		// @ts-ignore
		services.push(new files[i].default());
	} catch (e) {
		console.error(`[service] ${i} error: `, e);
	}
}

// 更新事件
function onUpdate() {
	// 设置 request 方法
	function set(d: any) {
		if (d.namespace) {
			const a: any = new BaseService(d.namespace);

			for (const i in d) {
				const { path, method = "get" } = d[i];

				if (path) {
					a.request = a.request;

					a[i] = function (data?: any) {
						return this.request({
							url: path,
							method,
							[method.toLocaleLowerCase() == "post" ? "data" : "params"]: data,
						});
					};
				}
			}

			for (const i in a) {
				d[i] = a[i];
			}
		} else {
			for (const i in d) {
				set(d[i]);
			}
		}
	}

	// 遍历每一个方法
	set(eps.service);

	// 合并[eps]
	merge(service, eps.service);

	// 合并[local]
	merge(
		service,
		path2Obj(
			services.map((e) => {
				return {
					path: (e.namespace || "").replace("app/", ""),
					value: e,
				};
			})
		)
	);

	// 提示
	if (isDev) {
		console.log("[eps] update");
	}
}

export function createEps() {
	// 更新 eps
	onUpdate();

	// #ifdef H5
	// 开发环境下，生成本地 service 的类型描述文件
	if (isDev && config.test.eps) {
		const list = services.map((s) => {
			const api = Array.from(
				new Set([
					...Object.getOwnPropertyNames(s.constructor.prototype),
					"page",
					"list",
					"info",
					"delete",
					"update",
					"add",
				])
			)
				.filter((e) => !["constructor", "namespace"].includes(e))
				.map((e) => {
					return {
						path: `/${e}`,
					};
				});

			return {
				api,
				module: s.namespace.split("/")[0],
				name: s.constructor.name + "Entity",
				prefix: `/app/${s.namespace}`,
			};
		});

		service.request({
			url: "/__cool_eps",
			method: "POST",
			proxy: false,
			data: {
				list,
			},
		});
	}
	// #endif
}

// 监听 vite 触发事件
if (import.meta.hot) {
	import.meta.hot.on("eps-update", ({ service }) => {
		if (service) {
			eps.service = service;
		}

		onUpdate();
	});
}
