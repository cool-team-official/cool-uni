<template>
	<view class="cl-confirm">
		<cl-dialog
			v-model="visible"
			:title="conf.title"
			:width="conf.width"
			:close-on-click-modal="conf.closeOnClickModal"
			@close="onClose"
			@closed="onClosed"
		>
			<template #header>
				<view class="cl-confirm__header">
					<text class="cl-icon-toast-error" v-if="conf.type == 'error'"></text>
					<text class="cl-icon-toast-warning" v-else-if="conf.type == 'warning'"></text>
					<text class="cl-icon-toast-success" v-else-if="conf.type == 'success'"></text>
					<text class="cl-confirm__title">{{ conf.title }}</text>
				</view>
			</template>

			<view
				class="cl-confirm__container"
				:style="{
					textAlign: conf.message ? 'center' : 'left',
				}"
			>
				<slot>
					<view class="cl-confirm__message">{{ conf.message }}</view>
				</slot>
			</view>

			<template #footer v-if="conf.showCancelButton || conf.showConfirmButton">
				<view class="cl-confirm__footer">
					<view class="cl-confirm__footer-item" v-if="conf.showCancelButton">
						<cl-button fill @tap="close('cancel')">
							{{ conf.cancelButtonText }}</cl-button
						>
					</view>

					<view class="cl-confirm__footer-item" v-if="conf.showConfirmButton">
						<cl-button fill type="primary" :loading="loading" @tap="close('confirm')">
							{{ conf.confirmButtonText }}
						</cl-button>
					</view>
				</view>
			</template>
		</cl-dialog>
	</view>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from "vue";

export default defineComponent({
	name: "cl-confirm",

	setup() {
		// 是否可见
		const visible = ref(false);

		// 是否已关闭
		const closed = ref(true);

		// 是否加载中
		const loading = ref(false);

		// 配置
		const conf = ref<ClConfirm.Options>({});

		// 计时器
		let timer: any;

		// 锁
		let lock = false;

		// 打开
		function open(options: ClConfirm.Options) {
			lock = false;
			visible.value = false;
			clearTimeout(timer);

			function next() {
				visible.value = true;
				closed.value = false;

				// 设置选项
				nextTick(() => {
					conf.value = {
						width: "500rpx",
						showCancelButton: true,
						showConfirmButton: true,
						confirmButtonText: "确认",
						cancelButtonText: "取消",
						closeOnClickModal: true,
						...options,
					};

					// 是否定时关闭
					if (conf.value.duration) {
						timer = setTimeout(() => {
							close("close");
						}, conf.value.duration);
					}
				});
			}

			if (!closed.value) {
				setTimeout(() => {
					next();
				}, 350);
			} else {
				next();
			}
		}

		// 关闭
		function close(action: ClConfirm.Action = "close") {
			lock = true;

			// 完成
			function done() {
				if (conf.value.callback) {
					conf.value.callback(action);
				}

				nextTick(() => {
					visible.value = false;
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

			if (conf.value.beforeClose) {
				conf.value.beforeClose(action, { done, showLoading, hideLoading });
			} else {
				done();
			}
		}

		// 监听关闭
		function onClose() {
			clearTimeout(timer);

			if (!lock) {
				close("close");
			}
		}

		// 监听关闭后
		function onClosed() {
			closed.value = true;
		}

		return {
			visible,
			loading,
			conf,
			open,
			close,
			onClose,
			onClosed,
		};
	},
});
</script>
