<template>
	<view
		class="cl-text"
		:class="[
			`is-${type}`,
			`is-color-${color}`,
			{
				'is-bold': bold,
				'is-block': block,
				'is-line-through': lineThrough,
				'is-underline': underline,
				'is-ellipsis': ellipsis > 0,
				'is-copy': copy,
			},
		]"
		:style="[
			baseStyle,
			{
				color,
				justifyContent: align,
				lineHeight,
				fontSize: parseRpx(size),
				letterSpacing: parseRpx(letterSpacing),
			},
		]"
		@click="tap"
	>
		<!-- 前缀图标 -->
		<text class="cl-text__prefix-icon" :class="prefixIcon" v-if="prefixIcon"> </text>

		<!-- 价格 -->
		<text class="cl-text__symbol--price" v-if="type == 'price'">￥</text>

		<!-- 文本 -->
		<view
			class="cl-text__value"
			:style="{
				'-webkit-line-clamp': ellipsis,
			}"
		>
			<slot>{{ text.value }}</slot>
		</view>

		<!-- 小数 -->
		<text class="cl-text__precision" v-if="type == 'price' && precision"
			>.{{ text.precision }}</text
		>

		<!-- 后缀图标 -->
		<text class="cl-text__suffix-icon" :class="suffixIcon" v-if="suffixIcon"> </text>
	</view>
</template>

<script lang="ts">
import { type PropType, computed, defineComponent } from "vue";
import { useStyle, useTap } from "../../hooks";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-text",

	props: {
		// 内容
		value: {
			type: [String, Number],
			default: "",
		},
		// 类型
		type: {
			type: String as PropType<"text" | "price" | "phone">,
			default: "text",
		},
		// 手机号是否加密
		encrypt: {
			type: Boolean,
			default: true,
		},
		// 是否粗体
		bold: Boolean,
		// 是否块状
		block: Boolean,
		// 文本超出省略
		ellipsis: {
			type: Number,
			default: 0,
		},
		// 字体颜色
		color: {
			type: String,
			default: "#444",
		},
		// 字体大小
		size: [String, Number],
		// 文字对齐
		align: {
			type: String as PropType<"start" | "end" | "left" | "right" | "center">,
			default: "left",
		},
		// 价格小数点
		precision: {
			type: Boolean,
			default: true,
		},
		// 穿过文本下的一条线
		lineThrough: Boolean,
		// 行高
		lineHeight: {
			type: [String, Number],
			default: 1,
		},
		// 文本下的一条线
		underline: Boolean,
		// 文本水平间隔
		letterSpacing: {
			type: [String, Number],
			default: 0,
		},
		// 顶部图标
		prefixIcon: String,
		// 尾部图标
		suffixIcon: String,
		// 是否能复制
		copy: Boolean,
	},

	setup(props, { emit }) {
		const { tap } = useTap(emit);

		const text = computed(() => {
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

		const align = computed(() => {
			switch (props.align) {
				case "start":
				case "left":
					return "flex-start";
				case "end":
				case "right":
					return "flex-end";
				case "center":
					return "center";
			}
		});

		return {
			text,
			tap,
			align,
			...useStyle(),
		};
	},
});
</script>
