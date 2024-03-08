<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-divider background-color="#ffffff">默认</cl-divider>
			<cl-divider color="#409EFF" background-color="#ffffff">不同颜色</cl-divider>
		</cl-card>

		<cl-card label="渐变颜色">
			<cl-divider :color="['#fff', '#F56C6C']" background-color="#ffffff"
				>渐变颜色</cl-divider
			>
		</cl-card>

		<cl-card label="线条宽度">
			<cl-divider width="50%" background-color="#ffffff">线条宽度</cl-divider>
		</cl-card>

		<cl-card label="自定义">
			<cl-divider background-color="#ffffff">
				<text class="cl-icon-favor"></text>
				<text>猜你喜欢</text>
			</cl-divider>
		</cl-card>
	</cl-page>
</template>
