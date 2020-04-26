<template>
	<view class="demo-tag">
		<cl-card label="标签形状">
			<cl-tag type="primary">默认</cl-tag>
			<cl-tag type="primary" round>圆角</cl-tag>
		</cl-card>

		<cl-card label="标签尺寸">
			<cl-tag type="primary" size="small">默认尺寸</cl-tag>
			<cl-tag type="primary" size="mini">小尺寸</cl-tag>
		</cl-card>

		<cl-card label="标签颜色">
			<cl-tag type="primary">标签1</cl-tag>
			<cl-tag type="success">标签2</cl-tag>
			<cl-tag type="error">标签3</cl-tag>
			<cl-tag type="warning">标签4</cl-tag>
			<cl-tag type="info">标签5</cl-tag>
		</cl-card>

		<cl-card label="镂空标签">
			<cl-tag type="primary" plain>标签1</cl-tag>
			<cl-tag type="success" plain>标签2</cl-tag>
			<cl-tag type="error" plain>标签3</cl-tag>
			<cl-tag type="warning" plain>标签4</cl-tag>
			<cl-tag type="info" plain>标签5</cl-tag>
		</cl-card>

		<cl-card label="其他标签">
			<cl-tag type="primary" closable>标签1</cl-tag>
		</cl-card>
	</view>
</template>

<script>
export default {};
</script>

<style lang="scss">
.demo-tag {
	.cl-tag {
		margin-right: 20rpx;
	}
}
</style>