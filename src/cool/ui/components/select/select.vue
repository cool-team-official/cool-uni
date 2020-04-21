<template>
	<view class="cl-select" :class="[isDisabled]">
		<picker
			:mode="mode"
			:value="index"
			:range="options"
			:range-key="rangeKey"
			:disabled="disabled"
			@change="onChange"
			@columnchange="onColumnChange"
			@cancel="onCancel"
		>
			<text class="cl-select__value"
				>{{ text
				}}<text class="cl-select__placeholder" v-show="showPlaceholder">{{
					placeholder
				}}</text></text
			>
			<text class="cl-select__icon cl-icon-arrow-bottom"></text>
		</picker>
	</view>
</template>

<script>
import { isArray, isEmpty, compareValue } from '../../utils/index';

export default {
	props: {
		mode: {
			type: String,
			default: 'selector'
		},
		placeholder: {
			type: String,
			default: '请选择'
		},
		value: null,
		options: Array,
		labelKey: {
			type: String,
			default: 'label'
		},
		valueKey: {
			type: String,
			default: 'value'
		},
		separator: {
			type: String,
			default: '/'
		},
		disabled: Boolean,
		fields: {
			type: String,
			default: 'day'
		},
		start: String,
		end: String
	},

	data() {
		return {
			index: [],
			text: ''
		};
	},

	created() {
		this.parse(this.value);
	},

	watch: {
		value(val) {
			this.parse(val);
		}
	},

	computed: {
		rangeKey() {
			return this.mode == 'region' ? '' : this.labelKey;
		},

		showPlaceholder() {
			return isEmpty(this.text);
		},

		isDisabled() {
			return this.disabled ? 'is-disabled' : '';
		}
	},

	methods: {
		parse(val) {
			// 取下标
			this.index = (() => {
				switch (this.mode) {
					case 'selector':
						return this.options.findIndex(e => compareValue(e[this.valueKey], val));
					case 'multiSelector':
						return (isArray(val) ? val : [val]).map((v, i) => {
							return this.options[i].findIndex(e =>
								compareValue(e[this.valueKey], v)
							);
						});
					default:
						return val;
				}
			})();

			// 取文本值
			this.text = (() => {
				switch (this.mode) {
					case 'selector':
						return this.options[this.index]
							? this.options[this.index][this.labelKey]
							: '';
					case 'multiSelector':
						return this.index
							.filter(v => v >= 0)
							.map((v, i) => this.options[i][v][this.labelKey])
							.join(this.separator);
					case 'region':
						console.warn('请使用 cl-select-region 代替');
					default:
						return this.index;
				}
			})();
		},
		onChange({ detail }) {
			const value = (() => {
				switch (this.mode) {
					case 'selector':
						return this.options[detail.value][this.valueKey];
					case 'multiSelector':
						return detail.value
							.map(v => (v < 0 ? 0 : v))
							.map((v, i) => this.options[i][v][this.valueKey]);
					default:
						return detail.value;
				}
			})();

			this.$emit('change', value);
			this.$emit('input', value);
		},
		onColumnChange({ detail }) {
			this.index = this.index.map((v, i) =>
				i < detail.column ? v : i === detail.column ? detail.value : 0
			);

			this.$emit('column-change', { ...detail, selects: this.index });
		},
		onCancel() {
			this.$emit('cancel');
		}
	}
};
</script>

<style lang="scss" scoped>
.cl-select {
	position: relative;
	width: 100%;
	padding-right: 40rpx;
	font-size: 26rpx;
	box-sizing: border-box;

	/deep/picker {
		height: 70rpx;
		line-height: 70rpx;
	}

	&.is-disabled {
		color: #c0c4cc;
	}

	&__value {
		display: inline-block;
		height: 70rpx;
		width: 100%;
	}

	&__icon {
		position: absolute;
		right: 0;
		top: 0;
	}

	&__placeholder {
		color: #999;
	}
}
</style>
