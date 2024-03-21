<template>
	<view
		class="cl-list-item"
		:class="[itemClass]"
		:style="[baseStyle]"
		@touchstart="onTouchStart"
		@touchmove="onTouchMove"
		@touchend="onTouchEnd"
		@click="tap"
	>
		<view
			class="cl-list-item__swiper"
			:style="{
				transform,
			}"
		>
			<view class="cl-list-item__container">
				<view class="cl-list-item__icon" v-if="$slots.icon">
					<slot name="icon"></slot>
				</view>

				<text class="cl-list-item__label" v-if="label && label != 'true'">{{ label }}</text>

				<view class="cl-list-item__content" :class="contentClass">
					<slot></slot>
				</view>

				<view class="cl-list-item__append">
					<slot name="append">
						<text v-if="arrowIcon" class="cl-icon-arrow-right"></text>
					</slot>
				</view>
			</view>

			<template v-if="swipe">
				<view :class="[`cl-list-item__menu-${swipe}`]">
					<slot name="menu"></slot>
				</view>
			</template>
		</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, watch } from "vue";
import { type PropType } from "vue";
import { isBoolean } from "lodash-es";
import { useTap, useStyle } from "../../hooks";
import { getParent } from "/@/cool/utils";

export default defineComponent({
	name: "cl-list-item",

	props: {
		// 标签内容
		label: String,
		// 类型
		type: String as PropType<"primary" | "success" | "error" | "warning" | "info">,
		// 水平排序
		justify: String as PropType<"start" | "end" | "center">,
		// 是否滑动
		swipe: String as PropType<"left" | "right">,
		// 是否禁用
		disabled: {
			type: Boolean,
			default: null,
		},
		// 是否带有下边框
		border: {
			type: Boolean,
			default: null,
		},
		// 是否显示右侧箭头
		arrowIcon: {
			type: Boolean,
			default: true,
		},
	},

	setup(props, { slots, emit }) {
		const instance = getCurrentInstance();

		// <cl-list />
		const parent = getParent("cl-list", ["justify", "border", "disabled"]);

		// 是否禁用
		const isDisabled = computed(() => {
			return isBoolean(props.disabled) ? props.disabled : parent.value?.disabled;
		});

		// 样式
		const itemClass = computed(() => {
			return [
				{
					"is-disabled": isDisabled.value,
					"is-append": !!slots.append,
					"is-swipe": !!props.swipe,
					"is-border": isBoolean(props.border) ? props.border : parent.value?.border,
				},
			];
		});

		// 内容样式
		const contentClass = computed(() => {
			const list: string[] = [];

			if (props.type) {
				list.push(`is-color-${props.type}`);
			}

			return [
				`is-color-${props.type}`,
				`is-justify-${props.justify || parent.value?.justify || "end"}`,
			];
		});

		// 触摸
		const touch = reactive({
			start: 0,
			end: 0,
			x: 0,
			maxX: 0,
			direction: "left",
			lock: true,
		});

		// 滑动菜单
		const menu = reactive({
			width: 0,
		});

		// 横向位置移动
		const transform = computed(() => {
			return props.swipe ? `translateX(${touch.x}px)` : "none";
		});

		// 滑动开始
		function onTouchStart(e: TouchEvent) {
			if (props.swipe) {
				touch.start = e.touches[0].pageX;
				touch.lock = false;
			}
		}

		// 滑动中
		function onTouchMove(e: TouchEvent) {
			const { start, end, lock, maxX } = touch;

			if (!lock) {
				// 滑动距离
				const offsetX = e.touches[0].pageX - start;

				// 移动方向
				touch.direction = offsetX > 0 ? "right" : "left";

				// 偏移距离
				let x = end + offsetX;

				if (props.swipe == "left") {
					if (x > maxX) {
						x = maxX;
					}

					if (x < 0) {
						x = 0;
					}
				}

				if (props.swipe == "right") {
					if (x < maxX) {
						x = maxX;
					}

					if (x > 0) {
						x = 0;
					}
				}

				touch.x = x;
			}
		}

		// 滑动结束
		function onTouchEnd() {
			const { direction, x, end, lock, maxX } = touch;
			const sw = menu.width / 2 > 50 ? 50 : menu.width / 2;

			if (!lock) {
				if (Math.abs(x - end) > sw) {
					if (direction === props.swipe) {
						touch.x = 0;
					} else {
						touch.x = maxX;
					}

					touch.end = touch.x;
				} else {
					touch.x = end === 0 ? 0 : maxX;
				}

				touch.lock = true;
			}
		}

		// 设置菜单宽度
		function setMenu() {
			if (props.swipe) {
				const query = uni.createSelectorQuery().in(instance?.proxy);

				query
					.select(`.cl-list-item__menu-${props.swipe}`)
					.boundingClientRect((data) => {
						if (data) {
							menu.width = data.width || 0;
							touch.maxX = menu.width * (props.swipe === "right" ? -1 : 1);
						}
					})
					.exec();
			}
		}

		// 滑动后还原位置的方法
		function restore(cb: () => void) {
			touch.start = 0;
			touch.end = 0;
			touch.lock = true;
			touch.x = 0;

			if (cb) {
				setTimeout(() => {
					cb();
				}, 300);
			}
		}

		// 重新设置滑动菜单
		watch(() => props.swipe, setMenu);

		onMounted(() => {
			setMenu();
		});

		return {
			itemClass,
			contentClass,
			touch,
			menu,
			transform,
			restore,
			onTouchStart,
			onTouchMove,
			onTouchEnd,
			...useTap(emit),
			...useStyle(),
		};
	},
});
</script>
