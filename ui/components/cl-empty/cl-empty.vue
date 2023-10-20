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
		icon: {
			type: String as PropType<"comm">,
			default: "comm",
		},
		text: {
			type: String,
			default: "暂无数据",
		},
		fixed: {
			type: Boolean,
			default: true,
		},
		height: {
			type: String,
			default: "100%",
		},
		showIcon: {
			type: Boolean,
			default: true,
		},
	},
});
</script>
