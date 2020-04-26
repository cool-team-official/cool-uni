<template>
	<view class="demo-rate">
		<cl-card label="基础用法">
			<cl-row>
				<cl-rate :value="2.7"></cl-rate>
			</cl-row>

			<cl-row>
				<cl-rate :value="2" :color="['#F56C6C', '#E6A23C', '#67C23A']"></cl-rate>
			</cl-row>
		</cl-card>

		<cl-card label="不同图标">
			<cl-row>
				<cl-rate :value="1" icon="cl-icon-emoji"></cl-rate>
			</cl-row>

			<cl-row>
				<cl-rate :value="3" icon="cl-icon-avatar"></cl-rate>
			</cl-row>
		</cl-card>

		<cl-card label="只读">
			<cl-rate :value="4" disabled></cl-rate>
		</cl-card>

		<cl-card label="显示数值">
			<cl-rate :value="3.4" show-text></cl-rate>
		</cl-card>
	</view>
</template>

<script>
export default {};
</script>
