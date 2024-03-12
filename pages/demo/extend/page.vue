<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-text
				value="由于 uniapp 限制，cl-page 组件可作为全局组件使用"
				block
				color="warning"
				:margin="[0, 0, 30, 0]"
			/>

			<cl-row>
				<cl-button @tap="openToast">提示框</cl-button>
				<cl-button @tap="openConfirm">确认框</cl-button>
				<cl-button @tap="openLoading">加载框</cl-button>
			</cl-row>
		</cl-card>

		<cl-card label="主题示例">
			<cl-text
				value="开发时，请根据设计图自行调整"
				block
				color="warning"
				:margin="[0, 0, 30, 0]"
			/>

			<cl-row>
				<cl-button @tap="setTheme('default')">默认</cl-button>
				<cl-button @tap="setTheme('grey')">灰色</cl-button>
			</cl-row>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { useUi } from "/$/cool-ui";
import { useApp, useCool } from "/@/cool";

const { router } = useCool();
const ui = useUi();
const app = useApp();

function setTheme(name: string) {
	app.theme.set(name);
	router.push("/pages/demo/form/form");
}

function openToast() {
	ui.showToast("cool-cli");
}

function openConfirm() {
	ui.showConfirm({
		title: "提示",
		type: "warning",
		message: "是否要删除该联系人？",
	});
}

function openLoading() {
	ui.showLoading({
		text: "2秒后关闭",
		border: false,
	});

	setTimeout(() => {
		ui.hideLoading();
	}, 2000);
}
</script>
