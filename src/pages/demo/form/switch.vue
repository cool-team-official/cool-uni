<template>
	<view class="demo-switch">
		<cl-card label="基本用法">
			<cl-switch type="success" v-model="form.a"></cl-switch>
			<text class="label">{{ form.a ? '开启' : '关闭' }}</text>
		</cl-card>

		<cl-card label="禁用状态">
			<cl-switch type="success" v-model="form.b" disabled></cl-switch>
			<cl-switch type="success" v-model="form.c" disabled></cl-switch>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				a: false,
				b: false,
				c: true
			}
		};
	}
};
</script>

<style lang="scss">
.demo-switch {
	.label {
		font-size: 26rpx;
	}

	.cl-switch {
		margin-right: 20rpx;
	}
}
</style>