<template>
	<view class="cl-sticky" :class="[{ 'is-flex': isFlex }]" :style="{ zIndex, top: stickyTop }">
		<slot></slot>
	</view>
</template>

<script lang="ts">
import { isNumber } from "lodash";
import { computed, defineComponent } from "vue";
import { useCool } from "/@/cool";

const { platform, statusBarHeight } = uni.getSystemInfoSync();

export default defineComponent({
	name: "cl-sticky",

	props: {
		zIndex: {
			type: Number,
			default: 100,
		},
		top: {
			type: [String, Number],
			default: 0,
		},
		isFlex: Boolean,
	},

	setup(props) {
		const { router } = useCool();

		// 吸顶高度
		const stickyTop = computed(() => {
			// 状态栏高度
			const t1 = `${statusBarHeight}px`;

			// 标题栏高度
			// #ifdef H5
			const t2 = "44px";
			// #endif
			// #ifndef H5
			const t2 = "0px";
			// #endif

			// 自定义高度
			const top = isNumber(props.top) ? props.top + "rpx" : props.top;

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
