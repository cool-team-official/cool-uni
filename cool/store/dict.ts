import { cloneDeep } from "lodash-es";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { deepTree } from "../utils";
import { service } from "../service";

declare interface Data {
	[key: string]: Array<{ label: string; value: any; [key: string]: any }>;
}

const useDictStore = defineStore("dict", () => {
	// 对象数据
	const data = reactive<Data>({});

	// 请求
	let req: Promise<any>;

	// 获取
	function get(name: string, value?: any) {
		const arr = deepTree(cloneDeep(data[name] || []));
		return computed(() => {
			return value ? arr?.find((e) => e.value == value) : arr;
		}).value;
	}

	// 获取名称
	function getLabel(name: string, value: any): string {
		return (value?.split(",") || []).map((e: any) => get(name, e)?.label).join(",");
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
						label: e.name,
						value: e.id,
						...e,
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
