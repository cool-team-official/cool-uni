<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-tag>Label：{{ refs.tree?.label }}</cl-tag>
			<cl-tag type="error">Value：{{ value }}</cl-tag>

			<view class="bor">
				<cl-tree :ref="setRefs('tree')" v-model="value" :data="data" />
			</view>
		</cl-card>

		<cl-card label="弹出框选择">
			<cl-list-item :arrow-icon="false" label="节点选择" @tap="refs.treeSelect?.open">{{
				refs.treeSelect?.label
			}}</cl-list-item>

			<cl-tree-select :ref="setRefs('treeSelect')" v-model="value2" :data="data" />
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCool } from "/@/cool";

const { refs, setRefs } = useCool();

const value = ref(6);
const value2 = ref(12);

const data = ref([
	{
		label: "Level one 1",
		value: 1,
		children: [
			{
				label: "Level two 1-1",
				value: 2,
				children: [
					{
						label: "Level three 1-1-1",
						value: 3,
					},
				],
			},
		],
	},
	{
		label: "Level one 2",
		value: 4,
		children: [
			{
				label: "Level two 2-1",
				value: 5,
				children: [
					{
						label: "Level three 2-1-1",
						value: 6,
					},
				],
			},
			{
				label: "Level two 2-2",
				value: 7,
			},
		],
	},
	{
		label: "Level one 3",
		value: 8,
		children: [
			{
				label: "Level two 3-1",
				value: 9,
				children: [
					{
						label: "Level three 3-1-1",
						value: 10,
					},
				],
			},
			{
				label: "Level two 3-2",
				value: 11,
				children: [
					{
						label: "Level three 3-2-1",
						value: 12,
					},
				],
			},
		],
	},
	{
		label: "Level one 4",
		value: 13,
	},
]);
</script>

<style lang="scss" scoped>
.bor {
	border: 1rpx solid #eee;
	border-radius: 16rpx;
	margin-top: 20rpx;
	padding: 10rpx;
}
</style>
