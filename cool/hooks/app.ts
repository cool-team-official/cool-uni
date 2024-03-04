import { reactive, ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { storage } from "../utils";
import { config } from "/@/config";
import { defineStore } from "pinia";

// 缓存
export const useCache = defineStore("cache", () => {
	// 缓存大小
	const size = ref("0KB");

	// 获取缓存
	function get() {
		// #ifdef APP
		plus.cache.calculate(function (s: number) {
			//size是多少个字节单位是b
			if (s < 1024) {
				size.value = s + "B";
			} else if (s / 1024 >= 1 && s / 1024 / 1024 < 1) {
				size.value = Math.floor((s / 1024) * 100) / 100 + "KB";
			} else if (s / 1024 / 1024 >= 1) {
				size.value = Math.floor((s / 1024 / 1024) * 100) / 100 + "M";
			}
		});
		// #endif
	}

	// 清空缓存
	function clear() {
		// #ifdef APP
		plus.cache.clear(function () {
			get();
		});
		// #endif
	}

	onShow(() => {
		get();
	});

	return {
		size,
		get,
		clear,
	};
});

// 消息通知
export const useNotice = defineStore("notice", () => {
	// 是否开启
	const enabled = ref(false);

	// 获取状态
	function get() {
		// #ifdef APP
		const UIApplication = plus.ios.import("UIApplication");
		const app = UIApplication.sharedApplication();
		if (app.currentUserNotificationSettings) {
			const settings = app.currentUserNotificationSettings();
			enabled.value = settings.plusGetAttribute("types") != 0;
			plus.ios.deleteObject(settings);
		} else {
			enabled.value = app.enabledRemoteNotificationTypes() != 0;
		}

		plus.ios.deleteObject(app);
		// #endif
	}

	// 打开设置
	function open() {
		// #ifdef APP
		const UIApplication = plus.ios.import("UIApplication");
		const app = UIApplication.sharedApplication();
		const NSURL2 = plus.ios.import("NSURL");
		const settings = NSURL2.URLWithString("app-settings:");
		app.openURL(settings);
		// #endif
	}

	onShow(() => {
		// get();
	});

	return {
		enabled,
		get,
		open,
	};
});

// 主题
export const useTheme = defineStore("theme", () => {
	const name = ref(storage.get("theme") || "default");

	function set(value: string) {
		name.value = value;
		storage.set("theme", value);
	}

	return {
		name,
		set,
	};
});

export function useApp() {
	const info = reactive(config.app);

	return {
		info,
		theme: useTheme(),
		cache: useCache(),
		notice: useNotice(),
	};
}
