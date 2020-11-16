<template>
	<view class="cl-tabbar">
		<view class="cl-tabbar__container">
			<slot name="container"></slot>
		</view>

		<view
			class="cl-tabbar__footer"
			:style="{
				backgroundColor,
				borderTopColor: borderStyle,
			}"
		>
			<slot name="footer"></slot>
		</view>
	</view>
</template>

<script>
export default {
	componentName: "ClTabbar",
	props: {
		value: [String, Number],
		color: {
			type: String,
			default: "#7A7E83",
		},
		selectedColor: {
			type: String,
			default: "#2B2E3D",
		},
		borderStyle: {
			type: String,
			default: "white",
		},
		backgroundColor: {
			type: String,
			default: "#ffffff",
		},
	},

	data() {
		return {
			name: null,
			tabs: [],
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
		this.tabs = [];

		this.$on("change", (name) => {
			this.name = name;
		});

		this.$on("insert", (name) => {
			this.tabs.push(name);
		});
	},
};
</script>
