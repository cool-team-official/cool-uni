<template>
	<view
		class="cl-status-bar__wrap"
		:class="[
			{
				'is-sticky': sticky,
			},
		]"
		:style="{
			height,
		}"
	>
		<view
			class="cl-status-bar"
			:style="{
				backgroundColor,
			}"
		></view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useCool } from "/@/cool";

export default defineComponent({
	name: "cl-status-bar",

	props: {
		// 背景颜色
		backgroundColor: String,
		// 是否吸顶
		sticky: {
			type: Boolean,
			default: true,
		},
	},

	setup(props) {
		const { statusBarHeight } = uni.getSystemInfoSync();
		const { router } = useCool();

		// 状态栏高度
		const height = computed(() => {
			return `${statusBarHeight}px`;
		});

		// 背景色
		const backgroundColor = computed(() => {
			return (
				props.backgroundColor ||
				router.info()?.style?.navigationBarBackgroundColor ||
				router.globalStyle?.navigationBarBackgroundColor ||
				"#ffffff"
			);
		});

		return {
			height,
			backgroundColor,
		};
	},
});
</script>
