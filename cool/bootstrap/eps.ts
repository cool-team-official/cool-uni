import { service } from "../service";
import { deepMerge, path2Obj } from "../utils";
import { config, isDev } from "/@/config";

// 本地数据
function getService() {
	const files = import.meta.glob("/service/**/*", {
		eager: true,
	});

	const arr: any[] = [];

	for (const i in files) {
		try {
			// @ts-ignore
			const Value = files[i].default;
			arr.push(new Value());
		} catch (e) {
			console.error(`Service: ${i} 解析错误！`);
		}
	}

	return path2Obj(
		arr.map((e) => {
			return {
				path: (e.namespace || "").replace("app/", ""),
				value: e,
			};
		})
	);
}

export function createEps() {
	// 本地数据
	const s = getService();

	// 模拟实体数据
	const list: any[] = [];

	// 遍历插入
	(function deep(d: any) {
		if (d.namespace) {
			const api = Array.from(
				new Set([
					...Object.getOwnPropertyNames(d.constructor.prototype),
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

			list.push({
				api,
				module: d.namespace.split("/")[0],
				name: d.constructor.name,
				prefix: `/app/${d.namespace}`,
			});
		} else {
			for (const i in d) {
				deep(d[i]);
			}
		}
	})(s);

	// 合并数据
	deepMerge(service, s);

	// 创建 eps
	// #ifdef H5
	if (isDev) {
		if (config.test.eps) {
			service.request({
				url: "/__cool_eps",
				method: "POST",
				proxy: false,
				data: {
					list,
				},
			});
		}
	}
	// #endif
}
