import { useStore } from "../store";
import { router } from "../router";
import { isDev, config } from "../../config";
import { storage } from "../utils";
import { getLocale, t } from "/@/locale";

// 请求队列
let requests: any[] = [];

// Token 是否刷新中
let isRefreshing = false;

export default function request(options: any) {
	const { user } = useStore();

	// 标识
	let Authorization = user.token || "";

	// 忽略标识
	config.ignore.token.forEach((e) => {
		if (options.url.includes(e)) {
			Authorization = "";
		}
	});

	if (isDev) {
		console.log(`[${options.method || "GET"}] ${options.url}`);
	}

	return new Promise(async (resolve, reject) => {
		// 继续请求
		function next() {
			uni.request({
				...options,

				header: {
					Authorization,
					language: getLocale(),
					...options.header,
				},

				success(res: any) {
					const { code, data, message } = res.data as {
						code: number;
						message: string;
						data: any;
					};

					// 无权限
					if (res.statusCode === 401) {
						if (router.info()?.path == router.pages.login) {
							return reject({ message });
						} else {
							user.logout();
						}
					}

					// 服务异常
					if (res.statusCode === 502) {
						return reject({
							message: t("服务异常"),
						});
					}

					// 未找到
					if (res.statusCode === 404) {
						return reject({
							message: `[404] ${options.url}`,
						});
					}

					// 成功
					if (res.statusCode === 200) {
						switch (code) {
							case 1000:
								resolve(data);
								break;
							default:
								reject({ message, code });
						}
					} else {
						reject({ message: t("服务异常") });
					}
				},

				fail(err: any) {
					reject({ message: err.errMsg });
				},
			});
		}

		// 刷新token处理
		if (!options.url.includes("refreshToken")) {
			if (Authorization) {
				// 判断 token 是否过期
				if (storage.isExpired("token")) {
					// 判断 refreshToken 是否过期
					if (storage.isExpired("refreshToken")) {
						// 退出登录
						return user.logout();
					}

					// 是否在刷新中
					if (!isRefreshing) {
						isRefreshing = true;
						user.refreshToken()
							.then((token) => {
								requests.forEach((cb) => cb(token));
								requests = [];
								isRefreshing = false;
							})
							.catch((err) => {
								user.logout();
								reject(err);
							});
					}

					return new Promise((resolve) => {
						// 继续请求
						requests.push((token: string) => {
							// 重新设置 token
							Authorization = token;
							next();
							resolve();
						});
					});
				}
			}
		}

		next();
	});
}
