<template>
	<view
		class="cl-card"
		:style="{
			backgroundColor,
		}"
	>
		<view class="cl-card__header" v-if="label">
			<cl-text :size="28" bold :value="label"></cl-text>

			<view class="cl-card__loading" v-if="loading">
				<cl-loading :size="36" :loading="loading"></cl-loading>
			</view>

			<template v-else>
				<view class="cl-card__more" v-if="more" @tap="toMore">
					<slot name="more">
						<text class="text">{{ moreText }}</text>
						<text class="cl-icon-arrow-right"></text>
					</slot>
				</view>
			</template>
		</view>

		<view class="cl-card__container">
			<slot></slot>
		</view>

		<view class="cl-card__footer" v-if="$slots.footer">
			<slot name="footer"></slot>
		</view>
	</view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "cl-card",

	props: {
		// 标签内容
		label: String,
		// 是否加载中
		loading: Boolean,
		// 是否显示查看更多
		more: Boolean,
		// 更多的文本内容
		moreText: String,
		// 背景色
		backgroundColor: {
			type: String,
			default: "#ffffff",
		},
	},

	setup(_, { emit }) {
		function toMore() {
			emit("more");
		}

		return {
			toMore,
		};
	},
});
</script>
