<template>
	<text
		:class="['cl-icon', name]"
		:style="{
			fontSize: parseRpx(size),
			color,
		}"
	></text>
</template>

<script>
import { isNumber } from "../../utils";
import { parseRpx } from "../../utils/style";

export default {
	props: {
		name: String,
		size: [String, Number],
		color: String,
	},

	methods: {
		parseRpx,
	},
};
</script>
