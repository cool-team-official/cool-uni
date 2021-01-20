<template>
	<view
		v-if="show"
		:class="[
			'cl-popup__wrapper',
			`cl-popup__wrapper--${direction}`,
			`is-${status ? 'open' : 'close'}`,
		]"
		@touchmove.stop.prevent
	>
		<view class="cl-popup__modal" @tap="modalClose"></view>

		<view
			:class="['cl-popup']"
			:style="{ height, width, backgroundColor, borderRadius: parseRpx(borderRadius) }"
		>
			<view class="cl-popup__container" :style="{ padding: parseRpx(padding) }">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
import { parseRpx } from "../../utils";

/**
 * popup 弹出框
 * @description 支持各方向的弹出框
 * @tutorial https://docs.cool-js.com/uni/components/view/popup.html
 * @property {Boolean} visible 是否可见
 * @property {Function} beforeClose 关闭前钩子函数
 * @property {String} direction 弹出方向, top | right | bottom | left | center，默认left
 * @property {Boolean} closeOnClickModal 点击遮罩层是否关闭，默认true
 * @property {String, Number} size 弹出框大小，默认auto
 * @property {String} backgroundColor 背景颜色，默认#fff
 * @property {String, Number} borderRadius 内容圆角
 * @property {String, Number} padding 内容内间据，默认20
 * @example <cl-popup :visible.sync="visible">Hello !</cl-popup>
 */

export default {
	name: "cl-popup",

	props: {
		// 是否可见
		visible: Boolean,
		// 关闭前钩子函数
		beforeClose: Function,
		// 弹出方向
		direction: {
			type: String,
			default: "left",
		},
		// 点击遮罩层是否关闭
		closeOnClickModal: {
			type: Boolean,
			default: true,
		},
		// 弹出框大小
		size: {
			type: [String, Number],
			default: "auto",
		},
		// 背景颜色
		backgroundColor: {
			type: String,
			default: "#fff",
		},
		// 内容圆角
		borderRadius: [String, Number],
		// 内容内间据
		padding: {
			type: [String, Number],
			default: 20,
		},
	},

	data() {
		return {
			show: false,
			status: false,
			timer: null,
		};
	},

	computed: {
		height() {
			switch (this.direction) {
				case "top":
				case "bottom":
					return parseRpx(this.size);
				case "left":
				case "right":
					return "100%";
			}
		},

		width() {
			switch (this.direction) {
				case "top":
				case "bottom":
					return "100%";
				case "left":
				case "right":
				case "center":
					return parseRpx(this.size);
			}
		},
	},

	watch: {
		visible: {
			immediate: true,
			handler(val) {
				if (val) {
					this.open();
				} else {
					this.close();
				}
			},
		},
	},

	methods: {
		parseRpx,

		open() {
			if (!this.show) {
				// 显示内容
				this.show = true;

				this.$emit("update:visible", true);
				this.$emit("open");

				clearTimeout(this.timer);

				this.timer = setTimeout(() => {
					// 开始动画
					this.status = true;

					// 等待动画结束
					this.timer = setTimeout(() => {
						this.$emit("opened");
					}, 350);
				}, 50);
			}
		},

		close() {
			if (this.status) {
				const done = () => {
					// 关闭动画
					this.status = false;
					this.$emit("close");

					clearTimeout(this.timer);

					this.timer = setTimeout(() => {
						// 隐藏内容
						this.show = false;
						this.$emit("update:visible", false);
						this.$emit("closed");
					}, 300);
				};

				if (this.beforeClose) {
					this.beforeClose(done);
				} else {
					done();
				}
			}
		},

		modalClose() {
			if (!this.closeOnClickModal) {
				return false;
			}

			this.close();
		},
	},
};
</script>
