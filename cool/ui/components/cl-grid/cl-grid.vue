<template>
	<view class="cl-grid" :class="[classList]">
		<slot></slot>
	</view>
</template>

<script lang="ts">
/**
 * @description 宫格布局，n * n 布局
 * @property {Number} column 列的数量，默认2
 * @property {Boolean} border 是否带边框
 */

import { defineComponent } from "vue";

export default defineComponent({
	name: "cl-grid",

	props: {
		column: {
			type: Number,
			default: 3,
		},
		border: Boolean,
	},

	setup(props) {
		const classList = () => {
			let list = [];

			if (props.border) {
				list.push("cl-grid--border");
			}

			if (props.column) {
				list.push(`cl-grid__column--${props.column}`);
			}

			return list.join(" ");
		};

		return {
			classList,
		};
	},
});
</script>
