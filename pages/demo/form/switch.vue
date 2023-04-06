<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-switch></cl-switch>
		</cl-card>

		<cl-card label="其他颜色">
			<cl-switch color="red"></cl-switch>
		</cl-card>

		<cl-card label="禁用">
			<cl-switch v-model="v3" disabled></cl-switch>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const v3 = ref(true);
</script>
