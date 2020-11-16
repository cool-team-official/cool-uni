<template>
	<view
		:class="['cl-column', `cl-column--${type}`, `is-justify-${justify}`, `is-align-${align}`]"
		:style="{
			height: height2,
			width: width2,
			padding: padding2,
			margin: margin2,
			borderRadius: borderRadius2,
			border,
			backgroundColor,
		}"
	>
		<slot></slot>
	</view>
</template>

<script>
import Style from "../../mixins/style";

export default {
	name: "cl-column",
	componentName: "ClColumn",
	mixins: [Style],
	props: {
		type: String,
		border: String,
		boxSizing: String,
		backgroundColor: String,
		justify: {
			type: String,
			default: "start",
		},
		align: {
			type: String,
			default: "top",
		},
	},
};
</script>
