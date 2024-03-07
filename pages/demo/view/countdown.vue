<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-countdown :hour="5"></cl-countdown>
		</cl-card>

		<cl-card label="精简模式">
			<cl-countdown :hour="1" simple></cl-countdown>
		</cl-card>

		<cl-card label="自定义格式">
			<cl-countdown :hour="5" format="{d}天{h}时{m}分{s}秒后结束"></cl-countdown>
		</cl-card>

		<cl-card label="自定义样式">
			<cl-countdown
				:hour="5"
				:font-size="40"
				:number-style="{
					backgroundColor: '#f56c6c',
					color: '#fff',
					borderRadius: '8rpx',
					padding: '6rpx',
					margin: '0 6rpx',
				}"
			></cl-countdown>
		</cl-card>
	</cl-page>
</template>
