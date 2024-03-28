import { ref } from "vue";
import { onReady, onShow } from "@dcloudio/uni-app";
import { config } from "/@/config";
import { getUrlParam, storage } from "../utils";
import { service } from "../service";

// #ifdef H5
import wx from "weixin-js-sdk";
// #endif

export function useWx() {
	const { platform } = uni.getSystemInfoSync();

	// 授权码
	const code = ref("");

	// 获取授权码
	async function getCode() {
		return new Promise((resolve) => {
			// #ifdef MP-WEIXIN
			uni.login({
				provider: "weixin",
				success: (res) => {
					code.value = res.code;
					resolve(res.code);
				},
			});
			// #endif
		});
	}

	// 是否微信浏览器
	function isWxBrowser() {
		// #ifdef H5
		const ua: any = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
		// #endif

		// #ifndef H5
		return false;
		// #endif
	}

	// 是否安装了微信
	function hasApp() {
		// #ifdef APP
		return plus.runtime.isApplicationExist({ pname: "com.tencent.mm", action: "weixin://" });
		// #endif

		// #ifndef APP
		return true;
		// #endif
	}

	// 下载微信
	function downloadApp() {
		// #ifdef APP
		if (platform == "android") {
			const Uri: any = plus.android.importClass("android.net.Uri");
			const uri: any = Uri.parse("market://details?id=" + "com.tencent.mm");
			const Intent: any = plus.android.importClass("android.content.Intent");
			const intent: any = new Intent(Intent.ACTION_VIEW, uri);
			const main: any = plus.android.runtimeMainActivity();
			main.startActivity(intent);
		} else {
			plus.runtime.openURL(
				"itms-apps://" + "itunes.apple.com/cn/app/wechat/id414478124?mt=8",
			);
		}
		// #endif
	}

	// 微信公众号配置
	const mpConfig = {
		appId: "",
	};

	// 获取微信公众号配置
	function getMpConfig() {
		// #ifdef H5
		if (isWxBrowser()) {
			service.user.comm
				.wxMpConfig({
					url: `${location.origin}${location.pathname}`,
				})
				.then((res) => {
					wx.config({
						debug: config.app.wx.debug,
						jsApiList: ["chooseWXPay"],
						...res,
					});

					Object.assign(mpConfig, res);
				});
		}
		// #endif
	}

	// 微信公众号授权
	function mpAuth() {
		const redirect_uri = encodeURIComponent(
			`${location.origin}${location.pathname}#/pages/user/login`,
		);
		const response_type = "code";
		const scope = "snsapi_userinfo";
		const state = "STATE";

		const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${mpConfig.appId}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}#wechat_redirect`;

		location.href = url;
	}

	// 微信公众号登录
	async function mpLogin() {
		return new Promise((resolve) => {
			const code = getUrlParam("code");
			const mpCode = storage.get("mpCode");

			let url = window.location.href;
			url = url.replace(/(\?[^#]*)#/, "#");
			window.history.replaceState({}, "", url);

			if (code != mpCode) {
				storage.set("mpCode", code);
				resolve(code);
			} else {
				resolve(null);
			}
		});
	}

	// 微信公众号支付
	async function mpPay(params: wx.IchooseWXPay & { timeStamp: number }): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!isWxBrowser()) {
				return reject({
					message: "请在微信浏览器中打开",
				});
			}

			wx.chooseWXPay({
				...params,
				timestamp: params.timeStamp,
				success() {
					resolve();
				},
				complete(e: { errMsg: string }) {
					switch (e.errMsg) {
						case "chooseWXPay:cancel":
							reject({ message: "已取消支付" });
							break;

						default:
							reject({ message: "支付失败" });
					}
				},
			});
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
				Service.authorize(resolve, reject);
			}, reject);
		});
	}

	// 微信app支付
	function appPay(orderInfo: {
		appid: string;
		noncestr: string;
		package: string;
		partnerid: string;
		prepayid: string;
		timestamp: string;
		sign: string;
		[key: string]: any;
	}): Promise<void> {
		return new Promise((resolve, reject) => {
			uni.requestPayment({
				provider: "wxpay",
				orderInfo,
				success() {
					resolve();
				},
				fail() {
					reject({ message: "已取消支付" });
				},
			});
		});
	}

	// 微信小程序登录
	async function miniLogin(): Promise<{ code: string; [key: string]: any }> {
		return new Promise((resolve, reject) => {
			// 兼容 Mac
			const k = platform === "mac" ? "getUserInfo" : "getUserProfile";

			uni[k]({
				lang: "zh_CN",
				desc: "授权信息仅用于用户登录",
				success({ iv, encryptedData, signature, rawData }) {
					function next() {
						resolve({
							iv,
							encryptedData,
							signature,
							rawData,
							code: code.value,
						});
					}

					// 检查登录状态是否过期
					uni.checkSession({
						success() {
							next();
						},
						fail() {
							getCode().then(next);
						},
					});
				},
				fail(err) {
					console.error(err);
					getCode();

					reject({
						message: "登录授权失败",
					});
				},
			});
		});
	}

	// 微信小程序支付
	function miniPay(params: any): Promise<void> {
		return new Promise((resolve, reject) => {
			uni.requestPayment({
				provider: "wxpay",
				...params,
				success() {
					resolve();
				},
				fail() {
					reject({ message: "已取消支付" });
				},
			});
		});
	}

	onShow(() => {
		getCode();
	});

	onReady(() => {
		getMpConfig();
	});

	return {
		code,
		getCode,
		isWxBrowser,
		hasApp,
		downloadApp,
		mpConfig,
		mpAuth,
		mpLogin,
		mpPay,
		miniLogin,
		miniPay,
		appLogin,
		appPay,
	};
}
