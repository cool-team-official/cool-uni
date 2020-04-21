<template>
	<view class="demo-checkbox">
		<cl-card label="基础用法">
			<cl-checkbox v-model="form.a">复选项</cl-checkbox>
		</cl-card>

		<cl-card label="禁用状态">
			<cl-checkbox v-model="form.b" disabled>复选项</cl-checkbox>
			<cl-checkbox v-model="form.b1" disabled>复选项</cl-checkbox>
		</cl-card>

		<cl-card label="多选框组">
			<cl-checkbox-group v-model="form.c">
				<cl-checkbox label="1">复选项 A</cl-checkbox>
				<cl-checkbox label="2">复选项 B</cl-checkbox>
				<cl-checkbox label="3">复选项 C</cl-checkbox>
			</cl-checkbox-group>
		</cl-card>

		<cl-card label="带边框">
			<cl-checkbox-group v-model="form.d" border>
				<cl-checkbox label="1">复选项 A</cl-checkbox>
				<cl-checkbox label="2">复选项 B</cl-checkbox>
			</cl-checkbox-group>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				a: false,
				b: false,
				b1: true,
				c: ['1'],
				d: ['1']
			}
		};
	}
};
</script>