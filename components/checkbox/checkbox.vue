<template>
	<view
		class="cl-checkbox"
		:class="[
			{
				'cl-checkbox--border': isBorder,
				'cl-checkbox--round': isRound,
				'is-disabled': isDisabled,
				'is-checked': checked,
				'is-fill': fill
			}
		]"
		@tap="change"
	>
		<view class="cl-checkbox__input">
			<text class="cl-icon-toast-success" v-show="checked"></text>
		</view>

		<text class="cl-checkbox__label">
			<slot></slot>
		</text>
	</view>
</template>

<script>
import Emitter from "../../mixins/emitter";
import { getParent, isBoolean } from "../../utils";

export default {
	componentName: "ClCheckbox",

	props: {
		label: [String, Number],
		value: null,
		disabled: Boolean,
		border: Boolean,
		round: Boolean,
		fill: Boolean
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
				this.checked = Boolean(val);
			}
		},
		"parent.value": {
			immediate: true,
			handler(val) {
				if (val) {
					this.checked = val.includes(this.label);
				}
			}
		}
	},

	computed: {
		isGroup() {
			return Boolean(this.parent);
		},

		isRound() {
			return this.isGroup ? this.parent.round || this.round : this.round;
		},

		isBorder() {
			return this.isGroup ? this.parent.border || this.border : this.border;
		},

		isDisabled() {
			return this.isGroup ? this.parent.disabled || this.disabled : this.disabled;
		},

		parent() {
			return getParent.call(this, "ClCheckboxGroup", ["border", "disabled", "value"]);
		}
	},

	methods: {
		change() {
			if (this.isDisabled) {
				return false;
			}

			this.checked = !this.checked;

			if (this.isGroup) {
				this.dispatch("ClCheckboxGroup", "checkbox.change", this.label);
			} else {
				this.$emit("input", this.checked);
				this.$emit("change", this.checked);
			}
		}
	}
};
</script>
