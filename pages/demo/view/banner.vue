<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-banner :list="urls"></cl-banner>
		</cl-card>

		<cl-card label="卡片">
			<cl-banner :list="urls" type="card"></cl-banner>
		</cl-card>

		<cl-card label="衔接">
			<cl-banner :list="urls" type="chain"></cl-banner>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const urls = ref<any[]>([
	{
		url: "../static/bg.png",
	},
	{
		url: "../static/bg2.png",
	},
	{
		url: "../static/bg3.png",
	},
]);
</script>
