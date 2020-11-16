<template>
	<view class="cl-dialog__wrapper">
		<cl-popup
			direction="center"
			:visible.sync="visible2"
			:before-close="beforeClose"
			:close-on-click-modal="closeOnClickModal"
			:size="width"
			@close="close"
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
			</view>
		</cl-popup>
	</view>
</template>

<script>
export default {
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
		beforeClose: Function
	},

	data() {
		return {
			visible2: false
		};
	},

	watch: {
		visible: {
			immediate: true,
			handler(val) {
				this.visible2 = val;
			}
		},

		visible2(val) {
			this.$emit("update:visible", val);
		}
	},

	methods: {
		close() {
			this.$emit("close");
		}
	}
};
</script>
