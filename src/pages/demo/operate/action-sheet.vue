<template>
	<view class="demo-action-sheet">
		<cl-toast ref="cl-toast"></cl-toast>
		<cl-action-sheet ref="cl-action-sheet"></cl-action-sheet>
		<cl-confirm ref="cl-confirm"></cl-confirm>

		<cl-card label="基本用法">
			<cl-button  @tap="open1">默认操作</cl-button>
		</cl-card>

		<cl-card label="关闭拦截">
			<cl-button  @tap="open2">退出登录</cl-button>
		</cl-card>

		<cl-card label="禁用遮罩层">
			<cl-button  @tap="open3">打开</cl-button>
		</cl-card>

		<cl-card label="微信开发能力">
			<cl-button  @tap="open4">打开</cl-button>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},

	methods: {
		showToast(text) {
			this.$refs['cl-toast'].open(text);
		},

		open1() {
			this.$refs['cl-action-sheet'].open({
				list: [
					{
						label: '确认要清空历史记录吗？',
						disabled: true,
						size: '26rpx'
					},
					{
						label: '确定'
					}
				],
				callback: ({ action }) => {
					this.showToast(`你点击了：${action}`);
				}
			});
		},

		open2() {
			this.$refs['cl-action-sheet'].open({
				list: [
					{
						label: '退出登录会清除你的登录信息，确认退出吗？',
						disabled: true,
						size: '26rpx'
					},
					{
						label: '退出登录',
						color: 'red',
						click: done => {
							this.$refs['cl-confirm']
								.open({
									title: '提示',
									message: '再次确认是否退出'
								})
								.then(() => {
									this.showToast('你已成功退出');
									done();
								})
								.catch(err => {
									this.showToast(err);
								});
						}
					}
				],
				callback: ({ action }) => {
					this.showToast(`你点击了：${action}`);
				}
			});
		},

		open3() {
			this.$refs['cl-action-sheet'].open({
				wrapperClosable: false,
				list: [
					{
						label: '禁用遮罩层',
						disabled: true,
						size: '26rpx'
					}
				]
			});
		},

		open4() {
			this.$refs['cl-action-sheet'].open({
				list: [
					{
						label: '保存海报分享',
						icon: 'cl-icon-image',
						openType: 'share'
					}
				]
			});
		}
	}
};
</script>

