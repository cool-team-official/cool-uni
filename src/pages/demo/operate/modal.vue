<template>
	<view class="demo-modal">
		<cl-message ref="cl-message"></cl-message>

		<cl-card label="对话框">
			<!-- 弹出框 -->
			<cl-dialog
				title="清平调"
				:visible.sync="dialog.def"
				:show-cancel-button="false"
				:show-confirm-button="false"
			>
				<view>
					<text>云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。</text>
				</view>
			</cl-dialog>

			<cl-row>
				<cl-button  @tap="open('def')">
					默认
				</cl-button>
			</cl-row>
		</cl-card>

		<cl-card label="确认框">
			<!-- 确认框 -->
			<cl-confirm ref="cl-confirm"></cl-confirm>

			<cl-button  @tap="openConfirm">
				确认框
			</cl-button>
		</cl-card>

		<cl-card label="自定义">
			<!-- 自定义操作按钮 -->
			<cl-dialog
				:visible.sync="dialog.cs"
				:show-cancel-button="false"
				:show-confirm-button="false"
			>
				<view class="cs-det">
					<cl-avatar
						:size="120"
						src="https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/avatar.jpeg"
					>
					</cl-avatar>

					<text>这是一条消息</text>
				</view>

				<template slot="footer">
					<cl-button  size="small" @tap="close('cs')">取消</cl-button>
					<cl-button  type="primary" size="small">下一步</cl-button>
				</template>
			</cl-dialog>

			<cl-button  @tap="open('cs')">
				自定义
			</cl-button>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			dialog: {
				def: false,
				cs: false,
				confirm: false
			}
		};
	},

	methods: {
		openLoading() {
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
			}, 1500);
		},
		open(key) {
			this.dialog[key] = true;
		},
		openConfirm() {
			this.$refs['cl-confirm'].open({
				title: '提示',
				message: '你已成功下载COOL-UNI组件， 祝你有个愉快的体验~',
				callback: ({ action }) => {
					this.$refs['cl-message'].open({
						type: 'info',
						message:
							'点击了' +
							(action === 'cancel' ? '取消' : action === 'close' ? '关闭' : '确认')
					});
				}
			});
		},
		close(key) {
			this.dialog[key] = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.demo-modal {
	.cs-det {
		display: flex;
		align-items: center;

		/deep/.cl-avatar {
			margin-right: 40rpx;
		}
	}
}
</style>
