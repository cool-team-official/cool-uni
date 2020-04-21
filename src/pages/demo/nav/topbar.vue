<template>
	<view class="demo-topbar">
		<cl-card label="默认" padding="0">
			<cl-topbar title="标题"></cl-topbar>
		</cl-card>

		<cl-card label="带描述" padding="0">
			<cl-topbar title="标题" description="描述"></cl-topbar>
		</cl-card>

		<cl-card label="右侧图标" padding="0">
			<cl-topbar title="标题">
				<view class="cl-topbar__icon" slot="append">
					<text class="cl-icon-question-fill"></text>
				</view>
			</cl-topbar>
		</cl-card>

		<cl-card label="不需要返回键" padding="0">
			<cl-topbar title="标题" :show-back="false"> </cl-topbar>
		</cl-card>

		<cl-card label="多个按钮" padding="0">
			<cl-topbar title="标题">
				<template slot="append">
					<view class="cl-topbar__icon">
						<text class="cl-icon-favor-fill"></text>
					</view>

					<view class="cl-topbar__icon">
						<text class="cl-icon-search"></text>
					</view>
				</template>
			</cl-topbar>
		</cl-card>
	</view>
</template>
