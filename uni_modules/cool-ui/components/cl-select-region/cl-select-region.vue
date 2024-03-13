<template>
	<view class="cl-select-region">
		<cl-select
			mode="multiSelector"
			:model-value="value"
			:options="list"
			:label-key="labelKey"
			:value-key="valueKey"
			:separator="separator"
			:disabled="disabled"
			:border="border"
			set-options-is-parse-value
			@column-change="onColumnChange"
			@change="onChange"
		/>
	</view>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { isEmpty } from "lodash-es";
import CityPca from "../../data/city-pca.json";

let cities: any[] = CityPca;

export default defineComponent({
	name: "cl-select-region",

	props: {
		// 绑定值
		modelValue: Array,
		// 城市数据接口
		api: String,
		// 是否禁用
		disabled: {
			type: Boolean,
			default: null,
		},
		// 是否带有边框
		border: {
			type: Boolean,
			default: true,
		},
		// 显示关键字
		labelKey: {
			type: String,
			default: "name",
		},
		// 值关键字
		valueKey: {
			type: String,
			default: "code",
		},
		// 分隔符
		separator: {
			type: String,
			default: " - ",
		},
	},

	setup(props, { emit }) {
		const list = ref<any[]>([[], [], []]);

		// 绑定值
		const value = ref<any[]>([]);

		// 监听值改变
		function onChange(arr: any[]) {
			value.value = arr;
			emit("update:modelValue", arr);
			emit("change", arr);
		}

		// 监听更新
		function onUpdate() {
			const [x, y, z]: any = props.modelValue;
			value.value = [x, y, z];

			let a = 0;
			let b = 0;

			if (!x) {
				a = 0;
				b = 0;
			} else {
				a = cities.findIndex((e) => e[props.valueKey] == x);

				if (a >= 0) {
					b = cities[a].children.findIndex((e: any) => e[props.valueKey] == y);
				}
			}

			updateList([a, b]);
		}

		// 监听列变化
		function onColumnChange({ selects }: any) {
			updateList(selects.map((e: any) => (e < 0 ? 0 : e)));
		}

		// 更新列表值
		function updateList([a = 0, b = 0]: any) {
			if (a < 0) {
				a = 0;
			}
			if (b < 0) {
				b = 0;
			}

			list.value = [cities, cities[a].children, cities[a].children[b].children];
		}

		watch(
			() => props.modelValue,
			() => {
				if (!isEmpty(cities)) {
					onUpdate();
				} else {
					if (props.api) {
						uni.request({
							url: props.api,
							success(res: any) {
								cities = res.data;
								onUpdate();
							},
						});
					}
				}
			},
			{
				immediate: true,
			},
		);

		return {
			list,
			value,
			onChange,
			onUpdate,
			onColumnChange,
			updateList,
		};
	},
});
</script>
