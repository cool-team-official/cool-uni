import { defineStore } from "pinia";
import { ref } from "vue";
import { getVersion } from "../../utils";
import { config } from "../../config";

declare interface Version {
	description: string;
	downloadUrl: string;
	force: 0 | 1;
	status: 0 | 1;
	type: 1 | 2;
	updateType: 1 | 2;
	versionNo: string;
	packageSize: string;
	[key: string]: any;
}

const useAppStore = defineStore("app", function () {
	// 应用信息
	const info = ref<any>({
		...config.app,
	});

	// 版本信息
	const version = ref<Version | null>(null);

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
