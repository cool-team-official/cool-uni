<template>
	<view class="cl-loadmore__wrap">
		<cl-divider :background-color="backgroundColor" width="400rpx">
			<view class="cl-loadmore">
				<cl-loading :size="20" v-if="!finish && loading"></cl-loading>
				<text class="cl-loadmore__text">{{
					finish ? finishText : loading ? loadingText : text
				}}</text>
			</view>
		</cl-divider>
	</view>
</template>

<script>
export default {
	props: {
		loading: Boolean,
		finish: Boolean,
		backgroundColor: {
			type: String,
			default: '#f7f7f7'
		},
		text: {
			type: String,
			default: '下拉加载更多'
		},
		loadingText: {
			type: String,
			default: '加载中'
		},
		finishText: {
			type: String,
			default: '没有更多了'
		}
	}
};
</script>
