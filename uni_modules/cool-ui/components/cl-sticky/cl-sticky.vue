<template>
	<view class="cl-sticky" :class="[{ 'is-flex': isFlex }]" :style="{ zIndex, top: stickyTop }">
		<slot></slot>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useCool } from "/@/cool";

const { statusBarHeight } = uni.getSystemInfoSync();

export default defineComponent({
	name: "cl-sticky",

	props: {
		zIndex: {
			type: Number,
			default: 100,
		},
		top: {
			type: Number,
			default: 0,
		},
		statusBar: {
			type: Boolean,
			default: true,
		},
		isFlex: Boolean,
	},

	setup(props) {
		const { router } = useCool();

		// 吸顶高度
		const stickyTop = computed(() => {
			// 状态栏高度
			const t1 = `${props.statusBar ? statusBarHeight : 0}px`;

			// 标题栏高度
			// #ifdef H5
			// @ts-ignore
			const t2 = "44px";
			// #endif
			// #ifndef H5
			// @ts-ignore
			const t2 = "0px";
			// #endif

			// 自定义高度
			const top = uni.upx2px(props.top) + "px";

			// 计算后距离顶部高度
			const arr = [top, ...(router.info()?.isCustomNavbar ? [t1] : [t2])];

			return `calc(${arr.join(" + ")})`;
		});

		return {
			stickyTop,
		};
	},
});
</script>
