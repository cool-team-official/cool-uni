<template>
	<view
		class="cl-block"
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
	name: "cl-block",
	componentName: "ClBlock",
	mixins: [Style],
	props: {
		backgroundColor: String,
		lineHeight: String,
		textAlign: String,
		border: String,
		boxSizing: String,
	},
};
</script>
