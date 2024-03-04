<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-captcha focus></cl-captcha>
		</cl-card>

		<cl-card label="其他数量">
			<cl-captcha :len="6" :gutter="10" :height="100"></cl-captcha>
		</cl-card>

		<cl-card label="自动完成">
			<cl-captcha v-model="val" @done="onDone"></cl-captcha>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUi } from "/$/cool-ui";

const ui = useUi();

const val = ref("");

function onDone() {
	ui.showToast(val.value);
}
</script>
