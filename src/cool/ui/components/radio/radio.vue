<template>
	<view class="cl-radio" :class="[isChecked, isBorder, isDisabled]" @tap="change">
		<view class="cl-radio__input">
			<text class="cl-icon-toast-success" v-show="checked"></text>
		</view>

		<text class="cl-radio__label">
			<slot></slot>
		</text>
	</view>
</template>

<script>
import Emitter from '../../mixins/emitter';
import { getParent } from '../../utils/index';

export default {
	componentName: 'ClRadio',

	props: {
		label: [String, Number],
		value: [String, Number],
		disabled: Boolean,
		border: Boolean
	},

	mixins: [Emitter],

	data() {
		return {
			checked: this.value === this.label
		};
	},

	watch: {
		value(val) {
			this.checked = val === this.label;
		}
	},

	computed: {
		isChecked() {
			return this.checked ? 'is-checked' : '';
		},

		isBorder() {
			return (this.parent && this.parent.border) || this.border ? 'cl-radio--border' : '';
		},

		isDisabled() {
			return (this.parent && this.parent.disabled) || this.disabled ? 'is-disabled' : '';
		},

		parent() {
			return getParent.call(this, 'ClRadioGroup', ['border', 'disabled']);
		}
	},

	created() {
		this.$on('radio-group.change', label => {
			this.checked = label === this.label;
		});
	},

	methods: {
		change() {
			if (this.isDisabled) {
				return false;
			}

			this.checked = true;

			if (this.parent) {
				this.dispatch('ClRadioGroup', 'radio.change', this.label);
			} else {
				this.$emit('input', this.label);
				this.$emit('change', this.label);
			}
		}
	}
};
</script>