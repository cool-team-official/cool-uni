<template>
	<view
		class="cl-skeleton"
		:class="{
			'is-loading': loading,
		}"
		:style="[baseStyle, loading && loadingStyle]"
	>
		<view class="cl-skeleton__inner" v-show="!loading">
			<slot></slot>
		</view>
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
		loadingStyle: {
			type: Object as PropType<StyleValue>,
			default: () => ({}),
		},
	},

	setup() {
		return {
			...useStyle(),
		};
	},
});
</script>
