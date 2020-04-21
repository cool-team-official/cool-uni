<template>
	<view class="demo-flex">
		<cl-card label="flex布局">
			<cl-row>
				<cl-col span="12">
					<view class="a"></view>
				</cl-col>
				<cl-col span="12">
					<view class="b"></view>
				</cl-col>
			</cl-row>

			<cl-row>
				<cl-col span="8">
					<view class="a"></view>
				</cl-col>
				<cl-col span="8">
					<view class="b"></view>
				</cl-col>
				<cl-col span="8">
					<view class="a"></view>
				</cl-col>
			</cl-row>

			<cl-row>
				<cl-col span="6">
					<view class="a"></view>
				</cl-col>
				<cl-col span="6">
					<view class="b"></view>
				</cl-col>
				<cl-col span="6">
					<view class="a"></view>
				</cl-col>
				<cl-col span="6">
					<view class="b"></view>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="分栏间隔">
			<cl-row gutter="20">
				<cl-col span="6">
					<view class="a"></view>
				</cl-col>
				<cl-col span="6">
					<view class="a"></view>
				</cl-col>
				<cl-col span="6">
					<view class="a"></view>
				</cl-col>
				<cl-col span="6">
					<view class="a"></view>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="混合布局">
			<cl-row gutter="20">
				<cl-col span="4">
					<view class="a"></view>
				</cl-col>
				<cl-col span="10">
					<view class="b"></view>
				</cl-col>
				<cl-col span="10">
					<view class="a"></view>
				</cl-col>
			</cl-row>

			<cl-row gutter="20">
				<cl-col span="12">
					<view class="a"></view>
				</cl-col>
				<cl-col span="6">
					<view class="b"></view>
				</cl-col>
				<cl-col span="6">
					<view class="a"></view>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="分栏偏移">
			<cl-row gutter="20">
				<cl-col span="6" offset="6">
					<view class="a"></view>
				</cl-col>
				<cl-col span="6" offset="6">
					<view class="a"></view>
				</cl-col>
			</cl-row>

			<cl-row gutter="20">
				<cl-col span="6">
					<view class="a"></view>
				</cl-col>
				<cl-col span="6" push="6">
					<view class="a"></view>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="对齐方式（H5）">
			<cl-row type="flex" justify="space-between" gutter="20">
				<cl-col span="6">
					<view class="a"></view>
				</cl-col>
				<cl-col span="6">
					<view class="a"></view>
				</cl-col>
			</cl-row>
		</cl-card>
	</view>
</template>

<script>
export default {};
</script>

<style lang="scss">
.demo-flex {
	.a,
	.b {
		border-radius: 6rpx;
		height: 60rpx;
	}

	.a {
		background-color: #d3dce6;
	}

	.b {
		background-color: #e5e9f2;
	}
}
</style>
