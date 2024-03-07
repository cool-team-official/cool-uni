<template>
	<view
		class="cl-empty"
		:class="{
			'is-fixed': fixed,
		}"
		:style="{
			height,
		}"
	>
		<image
			class="cl-empty__icon"
			:src="`/static/empty/${icon}.png`"
			mode="aspectFit"
			v-if="showIcon"
		/>
		<text class="cl-empty__text">{{ text }}</text>

		<view class="cl-empty__container" v-if="$slots.default">
			<slot></slot>
		</view>
	</view>
</template>

<script lang="ts">
import { type PropType, defineComponent } from "vue";

export default defineComponent({
	name: "cl-empty",

	props: {
		// 图标
		icon: {
			type: String as PropType<"comm">,
			default: "comm",
		},
		// 暂无数据文案
		text: {
			type: String,
			default: "暂无数据",
		},
		// 是否固定
		fixed: {
			type: Boolean,
			default: true,
		},
		// 高度
		height: {
			type: String,
			default: "100%",
		},
		// 是否显示图标
		showIcon: {
			type: Boolean,
			default: true,
		},
	},
});
</script>
