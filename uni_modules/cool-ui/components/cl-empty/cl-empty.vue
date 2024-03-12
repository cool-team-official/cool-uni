<template>
	<view
		class="cl-empty"
		:class="{
			'is-fixed': fixed,
		}"
		:style="[baseStyle]"
	>
		<image
			class="cl-empty__icon"
			:src="`/static/empty/${icon}.png`"
			:style="{
				height: parseRpx(iconSize),
			}"
			mode="aspectFit"
			v-if="showIcon"
		/>

		<text class="cl-empty__text" v-if="text">{{ text }}</text>

		<view class="cl-empty__container" v-if="$slots.default">
			<slot></slot>
		</view>
	</view>
</template>

<script lang="ts">
import { type PropType, defineComponent } from "vue";
import { useStyle } from "../../hooks";

export default defineComponent({
	name: "cl-empty",

	props: {
		// 图标
		icon: {
			type: String as PropType<"comm">,
			default: "comm",
		},
		// 图标大小
		iconSize: [String, Number],
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
		// 是否显示图标
		showIcon: {
			type: Boolean,
			default: true,
		},
	},

	setup() {
		return {
			...useStyle({
				height: "100%",
			}),
		};
	},
});
</script>
