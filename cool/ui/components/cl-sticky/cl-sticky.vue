<template>
	<view class="cl-sticky" :class="[{ 'is-flex': isFlex }]" :style="{ zIndex, top: stickyTop }">
		<slot></slot>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

const { platform, statusBarHeight } = uni.getSystemInfoSync();

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
		isFlex: Boolean,
		isTopbar: Boolean,
	},

	setup(props) {
		const stickyTop = computed(() => {
			let t = "0px";

			if (props.isTopbar) {
				t =
					platform === "android"
						? `${statusBarHeight}px`
						: "env(safe-area-inset-top)" + " + 44px";
			} else {
				// #ifdef H5
				t = "44px";
				// #endif

				// #ifndef H5
				t = "0px";
				// #endif
			}

			return `calc(${t} + ${props.top}rpx) `;
		});

		return {
			stickyTop,
		};
	},
});
</script>
