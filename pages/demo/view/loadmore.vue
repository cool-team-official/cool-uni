<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-loadmore background-color="#fff" loading></cl-loadmore>
		</cl-card>

		<cl-card label="不显示分隔符">
			<cl-loadmore background-color="#fff" loading :divider="false"></cl-loadmore>
		</cl-card>
	</cl-page>
</template>
