<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-row>
				<cl-button @tap="openToast">提示框</cl-button>
				<cl-button @tap="openConfirm">确认框</cl-button>
				<cl-button @tap="openLoading">加载框</cl-button>
			</cl-row>
		</cl-card>

		<cl-text
			value="由于uniapp限制，该组件（cl-page）可作为全局组件使用，内置如下方法（可自行添加）"
			block
			color="red"
		></cl-text>
	</cl-page>
</template>

<script lang="ts" setup>
import { useCool } from "/@/cool";

const { ui } = useCool();

function openToast() {
	ui.showToast("cool-cli");
}

function openConfirm() {
	ui.showConfirm({
		title: "提示",
		message: "是否要删除该联系人？",
	});
}

function openLoading() {
	ui.showLoading("2s后关闭");

	setTimeout(() => {
		ui.hideLoading();
	}, 2000);
}
</script>
