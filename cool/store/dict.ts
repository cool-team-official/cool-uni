import { defineStore } from "pinia";
import { computed, reactive, toRaw } from "vue";
import { deepTree, isEmpty } from "../utils";
import { service } from "../service";
import { isDev } from "/@/config";
import { isString } from "lodash-es";
import type { Dict } from "../types";

const useDictStore = defineStore("dict", () => {
	// 对象数据
	const data = reactive<Dict.Data>({});

	// 获取数据列表
	function get(name: Dict.Key) {
		return computed(() => data[name]).value || [];
	}

	// 获取名称
	function getLabel(name: Dict.Key | any[], value: any): string {
		const arr: any[] = String(value)?.split(",") || [];

		return arr
			.map((e) => {
				return (isString(name) ? get(name) : name).find((a) => a.value == e)?.label;
			})
			.filter(Boolean)
			.join(",");
	}

	// 刷新
	async function refresh(types?: Dict.Key[]) {
		return service.dict.info
			.data({
				types,
			})
			.then((res: Dict.Data) => {
				const d: any = {};

				for (const [i, arr] of Object.entries(res)) {
					arr.forEach((e) => {
						e.label = e.name;
						e.value = isEmpty(e.value) ? e.id : e.value;
					});

					d[i] = deepTree(arr, "desc");
				}

				Object.assign(data, d);

				if (isDev) {
					console.log("字典数据：");
					console.log(toRaw(data));
				}

				return data;
			});
	}

	return {
		data,
		get,
		getLabel,
		refresh,
	};
});

export { useDictStore };
