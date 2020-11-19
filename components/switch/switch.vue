<template>
	<switch
		class="cl-switch"
		:checked="checked"
		:disabled="disabled"
		:color="activeColor"
		@change="onChange"
	></switch>
</template>

<script>
import { isEmpty } from "../../utils";

export default {
	props: {
		value: [Boolean, String, Number],
		disabled: Boolean,
		activeValue: {
			type: [Boolean, String, Number],
			default: true,
		},
		inactiveValue: {
			type: [Boolean, String, Number],
			default: false,
		},
		activeColor: {
			type: String,
			default: "#409eff",
		},
	},

	computed: {
		checked() {
			return this.value === this.activeValue;
		},
	},

	methods: {
		onChange(e) {
			let d = e.detail.value ? this.activeValue : this.inactiveValue;

			this.$emit("input", d);
			this.$emit("change", d);
		},
	},
};
</script>
