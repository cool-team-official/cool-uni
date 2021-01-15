<template>
	<view
		class="cl-scroller"
		:style="{
			transform,
			transition,
		}"
		@touchmove="onTouchMove"
		@touchstart="onTouchStart"
		@touchend="onTouchEnd"
	>
		<view
			class="cl-scroller__loading"
			:style="{
				top: `-${height}px`,
			}"
		>
			<slot name="loading" :text="text" :status="status" :move="touch.move">
				<cl-loading :size="20"></cl-loading>
				<cl-text :size="26" :margin="[0, 0, 0, 14]" :value="text"></cl-text>
			</slot>
		</view>

		<scroll-view
			class="cl-scroller__view"
			scroll-y
			enable-back-to-top
			:lower-threshold="100"
			@scroll="onScroll"
			@scrolltolower="up"
		>
			<slot></slot>
		</scroll-view>
	</view>
</template>

<script>
/**
 * scroller 滚动区域
 * @description
 * @tutorial https://docs.cool-js.com/uni/components/layout/grid.html
 * @property {Number} threshold 下拉多少px时触发刷新
 * @property {Number} loadingText 正在刷新
 * @property {Number} pullingText 下拉刷新
 * @property {Number} releaseText 释放刷新
 * @example 见教程
 */

export default {
	props: {
		threshold: {
			type: Number,
			default: 80,
		},
		loadingText: {
			type: String,
			default: "正在刷新",
		},
		pullingText: {
			type: String,
			default: "下拉刷新",
		},
		releaseText: {
			type: String,
			default: "释放刷新",
		},
	},

	data() {
		return {
			touch: {
				start: 0,
				move: 0,
			},
			height: 0,
			scrollTop: 0,
			status: "end", // pulling, loading, end
		};
	},

	mounted() {
		this.init();
	},

	computed: {
		transform() {
			return this.touch.move ? `translate3d(0, ${this.touch.move}px, 0)` : "";
		},

		transition() {
			return ["end", "loading"].includes(this.status) ? "transform 0.3s" : "";
		},

		isReleasable() {
			return this.touch.move >= this.threshold;
		},

		text() {
			switch (this.status) {
				case "pulling":
					return this.isReleasable ? this.releaseText : this.pullingText;
				case "loading":
					return this.loadingText;
				default:
					return this.pullingText;
			}
		},
	},

	methods: {
		onTouchStart(e) {
			if (this.status == "end") {
				this.touch.start = e.changedTouches[0].clientY;
				this.status = "pulling";
			}
		},

		onTouchMove(e) {
			if (this.status == "pulling" && this.scrollTop <= 10) {
				let offset = e.changedTouches[0].clientY - this.touch.start;

				if (offset <= 200) {
					this.touch.move = offset;
				}
			}
		},

		onTouchEnd(e) {
			if (this.isReleasable) {
				this.down();
			} else {
				this.end();
			}
		},

		onScroll(e) {
			this.scrollTop = e.detail.scrollTop;
		},

		// 初始化
		init() {
			// 获取加载框的高度
			uni.createSelectorQuery()
				.in(this)
				.select(".cl-scroller__loading")
				.fields({ size: true }, (d) => {
					this.height = d.height;
				})
				.exec();
		},

		// 下拉刷新
		down() {
			this.status = "loading";
			this.touch.move = this.height;
			this.$emit("down");
		},

		// 上拉加载
		up() {
			this.$emit("up");
		},

		// 收起，结束
		end() {
			this.status = "end";
			this.touch.move = 0;
		},
	},
};
</script>
