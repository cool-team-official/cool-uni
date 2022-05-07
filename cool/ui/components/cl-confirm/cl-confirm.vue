<template>
	<view class="cl-confirm">
		<cl-dialog v-model="visible" :title="conf.title" :width="conf.width" @close="onClose">
			<slot>
				<view class="cl-confirm__message">{{ conf.message }}</view>
			</slot>

			<template #footer>
				<view class="cl-confirm__footer">
					<view class="cl-confirm__footer-item" v-if="conf.showCancelButton">
						<cl-button
							plain
							fill
							:height="70"
							:border="false"
							:border-radius="0"
							@tap="close('cancel')"
						>
							{{ conf.cancelButtonText }}</cl-button
						>
					</view>

					<view class="cl-confirm__footer-item" v-if="conf.showConfirmButton">
						<cl-button
							plain
							fill
							:height="70"
							type="text"
							:border="false"
							:loading="loading"
							:border-radius="0"
							@tap="close('confirm')"
						>
							{{ conf.confirmButtonText }}
						</cl-button>
					</view>
				</view>
			</template>
		</cl-dialog>
	</view>
</template>

<script lang="ts">
/**
 * @description 确认框
 */

import { defineComponent, nextTick, reactive, ref } from "vue";

export default defineComponent({
	name: "cl-confirm",

	setup() {
		// 是否可见
		const visible = ref<boolean>(false);

		// 是否已关闭
		const closed = ref<boolean>(false);

		// 是否加载中
		const loading = ref<boolean>(false);

		// 配置
		const conf = reactive<ClConfirm.Options>({
			title: "",
			message: "",
			width: "500rpx",
			showCancelButton: true,
			cancelButtonText: "取消",
			showConfirmButton: true,
			confirmButtonText: "确认",
			closeOnClickModal: true,
		});

		// 计时器
		let timer: any = null;

		// 打开
		function open(options: ClConfirm.Options) {
			visible.value = true;
			closed.value = false;

			// 设置选项
			nextTick(() => {
				Object.assign(
					conf,
					{
						width: "500rpx",
						showCancelButton: true,
						showConfirmButton: true,
						confirmButtonText: "确认",
						cancelButtonText: "取消",
						closeOnClickModal: true,
					},
					options
				);

				clearTimeout(timer);

				// 是否定时关闭
				if (conf.duration) {
					timer = setTimeout(() => {
						close("close");
					}, conf.duration);
				}
			});
		}

		// 关闭
		function close(action: ClConfirm.Action = "close") {
			// 完成
			function done() {
				if (conf.callback) {
					conf.callback(action);
				}

				nextTick(() => {
					visible.value = false;
					closed.value = true;
					hideLoading();
				});
			}

			// 加载中
			function showLoading() {
				loading.value = true;
			}

			// 关闭加载
			function hideLoading() {
				loading.value = false;
			}

			if (conf.beforeClose) {
				conf.beforeClose(action, { done, showLoading, hideLoading });
			} else {
				done();
			}
		}

		// 监听关闭
		function onClose(action: ClConfirm.Action) {
			if (!closed.value) {
				close(action);
			}
		}

		return {
			visible,
			loading,
			conf,
			open,
			close,
			onClose,
		};
	},
});
</script>
