<template>
	<cl-page :padding="20">
		<cl-toast ref="Toast"></cl-toast>

		<cl-card label="基础用法">
			<cl-button @tap="open()">默认</cl-button>
		</cl-card>

		<cl-card label="不同位置">
			<cl-button @tap="open()">默认</cl-button>
			<cl-button @tap="open({ position: 'top' })">顶部位置</cl-button>
			<cl-button @tap="open({ position: 'middle' })">中间位置</cl-button>
			<cl-button @tap="open({ position: 'bottom' })">底部位置</cl-button>
		</cl-card>

		<cl-card label="不同类型">
			<cl-button @tap="open({ type: 'primary' })">主要</cl-button>
			<cl-button @tap="open({ type: 'success' })">成功</cl-button>
			<cl-button @tap="open({ type: 'error' })">失败</cl-button>
			<cl-button @tap="open({ type: 'warning' })">警告</cl-button>
			<cl-button @tap="open({ type: 'info' })">信息</cl-button>
		</cl-card>

		<cl-card label="其他">
			<cl-button @tap="open({ icon: 'cl-icon-good-fill' })">带图标</cl-button>
			<cl-button
				@tap="
					open({
						image: {
							url: '../static/avatar.png',
							style: {
								height: '120rpx',
								width: '120rpx',
							},
						},
					})
				"
				>带图片</cl-button
			>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const Toast = ref<ClToast.Ref>();

function open(data?: any) {
	Toast.value?.open({
		message: "Toast 提示",
		...data,
	});
}
</script>
