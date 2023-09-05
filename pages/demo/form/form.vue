<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-form ref="Form" v-model="form" :rules="rules" :disabled="loading">
				<cl-form-item label="活动名称" prop="name">
					<cl-input v-model="form.name"></cl-input>
				</cl-form-item>

				<cl-form-item label="活动时间" prop="date">
					<cl-select v-model="form.date" mode="date"></cl-select>
				</cl-form-item>

				<cl-form-item label="活动区域" prop="area">
					<cl-select v-model="form.area" :options="options.area"></cl-select>
				</cl-form-item>

				<cl-form-item label="活动人数" prop="num" justify="end">
					<cl-input-number v-model="form.num" :min="1" :max="100"></cl-input-number>
				</cl-form-item>

				<cl-form-item label="活动类型" prop="type" label-position="top">
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

				<cl-form-item label="资源" prop="source" label-position="top">
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

				<cl-form-item label="活动封面" prop="cover" label-position="top">
					<cl-upload />
				</cl-form-item>

				<cl-form-item label="备注" prop="remark" label-position="top">
					<cl-textarea v-model="form.remark" />
				</cl-form-item>
			</cl-form>
		</cl-card>

		<cl-footer border>
			<cl-button size="large" round fill @tap="clear">清空</cl-button>
			<cl-button size="large" round fill @tap="submit" type="success" :loading="loading"
				>提交</cl-button
			>
		</cl-footer>
	</cl-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useUi } from "/@/ui";

const ui = useUi();

const form = ref({
	name: "",
	area: 2,
	date: "",
	type: [0, 1],
	source: 0,
	num: 5,
	remark: "",
	cover: "",
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
	date: {
		required: true,
		message: "活动时间不能为空",
	},
	cover: {
		required: true,
		message: "活动封面不能为空",
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

const Form = ref<ClForm.Ref>();

const loading = ref(false);

function submit() {
	Form.value?.validate((valid, errors) => {
		if (valid) {
			loading.value = true;

			setTimeout(() => {
				ui.showToast("提交成功");
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
