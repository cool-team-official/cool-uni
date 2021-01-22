<template>
	<view
		:class="['cl-list-item', isAppend, isDisabled, isBorder]"
		@touchstart="onTouchStart"
		@touchmove="onTouchMove"
		@touchend="onTouchEnd"
		@tap.stop="onTap"
	>
		<view
			class="cl-list-item__swiper"
			:style="{
				transform: translateX,
			}"
		>
			<view class="cl-list-item__container">
				<view class="cl-list-item__icon" v-if="$slots.icon">
					<slot name="icon"></slot>
				</view>

				<text class="cl-list-item__label" v-if="label && label != 'true'">{{ label }}</text>

				<view :class="['cl-list-item__content', isJustify, isColor]">
					<slot></slot>
				</view>

				<view class="cl-list-item__append">
					<slot name="append"></slot>
				</view>
			</view>

			<template v-if="swipe != 'none'">
				<view :class="[`cl-list-item__menu-${swipe}`]">
					<slot name="menu"></slot>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
import Parent from "../../mixins/parent";

/**
 * list-item 列表项
 * @description 列表项,自定义内容,支持滑动
 * @tutorial https://docs.cool-js.com/uni/components/layout/list.html
 * @property {String} label 标签内容
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} border 是否带有下边框，默认true
 * @property {Boolean} type 类型 primary | success | error | warning | info
 * @property {Boolean} justify 水平布局方式，默认end
 * @property {Boolean} swipe 是否滑动 none | left | right，默认none
 * @event {Function} tap 点击时触发
 * @example 见教程
 */

export default {
	name: "cl-list-item",

	componentName: "ClListItem",

	props: {
		// 标签内容
		label: String,
		// 是否禁用
		disabled: Boolean,
		// 是否带有下边框
		border: {
			type: Boolean,
			default: null,
		},
		// 类型 primary | success | error | warning | info
		type: String,
		// 水平布局方式
		justify: {
			type: String,
			default: "end",
		},
		// 是否滑动 none | left | right
		swipe: {
			type: String,
			default: "none",
			validator: (val) => {
				return ["none", "left", "right"].indexOf(val) !== -1;
			},
		},
	},

	mixins: [Parent],

	data() {
		return {
			touch: {
				start: 0,
				end: 0,
				x: 0,
				maxX: 0,
				direction: "left",
				lock: true,
			},

			menu: {
				width: 0,
			},

			Keys: ["disabled", "justify", "border"],

			ComponentName: "ClList",
		};
	},

	computed: {
		isColor() {
			return this.type ? `is-color-${this.type}` : "";
		},

		isBorder() {
			if (this.border === null) {
				if (this.parent.border === true) {
					return `is-border`;
				}
			}

			return this.border ? "is-border" : "";
		},

		isJustify() {
			return (this.parent.justify || this.justify) !== "start"
				? `is-justify-${this.justify}`
				: "";
		},

		isAppend() {
			return this.$slots.append ? "cl-list-item--append" : "";
		},

		isDisabled() {
			return this.parent.disabled || this.disabled ? "cl-list-item--disabled" : "";
		},

		translateX() {
			return `translateX(${this.touch.x}px)`;
		},
	},

	watch: {
		swipe() {
			this.setMenu();
		},
	},

	mounted() {
		this.setMenu();
	},

	methods: {
		onTap(e) {
			this.$emit("click", e);
			this.$emit("tap", e);
		},
		onTouchStart(e) {
			if (this.swipe != "none") {
				this.touch.start = e.touches[0].pageX;
				this.touch.lock = false;
			}
		},
		onTouchMove(e) {
			const { start, end, lock, maxX } = this.touch;

			if (!lock) {
				// 滑动距离
				let offsetX = e.touches[0].pageX - start;

				// 移动方向
				this.touch.direction = offsetX > 0 ? "right" : "left";

				// 偏移距离
				let x = end + offsetX;

				if (this.swipe == "left") {
					if (x > maxX) {
						x = maxX;
					}

					if (x < 0) {
						x = 0;
					}
				}

				if (this.swipe == "right") {
					if (x < maxX) {
						x = maxX;
					}

					if (x > 0) {
						x = 0;
					}
				}

				this.touch.x = x;
			}
		},
		onTouchEnd() {
			const { direction, x, end, lock, maxX } = this.touch;

			if (!lock) {
				if (Math.abs(x - end) > 50) {
					if (direction === this.swipe) {
						this.touch.x = 0;
					} else {
						this.touch.x = maxX;
					}

					this.touch.end = this.touch.x;
				} else {
					this.touch.x = end === 0 ? 0 : maxX;
				}

				this.touch.lock = true;
			}
		},
		// 设置菜单宽度
		setMenu() {
			if (this.swipe != "none") {
				const query = uni.createSelectorQuery().in(this);

				query
					.select(`.cl-list-item__menu-${this.swipe}`)
					.boundingClientRect((data) => {
						if (data) {
							this.menu.width = data.width;
							this.touch.maxX = this.menu.width * (this.swipe === "right" ? -1 : 1);
						}
					})
					.exec();
			}
		},
		// 滑动后还原位置的方法
		restore(callback) {
			this.touch.start = 0;
			this.touch.end = 0;
			this.touch.lock = true;
			this.touch.x = 0;

			if (callback) {
				setTimeout(() => {
					callback();
				}, 300);
			}
		},
	},
};
</script>
