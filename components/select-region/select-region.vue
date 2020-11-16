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
let cities = null;

export default {
	props: {
		api: {
			type: String,
			default: "https://cool-uni.oss-cn-shanghai.aliyuncs.com/comm/city.json",
		},
		value: Array,
		disabled: Boolean,
		labelKey: {
			type: String,
			default: "label",
		},
		valueKey: {
			type: String,
			default: "value",
		},
		separator: {
			type: String,
			default: "-",
		},
	},

	data() {
		return {
			list: [[], [], []],
			sel: [],
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				if (cities) {
					this.onUpdate(this.value);
				} else {
					uni.request({
						url: this.api,
						success: (res) => {
							cities = res.data;
							this.onUpdate(this.value);
						},
					});
				}
			},
		},
	},

	methods: {
		onChange(arr) {
			this.$emit("input", (this.sel = arr));
		},

		onUpdate([x, y, z]) {
			this.sel = [x, y, z];

			let a = 0;
			let b = 0;

			if (!x) {
				a = 0;
				b = 0;
			} else {
				a = cities.findIndex((e) => e[this.valueKey] == x);
				b = cities[a].children.findIndex((e) => e[this.valueKey] == y);
			}

			this.updateList([a, b]);
		},

		onColumnChange({ selects, column }) {
			this.updateList(selects.map((e) => (e < 0 ? 0 : e)));
		},

		updateList([a, b]) {
			this.list = [cities, cities[a].children, cities[a].children[b].children];
		},
	},
};
</script>
