<template>
	<view class="cl-loadmore__wrap">
		<cl-divider
			:background-color="backgroundColor"
			:color="color"
			:width="divider ? '400rpx' : '0rpx'"
		>
			<view class="cl-loadmore">
				<cl-loading
					:color="iconColor"
					:theme="loadingTheme"
					:size="40"
					v-if="!finish && loading"
				/>
				<text
					class="cl-loadmore__text"
					:style="{
						color,
					}"
					v-if="message"
					>{{ message }}</text
				>
			</view>
		</cl-divider>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "cl-loadmore",

	props: {
		// 是否加载中
		loading: Boolean,
		// 是否加载完成
		finish: Boolean,
		// 是否显示分割符
		divider: {
			type: Boolean,
			default: true,
		},
		// 字体颜色
		color: String,
		// 图标颜色
		iconColor: String,
		// 背景颜色
		backgroundColor: String,
		// 普通状态下显示内容
		text: {
			type: String,
			default: "上拉加载更多",
		},
		// 加载完成显示内容
		finishText: {
			type: String,
			default: "没有更多了",
		},
		// 加载中显示内容
		loadingText: {
			type: String,
			default: "加载中",
		},
		// 加载图标主题
		loadingTheme: String,
	},

	setup(props) {
		const message = computed(() => {
			return props.finish ? props.finishText : props.loading ? props.loadingText : props.text;
		});

		return {
			message,
		};
	},
});
</script>
