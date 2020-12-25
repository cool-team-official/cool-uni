<template>
	<view class="demo-filter-bar">
		<text class="label">下拉框</text>
		<cl-filter-bar :list="dropdown" @change="onChange"> </cl-filter-bar>

		<text class="label">排序</text>
		<cl-filter-bar :list="sort" @change="onChange"> </cl-filter-bar>

		<text class="label">混合</text>
		<cl-filter-bar :list="mixins" @change="onChange"> </cl-filter-bar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			val: "rank",
			dropdown: [
				{
					label: "多选",
					value: "rank",
					type: "dropdown",
					multiple: true,
					children: [
						{
							label: "综合排序",
							value: 1,
							checked: true,
						},
						{
							label: "距离最近",
							value: 2,
						},
						{
							label: "好评优先",
							value: 3,
						},
						{
							label: "起送价最低",
							value: 4,
						},
						{
							label: "配送最快",
							value: 5,
						},
						{
							label: "通用排序",
							value: 6,
						},
						{
							label: "通用排序2",
							value: 7,
						},
					],
				},
				{
					label: "grid主题",
					value: "rank2",
					type: "dropdown",
					multiple: true,
					theme: "grid",
					children: [
						{
							label: "综合排序",
							value: 1,
							checked: true,
						},
						{
							label: "距离最近",
							value: 2,
						},
						{
							label: "好评优先",
							value: 3,
						},
						{
							label: "起送价最低",
							value: 4,
						},
						{
							label: "配送最快",
							value: 5,
						},
						{
							label: "通用排序",
							value: 6,
						},
						{
							label: "通用排序2",
							value: 7,
						},
					],
				},
				{
					label: "配送方式",
					value: "method",
					type: "dropdown",
					multiple: false,
					children: [
						{
							label: "申通",
							value: 1,
						},
						{
							label: "圆通",
							value: 2,
						},
						{
							label: "顺丰",
							value: 3,
						},
					],
				},
			],
			sort: [
				{
					label: "价格",
					value: "price",
					order: "desc",
				},
				{
					label: "销售额",
					value: "sale",
					order: "",
				},
			],
			mixins: [
				{
					label: "下拉框",
					value: "rank",
					type: "dropdown",
					multiple: true,
					children: [
						{
							label: "综合排序",
							value: 1,
							checked: true,
						},
						{
							label: "距离最近",
							value: 2,
						},
						{
							label: "好评优先",
							value: 3,
						},
						{
							label: "起送价最低",
							value: 4,
						},
						{
							label: "配送最快",
							value: 5,
						},
						{
							label: "通用排序",
							value: 6,
						},
						{
							label: "通用排序2",
							value: 7,
						},
					],
				},
				{
					label: "价格排序",
					value: "price",
					order: "desc",
				},
			],
		};
	},

	methods: {
		onChange(d) {
			console.log(d);
		},
	},
};
</script>

<style lang="scss" scoped>
.demo-filter-bar {
	.label {
		display: inline-block;
		font-size: 28rpx;
		margin: 20rpx;
	}
}
</style>
