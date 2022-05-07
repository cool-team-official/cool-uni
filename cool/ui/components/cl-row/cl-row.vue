<template>
	<view
		class="cl-row"
		:class="[classList]"
		:style="{
			height: parseRpx(height),
			width: parseRpx(width),
			padding: parseRpx(padding),
			margin: margin2,
			borderRadius: parseRpx(borderRadius),
			border,
			backgroundColor,
		}"
		@tap="onTap"
	>
		<slot></slot>
	</view>
</template>

<script lang="ts">
/**
 * @description 行
 * @property {Object} type 类型
 * @property {Object} wrap 是否换行
 * @example <cl-col :span="12"></cl-col>
 */

import { computed, defineComponent } from "vue";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-row",

	emits: ["click", "tap"],

	props: {
		type: String,
		wrap: Boolean,
		backgroundColor: String,
		border: String,
		gutter: {
			type: Number,
			default: 0,
		},
		justify: {
			type: String,
			default: "start",
		},
		align: {
			type: String,
			default: "top",
		},
		height: [String, Number],
		width: [String, Number],
		padding: [String, Number, Array],
		margin: [String, Number, Array],
		borderRadius: [String, Number],
	},

	setup(props, { emit }) {
		const classList = computed(() => {
			let list = [];

			if (props.type) {
				list.push(`cl-row--${props.type}`);
			}

			if (props.justify) {
				list.push(`is-justify-${props.justify}`);
			}

			if (props.align) {
				list.push(`is-align-${props.align}`);
			}

			if (props.wrap) {
				list.push("is-wrap");
			}

			return list.join(" ");
		});

		const margin2 = computed(() => {
			return props.margin ? parseRpx(props.margin) : `0 -${props.gutter / 2}rpx`;
		});

		function onTap(e: any) {
			emit("click", e);
			emit("tap", e);
		}

		return {
			classList,
			margin2,
			parseRpx,
			onTap,
		};
	},
});
</script>
