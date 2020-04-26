<template>
	<view class="demo-icon">
		<cl-card label="图标">
			<cl-row>
				<cl-col span="8" v-for="(item, index) in list" :key="index">
					<view class="block">
						<cl-icon :name="item.value" :size="44"></cl-icon>
						<text class="label">{{ item.label }}</text>
					</view>
				</cl-col>
			</cl-row>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					label: 'notification',
					value: 'cl-icon-notification'
				},
				{
					label: 'notification-fill',
					value: 'cl-icon-notification-fill'
				},
				{
					label: 'info',
					value: 'cl-icon-info'
				},
				{
					label: 'info-fill',
					value: 'cl-icon-info-fill'
				},
				{
					label: 'arrow-top',
					value: 'cl-icon-arrow-top'
				},
				{
					label: 'arrow-right',
					value: 'cl-icon-arrow-right'
				},
				{
					label: 'arrow-bottom',
					value: 'cl-icon-arrow-bottom'
				},
				{
					label: 'arrow-left',
					value: 'cl-icon-arrow-left'
				},
				{
					label: 'question',
					value: 'cl-icon-question'
				},
				{
					label: 'question-fill',
					value: 'cl-icon-question-fill'
				},
				{
					label: 'toast-waiting',
					value: 'cl-icon-toast-waiting'
				},
				{
					label: 'toast-warning',
					value: 'cl-icon-toast-warning'
				},
				{
					label: 'toast-success',
					value: 'cl-icon-toast-success'
				},
				{
					label: 'toast-error',
					value: 'cl-icon-toast-error'
				},
				{
					label: 'avatar',
					value: 'cl-icon-avatar'
				},
				{
					label: 'add',
					value: 'cl-icon-add'
				},
				{
					label: 'remove',
					value: 'cl-icon-remove'
				},
				{
					label: 'image',
					value: 'cl-icon-image'
				},
				{
					label: 'check',
					value: 'cl-icon-check'
				},
				{
					label: 'image',
					value: 'cl-icon-image'
				},
				{
					label: 'close',
					value: 'cl-icon-close'
				},
				{
					label: 'emoji',
					value: 'cl-icon-emoji'
				},
				{
					label: 'favor-fill',
					value: 'cl-icon-favor-fill'
				},
				{
					label: 'round-check',
					value: 'cl-icon-round-check'
				},
				{
					label: 'round-check-fill',
					value: 'cl-icon-round-check-fill'
				},
				{
					label: 'round-close',
					value: 'cl-icon-round-close'
				},
				{
					label: 'round-close-fill',
					value: 'cl-icon-round-close-fill'
				},
				{
					label: 'search',
					value: 'cl-icon-search'
				}
			]
		};
	}
};
</script>

<style lang="scss">
.demo-icon {
	.block {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 160rpx;

		&:active {
			background-color: #eee;
		}

		.label {
			font-size: 24rpx;
			margin-top: 10rpx;
		}
	}
}
</style>
