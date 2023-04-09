<template>
	<cl-page :padding="20">
		<view class="page-demo-button">
			<cl-card label="基础用法">
				<cl-row :gutter="20">
					<cl-col :span="8">
						<cl-button fill>默认</cl-button>
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
				<cl-button size="large">大</cl-button>
				<cl-button size="default">默认</cl-button>
				<cl-button size="small">小</cl-button>
				<cl-button :height="80" :width="200" :font-size="30">80*200</cl-button>
			</cl-card>

			<cl-card label="图标">
				<cl-button icon="cl-icon-search">搜索</cl-button>
				<cl-button icon="cl-icon-good-fill">点赞</cl-button>
			</cl-card>

			<cl-card label="圆角">
				<cl-button type="primary" round>默认</cl-button>
				<cl-button round>默认</cl-button>
			</cl-card>

			<cl-card label="加载中">
				<cl-button type="primary" loading>默认</cl-button>
				<cl-button loading>默认</cl-button>
			</cl-card>

			<cl-card label="没有边框">
				<cl-button :border="false">默认</cl-button>
			</cl-card>

			<cl-card label="自定义颜色">
				<cl-button :border="false" color="#ffffff" background-color="#626aef"
					>默认</cl-button
				>
				<cl-button color="#626aef" plain>朴素</cl-button>
			</cl-card>
		</view>
	</cl-page>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.page-demo-button {
	.cl-col {
		padding-bottom: 20rpx;
	}
}
</style>
