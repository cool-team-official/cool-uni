<template>
	<view class="cl-checkbox" :class="[isChecked, isBorder, isDisabled]" @tap="change">
		<view class="cl-checkbox__input">
			<text class="cl-icon-toast-success" v-show="checked"></text>
		</view>

		<text class="cl-checkbox__label">
			<slot></slot>
		</text>
	</view>
</template>

<script>
import Emitter from '../../mixins/emitter';
import { getParent } from '../../utils/index';

export default {
	componentName: 'ClCheckbox',

	props: {
		label: [String, Number],
		value: null,
		disabled: Boolean,
		border: Boolean
	},

	mixins: [Emitter],

	data() {
		return {
			checked: Boolean(this.value)
		};
	},

	watch: {
		value(val) {
			this.checked = Boolean(val);
		}
	},

	computed: {
		isChecked() {
			return this.checked ? 'is-checked' : '';
		},

		isBorder() {
			return (this.parent && this.parent.border) || this.border ? 'cl-checkbox--border' : '';
		},

		isDisabled() {
			return (this.parent && this.parent.disabled) || this.disabled ? 'is-disabled' : '';
		},

		parent() {
			return getParent.call(this, 'ClCheckboxGroup', ['border', 'disabled']);
		}
	},

	created() {
		this.$on('checkbox-group.change', (...labels) => {
			this.checked = labels.findIndex(e => e == this.label) >= 0;
		});
	},

	methods: {
		change() {
			if (this.isDisabled) {
				return false;
			}

			this.checked = !this.checked;

			if (this.parent) {
				this.dispatch('ClCheckboxGroup', 'checkbox.change', this.label);
			} else {
				this.$emit('input', this.checked);
				this.$emit('change', this.checked);
			}
		}
	}
};
</script>