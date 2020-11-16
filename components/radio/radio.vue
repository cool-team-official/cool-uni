<template>
	<view
		class="cl-radio"
		:class="[
			{
				'cl-radio--border': isBorder,
				'is-disabled': isDisabled,
				'is-checked': checked
			}
		]"
		@tap="change"
	>
		<view class="cl-radio__input">
			<text class="cl-icon-toast-success" v-show="checked"></text>
		</view>

		<text class="cl-radio__label">
			<slot></slot>
		</text>
	</view>
</template>

<script>
import Emitter from "../../mixins/emitter";
import { getParent } from "../../utils";

export default {
	componentName: "ClRadio",

	props: {
		label: [String, Number],
		value: [String, Number],
		disabled: Boolean,
		border: Boolean
	},

	mixins: [Emitter],

	data() {
		return {
			checked: false
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.checked = val === this.label;
			}
		}
	},

	computed: {
		isGroup() {
			return Boolean(this.parent);
		},

		isBorder() {
			return this.isGroup ? this.parent.border || this.border : this.border;
		},

		isDisabled() {
			return this.isGroup ? this.parent.disabled || this.disabled : this.disabled;
		},

		parent() {
			return getParent.call(this, "ClRadioGroup", ["border", "disabled"]);
		}
	},

	created() {
		this.$on("radio-group.change", label => {
			this.checked = label === this.label;
		});
	},

	methods: {
		change() {
			if (this.isDisabled) {
				return false;
			}

			this.checked = true;

			if (this.isGroup) {
				this.dispatch("ClRadioGroup", "radio.change", this.label);
			} else {
				this.$emit("input", this.label);
				this.$emit("change", this.label);
			}
		}
	}
};
</script>
