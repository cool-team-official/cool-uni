import { ref } from "vue";
import { wx as conf } from "../../config";
import { service } from "../service";
import { useStore } from "../store";

// #ifdef H5
import h5 from "weixin-js-sdk";
// #endif

export function useWx() {
	// 用户缓存
	const { user } = useStore();

	// 授权码
	const code = ref<string>("");

	// 获取授权码
	function getCode() {
		// #ifdef MP-WEIXIN
		uni.login({
			provider: "weixin",
			success: (res) => {
				code.value = res.code;
			},
		});
		// #endif
	}

	// 是否微信浏览器
	function isWxBrowser(): boolean {
		const ua: any = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	}

	// 是否安装了微信
	function hasApp(): boolean {
		// #ifdef APP
		return plus.runtime.isApplicationExist({ pname: "com.tencent.mm", action: "weixin://" });
		// #endif

		// #ifndef APP
		return true;
		// #endif
	}

	// 下载微信
	function downloadApp(): void {
		if (uni.getSystemInfoSync().platform == "android") {
			const Uri: any = plus.android.importClass("android.net.Uri");
			const uri: any = Uri.parse("market://details?id=" + "com.tencent.mm");
			const Intent: any = plus.android.importClass("android.content.Intent");
			const intent: any = new Intent(Intent.ACTION_VIEW, uri);
			const main: any = plus.android.runtimeMainActivity();
			main.startActivity(intent);
		} else {
			plus.runtime.openURL(
				"itms-apps://" + "itunes.apple.com/cn/app/wechat/id414478124?mt=8"
			);
		}
	}

	// 微信公众号配置
	const mpConfig = {};

	// 获取微信公众号配置
	function getMpConfig() {
		return service.user.login.wxMpConfig().then((res: any) => {
			wx.config({
				debug: weixin.mp.debug,
				jsApiList: ["chooseWXPay"],
				...res,
			});

			Object.assign(mpConfig, res);
			return res;
		});
	}

	// 微信公众号授权
	function mpAuth() {
		const redirect_uri = encodeURIComponent(`${location.origin}/#/pages/user/login`);
		const response_type = "code";
		const scope = "snsapi_userinfo";
		const state = "STATE";

		const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${weixin.mp.appid}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}#wechat_redirect`;

		location.href = url;
	}

	// 微信公众号登录
	function mpLogin(code: string) {
		return service.user.login.wxMpLogin({ code }).then((res: any) => {
			return res;
		});
	}

	// 微信公众号支付
	function mpPay(orderId: string) {
		return new Promise((resolve, reject) => {
			service.order.pay
				.wxMpPay({
					orderId,
				})
				.then((conf: any) => {
					wx.chooseWXPay({
						...conf,
						success: (res: any) => {
							resolve(res);
						},
						cancel: () => {
							reject({
								message: "取消支付",
							});
						},
						fail: () => {
							reject({
								message: "支付失败",
							});
						},
					});
				})
				.catch(reject);
		});
	}

	// 微信app登录
	function appLogin(): Promise<string> {
		let all: any;
		let Service: any;
		return new Promise((resolve, reject) => {
			plus.oauth.getServices((Services: any) => {
				all = Services;
				Object.keys(all).some((key) => {
					if (all[key].id == "weixin") {
						Service = all[key];
					}
				});
				Service.authorize((e: any) => {
					service.user.user.loginByWechat({ code: e.code }).then(resolve).catch(reject);
				}, reject);
			}, reject);
		});
	}

	// 微信小程序登录
	function miniLogin() {
		const { platform } = uni.getSystemInfoSync();

		return new Promise((resolve, reject) => {
			// 兼容 Mac
			const k = platform === "mac" ? "getUserInfo" : "getUserProfile";

			uni[k]({
				lang: "zh_CN",
				desc: "授权信息仅用于用户登录",
				success: ({ iv, encryptedData, signature, rawData }: any) => {
					// 请求
					const next = (code?: string) => {
						service.user.login
							.wxMiniLogin({
								iv,
								encryptedData,
								signature,
								rawData,
								code,
							})
							.then(resolve)
							.catch(reject);
					};

					// 检查登录状态是否过期
					uni.checkSession({
						success: () => {
							next();
						},
						fail: () => {
							uni.login({
								provider: "weixin",
								success: (res: any) => {
									next(res.code);
								},
							});
						},
					});
				},
				fail: () => {
					reject({
						message: "授权失败",
					});
				},
			});
		});
	}

	// 微信小程序支付
	function miniPay(orderId: string) {
		return new Promise((resolve, reject) => {
			service.order.pay
				.wxMiniPay({
					orderId,
				})
				.then((conf: any) => {
					uni.requestPayment({
						provider: "wxpay",
						...conf,
						success: resolve,
						fail: () => {
							reject({
								message: "已取消支付",
							});
						},
					});
				})
				.catch(reject);
		});
	}

	// 绑定手机号
	function phoneBind({ iv, encryptedData, code }: any) {
		return new Promise((resolve, reject) => {
			const req = (code: string) => {
				service.user.info
					.bindMiniPhone({
						iv,
						encryptedData,
						code,
					})
					.then((res: string) => {
						// Store.commit("UPDATE_USERINFO", {
						// 	phone: res,
						// });

						resolve(res);
					})
					.catch(reject);
			};

			uni.checkSession({
				success: () => {
					req(code);
				},
				fail: () => {
					uni.login({
						provider: "weixin",
						success: (res: any) => {
							req(res.code);
						},
					});
				},
			});
		});
	}

	return {
		code,
		getCode,
		isWxBrowser,
		hasApp,
		downloadApp,
		mpConfig,
		getMpConfig,
		mpAuth,
		mpLogin,
		mpPay,
		miniLogin,
		miniPay,
		phoneBind,
		appLogin,
	};
}
