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
				<cl-checkbox label="1">
					<cl-text align="right" block>鸡米花（靠右）</cl-text>
				</cl-checkbox>
				<cl-checkbox label="2">可乐</cl-checkbox>
				<cl-checkbox label="3">蛋挞</cl-checkbox>
			</cl-checkbox-group>
		</cl-card>

		<cl-card label="只显示文字">
			<cl-checkbox-group v-model="v6" text border>
				<cl-checkbox label="1">炸鸡</cl-checkbox>
				<cl-checkbox label="2">汉堡</cl-checkbox>
			</cl-checkbox-group>
		</cl-card>

		<cl-card label="边框圆角">
			<cl-checkbox-group v-model="v7" round border>
				<cl-checkbox label="1">炸鸡</cl-checkbox>
				<cl-checkbox label="2">汉堡</cl-checkbox>
			</cl-checkbox-group>
		</cl-card>

		<cl-card label="文字贼多">
			<cl-checkbox-group v-model="v8">
				<cl-checkbox label="1">
					汉堡、可乐、鸡肉卷、鸡排、鸡腿、蛋挞、薯条、鸡翅、原味鸡
				</cl-checkbox>

				<cl-checkbox label="2"> 鸡块、鸡米发、鸡腿堡 </cl-checkbox>
			</cl-checkbox-group>
		</cl-card>

		<cl-card label="自定义图标">
			<cl-checkbox-group v-model="v9">
				<cl-checkbox
					v-for="(item, index) in ['汉堡', '可乐', '薯条']"
					:key="index"
					:label="index"
				>
					<template #icon="{ checked }">
						<cl-icon
							name="like-fill"
							:size="36"
							:color="checked ? 'primary' : 'info'"
						/>
					</template>
					{{ item }}
				</cl-checkbox>
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
const v6 = ref(["1", "2"]);
const v7 = ref(["1", "2"]);
const v8 = ref(["1", "2"]);
const v9 = ref([]);
</script>
