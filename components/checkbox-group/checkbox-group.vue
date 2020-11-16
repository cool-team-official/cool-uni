<template>
	<view class="cl-checkbox-group">
		<slot></slot>
	</view>
</template>

<script>
import Emitter from "../../mixins/emitter";
import { cloneDeep } from "../../utils";

export default {
	componentName: "ClCheckboxGroup",

	props: {
		value: {
			type: Array,
			default: () => []
		},
		border: Boolean,
		disabled: Boolean,
		round: Boolean
	},

	mixins: [Emitter],

	created() {
		this.$on("checkbox.change", label => {
			let index = this.value.findIndex(e => e == label);
			let list = cloneDeep(this.value);

			if (index >= 0) {
				list.splice(index, 1);
			} else {
				list.push(label);
			}

			this.$emit("input", list);
			this.$emit("change", list);
		});
	}
};
</script>
