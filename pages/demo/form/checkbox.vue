<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-checkbox v-model="v1" label="1">备选项</cl-checkbox>
			<cl-checkbox v-model="v2" label="2">备选项</cl-checkbox>
		</cl-card>

		<cl-card label="圆角">
			<cl-checkbox round v-model="v3">男</cl-checkbox>
			<cl-checkbox round v-model="v4">女</cl-checkbox>
		</cl-card>

		<cl-card label="禁用">
			<cl-checkbox v-model="v3" disabled>男</cl-checkbox>
			<cl-checkbox v-model="v4">女</cl-checkbox>
		</cl-card>

		<cl-card label="边框">
			<cl-checkbox v-model="v3" border>男</cl-checkbox>
			<cl-checkbox v-model="v4" border>女</cl-checkbox>
		</cl-card>

		<cl-card label="多选框组">
			<cl-checkbox-group v-model="arr">
				<cl-checkbox label="1">备选项</cl-checkbox>
				<cl-checkbox label="2">备选项</cl-checkbox>
			</cl-checkbox-group>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const v1 = ref<string>("1");
const v2 = ref<string>("");
const v3 = ref<boolean>(true);
const v4 = ref<boolean>(false);
const arr = ref<string[]>(["2"]);
</script>
