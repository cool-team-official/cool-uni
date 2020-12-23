<template>
	<view class="cl-rate">
		<view class="cl-rate__icon" v-for="(item, index) in list" :key="index" @tap="onTap(index)">
			<cl-icon :name="icon" :size="size" :color="voidColor"></cl-icon>

			<view
				class="cl-rate__icon-active"
				:style="{
					width: item.width,
				}"
			>
				<cl-icon :name="icon" :size="size" :color="item.color"></cl-icon>
			</view>
		</view>

		<view class="cl-rate__text" v-if="showText">
			{{ value2 }}
		</view>
	</view>
</template>

<script>
import { isNumber, getCurrentColor } from "../../utils";

/**
 * rate 评分
 * @description 评分，可自定义图标
 * @tutorial https://docs.cool-js.com/uni/components/form/rate.html
 * @property {Number, String} value 绑定值
 * @property {String} icon 评分图标，默认cl-icon-favor-fill
 * @property {String, Array} color 选中颜色，Array下为多色。默认主色
 * @property {String} voidColor 未选中颜色，默认#C6D1DE
 * @property {Number} size 图标大小，默认40
 * @property {Number, String} max 最大值，默认5
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} showText 是否显示分数
 * @event {Function} change 绑定值改变时触发
 * @example <cl-rate />
 */

export default {
	name: "cl-rate",

	props: {
		// 绑定值
		value: {
			type: [Number, String],
			default: 0,
		},
		// 评分图标
		icon: {
			type: String,
			default: "favor-fill",
		},
		// 选中颜色
		color: {
			type: [String, Array],
			default: "",
		},
		// 未选中颜色
		voidColor: {
			type: String,
			default: "#C6D1DE",
		},
		// 图标大小
		size: {
			type: [Number, String],
			default: 40,
		},
		// 最大值
		max: {
			type: [Number, String],
			default: 5,
		},
		// 是否禁用
		disabled: Boolean,
		// 是否显示分数
		showText: Boolean,
	},
	data() {
		return {
			value2: 0,
		};
	},
	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.value2 = val;
			},
		},
	},
	computed: {
		list() {
			return new Array(this.max).fill(1).map((e, i) => {
				let int = parseInt(this.value2);
				let dec = this.value2 - int;

				// 处理宽度和颜色
				return {
					width: (this.value2 > i ? (int > i ? 100 : dec * 100) : 0) + "%",
					color: getCurrentColor({
						value: this.value2,
						color: this.color,
						max: this.max,
					}),
				};
			});
		},
	},
	methods: {
		onTap(index) {
			if (this.disabled) {
				return false;
			}

			this.value2 = index + 1;

			this.$emit("input", this.value2);
			this.$emit("change", this.value2);
		},
	},
};
</script>
