import { defineStore } from "pinia";
import { computed, reactive, toRaw } from "vue";
import { deepTree } from "../utils";
import { service } from "../service";
import { isDev } from "/@/config";
import type { Dict } from "../types";

const useDictStore = defineStore("dict", () => {
	// 对象数据
	const data = reactive<Dict.Data>({});

	function get(name: string) {
		return computed(() => data[name]).value || [];
	}

	// 获取名称
	function getLabel(name: string, value: any): string {
		const arr: any[] = String(value)?.split(",") || [];

		return arr
			.map((e) => {
				return get(name).find((a) => a.value == e)?.label;
			})
			.filter(Boolean)
			.join(",");
	}

	// 刷新
	async function refresh(types?: string[]) {
		return service.dict.info
			.data({
				types,
			})
			.then((res: Dict.Data) => {
				const d: any = {};

				for (const [i, arr] of Object.entries(res)) {
					arr.forEach((e) => {
						e.label = e.name;
						e.value = e.value ?? e.id;
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
