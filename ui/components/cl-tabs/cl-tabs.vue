<template>
	<view
		class="cl-tabs"
		:class="[
			{
				'is-content': $slots.default,
				'is-fill': fill,
				'is-border': border,
				'is-dropdown': showDropdown,
				'is-checkable': checkable,
			},
		]"
		:style="{
			backgroundColor: backgroundColor,
		}"
	>
		<view class="cl-tabs__header">
			<scroll-view
				class="cl-tabs__bar"
				scroll-with-animation
				scroll-x
				:scroll-left="scrollLeft"
				:style="{
					height: parseRpx(height),
				}"
			>
				<view
					class="cl-tabs__bar-box"
					:style="{
						'justify-content': justify,
					}"
				>
					<view
						class="cl-tabs__bar-item"
						v-for="(item, index) in tabs"
						:key="index"
						:style="{
							color: current === item.value ? color : unColor,
							padding: `0 ${gutter}rpx`,
						}"
						:class="{
							'is-active': current === item.value,
						}"
						@tap="change(index)"
					>
						<!-- 前缀图标 -->
						<text
							v-if="item.prefixIcon"
							class="cl-tabs__icon is-prefix"
							:class="[item.prefixIcon]"
						></text>

						<!-- 文本内容 -->
						<text class="cl-tabs__label">{{ item.label }}</text>

						<!-- 后缀图标 -->
						<text
							v-if="item.suffixIcon"
							class="cl-tabs__icon is-suffix"
							:class="[item.suffixIcon]"
						></text>
					</view>

					<!-- 选中样式 -->
					<view
						class="cl-tabs__line"
						v-if="lineLeft > 0 && showLine"
						:style="{
							'background-color': color,
							left: lineLeft + 'px',
						}"
					></view>
				</view>
			</scroll-view>

			<!-- 下拉图标 -->
			<view class="cl-tabs__dropdown" @tap="openDropdown" v-if="showDropdown">
				<cl-icon :name="`${dropdown.visible ? 'arrow-top' : 'arrow-bottom'}`"></cl-icon>
			</view>

			<!-- 下拉列表 -->
			<view
				class="cl-tabs__dropdown-box"
				:style="{
					maxHeight: dropdown.visible ? dropdown.height : '0',
				}"
			>
				<slot name="dropdown"></slot>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
/**
 * @description 选项卡
 * @property {String, Number} modelValue 绑定值
 * @property {String, Number} height 高度，默认80
 * @property {Array} list 标签列表
 * @property {Boolean} loop 是否循环显示，默认true
 * @property {Boolean} fill 标签是否填充
 * @property {String} justify 水平布局
 * @property {Boolean} border 是否带有下边框，默认true
 * @property {Number} gutter 标签间隔，默认20
 * @property {String} color 字体及浮标颜色，默认主色
 * @property {String} unColor 未选中字体及浮标颜色
 * @property {String} backgroundColor 背景颜色
 * @property {Boolean} showDropdown 是否显示下拉按钮
 */

