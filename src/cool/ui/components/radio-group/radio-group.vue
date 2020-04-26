<template>
	<view class="cl-radio-group">
		<slot></slot>
	</view>
</template>

<script>
import Emitter from '../../mixins/emitter';
import { cloneDeep } from '../../utils';

export default {
	componentName: 'ClRadioGroup',

	props: {
		value: null,
		disabled: Boolean,
		border: Boolean
	},

	mixins: [Emitter],

	watch: {
		value(val) {
			this.change(val);
		}
	},

	created() {
		this.$on('radio.change', label => {
			this.$emit('input', label);
			this.$emit('change', label);
		});
	},

	mounted() {
		this.change(this.value);
	},

	methods: {
		change(value) {
			this.broadcast('ClRadio', 'radio-group.change', value);
		}
	}
};
</script>