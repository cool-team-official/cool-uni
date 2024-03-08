<template>
	<cl-page :padding="20">
		<cl-confirm ref="Confirm"> </cl-confirm>

		<cl-confirm ref="Confirm2">
			<cl-input />
		</cl-confirm>

		<cl-confirm ref="Confirm3"> </cl-confirm>

		<cl-confirm ref="Confirm4"> </cl-confirm>

		<cl-card label="基础用法">
			<cl-button @tap="open">打开</cl-button>
		</cl-card>

		<cl-card label="自定义内容">
			<cl-button @tap="open2">打开</cl-button>
		</cl-card>

		<cl-card label="关闭回掉">
			<cl-button @tap="open3">打开</cl-button>
		</cl-card>

		<cl-card label="不同类型">
			<cl-button @tap="open4('success')">成功</cl-button>
			<cl-button @tap="open4('warning')">警告</cl-button>
			<cl-button @tap="open4('error')">错误</cl-button>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUi } from "/$/cool-ui";

const ui = useUi();

const Confirm = ref<ClConfirm.Ref>();
const Confirm2 = ref<ClConfirm.Ref>();
const Confirm3 = ref<ClConfirm.Ref>();
const Confirm4 = ref<ClConfirm.Ref>();

function open() {
	Confirm.value?.open({
		title: "提示",
		message: "你有一个待取信件",
		callback(action) {
			console.log(action);

			switch (action) {
				case "confirm":
					ui.showToast("领取成功");
					break;

				case "cancel":
					ui.showToast("已取消");
					break;

				case "close":
					ui.showToast("已关闭");
					break;
			}
		},
	});
}

function open2() {
	Confirm2.value?.open({
		title: "提示",
	});
}

function open3() {
	Confirm3.value?.open({
		title: "提示",
		message: "你有一个待取信件",
		beforeClose(action, { done, showLoading, hideLoading }) {
			console.log(action);

			if (action == "confirm") {
				showLoading();

				setTimeout(() => {
					done();
					ui.showToast("领取成功");
				}, 1500);
			} else {
				done();
			}
		},
	});
}

function open4(type: "success" | "warning" | "error") {
	Confirm4.value?.open({
		title: "提示",
		message: "这是一条消息",
		type,
		showCancelButton: false,
	});
}
</script>
