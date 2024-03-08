<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-row>
				<cl-col :span="4">
					<cl-loading></cl-loading>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="不同大小">
			<cl-row>
				<cl-col :span="4">
					<cl-loading :size="40"></cl-loading>
				</cl-col>

				<cl-col :span="4">
					<cl-loading :size="50"></cl-loading>
				</cl-col>

				<cl-col :span="4">
					<cl-loading :size="60"></cl-loading>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="主题">
			<cl-row>
				<cl-col :span="4">
					<cl-loading></cl-loading>
				</cl-col>

				<cl-col :span="4">
					<cl-loading theme="snow"></cl-loading>
				</cl-col>

				<cl-col :span="4">
					<cl-loading theme="dot"></cl-loading>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="加载区域">
			<cl-loading-mask loading>
				<view class="space">
					<cl-form>
						<cl-form-item label="昵称">
							<cl-input />
						</cl-form-item>

						<cl-form-item label="性别">
							<cl-select />
						</cl-form-item>
					</cl-form>
				</view>
			</cl-loading-mask>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.space {
	font-size: 28rpx;
	background-color: #f6f7fa;
	position: relative;
	padding: 20rpx;
	box-sizing: border-box;
	border-radius: 16rpx;
}
</style>
