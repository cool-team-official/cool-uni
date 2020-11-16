<template>
	<view class="cl-rate">
		<view class="cl-rate__icon" v-for="(item, index) in list" :key="index" @tap="onTap(index)">
			<cl-icon :name="icon" :size="size" :color="voidColor"></cl-icon>

			<view
				class="cl-rate__icon-active"
				:style="{
					width: item.width,
				}"
			>
				<cl-icon :name="icon" :size="size" :color="item.color"></cl-icon>
			</view>
		</view>

		<view class="cl-rate__text" v-if="showText">
			{{ value2 }}
		</view>
	</view>
</template>

<script>
import { isNumber, getCurrentColor } from "../../utils";

export default {
	props: {
		value: {
			type: [Number, String],
			default: 0,
		},
		icon: {
			type: String,
			default: "cl-icon-favor-fill",
		},
		color: {
			type: [String, Array],
			default: "$color-primary",
		},
		voidColor: {
			type: String,
			default: "#C6D1DE",
		},
		size: {
			type: [Number, String],
			default: 40,
		},
		max: {
			type: [Number, String],
			default: 5,
		},
		disabled: Boolean,
		showText: Boolean,
	},
	data() {
		return {
			value2: 0,
		};
	},
	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.value2 = val;
			},
		},
	},
	computed: {
		list() {
			return new Array(this.max).fill(1).map((e, i) => {
				let int = parseInt(this.value2);
				let dec = this.value2 - int;

				return {
					width: (this.value2 > i ? (int > i ? 100 : dec * 100) : 0) + "%",
					color: getCurrentColor({
						value: this.value2,
						color: this.color,
						max: this.max,
					}),
				};
			});
		},
	},
	methods: {
		onTap(index) {
			if (this.disabled) {
				return false;
			}

			this.value2 = index + 1;

			this.$emit("input", this.value2);
			this.$emit("change", this.value2);
		},
	},
};
</script>
