<template>
	<view class="cl-skeleton">
		<view
			class="cl-skeleton__block"
			v-for="(item, index) in list"
			:key="index"
			:style="{
                height: item.height + 'px',
                width: item.width + 'px',
                top: item.top + 'px',
                left: item.left + 'px'
            }"
		></view>

		<view class="cl-skeleton__el">
			<slot></slot>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: []
		};
	},

	mounted() {
		const query = uni.createSelectorQuery();
		const { windowWidth } = uni.getSystemInfoSync();

		query
			.selectAll(`.cl-skeleton-item`)
			.boundingClientRect(res => {
				console.log(res);
				this.list.push(...res);
			})
			.exec();
	}
};
</script>

<style lang="scss" scoped>
.cl-skeleton {
	position: relative;
	height: 100%;
	width: 100%;

	&__el {
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
		width: 100%;
	}

	&__block {
		position: absolute;
		background-color: red;
		z-index: 9999;
	}
}
</style>