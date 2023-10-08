import { cloneDeep } from "lodash-es";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { deepTree } from "../utils";
import { service } from "../service";
import type { DictItem } from "../types";

const useDictStore = defineStore("dict", () => {
	// 对象数据
	const data = reactive<{ [key: string]: DictItem[] }>({});

	// 请求
	let req: Promise<any>;

	// 获取
	function get(name: string) {
		const arr: DictItem[] = deepTree(cloneDeep(data[name] || []));
		return computed(() => arr).value;
	}

	// 获取名称
	function getLabel(name: string, value: any): string {
		const arr: any[] = value?.split(",") || [];

		return arr
			.map((e) => {
				return get(name).find((a) => a.value == e)?.label;
			})
			.filter(Boolean)
			.join(",");
	}

	// 刷新
	async function refresh(types?: string[]) {
		req = service.dict.info.data({
			types,
		});

		await req.then((res) => {
			const d: any = {};

			for (const i in res) {
				d[i] = res[i].map((e: any) => {
					return {
						...e,
						label: e.name,
						value: e.value || e.id,
					};
				});
			}

			Object.assign(data, d);
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
