<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-row>
				<cl-col :span="4">
					<cl-loading></cl-loading>
				</cl-col>

				<cl-col :span="4">
					<cl-loading theme="spin"></cl-loading>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="不同大小">
			<cl-row>
				<cl-col :span="4">
					<cl-loading :size="20"></cl-loading>
				</cl-col>

				<cl-col :span="4">
					<cl-loading :size="25"></cl-loading>
				</cl-col>

				<cl-col :span="4">
					<cl-loading :size="30"></cl-loading>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="不同类型">
			<cl-row>
				<cl-col :span="4">
					<cl-loading :border-width="10"></cl-loading>
				</cl-col>

				<cl-col :span="4">
					<cl-loading color="red"></cl-loading>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="加载区域">
			<view class="space">
				<cl-loading-mask loading> </cl-loading-mask>

				<cl-form>
					<cl-form-item label="昵称">
						<cl-input></cl-input>
					</cl-form-item>

					<cl-form-item label="性别">
						<cl-select></cl-select>
					</cl-form-item>
				</cl-form>
			</view>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.space {
	font-size: 28rpx;
	width: 100%;
	background-color: #f6f7fa;
	position: relative;
}
</style>
