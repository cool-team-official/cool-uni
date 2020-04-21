<template>
	<view class="demo-radio">
		<cl-card label="基础用法">
			<cl-radio v-model="form.a" label="1">备选项</cl-radio>
			<cl-radio v-model="form.a" label="2">备选项</cl-radio>
			<cl-radio v-model="form.a" label="3">备选项</cl-radio>
		</cl-card>

		<cl-card label="禁用状态">
			<cl-radio v-model="form.b" label="1" disabled>备选项</cl-radio>
			<cl-radio v-model="form.b" label="2" disabled>备选项</cl-radio>
		</cl-card>

		<cl-card label="单选框组">
			<cl-radio-group v-model="form.c">
				<cl-radio label="1">备选项</cl-radio>
				<cl-radio label="2">备选项</cl-radio>
			</cl-radio-group>
		</cl-card>

		<cl-card label="带边框">
			<cl-radio-group v-model="form.d" border>
				<cl-radio label="1">备选项</cl-radio>
				<cl-radio label="2">备选项</cl-radio>
			</cl-radio-group>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				a: '1',
				b: '1',
				c: '1',
				d: '1'
			}
		};
	}
};
</script>