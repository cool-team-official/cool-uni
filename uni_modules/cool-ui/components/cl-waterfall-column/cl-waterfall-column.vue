<template>
	<view
		class="cl-waterfall-column"
		:style="{
			margin,
			width,
		}"
	>
		<slot></slot>
	</view>
</template>

<script lang="ts">
import { getCurrentInstance, computed, defineComponent, nextTick } from "vue";
import { getParent } from "/@/cool/utils";

export default defineComponent({
	name: "cl-waterfall-column",

	setup() {
		const { proxy }: any = getCurrentInstance();

		// cl-waterfall
		const parent = getParent("cl-waterfall", ["column", "gutter"], ["getRect"]);

		// 宽度
		const width = computed(
			() => `calc(${100 / parent.value.column}% - ${parent.value.gutter}rpx)`,
		);

		// 间距
		const margin = computed(() => `0 ${parent.value.gutter / 2}rpx`);

		function getRect() {
			return new Promise((resolve) => {
				nextTick(() => {
					uni.createSelectorQuery()
						.in(proxy)
						.select(`.cl-waterfall-column`)
						.boundingClientRect(resolve)
						.exec();
				});
			});
		}

		return {
			width,
			margin,
			getRect,
		};
	},
});
</script>
