<template>
	<view class="cl-tabs" :class="[classList]">
		<view
			class="cl-tabs__header"
			:style="{
				top: stickyTop,
			}"
		>
			<scroll-view
				class="cl-tabs__bar"
				scroll-with-animation
				scroll-x
				:scroll-left="scrollLeft"
				:style="{
					backgroundColor,
				}"
			>
				<view
					class="cl-tabs__bar-box"
					:style="{
						'text-align': justify,
					}"
				>
					<view
						class="cl-tabs__bar-item"
						v-for="(item, index) in tabs"
						:key="index"
						:style="{
							color: value === item.name ? color : unColor,
							padding: `0 ${gutter}rpx`,
						}"
						:class="{
							'is-active': value === item.name,
						}"
						@tap="change(index)"
					>
						<!-- 前缀图标 -->
						<text
							v-if="item.prefixIcon"
							class="cl-tabs__icon cl-tabs__icon--prefix"
							:class="[item.prefixIcon]"
						></text>

						<!-- 文本内容 -->
						<text class="cl-tabs__label">{{ item.label }}</text>

						<!-- 后缀图标 -->
						<text
							v-if="item.suffixIcon"
							class="cl-tabs__icon cl-tabs__icon--suffix"
							:class="[item.suffixIcon]"
						></text>
					</view>

					<!-- 选中样式 -->
					<view
						class="cl-tabs__line"
						v-if="lineLeft > 0"
						:style="{
							'background-color': color,
							left: lineLeft + 'px',
						}"
					></view>
				</view>
			</scroll-view>
		</view>

		<view
			class="cl-tabs__container"
			ref="pane"
			@touchstart="onTouchStart"
			@touchend="onTouchEnd"
		>
			<slot></slot>
		</view>
	</view>
</template>

<script>
/**
 * tabs 选项卡
 * @description 选项卡，支持滑动，自定义内容
 * @tutorial https://docs.cool-js.com/uni/components/nav/tabs.html
 * @property {String, Number} value 绑定值
 * @property {Array} labels 标签列表
 * @property {Boolean} loop 是否循环显示，默认true
 * @property {Boolean} swipeable 是否滑动
 * @property {Number} swipeThreshold 滑动阈值，默认60
 * @property {Boolean} sticky 是否吸顶
 * @property {String} stickyTop 吸顶顶部距离
 * @property {Boolean} scrollView 是否滚动视图，默认true
 * @property {Boolean} fill 标签是否填充
 * @property {String} justify 水平布局
 * @property {Boolean} border 是否带有下边框，默认true
 * @property {Number} gutter 标签间隔，默认20
 * @property {String} color 字体及浮标颜色，默认主色
 * @example 见教程
 */

