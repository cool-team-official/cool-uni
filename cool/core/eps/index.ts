import { config, isDev } from "../../config";
import { service, BaseService } from "../service";
import { deepFiles, deepMerge, storage, toCamel } from "../../utils";
import { isArray, isEmpty } from "lodash-es";

// 获取标签名
function getNames(v: any) {
	return Object.getOwnPropertyNames(v.constructor.prototype).filter(
		(e) => !["namespace", "constructor", "request", "permission"].includes(e)
	);
}

// 获取本地 service
function getService() {
	const files = import.meta.globEager("/service/**/*");
	const arr: any[] = [];

	for (const i in files) {
		try {
			const Value = files[i].default;
			arr.push(new Value());
		} catch (e) {
			console.error(`Service: ${i} 解析错误！`);
		}
	}

	const d = deepFiles(
		arr.map((e) => {
			return {
				path: (e.namespace || "").replace("app/", ""),
				value: e,
			};
		})
	);

	deepMerge(service, d);
}

// 获取 eps
export function useEps() {
	// 标签名
	const names = getNames(new BaseService());

	// 创建描述文件
	function createDts(list: any[]) {
		function deep(v: any) {
			for (const i in v) {
				if (v[i].namespace) {
					v[i].namespace = v[i].namespace;

					// 模块
					const item: any = list.find((e: any) => e.prefix.includes(v[i].namespace));

					// 接口
					const api: any[] = item ? item.api : [];

					// 获取方法集合
					[...names, ...getNames(v[i])].forEach((e) => {
						if (!api.find((a) => a.path.includes(e))) {
							api.push({
								path: `/${e}`,
							});
						}
					});

					if (item) {
						item.api = api;
					} else {
						list.push({
							prefix: `/${v[i].namespace}`,
							api,
						});
					}
				} else {
					deep(v[i]);
				}
			}
		}

		deep(service);

		// 本地服务
		return service.request({
			// #ifdef H5
			url: "/__cool_eps",
			// #endif

			// #ifndef H5
			url: "http://127.0.0.1:9900/__cool_eps",
			// #endif

			method: "POST",
			proxy: false,
			data: {
				service,
				list,
			},
		});
	}

	// 获取 eps
	function getEps() {
		if (isDev && config.test.eps) {
			service
				.request({
					url: "/app/base/comm/eps",
				})
				.then((res) => {
					if (!storage.get("eps")) {
						// 首次设置
						storage.set("eps", res || {});

						// #ifdef H5
						location.reload();
						// #endif

						// #ifndef H5
						console.error("[Eps] 初始化成功，请重新编译");
						// #endif
					} else {
						if (!isEmpty(res)) {
							storage.set("eps", res);
							set(res, true);
							console.log("[Eps] 解析成功");
						}
					}
				})
				.catch((err) => {
					console.error("[Eps] 获取失败！", err.message);
				});
		}
	}

	// 设置
	async function set(d: any, c?: boolean) {
		// 接口列表
		const list: any[] = [];

		if (isEmpty(d)) {
			return false;
		}

		if (isArray(d)) {
			d = { d };
		}

		for (const i in d) {
			d[i].forEach((e: any) => {
				// 分隔路径
				const arr = e.prefix
					.replace(/\//, "")
					.replace("app", "")
					.split("/")
					.filter(Boolean)
					.map(toCamel);

				// 遍历
				function deep(d: any, i: number) {
					const k = arr[i];

					if (k) {
						// 是否最后一个
						if (arr[i + 1]) {
							if (!d[k]) {
								d[k] = {};
							}

							deep(d[k], i + 1);
						} else {
							// 本地不存在则创建实例
							if (!d[k]) {
								d[k] = new BaseService({
									namespace: e.prefix.substr(1, e.prefix.length - 1),
								});
							}

							// 创建方法
							e.api.forEach((a: any) => {
								// 方法名
								const n = (a.name || a.path).replace("/", "");

								// 过滤
								if (!names.includes(n)) {
									// 本地不存在则创建
									if (!d[k][n]) {
										if (n && !/[-:]/g.test(n)) {
											d[k][n] = function (data: any) {
												return this.request({
													url: a.path,
													method: a.method,
													[a.method.toLocaleLowerCase() == "post"
														? "data"
														: "params"]: data,
												});
											};
										}
									}
								}
							});

							list.push(e);
						}
					}
				}

				deep(service, 0);
			});
		}

		// 本地 service
		getService();

		if (isDev && c) {
			await createDts(list);
		}
	}

	// 解析
	try {
		const eps =
			storage.get("eps") ||
			JSON.parse(__EPS__ || "[]").map(([prefix, api]: any[]) => {
				return {
					prefix,
					api: api.map(([method, path, name]: string[]) => {
						return {
							method,
							path,
							name,
						};
					}),
				};
			});

		set(eps);
	} catch (err) {
		console.error("[Eps] 解析失败！", err);
	}

	// 获取
	getEps();
}
