<template>
	<view class="cl-dialog__wrapper">
		<cl-popup
			direction="center"
			:visible.sync="visible2"
			:before-close="beforeClose"
			:close-on-click-modal="closeOnClickModal"
			:size="width"
			:border-radius="16"
			:padding="0"
		>
			<view class="cl-dialog">
				<view class="cl-dialog__header" v-if="title">
					<text class="cl-dialog__title">{{ title }}</text>
				</view>

				<view class="cl-dialog__container">
					<view class="cl-dialog__message">
						<slot></slot>
					</view>
				</view>

				<view class="cl-dialog__footer" v-if="$slots.footer">
					<slot name="footer"> </slot>
				</view>

				<view class="cl-dialog__close" v-if="showCloseBtn" @tap="close">
					<text class="cl-icon-close"></text>
				</view>
			</view>
		</cl-popup>
	</view>
</template>

<script>
/**
 * dialog 对话框
 * @description 对话框
 * @tutorial https://docs.cool-js.com/uni/components/operate/dialog.html
 * @property {Boolean} visible 是否可见
 * @property {String} title 标题
 * @property {String} width 宽度，默认80%
 * @property {Boolean} closeOnClickModal 点击遮罩层是否关闭，默认true
 * @property {Function} beforeClose 关闭回调
 * @property {Boolean} showCloseBtn 显示关闭按钮
 * @example <cl-dialog :visible.sync="visible">Hello !</cl-dialog>
 */

export default {
	name: "cl-dialog",

	props: {
		// 是否可见
		visible: Boolean,
		// 标题
		title: String,
		// 宽度
		width: {
			type: String,
			default: "80%"
		},
		// 点击遮罩层是否关闭
		closeOnClickModal: {
			type: Boolean,
			default: true
		},
		// 关闭回调
		beforeClose: Function,
		// 显示关闭按钮
		showCloseBtn: Boolean
	},

	data() {
		return {
			visible2: this.visible
		};
	},

	watch: {
		visible: {
			handler(val) {
				this.visible2 = val;

				if (val) {
					this.$emit("open");
				} else {
					this.$emit("close", "close");
				}
			}
		},

		visible2(val) {
			this.$emit("update:visible", val);
		}
	},

	methods: {
		close() {
			this.visible2 = false;
		}
	}
};
</script>
