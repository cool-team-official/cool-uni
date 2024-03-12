<template>
	<cl-page :padding="20">
		<view class="page">
			<cl-card label="基础用法">
				<cl-form
					ref="Form"
					v-model="form"
					:rules="rules"
					:disabled="loading"
					label-position="left"
				>
					<cl-form-item label="活动名称" prop="name">
						<cl-input v-model="form.name" placeholder="请填写活动名称"></cl-input>
					</cl-form-item>

					<cl-form-item label="活动时间" prop="date">
						<cl-select-date v-model="form.date"></cl-select-date>
					</cl-form-item>

					<cl-form-item label="活动类型" prop="type">
						<cl-select v-model="form.type" :options="options.type"></cl-select>
					</cl-form-item>

					<cl-form-item label="活动人数" prop="num" justify="end">
						<cl-input-number v-model="form.num" :min="1" :max="100"></cl-input-number>
					</cl-form-item>

					<cl-form-item label="活动区域" prop="area" label-position="top">
						<cl-checkbox-group v-model="form.area">
							<cl-checkbox
								v-for="(item, index) in options.area"
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
						<cl-upload v-model="form.cover" />
					</cl-form-item>

					<cl-form-item label="活动海报（最多上传6张）" prop="pics" label-position="top">
						<cl-upload v-model="form.pics" multiple :limit="6" />
					</cl-form-item>

					<cl-form-item label="活动描述" prop="remark" label-position="top">
						<cl-textarea v-model="form.remark" count placeholder="请填写活动描述" />
					</cl-form-item>

					<cl-form-item label="活动赞助商" prop="company" label-position="top">
						<cl-input v-model="form.company" placeholder="请填写活动赞助商" />

						<template #append>
							<cl-icon name="help-border" :size="36"></cl-icon>
						</template>
					</cl-form-item>
				</cl-form>
			</cl-card>

			<cl-footer border>
				<cl-button size="large" round fill @tap="clear">清空</cl-button>
				<cl-button size="large" round fill @tap="submit" type="success" :loading="loading"
					>提交</cl-button
				>
			</cl-footer>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useUi } from "/$/cool-ui";
import { onPageScroll } from "@dcloudio/uni-app";

onPageScroll((e) => {});

const ui = useUi();

const form = ref({
	name: "",
	type: undefined,
	date: undefined,
	area: [0, 1],
	source: 0,
	num: 5,
	remark: "",
	cover: "",
	pics: [],
	company: "",
});

const rules = reactive({
	name: {
		required: true,
		message: "活动名称不能为空",
	},
	type: {
		required: true,
		message: "活动类型不能为空",
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
			label: "一区",
			value: 0,
		},
		{
			label: "二区",
			value: 1,
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
