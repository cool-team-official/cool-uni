<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-button @tap="setTips('inner')" v-if="tips == 'toast'"
				>切换为行内提示，输入时自动触发</cl-button
			>
			<cl-button @tap="setTips('toast')" v-else>切换为Toast提示，提交时弹出</cl-button>

			<cl-form ref="Form" v-model="form" :rules="rules" :tips="tips" :disabled="loading">
				<cl-form-item label="活动名称" prop="name">
					<cl-input v-model="form.name"></cl-input>
				</cl-form-item>

				<cl-form-item label="活动区域" prop="area">
					<cl-select v-model="form.area" :options="options.area"></cl-select>
				</cl-form-item>

				<cl-form-item label="活动时间" prop="date">
					<cl-select v-model="form.date" mode="date"></cl-select>
				</cl-form-item>

				<cl-form-item label="活动类型" prop="type">
					<cl-checkbox-group v-model="form.type">
						<cl-checkbox
							v-for="(item, index) in options.type"
							:key="index"
							:label="item.value"
						>
							{{ item.label }}
						</cl-checkbox>
					</cl-checkbox-group>
				</cl-form-item>

				<cl-form-item label="资源" prop="source">
					<cl-radio-group v-model="form.source">
						<cl-radio
							v-for="(item, index) in options.source"
							:key="index"
							:label="item.value"
						>
							{{ item.label }}
						</cl-radio>
					</cl-radio-group>
				</cl-form-item>
			</cl-form>

			<cl-row type="flex" justify="end">
				<cl-button @tap="reset">重置</cl-button>
				<cl-button @tap="clear">清空</cl-button>
				<cl-button @tap="submit" type="success" :loading="loading">提交</cl-button>
			</cl-row>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const Form = ref<ClForm.Ref>();

const form = ref({
	name: "",
	area: 2,
	date: "",
	type: [0, 1],
	source: 0,
});

const rules = reactive({
	name: {
		required: true,
		message: "活动名称不能为空",
	},
	area: {
		required: true,
		message: "活动区域不能为空",
	},
});

const options = reactive({
	area: [
		{
			label: "A区",
			value: 0,
		},
		{
			label: "B区",
			value: 1,
		},
		{
			label: "C区",
			value: 2,
		},
	],
	type: [
		{
			label: "线上活动",
			value: 0,
		},
		{
			label: "推广活动",
			value: 1,
		},
		{
			label: "线下活动",
			value: 2,
		},
	],
	source: [
		{
			label: "赞助",
			value: 0,
		},
		{
			label: "场地",
			value: 1,
		},
	],
});

const tips = ref("toast");

const loading = ref(false);

function setTips(name: string) {
	tips.value = name;
}

function submit() {
	Form.value?.validate((valid, errors) => {
		if (valid) {
			console.log(form.value);
			loading.value = true;

			setTimeout(() => {
				loading.value = false;
			}, 1500);
		}
	});
}

function reset() {
	Form.value?.reset();
}

function clear() {
	Form.value?.clear();
}
</script>

<style lang="scss" scoped></style>
