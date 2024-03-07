<template>
	<view
		class="cl-grid"
		:class="[
			`cl-grid__column-${column}`,
			{
				'is-border': border,
			},
		]"
	>
		<slot></slot>
	</view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "cl-grid",

	props: {
		// 列的数量
		column: {
			type: Number,
			default: 3,
		},
		// 是否带边框
		border: Boolean,
	},
});
</script>
