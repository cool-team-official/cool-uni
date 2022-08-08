import { isArray, isNumber } from "lodash";
import storage from "./storage";
import Canvas from "./canvas";

const { platform, model } = uni.getSystemInfoSync();

// 是否安卓
export const isAndroid: boolean = platform == "android";

// 是否苹果
export const isIos: boolean = platform == "ios";

// 是否小数
export function isDecimal(value: any): boolean {
	return String(value).length - String(value).indexOf(".") + 1 > 0;
}

// 首字母大写
export function firstUpperCase(value: string): string {
	return value.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
		return $1.toUpperCase() + $2;
	});
}

// 深度合并
export function deepMerge(a: any, b: any) {
	let k;
	for (k in b) {
		a[k] =
			a[k] && a[k].toString() === "[object Object]" ? deepMerge(a[k], b[k]) : (a[k] = b[k]);
	}
	return a;
}

// 解析rpx
export function parseRpx(val: any): string {
	return isArray(val) ? val.map(parseRpx).join(" ") : isNumber(val) ? `${val}rpx` : val;
}

// 获取地址栏参数
export function getUrlParam(name: string): string | null {
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	const r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return null;
}

// 文件路径转对象
export function deepFiles(list: any[]) {
	const modules: any = {};

	list.forEach((e) => {
		const arr = e.path.split("/");
		const parents = arr.slice(0, arr.length - 1);
		const name = basename(e.path).replace(".ts", "");

		let curr: any = modules;
		let prev: any = null;
		let key: any = null;

		parents.forEach((k: string) => {
			if (!curr[k]) {
				curr[k] = {};
			}

			prev = curr;
			curr = curr[k];
			key = k;
		});

		if (name == "index") {
			prev[key] = e.value;
		} else {
			curr[name] = e.value;
		}
	});

	return modules;
}

// 文件名
export function filename(path: string): string {
	return basename(path.substring(0, path.lastIndexOf(".")));
}

// 路径名称
export function basename(path: string): string {
	let index = path.lastIndexOf("/");
	index = index > -1 ? index : path.lastIndexOf("\\");
	if (index < 0) {
		return path;
	}
	return path.substring(index + 1);
}

// 文件扩展名
export function extname(path: string): string {
	return path.substring((path || "").lastIndexOf(".") + 1);
}

// 横杠转驼峰
export function toCamel(str: string): string {
	return str.replace(/([^-])(?:-+([^-]))/g, function ($0, $1, $2) {
		return $1 + $2.toUpperCase();
	});
}

// 获取元素位置信息
export async function getRect(selector: string): Promise<any> {
	return new Promise((resolve) => {
		uni.createSelectorQuery()
			.select(selector)
			.boundingClientRect((res) => {
				resolve(res);
			})
			.exec();
	});
}

// uuid
export function uuid(): string {
	const s: any[] = [];
	const hexDigits = "0123456789abcdef";
	for (let i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
	s[8] = s[13] = s[18] = s[23] = "-";

	return s.join("");
}

// 获取版本号
export function getVersion(): Promise<string> {
	return new Promise((resolve) => {
		// #ifdef APP
		const packVersion: any = plus.runtime.version;
		const appid: any = plus.runtime.appid;
		plus.runtime.getProperty(appid, function (widgetInfo) {
			resolve(
				String(packVersion) > String(widgetInfo.version) ? packVersion : widgetInfo.version
			);
		});
		// #endif

		// #ifndef APP
		resolve("1.0.0");
		// #endif
	});
}

// 获取 deviceId
export function getDeviceId(): string {
	// #ifdef APP
	return plus.device.uuid;
	// #endif

	// #ifndef APP
	return uuid();
	// #endif
}

// 获取 oaid
export function getOAID() {
	return new Promise((resolve) => {
		plus.device.getOAID({
			success(res) {
				resolve(res.oaid);
			},
			fail() {
				resolve(0);
			},
		});
	});
}

// 获取 androidId
export function getAndroidId() {
	if (isAndroid) {
		const Settings = plus.android.importClass("android.provider.Settings");
		const main = plus.android.runtimeMainActivity();
		return Settings.Secure.getString(main.getContentResolver(), Settings.Secure.ANDROID_ID);
	}
}

// 获取 mac
export function getMac() {
	if (isAndroid) {
		const net = plus.android.importClass("java.net.NetworkInterface");
		const wl0 = net.getByName("wlan0");
		const macByte = wl0.getHardwareAddress();
		let str = "";
		for (let i = 0; i < macByte.length; i++) {
			let tmp = "";
			let num = macByte[i];
			if (num < 0) {
				tmp = (255 + num + 1).toString(16);
			} else {
				tmp = num.toString(16);
			}
			if (tmp.length == 1) {
				tmp = "0" + tmp;
			}
			str += tmp;
		}
		return str;
	}
}

// 设备信息
const device: any = {
	deviceId: getDeviceId(),
	platform,
	model,
	isAndroid,
	isIos,
};

export function useDevice(): Promise<any> {
	return new Promise((resolve) => {
		// #ifdef APP
		plus.device.getInfo({
			success: async (res) => {
				device.imei = res.imei;
				device.idfa = res.idfa;
				device.androidId = getAndroidId();
				device.mac = getMac();
				device.oaid = await getOAID();
				resolve(device);
			},
		});
		// #endif

		// #ifndef APP
		resolve(device);
		// #endif
	});
}

export { platform, storage, Canvas };