import {
	computed,
	defineComponent,
	getCurrentInstance,
	nextTick,
	onMounted,
	type PropType,
	reactive,
	ref,
	watch,
} from "vue";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-tabs",

	props: {
		modelValue: [String, Number],
		height: {
			type: [String, Number],
			default: 80,
		},
		list: {
			type: Array as PropType<{ label: string; value: any; [key: string]: any }[]>,
			default: [],
		},
		loop: {
			type: Boolean,
			default: true,
		},
		fill: Boolean,
		justify: {
			type: String as PropType<"start" | "center" | "end">,
			default: "start",
		},
		border: {
			type: Boolean,
			default: true,
		},
		gutter: {
			type: Number,
			default: 30,
		},
		color: {
			type: String,
			default: "",
		},
		unColor: {
			type: String,
			default: "",
		},
		backgroundColor: {
			type: String,
			default: "#fff",
		},
		showDropdown: Boolean,
		showLine: {
			type: Boolean,
			default: true,
		},
		checkable: Boolean,
		disabled: Boolean,
	},

	emits: ["update:modelValue", "change"],

	setup(props, { emit }) {
		const { proxy }: any = getCurrentInstance();

		// 当前选中
		const current = ref<number | string>();

		// 下划线左位移
		const lineLeft = ref(0);

		// 左滚动距离
		const scrollLeft = ref(0);

		// 左位移
		const offsetLeft = ref(0);

		// 宽度
		const width = ref(375);

		// 列表
		const tabs = computed(() => props.list);

		// 刷新
		function refresh() {
			nextTick(() => {
				// 获取选项卡宽度
				uni.createSelectorQuery()
					// #ifndef MP-ALIPAY
					.in(proxy)
					// #endif
					.select(".cl-tabs")
					.boundingClientRect((d: any) => {
						offsetLeft.value = d.left;
						width.value = d.width;
						getRect();
					})
					.exec();
			});
		}

		// 下拉
		const dropdown = reactive({
			visible: false,
			height: "200rpx",
			timer: null as any,
		});

		// 打开下拉框
		function openDropdown() {
			dropdown.visible = !dropdown.visible;

			// 清除计时器
			clearTimeout(dropdown.timer);

			if (dropdown.visible) {
				const fn = () => {
					uni.createSelectorQuery()
						// #ifndef MP-ALIPAY
						.in(proxy)
						// #endif
						.select(".cl-tabs__dropdown-box")
						.boundingClientRect((res) => {
							dropdown.height = res.height + "px";
						})
						.exec();
				};

				// 获取下拉区域高度
				dropdown.timer = setTimeout(fn, 300);
			}
		}

		// 关闭下拉框
		function closeDropdown() {
			dropdown.visible = false;
		}

		// 改变
		async function change(index: number) {
			if (props.disabled) {
				return false;
			}

			let { value } = tabs.value[index];

			if (props.checkable) {
				if (value == current.value) {
					value = undefined;
				}
			}

			emit("update:modelValue", value);
			emit("change", value);
			current.value = value;
		}

		// 获取下标
		function getIndex() {
			return tabs.value.findIndex((e) => e.value == current.value);
		}

		// 上一个
		function prev() {
			let index = getIndex();

			change(index <= 0 ? (props.loop ? tabs.value.length - 1 : 0) : index - 1);
		}

		// 下一个
		function next() {
			let index = getIndex();

			change(
				index >= tabs.value.length - 1
					? props.loop
						? 0
						: tabs.value.length - 1
					: index + 1
			);
		}

		const rect = ref<any>();

		// 大小
		function getRect() {
			nextTick(() => {
				uni.createSelectorQuery()
					.in(proxy)
					.selectAll(".cl-tabs__bar-item")
					.fields({ rect: true, size: true }, () => {})
					.exec((d) => {
						rect.value = d[0];
						onOffset();
					});
			});
		}

		// 间距
		function onOffset() {
			if (rect.value) {
				nextTick(() => {
					let item = rect.value[getIndex()];

					if (item) {
						let x = item.left - (width.value - item.width) / 2 - offsetLeft.value;

						if (x < 0) {
							x = 0;
						}

						scrollLeft.value = x;
						lineLeft.value =
							item.left + item.width / 2 - uni.upx2px(16) - offsetLeft.value;
					}
				});
			}
		}

		// 监听绑定值
		watch(
			() => props.modelValue,
			(val: any) => {
				current.value = val;
				onOffset();
			},
			{
				immediate: true,
			}
		);

		// 监听列表改变
		watch(() => props.list, refresh);

		onMounted(() => {
			refresh();
		});

		return {
			current,
			scrollLeft,
			lineLeft,
			tabs,
			dropdown,
			change,
			prev,
			next,
			openDropdown,
			closeDropdown,
			parseRpx,
		};
	},
});
</script>
