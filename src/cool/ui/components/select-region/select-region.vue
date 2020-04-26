<template>
	<view class="cl-select-region">
		<cl-select
			mode="multiSelector"
			:value="sel"
			:options="list"
			:label-key="labelKey"
			:value-key="valueKey"
			:separator="separator"
			:disabled="disabled"
			@column-change="onColumnChange"
			@change="onChange"
		></cl-select>
	</view>
</template>

<script>
import cities from './data';

export default {
	props: {
		value: Array,
		disabled: Boolean,
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
			default: '-'
		}
	},

	data() {
		return {
			list: [[], [], []],
			sel: []
		};
	},

	watch: {
		value(val) {
			this.onUpdate(val);
		}
	},

	created() {
		this.onUpdate(this.value);
	},

	methods: {
		onChange(arr) {
			this.$emit('input', (this.sel = arr));
		},

		onUpdate([x, y, z]) {
			this.sel = [x, y, z];

			let a = 0;
			let b = 0;

			if (!x) {
				a = 0;
				b = 0;
			} else {
				a = cities.findIndex(e => e[this.valueKey] == x);
				b = cities[a].children.findIndex(e => e[this.valueKey] == y);
			}

			this.updateList([a, b]);
		},

		onColumnChange({ selects, column }) {
			this.updateList(selects);
		},

		updateList([a, b]) {
			this.list = [cities, cities[a].children, cities[a].children[b].children];
		}
	}
};
</script>
