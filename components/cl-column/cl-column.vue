<template>
	<view
		:class="['cl-column', `cl-column--${type}`, `is-justify-${justify}`, `is-align-${align}`]"
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
import { parseRpx } from "../../utils";

export default {
	name: "cl-column",
	componentName: "ClColumn",
	props: {
		type: String,
		border: String,
		backgroundColor: String,
		justify: {
			type: String,
			default: "start"
		},
		align: {
			type: String,
			default: "top"
		},
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
