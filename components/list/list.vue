<template>
	<view class="cl-list">
		<slot></slot>
	</view>
</template>

<script>
export default {
	componentName: "ClList",
	props: {
		justify: String,
		disabled: Boolean,
		border: {
			type: Boolean,
			default: true
		}
	}
};
</script>
