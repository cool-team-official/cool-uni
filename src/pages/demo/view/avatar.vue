<template>
	<view class="demo-avatar">
		<cl-card label="头像形状">
			<cl-row type="flex">
				<cl-avatar></cl-avatar>

				<cl-avatar shape="square"></cl-avatar>
			</cl-row>
		</cl-card>

		<cl-card label="头像大小">
			<cl-row type="flex">
				<cl-avatar :size="70"></cl-avatar>

				<cl-avatar :size="80"></cl-avatar>

				<cl-avatar :size="90"></cl-avatar>

				<cl-avatar :size="100"></cl-avatar>
			</cl-row>
		</cl-card>

		<cl-card label="文字头像">
			<cl-row type="flex">
				<cl-avatar :size="70">cool</cl-avatar>
			</cl-row>
		</cl-card>

		<cl-card label="头像组">
			<cl-avatar-group :urls="avatarGroup"></cl-avatar-group>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			avatarGroup: [
				'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3783120155,1061441906&fm=26&gp=0.jpg',
				'http://pic2.zhimg.com/50/v2-fb824dbb6578831f7b5d92accdae753a_hd.jpg',
				'http://imgsrc.baidu.com/forum/w=580/sign=a9714efaaf86c91708035231f93c70c6/ddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg',
				'http://img4.imgtn.bdimg.com/it/u=1911605044,3256574254&fm=26&gp=0.jpg',
				'http://img2.imgtn.bdimg.com/it/u=3380382978,3405950832&fm=26&gp=0.jpg',
				'http://img0.imgtn.bdimg.com/it/u=3530085540,1547453326&fm=15&gp=0.jpg'
			]
		};
	}
};
</script>

<style lang="scss" scoped>
.demo-avatar {
	.cl-row {
		/deep/.cl-avatar {
			margin: 0 20rpx;
		}
	}
}
</style>