export default {
	name: "cl-tabs",

	componentName: "ClTabs",

	props: {
		// 绑定值
		value: [String, Number],
		// 离开前
		beforeLeave: Function,
		// 标签列表
		labels: {
			type: Array,
			default: null,
		},
		// 是否循环显示
		loop: {
			type: Boolean,
			default: true,
		},
		// 是否滑动
		swipeable: Boolean,
		// 滑动阈值
		swipeThreshold: {
			type: Number,
			default: 60,
		},
		// 是否吸顶
		sticky: Boolean,
		// 吸顶顶部距离
		stickyTop: String,
		// 是否滚动视图
		scrollView: {
			type: Boolean,
			default: true,
		},
		// 标签是否填充
		fill: Boolean,
		// 水平布局
		justify: {
			type: String,
			default: "center",
		},
		// 是否带有下边框
		border: {
			type: Boolean,
			default: true,
		},
		// 标签间隔
		gutter: {
			type: Number,
			default: 20,
		},
		// 字体及浮标颜色，默认主色
		color: String,
		// 未选中字体颜色
		unColor: {
			type: String,
			default: "",
		},
		// 背景颜色
		backgroundColor: {
			type: String,
			default: "#fff",
		},
	},

	data() {
		return {
			list: [],
			current: 0,
			lineLeft: 0,
			scrollLeft: 0,
			clientX: "",
			clientY: "",
			offsetLeft: 0,
			width: 375,
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.current = val || 0;
			},
		},

		current(val) {
			this.onOffset(val);
		},

		labels() {
			this.refresh();
		},
	},

	computed: {
		tabs() {
			return (this.labels || this.list).map((e, i) => {
				e.name = e.name || i;
				return e;
			});
		},

		isSticky() {
			return this.sticky ? "cl-tabs--sticky" : "";
		},

		classList() {
			let list = [];

			if (this.$slots.default || this.$slots.$default) {
				list.push("is-content");
			}

			if (this.sticky) {
				list.push("is-sticky");
			}

			if (this.fill) {
				list.push("is-fill");
			}

			if (this.border) {
				list.push("is-border");
			}

			return list.join(" ");
		},
	},

	mounted() {
		this.refresh();
	},

	methods: {
		refresh() {
			this.$nextTick(() => {
				// #ifdef H5
				let children = this.$refs.pane.$children;
				// #endif

				// #ifndef H5
				let children = this.$children;
				// #endif

				this.list = children.map((e, i) => {
					return {
						label: e.label,
						prefixIcon: e.prefixIcon,
						suffixIcon: e.suffixIcon,
						lazy: e.lazy,
					};
				});

				// 获取选项卡宽度
				uni.createSelectorQuery()
					// #ifndef MP-ALIPAY
					.in(this)
					// #endif
					.select(".cl-tabs")
					.boundingClientRect((d) => {
						this.offsetLeft = d.left;
						this.width = d.width;
						this.getRect();
					})
					.exec();
			});
		},

		onTouchStart(e) {
			this.clientX = e.changedTouches[0].clientX;
			this.clientY = e.changedTouches[0].clientY;
		},

		onTouchEnd(e) {
			const subX = e.changedTouches[0].clientX - this.clientX;
			const subY = e.changedTouches[0].clientY - this.clientY;

			// 判断手势滑动方式
			if (this.swipeable) {
				if (subY < 50 && subY > -50) {
					if (subX > this.swipeThreshold) {
						this.prev();
					} else if (subX < -this.swipeThreshold) {
						this.next();
					}
				}
			}
		},

		async change(index) {
			const { name } = this.tabs[index];

			let flag = true;

			if (this.beforeLeave) {
				const fn = this.beforeLeave(name);

				if (!!fn && typeof fn.then === "function") {
					flag = !!(await fn.catch(() => null));
				} else {
					flag = fn;
				}
			}

			if (flag) {
				this.$emit("input", name);
				this.$emit("tab-change", name);
				this.current = name;
			}
		},

		getIndex() {
			return this.tabs.findIndex((e) => e.name == this.current);
		},

		prev() {
			let index = this.getIndex();

			this.change(index <= 0 ? (this.loop ? this.list.length - 1 : 0) : index - 1);
		},

		next() {
			let index = this.getIndex();

			this.change(
				index >= this.list.length - 1 ? (this.loop ? 0 : this.list.length - 1) : index + 1
			);
		},

		getRect() {
			this.$nextTick(() => {
				uni.createSelectorQuery()
					.in(this)
					.selectAll(".cl-tabs__bar-item")
					.fields({ rect: true, size: true })
					.exec((d) => {
						this.tabRect = d[0];
						this.onOffset();
					});
			});
		},

		onOffset() {
			if (this.tabRect) {
				this.$nextTick(() => {
					let item = this.tabRect[this.getIndex()];

					if (item) {
						let scrollLeft =
							item.left - (this.width - item.width) / 2 - this.offsetLeft;

						if (scrollLeft < 0) {
							scrollLeft = 0;
						}

						this.scrollLeft = scrollLeft;
						this.lineLeft = item.left + item.width / 2 - 8 - this.offsetLeft;
					}
				});
			}
		},
	},
};
</script>
