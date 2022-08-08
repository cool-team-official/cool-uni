import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { service } from "../service";

declare interface Data {
	[key: string]: Array<{ label: string; value: any }>;
}

const Dict = defineStore("dict", () => {
	// 对象数据
	const data = reactive<Data>({});

	// 请求
	let req: Promise<any>;

	// 获取
	function get(name: string, value?: any) {
		return computed(() => {
			return value ? data[name]?.find((e) => e.value == value) : data[name];
		}).value;
	}

	// 获取名称
	function getLabel(name: string, value: string): string {
		const arr = value?.split(",") || [];

		// @ts-ignore
		return arr.map((e) => get(name, e)?.label).join(",");
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
					};
				});
			}

			Object.assign(data, d);

			console.log("字典数据", data);
		});
	}

	return {
		data,
		get,
		getLabel,
		refresh,
	};
});

export default Dict;
