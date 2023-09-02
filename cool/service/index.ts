import { BaseService } from "./base";
import { deepMerge } from "../utils";
import { eps } from "virtual:eps";

export const service: Eps.Service = {
	request: new BaseService().request,
};

function main() {
	function deep(d: any) {
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
				deep(d[i]);
			}
		}
	}

	// 遍历
	deep(eps.service);

	// 合并
	deepMerge(service, eps.service);
}

main();

export * from "./base";
