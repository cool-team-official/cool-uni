<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-tag>默认</cl-tag>
		</cl-card>

		<cl-card label="圆角">
			<cl-tag round>默认</cl-tag>
		</cl-card>

		<cl-card label="尺寸">
			<cl-tag size="small">默认尺寸</cl-tag>
			<cl-tag size="mini">小尺寸</cl-tag>
		</cl-card>

		<cl-card label="标签颜色">
			<cl-tag type="primary">主要</cl-tag>
			<cl-tag type="success">成功</cl-tag>
			<cl-tag type="error">失败</cl-tag>
			<cl-tag type="warning">警告</cl-tag>
			<cl-tag type="info">信息</cl-tag>
		</cl-card>

		<cl-card label="其他">
			<cl-tag plain>镂空</cl-tag>
			<cl-tag closable>可移除标签</cl-tag>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup></script>
