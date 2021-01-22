<template>
	<view class="cl-select" :class="[classList]">
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
			<view class="cl-select__inner">
				<text class="cl-select__value"
					>{{ text
					}}<text class="cl-select__placeholder" v-if="showPlaceholder">{{
						placeholder
					}}</text></text
				>
				<text class="cl-select__icon cl-icon-arrow-bottom"></text>
			</view>
		</picker>
	</view>
</template>

<script>
import { isArray, isEmpty, compareValue } from "../../utils";
import Form from "../../mixins/form";

/**
 * select 下拉选择
 * @description 下拉选择，基于 picker 组件的封装
 * @tutorial https://docs.cool-js.com/uni/components/form/select.html
 * @property {null} value 绑定值
 * @property {String, Number} mode 选择器模式，selector | multiSelector
 * @property {String} placeholder 占位内容
 * @property {Array<Object>} options 数据列表
 * @property {String} labelKey 内容关键字，默认label
 * @property {String} valueKey 值关键字，默认value
 * @property {String} separator 分隔符，默认 /
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} border 是否带有边框
 * @property {Boolean} fields 日期字段，有效值 year | month | day
 * @property {Boolean} start 有效日期的开始
 * @property {Boolean} end 有效日期的结束
 * @event {Function} change 绑定值改变时触发
 * @event {Function} confirm 绑定值改变时触发，返回完整数据
 * @event {Function} cancel 取消时触发
 * @event {Function} column-change 列发生改变时触发
 * @example <cl-select :options="[{label: '内容1', value: 1},{label: '内容2', value: 2}]" />
 */

export default {
	name: "cl-select",

	props: {
		// 绑定值
		value: null,
		// 选择器模式
		mode: {
			type: String,
			default: "selector",
		},
		// 占位内容
		placeholder: {
			type: String,
			default: "请选择",
		},
		// 数据列表
		options: {
			type: Array,
			default: () => [],
		},
		// 内容关键字
		labelKey: {
			type: String,
			default: "label",
		},
		// 值关键字
		valueKey: {
			type: String,
			default: "value",
		},
		// 分隔符
		separator: {
			type: String,
			default: "/",
		},
		// 是否禁用
		disabled: Boolean,
		// 是否带有边框
		border: Boolean,
		// 日期字段，有效值 year | month | day
		fields: {
			type: String,
			default: "day",
		},
		// 有效日期的开始
		start: String,
		// 有效日期的结束
		end: String,
		// 是否默认返回第一个
		defaultFirstOption: {
			type: Boolean,
			default: true,
		},
		// 设置 options 时是否重新解析 value
		setOptionsIsParseValue: Boolean,
	},

	mixins: [Form],

	data() {
		return {
			index: "",
			text: "",
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.parse(val);
			},
		},
		options: {
			immediate: true,
			handler(arr) {
				// 避免重复设置 options 异常问题
				if (!this.setOptionsIsParseValue) {
					this.parse(this.value);
				}

				// 为空时，默认返回列表第一个
				if (arr && arr.length > 0 && this.defaultFirstOption) {
					if (this.value === undefined) {
						this.$emit("input", arr[0][this.valueKey]);
					}
				}
			},
		},
	},

	computed: {
		rangeKey() {
			return this.mode == "region" ? "" : this.labelKey;
		},

		showPlaceholder() {
			return isEmpty(this.text);
		},

		classList() {
			let list = [];

			if (this.isDisabled) {
				list.push("is-disabled");
			}

			if (this.border) {
				list.push("is-border");
			}

			return list.join(" ");
		},
	},

	methods: {
		parse(val) {
			// 取下标
			this.index = (() => {
				switch (this.mode) {
					case "selector":
						return this.options.findIndex((e) => compareValue(e[this.valueKey], val));
					case "multiSelector":
						return (isArray(val) ? val : [val]).map((v, i) => {
							return this.options[i].findIndex((e) =>
								compareValue(e[this.valueKey], v)
							);
						});
					default:
						return val;
				}
			})();

			// 取文本值
			this.text = (() => {
				switch (this.mode) {
					case "selector":
						return this.options[this.index]
							? this.options[this.index][this.labelKey]
							: "";
					case "multiSelector":
						return this.index
							.filter((v) => v >= 0)
							.map((v, i) => this.options[i][v][this.labelKey])
							.join(this.separator);
					case "region":
						console.warn("请使用 cl-select-region 代替");
					default:
						return this.index;
				}
			})();
		},
		onChange({ detail }) {
			if (detail.value < 0 || detail.value === undefined) {
				return false;
			}

			// 返回的完整数据
			let data = null;

			// 返回的唯一数据
			let value = null;

			switch (this.mode) {
				case "selector":
					data = this.options[detail.value];
					value = data ? data[this.valueKey] : null;
					break;
				case "multiSelector":
					data = detail.value
						.map((v) => (v < 0 ? 0 : v))
						.map((v, i) => this.options[i][v]);
					value = data.map((e) => e[this.valueKey]);
					break;
				default:
					value = detail.value;
			}

			this.$emit("confirm", data);
			this.$emit("change", value);
			this.$emit("input", value);
		},
		onColumnChange({ detail }) {
			this.index = this.index.map((v, i) =>
				i < detail.column ? v : i === detail.column ? detail.value : 0
			);

			this.$emit("column-change", { ...detail, selects: this.index });
		},
		onCancel() {
			this.$emit("cancel");
		},
	},
};
</script>
