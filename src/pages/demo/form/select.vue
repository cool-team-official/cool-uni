<template>
	<view class="demo-select">
		<cl-card label="基础用法">
			<cl-select v-model="form.a" :options="options.a"></cl-select>
		</cl-card>

		<cl-card label="禁用状态">
			<cl-select v-model="form.b" :options="options.a" disabled></cl-select>
		</cl-card>

		<cl-card label="省市区">
			<cl-select-region v-model="form.c" value-key="label"></cl-select-region>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				a: 0,
				b: 2,
				c: []
			},
			options: {
				a: [
					{
						label: '海南东山羊',
						value: 0
					},
					{
						label: '乌鱼子',
						value: 1
					},
					{
						label: '葛仙米',
						value: 2
					},
					{
						label: '亚东鲑鱼',
						value: 3
					},
					{
						label: '虫草',
						value: 4
					},
					{
						label: '太湖银鱼',
						value: 5
					}
				]
			}
		};
	}
};
</script>
