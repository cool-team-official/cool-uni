<template>
	<view
		class="cl-page"
		:style="{
			padding: parseRpx(padding),
		}"
	>
		<!-- 遮罩层 -->
		<cl-loading-mask fullscreen :loading="loader.loading" :text="loader.text"></cl-loading-mask>

		<!-- 提示 -->
		<cl-toast :ref="setRefs('toast')"></cl-toast>

		<!-- 确认框 -->
		<cl-confirm :ref="setRefs('confirm')"></cl-confirm>

		<!-- 内容插槽 -->
		<slot></slot>
	</view>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive } from "vue";
import { useCool } from "/@/cool";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-page",

	props: {
		padding: {
			type: [Number, String],
			default: 0,
		},
	},

	setup() {
		const { proxy }: any = getCurrentInstance();
		const { refs, setRefs } = useCool();

		// 加载器
		const loader = reactive<any>({
			loading: false,
			text: "加载中",
		});

		// 显示加载框
		function showLoading(text: string) {
			loader.loading = true;
			loader.text = text;
		}

		// 隐藏加载框
		function hideLoading() {
			loader.loading = false;
		}

		// 提示框
		function showToast(options: ClToast.Options) {
			refs.value.toast.open(options);
		}

		// 确认框
		function showConfirm(options: ClConfirm.Options) {
			refs.value.confirm.open(options);
		}

		// 提示框
		function showTips(message: string, callback?: Function) {
			refs.value.confirm.open({
				title: "温馨提示",
				message,
				showCancelButton: false,
				callback,
			} as ClConfirm.Options);
		}

		// 追加方法
		proxy.$root.$cl_page = {
			showLoading,
			hideLoading,
			showToast,
			showConfirm,
			showTips,
		};

		return {
			refs,
			setRefs,
			loader,
			parseRpx,
		};
	},
});
</script>
