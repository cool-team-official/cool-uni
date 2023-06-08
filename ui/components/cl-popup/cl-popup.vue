<template>
	<view
		v-if="visible"
		:class="[
			'cl-popup__wrapper',
			`cl-popup__wrapper--${direction}`,
			`is-${status ? 'open' : 'close'}`,
			{
				'is-modal': modal,
			},
		]"
		:style="{
			zIndex,
		}"
		@touchmove.stop.prevent
	>
		<!-- 遮罩层 -->
		<view
			class="cl-popup__modal"
			:style="{
				background: modalBackground,
			}"
			@tap="modalClose"
			v-if="modal"
		></view>

		<!-- 内容 -->
		<view
			class="cl-popup"
			:style="{ height, width, backgroundColor, borderRadius: parseRpx(borderRadius) }"
		>
			<view class="cl-popup__container" :style="{ padding: parseRpx(padding) }">
				<slot></slot>
			</view>

			<view class="cl-popup__close" v-if="status && showCloseBtn" @tap="close">
				<text class="cl-icon-close-border"></text>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
/**
 * @description 弹出框
 * @property {Boolean} modelValue 是否可见
 * @property {Function} beforeClose 关闭前钩子函数
 * @property {String} direction 弹出方向，默认center
 * @property {Boolean} closeOnClickModal 点击遮罩层是否关闭，默认true
 * @property {String, Number} size 弹出框大小，默认auto
 * @property {String} backgroundColor 背景颜色，默认#fff
 * @property {String, Number} borderRadius 内容圆角
 * @property {String, Number} padding 内容内间据，默认20
 * @property {Boolean} modal 是否显示遮罩层
 */

import { computed, defineComponent, PropType, ref, watch } from "vue";
import { parseRpx } from "/@/cool/utils";

let id = 1;

export default defineComponent({
	name: "cl-popup",

	props: {
		modelValue: Boolean,
		direction: {
			type: String as PropType<"top" | "right" | "bottom" | "center" | "left">,
			default: "center",
		},
		size: {
			type: [String, Number],
			default: "auto",
		},
		backgroundColor: {
			type: String,
			default: "#fff",
		},
		borderRadius: [String, Number],
		padding: {
			type: [String, Number],
			default: 32,
		},
		closeOnClickModal: {
			type: Boolean,
			default: true,
		},
		modal: {
			type: Boolean,
			default: true,
		},
		zIndex: {
			type: Number,
			default: 600,
		},
		modalBackground: {
			type: String,
			default: "rgba(0, 0, 0, 0.4)",
		},
		showCloseBtn: Boolean,
	},

	emits: ["update:modelValue", "open", "opened", "close", "closed"],

	setup(props, { emit }) {
		// 是否可见
		const visible = ref(false);

		// 动画状态
		const status = ref(false);

		const zIndex = ref(0);

		// 计时器
		let timer: any = null;

		// 高
		const height = computed(() => {
			switch (props.direction) {
				case "top":
				case "bottom":
					return props.size;
				case "left":
				case "right":
					return "100%";
			}
		});

		// 宽
		const width = computed(() => {
			switch (props.direction) {
				case "top":
				case "bottom":
					return "100%";
				case "left":
				case "right":
				case "center":
					return props.size;
			}
		});

		// 打开
		function open() {
			// 层级
			zIndex.value = props.zIndex + id++;

			if (!visible.value) {
				// 显示内容
				visible.value = true;

				emit("update:modelValue", true);
				emit("open");

				clearTimeout(timer);

				timer = setTimeout(() => {
					// 开始动画
					status.value = true;

					// 等待动画结束
					timer = setTimeout(() => {
						emit("opened");
					}, 350);
				}, 50);
			}
		}

		// 关闭
		function close() {
			if (status.value) {
				const done = () => {
					// 关闭动画
					status.value = false;
					emit("close");

					clearTimeout(timer);

					timer = setTimeout(() => {
						// 隐藏内容
						visible.value = false;
						emit("update:modelValue", false);
						emit("closed");
					}, 300);
				};

				done();
			}
		}

		// 遮罩层关闭
		function modalClose() {
			if (!props.closeOnClickModal) {
				return false;
			}

			close();
		}

		watch(
			() => props.modelValue,
			(val: boolean) => {
				if (val) {
					open();
				} else {
					close();
				}
			},
			{
				immediate: true,
			}
		);

		return {
			visible,
			status,
			height,
			width,
			zIndex,
			parseRpx,
			open,
			close,
			modalClose,
		};
	},
});
</script>
