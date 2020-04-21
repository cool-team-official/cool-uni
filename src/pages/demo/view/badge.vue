<template>
	<view class="demo-badge">
		<cl-card label="默认">
			<cl-row>
				<cl-col span="6">
					<cl-badge type="error" value="16">
						<cl-button>评论</cl-button>
					</cl-badge>
				</cl-col>
				<cl-col span="6">
					<cl-badge type="error" value="NEW">
						<cl-button>自定义内容</cl-button>
					</cl-badge>
				</cl-col>
				<cl-col span="6">
					<cl-badge type="warning" :value="132" :max="99">
						<cl-button>最大</cl-button>
					</cl-badge>
				</cl-col>
				<cl-col span="6">
					<cl-badge type="error" is-dot>
						<cl-button>其他形态</cl-button>
					</cl-badge>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="不同状态">
			<cl-row>
				<cl-col span="6">
					<cl-badge type="primary" is-dot>
						<cl-button type="text" size="mini">消息</cl-button>
					</cl-badge>
				</cl-col>
				<cl-col span="6">
					<cl-badge type="success" is-dot>
						<cl-button type="text" size="mini">消息</cl-button>
					</cl-badge>
				</cl-col>
				<cl-col span="6">
					<cl-badge type="error" is-dot>
						<cl-button type="text" size="mini">消息</cl-button>
					</cl-badge>
				</cl-col>
				<cl-col span="6">
					<cl-badge type="info" is-dot>
						<cl-button type="text" size="mini">消息</cl-button>
					</cl-badge>
				</cl-col>
			</cl-row>
		</cl-card>
	</view>
</template>

<script>
export default {};
</script>

<style lang="scss">
.demo-badge {
	.cl-col {
		padding-top: 20rpx;
		text-align: center;

		.text {
			font-size: 26rpx;
		}
	}
}
</style>
