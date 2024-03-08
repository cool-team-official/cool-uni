<template>
	<cl-topbar title="Topbar 顶部导航栏" description="小标题"></cl-topbar>

	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-topbar title="Topbar 顶部导航栏"></cl-topbar>
		</cl-card>

		<cl-card label="带描述">
			<cl-topbar title="Topbar 顶部导航栏" description="兼容多端"></cl-topbar>
		</cl-card>

		<cl-card label="自定义">
			<cl-topbar title="标题">
				<template #append>
					<view class="cl-topbar__icon" @tap="toToast">
						<text class="cl-icon-warning-border"></text>
					</view>
				</template>
			</cl-topbar>
		</cl-card>

		<cl-card label="不需要返回键">
			<cl-topbar title="标题" :show-back="false"></cl-topbar>
		</cl-card>

		<cl-card label="其他颜色">
			<cl-topbar title="标题" color="#fff" background-color="#000"></cl-topbar>
		</cl-card>
	</cl-page>
</template>

<script setup lang="ts">
import { useUi } from "/$/cool-ui";

const ui = useUi();

function toToast() {
	ui.showTips("Cool-uni");
}
</script>
