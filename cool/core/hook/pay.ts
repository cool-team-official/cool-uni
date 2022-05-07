import { onShow } from "@dcloudio/uni-app";
import { storage } from "../../utils";
import { useUi } from "../../ui";

// 应用支付
function appPay(data: any) {
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			...data,
			success: () => {
				resolve(1);
			},
			fail: (err) => {
				console.error("Pay error", err);
				reject({
					message: "支付未完成",
				});
			},
		});
	});
}

// 内嵌 H5 支付
async function webPay(url: string) {
	const web = plus.webview.create(url, "webWeiXinpay", {
		top: "0",
		bottom: "0",
		height: "0",
		additionalHttpHeaders: {
			Referer: url,
		},
	});
	web.show();
}

interface PayData {
	payType: 1 | 2; // 1-微信，2-支付宝
	scene: 1 | 2 | 3; // 1-app，2-微信, 3-h5
}

enum PayType {
	"wxpay" = 1,
	"alipay" = 2,
}

// 支付
async function pay(type: "wxpay" | "alipay", next: (data: PayData) => Promise<any>): Promise<any> {
	// 记录时间
	storage.set("payTime", new Date().getTime());

	return next({
		payType: PayType[type],
		// #ifdef APP
		scene: 1,
		// #endif
		// #ifdef MP
		scene: 2,
		// #endif
		// #ifdef H5
		scene: 3,
		// #endif
	}).then((res) => {
		// 支付请求
		let req: any = null;

		switch (type) {
			case "wxpay":
				req = appPay({
					provider: "wxpay",
					// #ifdef MP
					...res,
					// #endif

					// #ifndef MP
					orderInfo: res,
					// #endif
				});
				break;
			case "alipay":
				req = appPay({
					provider: "alipay",
					orderInfo: res.url,
				});
				break;
		}

		return req;
	});
}

export function usePay(callback?: (action: ClConfirm.Action) => void) {
	const ui = useUi();

	onShow(() => {
		if (storage.once("payTime")) {
			ui.showConfirm({
				title: "提示",
				message: "是否支付完成？",
				cancelButtonText: "取消",
				confirmButtonText: "是的，已支付",
				callback(action) {
					if (callback) {
						callback(action);
					}
				},
			});
		}
	});

	return {
		pay,
	};
}
