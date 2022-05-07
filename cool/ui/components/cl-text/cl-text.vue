<template>
	<view
		class="cl-text"
		:class="[classList]"
		:style="{
			color,
			textAlign: align,
			'-webkit-line-clamp': ellipsis,
			margin: parseRpx(margin),
			fontSize: parseRpx(size),
			letterSpacing: parseRpx(letterSpacing),
		}"
		@tap="onTap"
	>
		<!-- 价格 -->
		<text class="cl-text__symbol--price" v-if="type == 'price'">￥</text>

		<!-- 前缀图标 -->
		<text class="cl-text__prefix-icon" :class="prefixIcon" v-if="prefixIcon"> </text>

		<!-- 文本 -->
		<text class="cl-text__value">{{ t.value }}</text>

		<!-- 小数 -->
		<text class="cl-text__precision" v-if="type == 'price' && precision"
			>.{{ t.precision }}</text
		>

		<!-- 后缀图标 -->
		<text class="cl-text__suffix-icon" :class="suffixIcon" v-if="suffixIcon"> </text>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { parseRpx } from "/@/cool/utils";

/**
 * @description 文本
 * @property {String, Number} value 内容
 * @property {String} type 类型
 * @property {Boolean} encrypt 手机号是否加密，默认true
 * @property {Boolean} bold 是否粗体
 * @property {Boolean} block 是否块状
 * @property {Number} ellipsis 文本超出省略
 * @property {String} color 字体颜色，默认#444
 * @property {Number, String} size 字体大小，默认24
 * @property {Boolean} precision 价格小数点，默认true
 * @property {Boolean} lineThrough 穿过文本下的一条线
 * @property {Boolean} underline 文本下的一条线
 * @property {String, Number} letterSpacing 文本水平间隔
 * @property {String, Number, Array} margin 外间距
 * @property {String} prefixIcon 前缀图标
 * @property {String} suffixIcon 后缀图标
 * @property {String} copy 是否长按复制
 */

export default defineComponent({
	name: "cl-text",

	props: {
		value: {
			type: [String, Number],
			default: "",
		},
		type: {
			type: String as PropType<"text" | "price" | "phone">,
			default: "text",
		},
		encrypt: {
			type: Boolean,
			default: true,
		},
		bold: Boolean,
		block: Boolean,
		ellipsis: {
			type: Number,
			default: 0,
		},
		color: {
			type: String,
			default: "#444",
		},
		size: {
			type: [String, Number],
			default: 24,
		},
		align: {
			type: String as PropType<
				"start" | "end" | "left" | "right" | "center" | "justify" | "match-parent"
			>,
			default: "left",
		},
		precision: {
			type: Boolean,
			default: true,
		},
		lineThrough: Boolean,
		underline: Boolean,
		letterSpacing: {
			type: [String, Number],
			default: 0,
		},
		margin: [String, Number, Array],
		prefixIcon: String,
		suffixIcon: String,
		copy: Boolean,
	},

	emits: ["click", "tap"],

	setup(props, { emit }) {
		// 文本
		const t = computed(() => {
			if (props.type == "price") {
				const [value, precision = "00"] = parseFloat(String(props.value) || "0")
					.toFixed(2)
					.split(".");

				if (props.precision) {
					return {
						value,
						precision,
					};
				} else {
					return {
						value,
					};
				}
			} else if (props.type == "phone") {
				const str = String(props.value);

				return {
					value: props.encrypt ? str.substr(0, 3) + "****" + str.substr(7) : str,
				};
			} else {
				return {
					value: props.value,
				};
			}
		});

		// 样式
		const classList = computed(() => {
			let list = [];

			if (props.bold) {
				list.push("is-bold");
			}

			if (props.block) {
				list.push("is-block");
			}

			if (props.lineThrough) {
				list.push("is-line-through");
			}

			if (props.underline) {
				list.push("is-underline");
			}

			if (props.ellipsis > 0) {
				list.push("is-ellipsis");
			}

			if (props.type) {
				list.push(`is-${props.type}`);
			}

			if (props.color) {
				list.push(`is-color-${props.color}`);
			}

			if (props.copy) {
				list.push("is-copy");
			}

			return list.join(" ");
		});

		// 点击
		function onTap(e: any) {
			emit("click", e);
			emit("tap", e);
		}

		return {
			t,
			classList,
			parseRpx,
			onTap,
		};
	},
});
</script>
