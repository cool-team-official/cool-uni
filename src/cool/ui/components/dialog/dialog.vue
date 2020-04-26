<template>
	<view
		class="cl-dialog__wrapper"
		:class="[
			{
				show: visible
			}
		]"
	>
		<!-- 遮罩层 -->
		<view class="cl-dialog__modal" @tap="modalClose"></view>

		<!-- 显示区域 -->
		<view
			class="cl-dialog"
			:style="{
				width
			}"
		>
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
	</view>
</template>

<script>
export default {
	props: {
		// 是否可见
		visible: Boolean,
		// 标题
		title: String,
		// 类型
		type: String,
		// 宽度
		width: {
			type: String,
			default: '80%'
		},
		// 点击遮罩层是否关闭
		closeOnClickModal: {
			type: Boolean,
			default: true
		},
		// 关闭前
		beforeClose: Boolean
	},

	methods: {
		close(action) {
			const done = () => {
				this.$emit('update:visible', false);
			};

			if (this.beforeClose) {
				this.$emit('close', { action, done });
			} else {
				this.$emit('close', { action });
				done();
			}
		},

		modalClose() {
			if (!this.closeOnClickModal) {
				return false;
			}

			this.close('close');
		}
	}
};
</script>
