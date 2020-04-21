<template>
	<view class="cl-border" :style="{ borderRadius: radius }">
		<slot></slot>
	</view>
</template>

<script>
export default {
	props: {
		radius: [String, Number]
	}
};
</script>
