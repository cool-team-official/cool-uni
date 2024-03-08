<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-input />
		</cl-card>

		<cl-card label="数字键盘">
			<cl-input type="number" />
		</cl-card>

		<cl-card label="禁用">
			<view style="margin-bottom: 20rpx">
				<cl-button
					size="small"
					:type="disabled ? 'success' : 'error'"
					@tap="disabled = !disabled"
				>
					{{ disabled ? "启用" : "禁用" }}
				</cl-button>
			</view>

			<cl-input :disabled="disabled" />
		</cl-card>

		<cl-card label="无边框">
			<cl-input :border="false" />
		</cl-card>

		<cl-card label="前置元素">
			<cl-input>
				<template #prepend>
					<text>https://</text>
				</template>
			</cl-input>
		</cl-card>

		<cl-card label="后置元素">
			<cl-input>
				<template #append>
					<text>元</text>
				</template>
			</cl-input>
		</cl-card>

		<cl-card label="自定义">
			<cl-input
				:height="80"
				:padding="[0, 32, 0, 32]"
				:radius="16"
				background-color="#eee"
				:border="false"
			/>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const disabled = ref(true);
</script>
