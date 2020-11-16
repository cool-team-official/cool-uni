<template>
	<view
		class="cl-tabbar-item"
		:style="[
			{
				width,
			},
		]"
		@tap="tapItem"
	>
		<cl-badge :value="badge">
			<view class="cl-tabbar-item__block">
				<image
					v-if="src"
					class="cl-tabbar-item__image"
					:src="src"
					:style="{
						height: size,
						width: size,
					}"
				/>

				<text
					v-if="text"
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
import { getParent } from "../../utils";

export default {
	componentName: "ClTabbarItem",

	props: {
		text: String,
		name: [String, Number],
		iconPath: String,
		selectedIconPath: String,
		iconSize: {
			type: Number,
			default: 50,
		},
		badge: {
			type: Number,
			default: 0,
		},
	},

	mixins: [Emitter],

	computed: {
		size() {
			return this.iconSize + "rpx";
		},

		width() {
			return parseFloat(100 / this.parent.tabs.length).toFixed(2) + "%";
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
			return getParent.call(this, "ClTabbar", ["name", "color", "selectedColor", "tabs"]);
		},
	},

	created() {
		this.dispatch("ClTabbar", "insert", this.name);
	},

	methods: {
		tapItem() {
			this.dispatch("ClTabbar", "change", this.name);
		},
	},
};
</script>
