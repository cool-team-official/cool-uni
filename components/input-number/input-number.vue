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
		value: {
			type: Number,
			required: true,
		},
		step: {
			type: Number,
			default: 1,
		},
		max: {
			type: Number,
			default: 100,
		},
		min: {
			type: Number,
			default: 0,
		},
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
				if (val < this.min) {
					val = this.min;
				}

				if (val > this.max) {
					val = this.max;
				}

				if (this.min > this.max) {
					val = this.max;
				}

				this.value2 = val;
			},
		},
	},

	methods: {
		onPlus() {
			this.value2 += this.step;

			if (this.value2 > this.max && this.max !== Infinity) {
				this.value2 = this.max;
			}

			this.update();
		},

		onMinus() {
			this.value2 -= this.step;

			if (this.value2 < this.min && this.min !== Infinity) {
				this.value2 = this.min;
			}

			this.update();
		},

		update() {
			if (this.min > this.max) {
				this.value2 = this.max;
			}

			this.$emit("input", this.value2);
			this.$emit("change", this.value2);
		},
	},
};
</script>
