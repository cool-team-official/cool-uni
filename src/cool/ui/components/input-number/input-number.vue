<template>
	<view class="cl-input-number">
		<button class="cl-input-number__minus" @tap="onMinus">
			<text class="cl-icon-minus"></text>
		</button>

		<text class="cl-input-number__value">{{ value2 }}</text>

		<button class="cl-input-number__plus" @tap="onPlus">
			<text class="cl-icon-plus"></text>
		</button>
	</view>
</template>

<script>
export default {
	props: {
		value: Number,
		step: {
			type: Number,
			default: 1
		},
		max: {
			type: Number,
			default: Infinity
		},
		min: {
			type: Number,
			default: Infinity
		}
	},

	data() {
		return {
			value2: 0
		};
	},

	watch: {
		value: {
			handler(val) {
				this.value2 = val;
			},
			immediate: true
		}
	},

	methods: {
		onPlus() {
			this.value2 += this.step;

			if (this.value2 > this.max && this.max !== Infinity) {
				this.value2 = this.max;
			}

			this.$emit("input", this.value2);
			this.$emit("change", this.value2);
		},

		onMinus() {
			this.value2 -= this.step;

			if (this.value2 < this.min && this.min !== Infinity) {
				this.value2 = this.min;
			}

			this.$emit("input", this.value2);
			this.$emit("change", this.value2);
		}
	}
};
</script>