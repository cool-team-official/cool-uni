<template>
	<cl-page :padding="20">
		<view class="page-demo-button">
			<cl-card label="基础用法">
				<cl-row :gutter="20">
					<cl-col :span="8">
						<cl-button fill @tap="onTap">默认</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="primary" fill>主要</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="success" fill>成功</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="error" fill>失败</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="warning" fill>警告</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="info" fill>信息</cl-button>
					</cl-col>
				</cl-row>
			</cl-card>

			<cl-card label="朴素">
				<cl-row :gutter="20">
					<cl-col :span="8">
						<cl-button type="primary" plain fill>主要</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="success" plain fill>成功</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="error" plain fill>失败</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="warning" plain fill>警告</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="info" plain fill>信息</cl-button>
					</cl-col>
				</cl-row>
			</cl-card>

			<cl-card label="不同尺寸">
				<cl-button size="small">小</cl-button>
				<cl-button size="default">默认</cl-button>
				<cl-button size="large">大</cl-button>
				<cl-button :height="90" :width="200" :font-size="34">90*200</cl-button>
			</cl-card>

			<cl-card label="图标">
				<cl-button icon="cl-icon-search">搜索</cl-button>
				<cl-button icon="cl-icon-chart-bar">统计</cl-button>
			</cl-card>

			<cl-card label="圆角">
				<cl-button type="primary" round>默认</cl-button>
				<cl-button round>默认</cl-button>
			</cl-card>

			<cl-card label="加载中">
				<cl-row :gutter="20">
					<cl-col :span="8">
						<cl-button loading fill @tap="onTap">默认</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="primary" fill loading>主要</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="success" fill loading>成功</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="error" fill loading>失败</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="warning" fill loading>警告</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="info" fill loading>信息</cl-button>
					</cl-col>
				</cl-row>
			</cl-card>

			<cl-card label="禁用">
				<cl-row :gutter="20">
					<cl-col :span="8">
						<cl-button disabled fill @tap="onTap">默认</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="primary" fill disabled>主要</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="success" fill disabled>成功</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="error" fill disabled>失败</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="warning" fill disabled>警告</cl-button>
					</cl-col>
					<cl-col :span="8">
						<cl-button type="info" fill disabled>信息</cl-button>
					</cl-col>
				</cl-row>
			</cl-card>

			<cl-card label="没有边框">
				<cl-button :border="false">默认</cl-button>
			</cl-card>

			<cl-card label="自定义颜色">
				<cl-button :border="false" color="#ffffff" background-color="#008000"
					>默认</cl-button
				>
				<cl-button color="#008000" plain>朴素</cl-button>
			</cl-card>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { useUi } from "/$/cool-ui";

const ui = useUi();

function onTap() {
	ui.showToast("点我干嘛");
}
</script>

<style lang="scss">
.page-demo-button {
	.cl-col {
		padding-bottom: 20rpx;
	}
}
</style>
