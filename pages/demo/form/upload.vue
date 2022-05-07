<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-upload></cl-upload>
		</cl-card>

		<cl-card label="自定义大小">
			<cl-upload :size="[200, 300]"></cl-upload>
		</cl-card>

		<cl-card label="多图">
			<cl-upload multiple></cl-upload>
		</cl-card>
	</cl-page>
</template>
