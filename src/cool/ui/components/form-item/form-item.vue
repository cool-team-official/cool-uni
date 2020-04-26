<template>
	<view :class="['cl-form-item', isRequired, isError, isSuffix, isDisabled]">
		<view :class="['cl-form-item__label']" :style="{ width: labelWidth2 }" v-if="label2">{{
			label2
		}}</view>

		<view class="cl-form-item__container">
			<view :class="['cl-form-item__content', isJustify]">
				<slot></slot>
			</view>
			<view class="cl-form-item__suffix">
				<slot name="suffix"></slot>
			</view>
		</view>

		<text :class="['cl-form-item__message']" v-if="showMessage2">{{ message }}</text>
	</view>
</template>

<script>
import AsyncValidator from '../../utils/async-validator';
import { getParent } from '../../utils';

export default {
	props: {
		prop: String,
		label: String,
		disabled: Boolean,
		labelWidth: String,
		showMessage: {
			type: Boolean,
			default: false
		},
		justify: {
			type: String,
			default: 'start'
		},
		validateOnValueChange: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			required: false,
			message: null,
			error: false,
			validator: null
		};
	},

	computed: {
		label2() {
			return this.label == 'true' ? '' : this.label;
		},

		labelWidth2() {
			return this.labelWidth || this.parent.labelWidth;
		},

		showMessage2() {
			return (this.showMessage || this.parent.showMessage) && this.error;
		},

		contentWidth() {
			return `calc(100% - ${this.labelWidth} - 20rpx)`;
		},

		isJustify() {
			return this.justify !== 'start' ? `is-justify-${this.justify}` : '';
		},

		isRequired() {
			return this.required ? 'cl-form-item--required' : '';
		},

		isError() {
			return this.error ? 'cl-form-item--error' : '';
		},

		isSuffix() {
			return this.$scopedSlots.suffix ? 'cl-form-item--suffix' : '';
		},

		isDisabled() {
			return this.disabled ? 'cl-form-item--disabled' : '';
		},

		parent() {
			let parent = getParent.call(this, 'ClForm', [
				'labelWidth',
				'showMessage',
				'model',
				'addField',
				'removeField',
				'validateOnValueChange',
				'rules2'
			]);

			parent.rules = parent.rules2;

			this.changeRule(parent);

			return parent;
		}
	},

	destroyed() {
		if (this.parent.removeField) {
			this.parent.removeField(this.prop);
		}
	},

	methods: {
		changeRule({ rules = {}, addField }) {
			if (!rules) {
				return false;
			}

			const rule = rules[this.prop];

			if (rule) {
				this.required = false;
				this.message = '';

				if (rule instanceof Array) {
					rule.forEach(e => {
						if (e.required) {
							this.required = e.required;
						}

						if (e.message) {
							this.message = e.message;
						}
					});
				} else {
					this.required = rule.required;
					this.message = rule.message;
				}

				// 检验器
				this.validator = new AsyncValidator({
					[this.prop]: rule
				});

				// 响应事件
				addField(this.prop, this.onResponse);
			}
		},

		onResponse({ value, action }) {
			this.$nextTick(() => {
				if (action == 'clear') {
					this.error = false;
				}

				if (action == 'validate') {
					if (this.validateOnValueChange || this.parent.validateOnValueChange) {
						this.validate(value);
					}
				}
			});
		},

		onListener(parent) {
			let unwatch = this.$watch(
				() => {
					return parent.model[this.prop];
				},
				val => {
					this.validate(val);
				},
				{
					deep: false
				}
			);

			// unwatch();
		},

		validate(val) {
			this.validator.validate({ [this.prop]: val }, (errors, fields) => {
				this.error = errors;
			});
		}
	}
};
</script>
