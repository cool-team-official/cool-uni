<template>
	<view class="cl-slider">
		<slider
			:value="value2"
			:min="min"
			:max="max"
			:step="step"
			:active-color="activeColor"
			:background-color="backgroundColor"
			:block-size="blockSize"
			:show-value="showValue"
            :disabled='disabled'
			@change="onChange"
			@changing="onChanging"
		></slider>
	</view>
</template>

<script>
export default {
	props: {
		value: Number,
		disabled: {
            type: Boolean,
            default: false
        },
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 100
		},
		step: {
			type: Number,
			default: 1
		},
		activeColor: String,
		backgroundColor: {
			type: String,
			default: '#e9e9e9'
		},
		blockSize: {
			type: Number,
			default: 20
		},
		showValue: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			value2: 0
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.value2 = val;
			}
		}
	},

	methods: {
		onChange(e) {
			this.$emit('input', e.detail.value);
			this.$emit('change', e);
		},

		onChanging(e) {
			this.$emit('input', e.detail.value);
			this.$emit('changing', e);
		}
	}
};
</script>