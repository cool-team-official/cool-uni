import { defineStore } from "pinia";
import { reactive } from "vue";
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
		return value ? data[name]?.find((e) => e.value === value)?.label : data[name];
	}

	// 同步获取
	async function getSync(name: string, value?: any) {
		await req;
		return get(name, value);
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
		getSync,
		refresh,
	};
});

export default Dict;
