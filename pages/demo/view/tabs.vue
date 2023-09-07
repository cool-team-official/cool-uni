<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-tabs v-model="active" :list="list"></cl-tabs>
		</cl-card>

		<cl-card label="居中">
			<cl-tabs v-model="active" :list="list2" justify="center"></cl-tabs>
		</cl-card>

		<cl-card label="填充">
			<cl-tabs v-model="active" :list="list2" fill></cl-tabs>
		</cl-card>

		<cl-card label="下拉框">
			<cl-tabs
				v-model="active"
				:border="false"
				:list="list"
				show-dropdown
				:ref="setRefs('tabs')"
			>
				<template #dropdown>
					<view class="dropdown">
						<cl-text
							v-for="item in list"
							:value="item.label"
							:key="item.value"
							:margin="20"
							:color="active === item.value ? 'primary' : ''"
							@tap="check(item.value)"
						></cl-text>
					</view>
				</template>
			</cl-tabs>
		</cl-card>

		<cl-card label="自定义">
			<cl-tabs
				v-model="active"
				:list="list"
				:border="false"
				color="red"
				background-color="#f7f7f7"
				:show-line="false"
			></cl-tabs>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCool } from "/@/cool";

const { refs, setRefs } = useCool();

const active = ref(1);

const list = ref([
	{
		label: "百亿补贴",
		value: 1,
	},
	{
		label: "包邮",
		value: 2,
	},
	{
		label: "限时达",
		value: 3,
	},
	{
		label: "同城速配",
		value: 4,
	},
	{
		label: "货到付款",
		value: 5,
	},
	{
		label: "分期免息",
		value: 6,
	},
	{
		label: "配送全球",
		value: 7,
	},
	{
		label: "促销",
		value: 8,
	},
]);

const list2 = ref([
	{
		label: "盒装",
		value: 1,
	},
	{
		label: "纸包装",
		value: 2,
	},
	{
		label: "袋装",
		value: 3,
	},
	{
		label: "罐装",
		value: 4,
	},
]);

function check(value: any) {
	active.value = value;
	refs.tabs.closeDropdown();
}
</script>

<style lang="scss" scoped>
.dropdown {
	background-color: #fff;
	padding: 20rpx;
	border: $cl-border-width solid $cl-border-color;
	border-radius: 12rpx;
}
</style>
