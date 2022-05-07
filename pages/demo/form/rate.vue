<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-rate :model-value="2.7"></cl-rate>
		</cl-card>

		<cl-card label="禁用">
			<cl-rate :model-value="2.7" disabled></cl-rate>
		</cl-card>

		<cl-card label="多色">
			<cl-rate :model-value="2" :color="['#F56C6C', '#E6A23C', '#67C23A']"></cl-rate>
		</cl-card>

		<cl-card label="其他图标">
			<cl-rate :model-value="1" icon="cl-icon-like"></cl-rate>
		</cl-card>
	</cl-page>
</template>
