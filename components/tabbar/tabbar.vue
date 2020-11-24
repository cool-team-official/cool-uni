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
import { parseRpx } from "../../utils";

export default {
	componentName: "ClTabbar",
	props: {
		value: [String, Number],
		height: {
			type: String,
			default: "100rpx",
		},
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
		beforeSwitch: Function,
	},

	data() {
		return {
			name: null,
			lock: false,
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
};
</script>
