<template>
	<view class="cl-avatar-group">
		<template v-for="(item, index) in urls" :key="index">
			<cl-avatar v-if="index < max" :size="size" :mode="mode" :shape="shape" :src="item" />
		</template>

		<cl-avatar :size="size" v-if="overLen > 0 && showMore">
			<view class="cl-avatar-group__more"> {{ overLen }} </view>
		</cl-avatar>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { type PropType } from "vue";

export default defineComponent({
	name: "cl-avatar-group",

	props: {
		// 多个地址
		urls: {
			type: Array as PropType<string[]>,
			default: () => [],
		},
		// 大小
		size: {
			type: Number,
			default: 80,
		},
		// 最大数量
		max: {
			type: Number,
			default: 5,
		},
		// 显示更多
		showMore: {
			type: Boolean,
			default: true,
		},
		// 形状
		shape: {
			type: String as PropType<"circle" | "square">,
			default: "circle",
		},
		// 裁剪模式
		mode: {
			type: String,
			default: "scaleToFill",
		},
	},

	setup(props) {
		const overLen = computed(() => props.urls.length - props.max);

		return {
			overLen,
		};
	},
});
</script>
