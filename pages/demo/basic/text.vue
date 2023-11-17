<template>
	<cl-page :padding="20">
		<view class="page-demo-text">
			<cl-card label="基础用法">
				<cl-text value="云想衣裳花想容，春风拂槛露华浓。"></cl-text>
			</cl-card>

			<cl-card label="不同颜色">
				<cl-row>
					<cl-col :span="8">
						<cl-text value="主色" color="primary"></cl-text>
					</cl-col>

					<cl-col :span="8">
						<cl-text value="成功" color="success"></cl-text>
					</cl-col>

					<cl-col :span="8">
						<cl-text value="错误" color="error"></cl-text>
					</cl-col>

					<cl-col :span="8">
						<cl-text value="警告" color="warning"></cl-text>
					</cl-col>

					<cl-col :span="8">
						<cl-text value="信息" color="info"></cl-text>
					</cl-col>

					<cl-col :span="8">
						<cl-text value="自定义颜色" color="#628bca"></cl-text>
					</cl-col>
				</cl-row>
			</cl-card>

			<cl-card label="金额">
				<cl-text type="price" :size="40" value="19450"></cl-text>
			</cl-card>

			<cl-card label="手机号">
				<cl-text type="phone" value="17605043035"></cl-text>
			</cl-card>

			<cl-card label="超出省略">
				<cl-text
					:ellipsis="2"
					:line-height="1.4"
					value="锦瑟无端五十弦，一弦一柱思华年。庄生晓梦迷蝴蝶，望帝春心托杜鹃。沧海月明珠有泪，蓝田日暖玉生烟。此情可待成追忆，只是当时已惘然。"
				></cl-text>
			</cl-card>

			<cl-card label="图标">
				<cl-row>
					<cl-col :span="12">
						<cl-text prefix-icon="cl-icon-search" value="请输入名称"></cl-text>
					</cl-col>

					<cl-col :span="12">
						<cl-text suffix-icon="cl-icon-time" value="2022-02-06"></cl-text>
					</cl-col>
				</cl-row>
			</cl-card>

			<cl-card label="自定义">
				<cl-text
					:size="30"
					color="green"
					:margin="[20, 20, 20, 20]"
					value="颜色(green)、大小(30)、间距(20)"
				></cl-text>
			</cl-card>
		</view>
	</cl-page>
</template>

<script lang="ts" setup></script>
