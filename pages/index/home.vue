<template>
	<cl-page>
		<view class="page-home">
			<view class="logo"> COOL-UNI </view>

			<view class="group" v-for="(item, index) in list" :key="index">
				<text class="title">{{ item.label }}</text>

				<view class="list">
					<view
						class="item"
						v-for="(item2, index2) in item.children"
						:key="index2"
						@tap="toLink(item2.link)"
					>
						<text class="label">{{ item2.label }}</text>

						<cl-icon name="arrow-right"></cl-icon>
					</view>
				</view>
			</view>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useCool, useStore } from "/@/cool";

const { router } = useCool();
const { dict } = useStore();

const list = [
	{
		label: "基础组件",
		children: [
			{
				label: "Button 按钮",
				link: "/pages/demo/basic/button",
			},
			{
				label: "Text 文本",
				link: "/pages/demo/basic/text",
			},
			{
				label: "Image 图片",
				link: "/pages/demo/basic/image",
			},
			{
				label: "Icon 图标",
				link: "/pages/demo/basic/icon",
			},
			{
				label: "Tag 标签",
				link: "/pages/demo/basic/tag",
			},
			{
				label: "Toast 提示",
				link: "/pages/demo/basic/toast",
			},
			{
				label: "Loading 加载",
				link: "/pages/demo/basic/loading",
			},
		],
	},
	{
		label: "表单组件",
		children: [
			{
				label: "Input 输入框",
				link: "/pages/demo/form/input",
			},
			{
				label: "InputNumber 计数器",
				link: "/pages/demo/form/input-number",
			},
			{
				label: "Textarea 文本域",
				link: "/pages/demo/form/textarea",
			},
			{
				label: "Checkbox 多选框",
				link: "/pages/demo/form/checkbox",
			},
			{
				label: "Radio 单选框",
				link: "/pages/demo/form/radio",
			},
			{
				label: "Select 下拉框",
				link: "/pages/demo/form/select",
			},
			{
				label: "Rate 评分",
				link: "/pages/demo/form/rate",
			},
			{
				label: "Switch 开关",
				link: "/pages/demo/form/switch",
			},
			{
				label: "Upload 文件上传",
				link: "/pages/demo/form/upload",
			},
			{
				label: "Form 表单",
				link: "/pages/demo/form/form",
			},
		],
	},
	{
		label: "视图组件",
		children: [
			{
				label: "Avatar 头像",
				link: "/pages/demo/view/avatar",
			},
			{
				label: "Badge 角标",
				link: "/pages/demo/view/badge",
			},
			{
				label: "Banner 轮博图",
				link: "/pages/demo/view/banner",
			},
			{
				label: "Card 卡片",
				link: "/pages/demo/view/card",
			},
			{
				label: "Countdown 倒计时",
				link: "/pages/demo/view/countdown",
			},
			{
				label: "Divider 分割线",
				link: "/pages/demo/view/divider",
			},
			{
				label: "Flex 弹性",
				link: "/pages/demo/view/flex",
			},
			{
				label: "Grid 宫格",
				link: "/pages/demo/view/grid",
			},
			{
				label: "List 列表",
				link: "/pages/demo/view/list",
			},
			{
				label: "Loadmore 加载更多",
				link: "/pages/demo/view/loadmore",
			},
			{
				label: "Noticebar 通知栏",
				link: "/pages/demo/view/noticebar",
			},
			{
				label: "Popup 弹出框",
				link: "/pages/demo/view/popup",
			},
			{
				label: "Progress 进度条",
				link: "/pages/demo/view/progress",
			},
			{
				label: "Search 搜索框",
				link: "/pages/demo/view/search",
			},
			{
				label: "Slider 滑块",
				link: "/pages/demo/view/slider",
			},
			{
				label: "Tabs 选项卡",
				link: "/pages/demo/view/tabs",
			},
			{
				label: "Timeline 时间线",
				link: "/pages/demo/view/timeline",
			},
			{
				label: "Topbar 顶部导航栏",
				link: "/pages/demo/view/topbar",
			},
			{
				label: "Waterfall 瀑布流",
				link: "/pages/demo/view/waterfall",
			},
		],
	},
	{
		label: "高级组件",
		children: [
			{
				label: "ActionSheet 操作菜单",
				link: "/pages/demo/extend/action-sheet",
			},
			{
				label: "Captcha 验证码",
				link: "/pages/demo/extend/captcha",
			},
			{
				label: "Confirm 确认框",
				link: "/pages/demo/extend/confirm",
			},
			{
				label: "Dialog 对话框",
				link: "/pages/demo/extend/dialog",
			},
			{
				label: "FilterBar 过滤栏",
				link: "/pages/demo/extend/filter-bar",
			},
			{
				label: "Page 页面",
				link: "/pages/demo/extend/page",
			},
		],
	},
];

function toLink(link: string) {
	router.push(link);
}

onMounted(async () => {
	const a = await dict.getSync("brand", 4);
	console.log(a);
});
</script>

<style lang="scss" scoped>
.page-home {
	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 100rpx 0 50rpx 0;
		color: #000;
		font-weight: 500;
		font-size: 60rpx;
	}

	.group {
		padding: 30rpx;

		.title {
			display: block;
			margin-bottom: 20rpx;
			margin-left: 10rpx;
			font-size: 26rpx;
			color: #999;
		}

		.list {
			.item {
				display: flex;
				align-items: center;
				height: 80rpx;
				padding: 0 30rpx;
				margin-bottom: 25rpx;
				background-color: #fff;
				border-radius: 80rpx;
				box-shadow: 0 1rpx 8rpx #6666660f;

				.label {
					flex: 1;
					font-size: 28rpx;
					font-weight: 500;
				}
			}
		}
	}
}
</style>
