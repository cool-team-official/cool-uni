<template>
	<view
		class="cl-tabbar-item"
		:class="[
			{
				'is-active': isActive,
			},
		]"
		:style="[
			{
				height: parent.height,
			},
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
						width: size,
					}"
				/>

				<image
					class="cl-tabbar-item__image selected-icon-path"
					:src="selectedIconPath"
					:style="{
						height: size,
						width: size,
					}"
				/>

				<text
					v-show="text"
					class="cl-tabbar-item__label"
					:style="{
						color,
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

export default {
	componentName: "ClTabbarItem",

	props: {
		text: String,
		name: {
			type: [String, Number],
			required: true,
		},
		iconPath: String,
		selectedIconPath: String,
		iconSize: {
			type: Number,
			default: 50,
		},
		badge: {
			type: [Number, String],
			default: 0,
		},
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
		},
	},

	methods: {
		tapItem() {
			this.dispatch("ClTabbar", "change", this.name);
		},
	},
};
</script>
