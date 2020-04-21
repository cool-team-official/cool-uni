<template>
	<view class="cl-confirm">
		<cl-dialog
			before-close
			:visible.sync="visible"
			:title="title"
			:width="width"
			@close="onClose"
		>
			<view class="cl-confirm__message" v-if="message">{{ message }}</view>
			<slot v-else></slot>

			<view class="cl-confirm__footer" slot="footer">
				<button
					class="cl-confirm__button is-cancel"
					v-if="showCancelButton"
					plain
					size="small"
					@tap="close('cancel')"
				>
					{{ cancelButtonText }}
				</button>
				<button
					class="cl-confirm__button is-confirm"
					v-if="showConfirmButton"
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
export default {
	data() {
		return {
			visible: false,
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
			promise: {
				resolve: null,
				reject: null
			}
		};
	},

	methods: {
		open(options) {
			return new Promise((resolve, reject) => {
				this.promise = {
					resolve,
					reject
				};

				Object.assign(
					this,
					{
						title: '',
						message: '',
						width: '80%',
						showConfirmButton: true,
						showCancelButton: true,
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						closeOnClickModal: true,
						callback: null,
						beforeClose: null
					},
					options
				);

				this.visible = true;
			});
		},

		close(action) {
			const done = () => {
				if (this.callback) {
					this.callback({ action });
				} else {
					if (action === 'confirm') {
						this.promise.resolve();
					} else {
						this.promise.reject(action);
					}
				}

				this.$nextTick(() => {
					this.visible = false;
				});
			};

			if (this.beforeClose) {
				this.beforeClose({ action, done });
			} else {
				done();
			}
		},

		onClose({ action }) {
			this.close(action);
		}
	}
};
</script>
