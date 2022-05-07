<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-input-number />
		</cl-card>

		<cl-card label="步数">
			<cl-input-number :step="5" />
		</cl-card>

		<cl-card label="禁用（4-10）">
			<cl-input-number :max="10" :min="4" />
		</cl-card>

		<cl-card label="可输入">
			<cl-input-number input />
		</cl-card>
	</cl-page>
</template>

<script lang="ts"></script>
