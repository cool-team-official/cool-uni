<template>
	<view class="demo-message">
		<cl-message ref="cl-message"></cl-message>

		<cl-card label="不同类型">
			<cl-button  @tap="open('success')">
				成功
			</cl-button>
			<cl-button  @tap="open('cancel')">
				失败
			</cl-button>
			<cl-button  @tap="open('warn')">
				警告
			</cl-button>
			<cl-button  @tap="open('info')">
				消息
			</cl-button>
		</cl-card>
	</view>
</template>

<script>
export default {
	methods: {
		open(type) {
			this.$message({ type, message: '这是一条消息' });
		}
	}
};
</script>