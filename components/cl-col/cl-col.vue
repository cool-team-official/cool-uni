<template>
	<view
		:class="['cl-col', classList]"
		:style="{
			'padding-left': padding,
			'padding-right': padding,
		}"
		@tap="onTap"
	>
		<slot></slot>
	</view>
</template>

<script>
import Parent from "../../mixins/parent";

/**
 * col 列
 * @description 布局组件
 * @tutorial https://docs.cool-js.com/uni/components/layout/flex.html
 * @property {Object} span 栅格占据的列数
 * @property {Object} offset 栅格左侧的间隔格数
 * @property {Boolean} pull 栅格向右移动格数
 * @property {Boolean} push 栅格向左移动格数
 * @example <cl-col :span="12"></cl-col>
 */

export default {
	name: "cl-col",
	props: {
		// 栅格占据的列数
		span: {
			type: [Number, String],
			default: 24,
		},
		// 栅格左侧的间隔格数
		offset: [Number, String],
		// 栅格向右移动格数
		pull: [Number, String],
		// 栅格向左移动格数
		push: [Number, String],
	},
	mixins: [Parent],
	data() {
		return {
			Keys: ["gutter"],
			ComponentName: "ClRow",
		};
	},
	computed: {
		gutter() {
			return this.parent.gutter;
		},

		padding() {
			return this.gutter / 2 + "rpx";
		},

		classList() {
			let list = [];

			["span", "offset", "pull", "push"].forEach((prop) => {
				let value = this[prop];

				if (value || value === 0) {
					list.push(prop !== "span" ? `cl-col-${prop}-${value}` : `cl-col-${value}`);
				}
			});

			return list.join(" ");
		},
	},
	methods: {
		onTap(e) {
			this.$emit("click", e);
			this.$emit("tap", e);
		},
	},
};
</script>
