import { merge } from "lodash-es";
import { BaseService, service } from "../service";
import { path2Obj } from "../utils";
import { isDev } from "/@/config";
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

export function createEps() {
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

	// 合并 eps
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
		console.log("[cool-eps] updated");
	}
}

// 监听 vite 触发事件
if (import.meta.hot) {
	import.meta.hot.on("eps-update", ({ service }) => {
		if (service) {
			eps.service = service;
		}

		createEps();
	});
}
