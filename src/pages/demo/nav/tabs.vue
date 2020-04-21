<template>
	<view class="demo-tabs">
		<!-- #ifdef H5 -->
		<cl-tabs v-model="tabIndex" type="swiper" lazy :labels="labels">
			<template v-slot="{ index }">
				<cl-list :label="`${item}`" class="block" v-for="item in list[index]" :key="item">
					<cl-icon name="cl-icon-arrow-right"></cl-icon>
				</cl-list>
			</template>
		</cl-tabs>
		<!-- #endif -->

		<!-- #ifndef H5 -->
		<cl-tabs v-model="tabIndex" lazy>
			<cl-tab-pane
				v-for="(item, index) in labels"
				:key="index"
				:label="item.label"
				:name="index"
			>
				<cl-list v-for="(item2, index2) in list[index]" :key="index2" :label="`${item2}`">
					<cl-icon name="cl-icon-arrow-right"></cl-icon>
				</cl-list>
			</cl-tab-pane>
		</cl-tabs>
		<!-- #endif -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabIndex: 1,
			labels: [
				{
					label: 'A'
				},
				{
					label: 'B'
				},
				{
					label: 'C'
				},
				{
					label: 'D'
				},
				{
					label: 'E'
				},
				{
					label: 'F'
				},
				{
					label: 'G'
				}
			],
			list: new Array(7).fill(1).map(() => parseInt(Math.random() * 10) + 10)
		};
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
}
.demo-tabs {
	height: 100%;
	overflow: hidden;
}
</style>
