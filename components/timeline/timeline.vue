<template>
	<view class="cl-timeline">
		<slot></slot>
	</view>
</template>

<script>
export default {
	componentName: "ClTimeline",
	props: {
		timestampWidth: {
			type: Number,
			default: 140
		}
	}
};
</script>
