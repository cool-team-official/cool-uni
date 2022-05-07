<template>
	<cl-page :padding="20">
		<cl-popup v-model="visible">
			<cl-text value="云想衣裳花想容，春风拂槛露华浓。"></cl-text>
		</cl-popup>

		<cl-popup v-model="visible2" :modal="false">
			<cl-button @tap="visible2 = false">点我关闭</cl-button>
		</cl-popup>

		<cl-popup v-model="visible3" background-color="red" border-radius="20rpx">
			<cl-text color="#fff" value="云想衣裳花想容，春风拂槛露华浓。"></cl-text>
		</cl-popup>

		<cl-card label="基础用法">
			<cl-button @tap="visible = true">打开</cl-button>
		</cl-card>

		<cl-card label="不显示遮罩层">
			<cl-button @tap="visible2 = true">打开</cl-button>
		</cl-card>

		<cl-card label="添加样式">
			<cl-button @tap="visible3 = true">打开</cl-button>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const visible = ref<boolean>(false);
const visible2 = ref<boolean>(false);
const visible3 = ref<boolean>(false);
</script>
