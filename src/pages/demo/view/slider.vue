<template>
	<view class="demo-slider">
		<cl-card label="基本用法">
			<cl-slider v-model="val" show-value></cl-slider>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			val: 35
		};
	}
};
</script>

<style lang="scss">
.demo-slider {
}
</style>
