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
			<view class="cl-popup__header" v-if="title && showHeader">
				<slot name="header">{{ title }}</slot>
			</view>

			<view class="cl-popup__container" :style="{ padding: parseRpx(padding), paddingTop }">
				<slot></slot>
			</view>

			<view class="cl-popup__close" v-if="status && showCloseBtn" @tap="close">
				<text class="cl-icon-close"></text>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, type PropType } from "vue";
import { parseRpx } from "/@/cool/utils";
import { router } from "/@/cool";

const { statusBarHeight = 0 } = uni.getSystemInfoSync();

let id = 1;

export default defineComponent({
	name: "cl-popup",

	props: {
		// 是否可见
		modelValue: Boolean,
		// 标题
		title: String,
		// 是否显示头部
		showHeader: {
			type: Boolean,
			default: true,
		},
		// 弹出方向
		direction: {
			type: String as PropType<"top" | "right" | "bottom" | "center" | "left">,
			default: "center",
		},
		// 弹出框宽度
		size: {
			type: [String, Number],
			default: "auto",
		},
		// 內间距
		padding: {
			type: [String, Number],
			default: 32,
		},
		// 弹出框圆角
		borderRadius: [Number, Array, String],
		// 显示关闭按钮
		showCloseBtn: Boolean,
		// 背景色
		backgroundColor: {
			type: String,
			default: "#fff",
		},
		// 是否显示遮罩层
		modal: {
			type: Boolean,
			default: true,
		},
		// 遮罩层背景色
		modalBackground: {
			type: String,
			default: "rgba(0, 0, 0, 0.4)",
		},
		// 点击遮罩层是否关闭
		closeOnClickModal: {
			type: Boolean,
			default: true,
		},
		// 层级
		zIndex: {
			type: Number,
			default: 600,
		},
	},

	emits: ["update:modelValue", "open", "opened", "close", "closed"],

	setup(props, { emit }) {
		// 是否可见
		const visible = ref(false);

		// 动画状态
		const status = ref(false);

		// 层级
		const zIndex = ref(0);

		// 计时器
		let timer: any = null;

		// 高
		const height = computed(() => {
			switch (props.direction) {
				case "top":
				case "bottom":
					return parseRpx(props.size);
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
					return parseRpx(props.size);
			}
		});

		// 顶部距离
		const paddingTop = computed(() => {
			if (["left", "right", "top"].includes(props.direction)) {
				let h = 0;

				if (router.info()?.isCustomNavbar) {
					h += statusBarHeight;
				} else {
					// #ifdef H5
					h += 44 + statusBarHeight;
					// #endif
				}

				let [t] = parseRpx(props.padding).split(" ");

				if (t == "0rpx") {
					t = "0px";
				}

				return `calc(${h}px + ${t})`;
			} else {
				return 1;
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
			},
		);

		return {
			visible,
			status,
			height,
			width,
			paddingTop,
			zIndex,
			parseRpx,
			open,
			close,
			modalClose,
		};
	},
});
</script>
