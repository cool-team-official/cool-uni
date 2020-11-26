<template>
	<view
		class="cl-tabbar-item"
		:class="[
			{
				'is-active': isActive
			}
		]"
		:style="[
			{
				height: parent.height
			}
		]"
		@tap="tapItem"
	>
		<!-- 处理小程序slot异常 -->
		<slot v-if="$slots.$default || $slots.default"></slot>
		<!-- 默认内容 -->
		<cl-badge :value="badge" v-else>
			<view class="cl-tabbar-item__block">
				<image
					class="cl-tabbar-item__image icon-path"
					:src="iconPath"
					:style="{
						height: size,
						width: size
					}"
				/>

				<image
					class="cl-tabbar-item__image selected-icon-path"
					:src="selectedIconPath"
					:style="{
						height: size,
						width: size
					}"
				/>

				<text
					v-show="text"
					class="cl-tabbar-item__label"
					:style="{
						color
					}"
					>{{ text }}</text
				>
			</view>
		</cl-badge>
	</view>
</template>

<script>
import Emitter from "../../mixins/emitter";
import { getParent, parseRpx } from "../../utils";

/**
 * tabbar-item 底部导航项
 * @description 该组件与原生tabbar配置一致，同时添加新的支持。
 * @tutorial https://docs.cool-js.com/uni/components/nav/tabbar.html
 * @property {String} text 文本内容
 * @property {String, Number} name 唯一标识
 * @property {String} iconPath 图标路径
 * @property {String} selectedIconPath 选中的图标路径
 * @property {Number} iconSize 图标大小，默认50
 * @property {Number, String} badge 角标值
 * @example 见教程
 */

export default {
	name: "cl-tabbar-item",

	componentName: "ClTabbarItem",

	props: {
		// 文本内容
		text: String,
		// 唯一标识
		name: {
			type: [String, Number],
			required: true
		},
		// 图标路径
		iconPath: String,
		// 选中的图标路径
		selectedIconPath: String,
		// 图标大小
		iconSize: {
			type: Number,
			default: 50
		},
		// 角标值
		badge: {
			type: [Number, String],
			default: 0
		}
	},

	mixins: [Emitter],

	computed: {
		size() {
			return parseRpx(this.iconSize);
		},

		color() {
			return this.isActive ? this.parent.selectedColor : this.parent.color;
		},

		src() {
			return this.isActive ? this.selectedIconPath : this.iconPath;
		},

		isActive() {
			return this.name !== null && this.parent.name === this.name;
		},

		parent() {
			return getParent.call(this, "ClTabbar", ["name", "color", "selectedColor", "height"]);
		}
	},

	methods: {
		tapItem() {
			this.dispatch("ClTabbar", "change", this.name);
		}
	}
};
</script>
