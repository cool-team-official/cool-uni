<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-radio v-model="v1" label="1">备选项</cl-radio>
			<cl-radio v-model="v1" label="2">备选项</cl-radio>
		</cl-card>

		<cl-card label="圆角">
			<cl-radio round v-model="v2" label="1">男</cl-radio>
			<cl-radio round v-model="v2" label="2">女</cl-radio>
		</cl-card>

		<cl-card label="禁用">
			<cl-radio v-model="v3" disabled label="1">男</cl-radio>
			<cl-radio v-model="v3" label="2">女</cl-radio>
		</cl-card>

		<cl-card label="边框">
			<cl-radio v-model="v4" border label="1">男</cl-radio>
			<cl-radio v-model="v4" border label="2">女</cl-radio>
		</cl-card>

		<cl-card label="单选框组">
			<cl-radio-group v-model="v5">
				<cl-radio label="1">备选项</cl-radio>
				<cl-radio label="2">备选项</cl-radio>
			</cl-radio-group>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const v1 = ref<string>("1");
const v2 = ref<string>("2");
const v3 = ref<string>("1");
const v4 = ref<string>("2");
const v5 = ref<string>("2");
</script>
