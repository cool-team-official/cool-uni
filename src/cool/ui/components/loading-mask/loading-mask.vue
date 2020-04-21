<template>
	<view class="cl-loading-mask__wrap">
		<view
			class="cl-loading-mask"
			:class="[
				{
					'cl-loading-mask--fixed': fullscreen,
					'is-show': loading
				}
			]"
			:style="{
				background,
				color
			}"
		>
			<view class="cl-loading-mask__content">
				<cl-loading :color="color"></cl-loading>
				<text v-if="text" class="cl-loading-mask__text">{{ text }}</text>
			</view>
		</view>

		<slot></slot>
	</view>
</template>

<script>
export default {
	props: {
		text: String,
		loading: Boolean,
		fullscreen: Boolean,
		color: {
			type: String,
			default: '#409EFF'
		},
		background: {
			type: String,
			default: 'rgba(255,255,255,0.7)'
		}
	}
};
</script>
