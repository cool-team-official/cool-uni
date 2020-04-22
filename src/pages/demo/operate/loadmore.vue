<template>
	<view class="load-more">
		<cl-card label="提示类型">
			<cl-row>
				<cl-loadmore
					background-color="#fff"
					:loading="loading"
					:finish="finish"
					>没有更多了</cl-loadmore
				>
			</cl-row>

			<cl-button @tap="go('start')">
				<text>开始</text>
			</cl-button>
			<cl-button @tap="go('load')">
				<text>加载</text>
			</cl-button>
			<cl-button @tap="go('finish')">
				<text>结束</text>
			</cl-button>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			finish: false
		};
	},

	methods: {
		go(action) {
			if (action == "start") {
				this.loading = false;
				this.finish = false;
			}

			if (action == "load") {
				this.loading = true;
			}

			if (action == "finish") {
				this.finish = true;
			}
		}
	}
};
</script>