<template>
	<view class="cl-captcha">
		<input
			class="cl-captcha__input"
			v-model="value2"
			type="number"
			:focus="focus"
			:maxlength="length"
			@focus="onFocus"
			@blur="onBlur"
			@input="onInput"
		/>

		<view class="cl-captcha__code">
			<view
				class="cl-captcha__item"
				:style="{
					height: parseRpx(height),
					margin: `0 ${gutter}rpx`,
				}"
				v-for="(item, index) in list"
				:key="index"
			>
				<text class="cl-captcha__value">{{ value2[index] }}</text>
				<view class="cl-captcha__cursor" v-if="value2.length == index && focus2"></view>
			</view>
		</view>
	</view>
</template>

<script>
import { parseRpx } from "../../utils";

/**
 * captcha 验证码输入框
 * @description 支持位数
 * @tutorial https://docs.cool-js.com/uni/components/advanced/captcha.html
 * @property {String} value 绑定值
 * @property {Boolean} focus 是否聚焦
 * @property {String, Number} height 验证码高度，默认120rpx
 * @property {Number} length 验证码位数，默认4
 * @property {Number} gutter 间隔，默认20
 * @event {Function} done 输入完成时触发
 * @example <cl-captcha v-model="val"></cl-captcha>
 */

export default {
	name: "cl-captcha",

	props: {
		// 绑定值
		value: String,
		// 是否聚焦
		focus: Boolean,
		// 验证码高度
		height: {
			type: [String, Number],
			default: "120rpx",
		},
		// 验证码位数
		length: {
			type: Number,
			default: 4,
		},
		// 间隔
		gutter: {
			type: Number,
			default: 20,
		},
	},

	data() {
		return {
			value2: null,
			focus2: false,
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.value2 = val || "";
			},
		},
	},

	computed: {
		list() {
			// 头条小程序下，无法 v-for 数字
			return new Array(this.length).fill(1);
		},
	},

	methods: {
		parseRpx,

		onFocus() {
			this.focus2 = true;
		},

		onBlur() {
			this.focus2 = false;
		},

		onInput(e) {
			const val = e.detail.value;

			this.$emit("input", val);

			if (val.length === this.length) {
				this.$emit("done", val);
			}
		},
	},
};
</script>
