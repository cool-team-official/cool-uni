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
			avatarGroup: new Array(6).fill(1).map((e, i) => {
				return `https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/${i +
					1}.jpg`;
			})
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
