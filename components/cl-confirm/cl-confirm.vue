<template>
	<view class="cl-confirm">
		<cl-dialog :visible.sync="visible" :title="title" :width="width" @close="onClose">
			<view class="cl-confirm__message" v-if="message && !$slots.default">{{ message }}</view>
			<slot v-else></slot>

			<view class="cl-confirm__footer" slot="footer">
				<button
					v-if="showCancelButton"
					class="cl-confirm__button is-cancel"
					plain
					size="small"
					@tap="close('cancel')"
				>
					{{ cancelButtonText }}
				</button>
				<button
					v-if="showConfirmButton"
					class="cl-confirm__button is-confirm"
					plain
					size="small"
					@tap="close('confirm')"
				>
					{{ confirmButtonText }}
				</button>
			</view>
		</cl-dialog>
	</view>
</template>

<script>
/**
 * confirm 确认框
 * @description 确认框
 * @tutorial https://docs.cool-js.com/uni/components/operate/dialog.html
 * @example <cl-confirm ref="confirm"></cl-confirm>
 */

export default {
	name: "cl-confirm",

	data() {
		return {
			visible: false,
			closed: false,
			title: null,
			message: null,
			width: null,
			showCancelButton: null,
			cancelButtonText: null,
			showConfirmButton: null,
			confirmButtonText: null,
			closeOnClickModal: null,
			beforeClose: null,
			callback: null,
			duration: null,
			promise: {
				resolve: null,
				reject: null
			},
			timer: null
		};
	},

	methods: {
		open({
			title,
			message,
			width = "500rpx",
			showCancelButton = true,
			showConfirmButton = true,
			confirmButtonText = "确认",
			cancelButtonText = "取消",
			closeOnClickModal = true,
			callback,
			duration,
			beforeClose
		}) {
			return new Promise((resolve, reject) => {
				this.promise = {
					resolve,
					reject
				};

				this.visible = true;
				this.closed = false;

				// 设置选项
				this.$nextTick(() => {
					this.title = title;
					this.message = message;
					this.width = width;
					this.showConfirmButton = showConfirmButton;
					this.showCancelButton = showCancelButton;
					this.confirmButtonText = confirmButtonText;
					this.cancelButtonText = cancelButtonText;
					this.closeOnClickModal = closeOnClickModal;
					this.callback = callback;
					this.duration = duration;
					this.beforeClose = beforeClose;

					clearTimeout(this.timer);

					// 是否定时关闭
					if (duration) {
						this.timer = setTimeout(() => {
							this.close("close");
						}, duration);
					}
				});
			});
		},

		close(action = "close") {
			const done = () => {
				if (this.callback) {
					this.callback({ action });
				} else {
					if (action === "confirm") {
						this.promise.resolve();
					} else {
						this.promise.reject(action);
					}
				}

				this.$nextTick(() => {
					this.visible = false;
					this.closed = true;
				});
			};

			if (this.beforeClose) {
				this.beforeClose({ action, done });
			} else {
				done();
			}
		},

		onClose(action) {
			if (!this.closed) {
				this.close(action);
			}
		}
	}
};
</script>
