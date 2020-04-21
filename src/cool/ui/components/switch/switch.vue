<template>
	<switch
		class="cl-switch"
		:checked="checked"
		:disabled="disabled"
		:color="color"
		@change="onChange"
	></switch>
</template>

<script>
import { isEmpty } from '../../utils';

export default {
	props: {
		value: [Boolean, String, Number],
		type: {
			type: String,
			default: 'default'
		},
		disabled: Boolean,
		activeValue: {
			type: [Boolean, String, Number],
			default: true
		},
		inactiveValue: {
			type: [Boolean, String, Number],
			default: false
		},
		activeColor: {
			type: String,
			default: '#409EFF'
		},
		inactiveColor: {
			type: String,
			default: '#C0CCDA'
		}
	},

	computed: {
		checked() {
			return this.value === this.activeValue;
		},

		color() {
			return this.checked ? this.activeColor : this.inactiveColor;
		}
	},

	methods: {
		onChange(e) {
			this.$emit('input', e.detail.value ? this.activeValue : this.inactiveValue);
		}
	}
};
</script>
