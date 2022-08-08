<template>
	<view
		class="cl-footer__wrap"
		:style="{
			height: parseRpx(height),
		}"
	>
		<view
			class="cl-footer"
			:style="{
				backgroundColor,
				padding: parseRpx(padding),
				boxSizing: 'border-box',
			}"
		>
			<slot></slot>
		</view>
	</view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-footer",

	props: {
		height: [String, Number],
		backgroundColor: {
			type: String,
			default: "#fff",
		},
		padding: [String, Number],
	},

	setup() {
		return {
			parseRpx,
		};
	},
});
</script>
