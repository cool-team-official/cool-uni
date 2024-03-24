<template>
	<view
		class="cl-skeleton"
		:class="{
			'is-loading': loading,
		}"
		:style="[baseStyle, loading && customStyle]"
	>
		<slot></slot>
	</view>
</template>

<script lang="ts">
import { type PropType, type StyleValue, defineComponent } from "vue";
import { useStyle } from "../../hooks";

export default defineComponent({
	name: "cl-skeleton",

	props: {
		loading: {
			type: Boolean,
			default: true,
		},
		customStyle: {
			type: Object as PropType<StyleValue>,
			default: 0,
		},
	},

	setup() {
		return {
			...useStyle(),
		};
	},
});
</script>
