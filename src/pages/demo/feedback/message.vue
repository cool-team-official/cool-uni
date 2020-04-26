<template>
	<view class="demo-message">
		<cl-message ref="message"></cl-message>

		<cl-card label="不同类型">
			<cl-button @tap="open('success')">
				<text>成功</text>
			</cl-button>
			<cl-button @tap="open('cancel')">
				<text>失败</text>
			</cl-button>
			<cl-button @tap="open('warn')">
				<text>警告</text>
			</cl-button>
			<cl-button @tap="open('info')">
				<text>消息</text>
			</cl-button>
		</cl-card>

		<cl-card label="自定义高度">
			<cl-button @tap="open('success', { top: '150rpx' })">
				<text>150rpx高度</text>
			</cl-button>
			<cl-button @tap="open('cancel', { top: '200rpx' })">
				<text>200rpx高度</text>
			</cl-button>
			<cl-button @tap="open('warn', { top: '250rpx' })">
				<text>250rpx高度</text>
			</cl-button>
		</cl-card>
	</view>
</template>

<script>
export default {
	methods: {
		open(type, options) {
			this.$refs["message"].open({
				type,
				message: "这是一条消息",
				...options,
			});
		},
	},
};
</script>
