<template>
	<view class="page-index">
		<view class="header">
			<image :src="require('@/assets/icon/logo.png')" class="logo" alt />
			<view class="desc">简洁高效的uni-app组件库</view>
		</view>

		<view class="container">
			<view class="group">
				<view class="item" v-for="(item, index) in list" :key="index">
					<text class="item__label">{{ item.label }}</text>

					<view class="item__container">
						<view
							v-for="(item2, index2) in item.children"
							:key="index2"
							class="block"
							@tap="toDemo(item, item2)"
						>
							<text class="label">{{ item2.label }}</text>
							<text class="cl-icon-arrow-right" v-if="item2.path"></text>
							<text class="cl-icon-close" v-else></text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<cl-toast ref="toast"></cl-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					label: 'Basic 基础组件',
					key: 'basic',
					children: [
						{
							label: 'Button 按钮',
							path: 'button'
						},
						{
							label: 'Input 输入框',
							path: 'input'
						},
						{
							label: 'Image 图片',
							path: 'image'
						},
						{
							label: 'Icon 图标',
							path: 'icon'
						},
						{
							label: 'Tag 标签',
							path: 'tag'
						},
						{
							label: 'Divider 分割线',
							path: 'divider'
						}
					]
				},
				{
					label: 'Feedback 反馈组件',
					key: 'feedback',
					children: [
						{
							label: 'Toast 提示',
							path: 'toast'
						},
						{
							label: 'Message 消息',
							path: 'message'
						},
						{
							label: 'Loading 加载',
							path: 'loading'
						}
					]
				},
				{
					label: 'Form 表单组件',
					key: 'form',
					children: [
						{
							label: 'Radio 单选框',
							path: 'radio'
						},
						{
							label: 'Switch 开关',
							path: 'switch'
						},
						{
							label: 'Checkbox 多选框',
							path: 'checkbox'
						},
						{
							label: 'Select 下拉框',
							path: 'select'
						},
						{
							label: 'Upload 上传',
							path: 'upload'
						},
						{
							label: 'Rate 评分',
							path: 'rate'
						},
						{
							label: 'Rules 校验',
							path: 'rules'
						}
					]
				},
				{
					label: 'Operate 操作',
					key: 'operate',
					children: [
						{
							label: 'LoadMore 页底提示',
							path: 'loadmore'
						},
						{
							label: 'Steps 步骤'
						},
						{
							label: 'Modal 模态框',
							path: 'modal'
						},
						{
							label: 'ActionSheet 底部菜单',
							path: 'action-sheet'
						},
						{
							label: 'Search 搜索',
							path: 'search'
						}
					]
				},
				{
					label: 'Nav 导航组件',
					key: 'nav',
					children: [
						{
							label: 'Tabs 选项卡',
							path: 'tabs'
						},
						{
							label: 'BottomBar 底部导航'
						},
						{
							label: 'TopBar 顶部导航',
							path: 'topbar'
						}
					]
				},
				{
					label: 'Layout 布局',
					key: 'layout',
					children: [
						{
							label: 'Flex 柔性',
							path: 'flex'
						},
						{
							label: 'Grid 宫格',
							path: 'grid'
						},
						{
							label: 'WaterFall 瀑布流',
							path: 'waterfall'
						},
						{
							label: 'List 列表',
							path: 'list'
						}
					]
				},
				{
					label: 'View 视图',
					key: 'view',
					children: [
						{
							label: 'Popup 弹出层',
							path: 'popup'
						},
						{
							label: 'Badge 角标',
							path: 'badge'
						},
						{
							label: 'Avatar 头像',
							path: 'avatar'
						},
						{
							label: 'CountDown 倒计时'
						},
						{
							label: 'NoticeBar 通知公告栏',
							path: 'noticebar'
						},
						{
							label: 'Progress 进度条',
							path: 'progress'
						},
						{
							label: 'Slider 滑块',
							path: 'slider'
						},
						{
							label: 'TimeLine 时间轴'
						},
						{
							label: 'Swiper 轮播图',
							path: 'swiper'
						}
					]
				},
				{
					label: 'Advanced 高级组件',
					key: 'advanced',
					children: [
						{
							label: 'Ceiling 吸顶'
						},
						{
							label: 'Drag 拖动排序'
						},
						{
							label: 'Crop 图片裁剪'
						},
						{
							label: 'Ticket 优惠券'
						},
						{
							label: 'Guide 操作引导'
						},
						{
							label: 'RichText 富文本'
						},
						{
							label: 'IndexList 索引列表',
							path: 'list-index'
						},
						{
							label: 'Calendar 日历'
						}
					]
				}
			]
		};
	},

	methods: {
		toDemo({ key }, item) {
			if (item.path) {
				uni.navigateTo({
					url: `/pages/demo/${key}/${item.path}`
				});
			} else {
				this.$refs['toast'].open(`${item.label}开发中`);
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}

.page-index {
	.header {
		padding: 20rpx 50rpx;

		.logo {
			height: 91rpx;
			width: 397rpx;
			margin: 20rpx 0;
		}

		.desc {
			font-size: 28rpx;
			color: #909ca2;
		}
	}

	.container {
		padding: 20rpx 33rpx;
		box-sizing: border-box;

		.item {
			&__label {
				display: inline-block;
				height: 70rpx;
				line-height: 70rpx;
				padding: 0 30rpx;
				font-size: 28rpx;
				color: #909ca2;
			}

			&__container {
				.block {
					display: flex;
					align-items: center;
					height: 80rpx;
					padding: 0 30rpx;
					margin-bottom: 30rpx;
					font-size: 26rpx;
					background-color: #f7f7f7;
					border-radius: 80rpx;

					&:active {
						background-color: #eee;
					}

					.label {
						flex: 1;
					}
				}
			}
		}
	}
}
</style>
