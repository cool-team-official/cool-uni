<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-row :margin="[0, 0, 10, 0]">
				<cl-tag>{{ refs.tree?.label }}</cl-tag>
			</cl-row>

			<cl-tag type="error">{{ value }}</cl-tag>

			<view class="bor">
				<cl-tree :ref="setRefs('tree')" v-model="value" :data="data"> </cl-tree>
			</view>
		</cl-card>

		<cl-card label="多选">
			<cl-row :margin="[0, 0, 10, 0]">
				<cl-tag>{{ refs.treeMultiple?.label }}</cl-tag>
			</cl-row>
			<cl-tag type="error">{{ value2 }}</cl-tag>

			<view class="bor">
				<cl-tree multiple :ref="setRefs('treeMultiple')" v-model="value2" :data="data" />
			</view>
		</cl-card>

		<cl-card label="弹出框选择">
			<cl-list-item :arrow-icon="false" label="节点选择" @tap="refs.treeSelect?.open">
				<cl-text :value="refs.treeSelect?.label || '请选择'" :ellipsis="1" />
			</cl-list-item>

			<cl-tree-select
				:ref="setRefs('treeSelect')"
				v-model="value3"
				:data="data"
				:show-picker="false"
			/>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCool } from "/@/cool";

const { refs, setRefs } = useCool();

const value = ref(3);
const value2 = ref([12, 3]);
const value3 = ref();

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
						children: [
							{
								label: "Level four 2-1-1-1",
								value: 14,
								children: [
									{
										label: "Level five 2-1-1-1-1",
										value: 16,
									},
								],
							},
							{
								label: "Level four 2-1-1-2",
								value: 15,
								children: [
									{
										label: "Level five 2-1-1-2-1",
										value: 17,
									},
								],
							},
						],
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
	border: $cl-border-width solid #eee;
	border-radius: 16rpx;
	margin-top: 20rpx;
	padding: 10rpx;
}
</style>
