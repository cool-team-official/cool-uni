<template>
	<view
		class="cl-text"
		:class="[
			{
				'is-bold': bold,
				'is-block': block,
				'is-line-through': lineThrough,
				'is-ellipsis': ellipsis > 0,
			},
			`is-${type}`,
		]"
		:style="{
			margin: margin2,
			color,
			'font-size': '26rpx',
			'letter-spacing': parse_rpx(letterSpacing),
			'-webkit-line-clamp': ellipsis,
		}"
	>
		<text class="cl-text__symbol--price" v-if="type == 'price'">￥</text>
		<text
			class="cl-text__value"
			:style="{
				fontSize: parse_rpx(size),
			}"
			>{{ d.value }}</text
		>
		<text class="cl-text__precision" v-if="type == 'price' && precision"
			>.{{ d.precision }}</text
		>
	</view>
</template>

<script>
import { isNumber, isArray } from "../../utils";
import Style from "../../mixins/style";

export default {
	props: {
		// 绑定值
		value: [String, Number],
		// 类型：text | price | phone
		type: {
			type: String,
			default: "text",
		},
		// 是否粗体 500
		bold: Boolean,
		// 是否块状
		block: Boolean,
		// 文本超出省略
		ellipsis: Number,
		// 字体颜色
		color: {
			type: String,
			default: "#444",
		},
		// 字体大小
		size: {
			type: [String, Number],
			default: 24,
		},
		// 小数点：price 有效
		precision: {
			type: Boolean,
			default: true,
		},
		// 穿过文本下的一条线
		lineThrough: Boolean,
		// 文本水平间隔
		letterSpacing: {
			type: [String, Number],
			default: 0,
		},
	},

	mixins: [Style],

	computed: {
		d() {
			if (this.type == "price") {
				const [value, precision = "00"] = parseFloat(this.value || 0)
					.toFixed(2)
					.split(".");

				if (this.precision) {
					return {
						value,
						precision,
					};
				} else {
					return {
						value,
					};
				}
			} else if (this.type == "phone") {
				const str = String(this.value);

				return {
					value: str.substr(0, 3) + "******" + str.substr(8),
				};
			} else {
				return {
					value: this.value,
				};
			}
		},
	},
};
</script>
