<template>
	<view class="cl-dialog__wrapper">
		<cl-popup
			v-model="visible"
			direction="center"
			:close-on-click-modal="closeOnClickModal"
			:size="width"
			:border-radius="16"
			:padding="0"
			@close="onClose"
			@closed="onClosed"
		>
			<view class="cl-dialog">
				<!-- 顶部 -->
				<view class="cl-dialog__header" v-if="title">
					<slot name="header">
						{{ title }}
					</slot>
				</view>

				<!-- 内容 -->
				<view class="cl-dialog__container" :style="{ textAlign }">
					<slot> </slot>
				</view>

				<!-- 底部 -->
				<view class="cl-dialog__footer" v-if="$slots.footer">
					<slot name="footer"> </slot>
				</view>

				<!-- 关闭按钮 -->
				<view class="cl-dialog__close" v-if="showCloseBtn" @tap="close">
					<text class="cl-icon-close"></text>
				</view>
			</view>
		</cl-popup>
	</view>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import type { PropType } from "vue";

export default defineComponent({
	name: "cl-dialog",

	props: {
		// 是否可见
		modelValue: Boolean,
		// 标题
		title: String,
		// 文字对齐
		textAlign: {
			type: String as PropType<"left" | "center" | "right">,
			default: "left",
		},
		// 宽度
		width: {
			type: String,
			default: "80%",
		},
		// 点击遮罩层是否关闭
		closeOnClickModal: {
			type: Boolean,
			default: true,
		},
		// 显示关闭按钮
		showCloseBtn: Boolean,
	},

	setup(props, { emit }) {
		const visible = ref(false);

		watch(
			() => props.modelValue,
			(val) => {
				visible.value = val;
			},
			{
				immediate: true,
			},
		);

		function open() {
			visible.value = true;
		}

		function close() {
			visible.value = false;
		}

		function onClose() {
			emit("update:modelValue", false);
			emit("close");
		}

		function onClosed() {
			emit("closed");
		}

		return {
			visible,
			open,
			close,
			onClose,
			onClosed,
		};
	},
});
</script>
