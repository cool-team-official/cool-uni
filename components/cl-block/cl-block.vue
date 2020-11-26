<template>
	<view
		class="cl-block"
		:style="{
			height: parseRpx(height),
			width: parseRpx(width),
			padding: parseRpx(padding),
			margin: parseRpx(margin),
			borderRadius: parseRpx(borderRadius),
			border,
			backgroundColor
		}"
	>
		<slot></slot>
	</view>
</template>

<script>
import { parseRpx } from "../../untils/style";

export default {
	name: "cl-block",
	componentName: "ClBlock",
	props: {
		backgroundColor: String,
		lineHeight: String,
		textAlign: String,
		border: String,
		boxSizing: String,
		height: [String, Number],
		width: [String, Number],
		padding: [String, Number, Array],
		margin: [String, Number, Array],
		borderRadius: [String, Number]
	},
	methods: {
		parseRpx
	}
};
</script>
