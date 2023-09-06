<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-checkbox-group v-model="v0">
				<cl-checkbox label="1">炸鸡</cl-checkbox>
				<cl-checkbox label="2">汉堡</cl-checkbox>
				<cl-checkbox label="3">薯条</cl-checkbox>
			</cl-checkbox-group>
		</cl-card>

		<cl-card label="圆角">
			<cl-checkbox-group v-model="v1" round>
				<cl-checkbox label="1">炸鸡</cl-checkbox>
				<cl-checkbox label="2">汉堡</cl-checkbox>
			</cl-checkbox-group>
		</cl-card>

		<cl-card label="禁用">
			<cl-checkbox-group v-model="v2">
				<cl-checkbox label="1">炸鸡</cl-checkbox>
				<cl-checkbox disabled label="2">汉堡</cl-checkbox>
			</cl-checkbox-group>
		</cl-card>

		<cl-card label="开关">
			<cl-checkbox v-model="v3">已阅读并同意《用户协议》及《隐私政策》</cl-checkbox>
		</cl-card>

		<cl-card label="边框">
			<cl-checkbox-group v-model="v4">
				<cl-checkbox border label="1">炸鸡</cl-checkbox>
				<cl-checkbox border label="2">汉堡</cl-checkbox>
			</cl-checkbox-group>
		</cl-card>

		<cl-card label="边框填充">
			<cl-checkbox-group v-model="v5" fill border>
				<cl-checkbox label="1">鸡米花</cl-checkbox>
				<cl-checkbox label="2">可乐</cl-checkbox>
				<cl-checkbox label="3">蛋挞</cl-checkbox>
			</cl-checkbox-group>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const v0 = ref(["1"]);
const v1 = ref(["2"]);
const v2 = ref([]);
const v3 = ref(true);
const v4 = ref(["1"]);
const v5 = ref(["1", "2"]);
</script>
