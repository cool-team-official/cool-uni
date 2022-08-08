<template>
	<view
		class="cl-select"
		:class="[
			{
				'is-disabled': isDisabled,
				'is-round': round,
				'is-border': border,
			},
		]"
		:style="{
			backgroundColor,
			borderRadius: parseRpx(borderRadius),
		}"
	>
		<picker
			:mode="mode"
			:value="index"
			:range="options"
			:range-key="rangeKey"
			:disabled="isDisabled"
			:end="end"
			:start="start"
			:fields="fields"
			@change="onChange"
			@columnchange="onColumnChange"
			@cancel="onCancel"
		>
			<view
				class="cl-select__inner"
				:style="{
					height: parseRpx(height),
				}"
			>
				<view class="cl-select__value">
					<slot :scope="{ index, text }">
						{{ text }}
						<text class="cl-select__placeholder" v-if="!text">
							{{ placeholder }}
						</text>
					</slot>
				</view>
			</view>
		</picker>

		<text class="cl-select__icon cl-icon-arrow-bottom"></text>
	</view>
</template>

<script lang="ts">
/**
 * @description 下拉选择，基于 picker 组件的封装
 * @property {null} modelValue 绑定值
 * @property {Number} height 高
 * @property {String, Number} mode 选择器模式，selector | multiSelector
 * @property {String} placeholder 占位内容
 * @property {Array<Object>} options 数据列表
 * @property {String} labelKey 内容关键字，默认label
 * @property {String} valueKey 值关键字，默认value
 * @property {String} separator 分隔符，默认 /
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} border 是否带有边框
 * @property {Boolean} round 是否圆角
 * @property {Boolean} fields 日期字段，有效值 year | month | day
 * @property {Boolean} start 有效日期的开始
 * @property {Boolean} end 有效日期的结束
 * @property {Boolean} defaultFirstOption 默认选中第一个
 * @event {Function} change 绑定值改变时触发
 * @event {Function} confirm 绑定值改变时触发，返回完整数据
 * @event {Function} cancel 取消时触发
 * @event {Function} column-change 列发生改变时触发
 */

import { computed, defineComponent, PropType, ref, watch } from "vue";
import { useForm } from "../../hook";
import { parseRpx } from "/@/cool/utils";
import { isArray, isEmpty } from "lodash";

export default defineComponent({
	name: "cl-select",

	props: {
		modelValue: null,
		height: {
			type: Number,
			default: 70,
		},
		mode: {
			type: String as PropType<"selector" | "multiSelector" | "region" | "time" | "date">,
			default: "selector",
		},
		placeholder: {
			type: String,
			default: "请选择",
		},
		options: {
			type: Array as PropType<{ label: string; value: any }[]>,
			default: () => [],
		},
		labelKey: {
			type: String,
			default: "label",
		},
		valueKey: {
			type: String,
			default: "value",
		},
		separator: {
			type: String,
			default: "/",
		},
		disabled: {
			type: Boolean,
			default: null,
		},
		border: {
			type: Boolean,
			default: true,
		},
		round: {
			type: Boolean,
			default: null,
		},
		fields: {
			type: String as PropType<"year" | "month" | "day">,
			default: "day",
		},
		start: String,
		end: String,
		defaultFirstOption: {
			type: Boolean,
			default: true,
		},
		backgroundColor: String,
		borderRadius: [String, Number],
		setOptionsIsParseValue: Boolean,
	},

	emits: ["update:modelValue", "confirm", "change", "column-change", "cancel"],

	setup(props, { emit }) {
		const { disabled } = useForm();

		// 选中下标
		const index = ref<any>();

		// 文本
		const text = ref<string>("");

		// 是否禁用
		const isDisabled = computed(() => disabled.value || props.disabled);

		// key
		const rangeKey = computed(() => (props.mode == "region" ? "" : props.labelKey));

		// 解析值
		function parse(val: any) {
			// 取下标
			index.value = (() => {
				switch (props.mode) {
					// 返回下标
					case "selector":
						return props.options.findIndex(
							(e) => String(e[props.valueKey]) == String(val)
						);
					// 返回数组
					case "multiSelector":
						return (isArray(val) ? val : [val]).map((v, i) => {
							return props.options[i].findIndex(
								(e: any) => String(e[props.valueKey]) == String(v)
							);
						});
					default:
						return val;
				}
			})();

			// 取文本值
			text.value = (() => {
				switch (props.mode) {
					case "selector":
						return props.options[index.value]
							? props.options[index.value][props.labelKey]
							: "";
					case "multiSelector":
						return index.value
							.filter((v: any) => v >= 0)
							.map((v: any, i: number) => props.options[i][v][props.labelKey])
							.join(props.separator);
					case "region":
						console.warn("请使用 cl-select-region 代替");
					default:
						return index.value;
				}
			})();
		}

		// 监听值
		function onChange({ detail }: any) {
			if (detail.value < 0 || detail.value === undefined) {
				return false;
			}

			// 返回的完整数据
			let data: any = null;

			// 返回的唯一数据
			let value: any = null;

			switch (props.mode) {
				case "selector":
					data = props.options[detail.value];
					value = data ? data[props.valueKey] : null;
					break;
				case "multiSelector":
					data = detail.value
						.map((v: any) => (v < 0 ? 0 : v))
						.map((v: any, i: number) => props.options[i][v]);
					value = data.map((e: any) => e[props.valueKey]);
					break;
				default:
					value = detail.value;
			}

			emit("confirm", data);
			emit("change", value);
			emit("update:modelValue", value);
		}

		// 监听列
		function onColumnChange({ detail }: any) {
			index.value = index.value.map((v: any, i: number) =>
				i < detail.column ? v : i === detail.column ? detail.value : 0
			);

			emit("column-change", { ...detail, selects: index.value });
		}

		// 取消
		function onCancel() {
			emit("cancel");
		}

		watch(() => props.modelValue, parse, {
			immediate: true,
		});

		watch(
			() => props.options,
			(arr: any[]) => {
				// 避免重复设置 options 异常问题
				if (!props.setOptionsIsParseValue) {
					parse(props.modelValue);
				}

				// 为空时，默认返回列表第一个
				if (!isEmpty(arr) && props.defaultFirstOption) {
					if (
						index.value === undefined ||
						index.value < 0 ||
						index.value === "" ||
						index.value === null
					) {
						emit("update:modelValue", arr[0][props.valueKey]);
					}
				}
			},
			{
				immediate: true,
			}
		);

		return {
			index,
			text,
			rangeKey,
			isDisabled,
			parse,
			onChange,
			onColumnChange,
			onCancel,
			parseRpx,
		};
	},
});
</script>
