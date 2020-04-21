<template>
	<view class="demo-input">
		<cl-card label="基础用法">
			<cl-input v-model="val1" placeholder="请输入内容"></cl-input>
		</cl-card>

		<cl-card label="禁用状态">
			<cl-input placeholder="请输入内容" disabled></cl-input>
		</cl-card>

		<cl-card label="可清空">
			<cl-input v-model="val2" placeholder="请输入内容" clearable></cl-input>
		</cl-card>

		<cl-card label="带icon">
			<cl-row>
				<cl-input
					v-model="val3"
					placeholder="请输入内容"
					prefix-icon="cl-icon-search"
				></cl-input>
			</cl-row>

			<cl-row>
				<cl-input
					v-model="val4"
					placeholder="请输入内容"
					suffix-icon="cl-icon-image"
				></cl-input>
			</cl-row>
		</cl-card>

		<cl-card label="自定义">
			<cl-row>
				<cl-input placeholder="请输入内容">
					<text slot="prepend">https://</text>
				</cl-input>
			</cl-row>

			<cl-row>
				<cl-input placeholder="请输入内容">
					<text slot="append">.com</text>
				</cl-input>
			</cl-row>

			<cl-row>
				<cl-input placeholder="请输入内容">
					<view slot="prepend">
						<cl-select v-model="val5" :options="options.city"></cl-select>
					</view>
					<cl-button type="primary" size="mini" slot="append">搜索</cl-button>
				</cl-input>
			</cl-row>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			val1: '',
			val2: '',
			val3: '',
			val4: '',
			val5: '',
			options: {
				city: [
					{
						label: '厦门市',
						value: 1
					},
					{
						label: '福州市',
						value: 2
					},
					{
						label: '龙岩市',
						value: 3
					}
				]
			}
		};
	}
};
</script>

<style lang="scss" scoped>
.demo-input {
}
</style>
