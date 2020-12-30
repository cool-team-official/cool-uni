<template>
	<view
		class="cl-tabbar"
		:style="{
			height,
			backgroundColor,
			borderTopColor: borderStyle,
		}"
	>
		<slot></slot>
	</view>
</template>

<script>
import { parseRpx, isEmpty } from "../../utils";

/**
 * tabbar 底部导航
 * @description 该组件与原生tabbar配置一致，同时添加新的支持。
 * @tutorial https://docs.cool-js.com/uni/components/nav/tabbar.html
 * @property {String} value 绑定值，页面标识
 * @property {String} height 高度
 * @property {String} color 字体颜色，默认#7A7E83
 * @property {String} selectedColor 选中颜色，默认#2B2E3D
 * @property {String} borderStyle 边框颜色，默认white
 * @property {String} backgroundColor 背景颜色，默认#ffffff
 * @property {Function} beforeSwitch 切换前钩子函数
 * @example 见教程
 */

export default {
	name: "cl-tabbar",

	componentName: "ClTabbar",

	props: {
		// 绑定值，页面标识
		value: [String, Number],
		// 高度
		height: {
			type: String,
			default: "100rpx",
		},
		// 字体颜色
		color: {
			type: String,
			default: "#7A7E83",
		},
		// 选中颜色
		selectedColor: {
			type: String,
			default: "#2B2E3D",
		},
		// 边框颜色
		borderStyle: {
			type: String,
			default: "white",
		},
		// 背景颜色
		backgroundColor: {
			type: String,
			default: "#ffffff",
		},
		// 切换前钩子函数
		beforeSwitch: Function,
	},

	data() {
		return {
			name: null,
			lock: false,
			number: 4,
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.name = val;
			},
		},

		name(val) {
			this.$emit("input", val);
		},
	},

	created() {
		this.$on("change", (name) => {
			if (!this.lock) {
				let next = (n2) => {
					this.name = n2 || name;
					this.lock = false;
				};

				if (this.beforeSwitch) {
					this.lock = true;
					this.beforeSwitch(name, next);
				} else {
					next(name);
				}
			}
		});
	},

	mounted() {
		this.doLayout();
	},

	methods: {
		doLayout() {
			let timer = null;

			const fn = () => {
				if (isEmpty(this.$children)) {
					timer = setTimeout(() => {
						fn();
					}, 50);
				} else {
					clearTimeout(timer);
					this.number = this.$children.length;
				}
			};

			fn();
		},
	},
};
</script>
