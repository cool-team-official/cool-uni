<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-tabs v-model="active" :list="list"></cl-tabs>
		</cl-card>

		<cl-card label="居中">
			<cl-tabs v-model="active" :list="list" justify="center"></cl-tabs>
		</cl-card>

		<cl-card label="填充">
			<cl-tabs v-model="active" :list="list" fill></cl-tabs>
		</cl-card>

		<cl-card label="自定义颜色">
			<cl-tabs
				v-model="active"
				:list="list"
				color="red"
				un-color="blue"
				background-color="#f7f7f7"
			></cl-tabs>
		</cl-card>

		<cl-card label="下拉框">
			<cl-tabs v-model="active" :list="list" show-dropdown>
				<template #dropdown>
					<view class="dropdown">
						<cl-text
							:value="item.label"
							v-for="item in list"
							:key="item.value"
							:margin="10"
						></cl-text>
					</view>
				</template>
			</cl-tabs>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const active = ref(0);

const list = ref([
	{
		label: "数码",
		value: 1,
	},
	{
		label: "家电",
		value: 2,
	},
	{
		label: "母婴",
		value: 3,
	},
	{
		label: "潮牌",
		value: 4,
	},
]);
</script>

<style lang="scss" scoped>
.dropdown {
	background-color: #ddd;
	padding: 20rpx;
}
</style>
