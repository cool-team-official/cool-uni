import { defineStore } from "pinia";
import { ref } from "vue";
import { getVersion } from "../../utils";
import { config } from "../../config";

const useAppStore = defineStore("app", function () {
	// 应用信息
	const info = ref<any>({
		...config.app,
	});

	// 版本信息
	const version = ref(null);

	// 检测版本
	function checkVersion() {
		// #ifdef APP || H5
		return new Promise((resolve, reject) => {
			reject({
				message: "当前已是最新版本～",
			});
		});
		// #endif

		// #ifndef APP
		return false;
		// #endif
	}

	// 获取版本号
	getVersion().then((version) => {
		info.value.version = version;
	});

	return {
		info,
		version,
		getVersion,
		checkVersion,
	};
});

export default useAppStore;
