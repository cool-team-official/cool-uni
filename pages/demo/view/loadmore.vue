<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-loadmore loading background-color="#ffffff"></cl-loadmore>
		</cl-card>

		<cl-card label="不显示分隔符">
			<cl-loadmore loading :divider="false" background-color="#ffffff"></cl-loadmore>
		</cl-card>
	</cl-page>
</template>
