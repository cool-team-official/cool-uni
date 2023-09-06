<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-radio v-model="v1" label="1">炸鸡</cl-radio>
			<cl-radio v-model="v1" label="2">汉堡</cl-radio>
			<cl-radio v-model="v1" label="3">薯条</cl-radio>
		</cl-card>

		<cl-card label="禁用">
			<cl-radio v-model="v3" disabled label="1">炸鸡</cl-radio>
			<cl-radio v-model="v3" disabled label="2">汉堡</cl-radio>
		</cl-card>

		<cl-card label="边框">
			<cl-radio v-model="v4" border label="1">炸鸡</cl-radio>
			<cl-radio v-model="v4" border label="2">汉堡</cl-radio>
		</cl-card>

		<cl-card label="边框填充">
			<cl-radio-group v-model="v5" fill border>
				<cl-radio label="1">鸡米花</cl-radio>
				<cl-radio label="2">可乐</cl-radio>
				<cl-radio label="3">蛋挞</cl-radio>
			</cl-radio-group>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const v1 = ref("1");
const v2 = ref("2");
const v3 = ref("2");
const v4 = ref("2");
const v5 = ref("2");
</script>
