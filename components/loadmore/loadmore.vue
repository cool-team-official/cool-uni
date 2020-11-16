<template>
	<view class="cl-loadmore__wrap">
		<cl-divider
			:background-color="backgroundColor"
			:color="color"
			:width="divider ? '400rpx' : '0rpx'"
		>
			<view class="cl-loadmore">
				<cl-loading :color="iconColor" :size="20" v-if="!finish && loading"></cl-loading>
				<text
					class="cl-loadmore__text"
					:style="{
						color
					}"
					>{{ finish ? finishText : loading ? loadingText : text }}</text
				>
			</view>
		</cl-divider>
	</view>
</template>

<script>
export default {
	props: {
		loading: Boolean,
		finish: Boolean,
		divider: {
			type: Boolean,
			default: true
		},
		color: {
			type: String,
			default: "#666"
		},
		iconColor: String,
		backgroundColor: {
			type: String,
			default: "#f7f7f7"
		},
		text: {
			type: String,
			default: "下拉加载更多"
		},
		loadingText: {
			type: String,
			default: "加载中"
		},
		finishText: {
			type: String,
			default: "没有更多了"
		}
	}
};
</script>
