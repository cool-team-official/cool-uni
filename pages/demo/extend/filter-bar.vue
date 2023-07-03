<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-filter-bar v-model="filter" :num="4">
				<cl-filter-item label="排序" prop="order" type="order"></cl-filter-item>
				<cl-filter-item label="开关" prop="switch" type="switch"></cl-filter-item>
			</cl-filter-bar>
		</cl-card>

		<cl-card label="展开列表">
			<cl-filter-bar v-model="filter">
				<cl-filter-item
					label="多选"
					prop="d1"
					type="dropdown"
					multiple
					:options="[
						{
							label: 'A',
							value: 1,
						},
						{
							label: 'B',
							value: 2,
						},
					]"
				></cl-filter-item>
				<cl-filter-item
					label="单选"
					prop="d2"
					type="dropdown"
					:options="[
						{
							label: 'A',
							value: 1,
						},
						{
							label: 'B',
							value: 2,
						},
					]"
				></cl-filter-item>
			</cl-filter-bar>
		</cl-card>

		<cl-card label="展开宫格">
			<cl-filter-bar v-model="filter">
				<cl-filter-item
					label="多选"
					prop="d1"
					type="dropdown"
					multiple
					:options="[
						{
							label: 'A',
							value: 1,
						},
						{
							label: 'B',
							value: 2,
						},
					]"
					theme="grid"
				></cl-filter-item>
				<cl-filter-item
					label="单选"
					prop="d2"
					type="dropdown"
					:options="[
						{
							label: 'A',
							value: 1,
						},
						{
							label: 'B',
							value: 2,
						},
					]"
					theme="grid"
				></cl-filter-item>
			</cl-filter-bar>
		</cl-card>

		<cl-card label="展开自定义">
			<cl-filter-bar v-model="filter">
				<cl-filter-item label="输入框" prop="input" type="dropdown">
					<template #dropdown>
						<view class="cs" @tap.stop>
							<cl-input />
							<cl-button :margin="[0, 0, 0, 20]">搜索</cl-button>
						</view>
					</template>
				</cl-filter-item>
			</cl-filter-bar>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const filter = ref({
	d1: [],
});
</script>

<style lang="scss" scoped>
.cs {
	display: flex;
	padding: 20rpx;
}
</style>
