<template>
	<cl-page :padding="20">
		<cl-popup v-model="visible">
			<cl-text value="云想衣裳花想容，春风拂槛露华浓。" />
		</cl-popup>

		<cl-popup v-model="visible_modal" :modal="false" :padding="0">
			<cl-button type="primary" @tap="visible_modal = false">点我关闭</cl-button>
		</cl-popup>

		<cl-popup v-model="visible_custom" background-color="#333" border-radius="20rpx">
			<cl-text color="#fff" value="云想衣裳花想容，春风拂槛露华浓。" />
		</cl-popup>

		<cl-popup v-model="visible_left" direction="left">
			<cl-text value="云想衣裳花想容，春风拂槛露华浓。" />
		</cl-popup>

		<cl-popup v-model="visible_top" direction="top">
			<cl-text value="云想衣裳花想容，春风拂槛露华浓。" />
		</cl-popup>

		<cl-popup v-model="visible_right" direction="right">
			<cl-text value="云想衣裳花想容，春风拂槛露华浓。" />
		</cl-popup>

		<cl-popup v-model="visible_bottom" direction="bottom">
			<cl-text value="云想衣裳花想容，春风拂槛露华浓。" />
		</cl-popup>

		<cl-card label="基础用法">
			<cl-button @tap="visible = true">打开</cl-button>
		</cl-card>

		<cl-card label="不显示遮罩层">
			<cl-button @tap="visible_modal = true">打开</cl-button>
		</cl-card>

		<cl-card label="添加样式">
			<cl-button @tap="visible_custom = true">打开</cl-button>
		</cl-card>

		<cl-card label="方向">
			<cl-button @tap="visible_left = true">左边</cl-button>
			<cl-button @tap="visible_top = true">上边</cl-button>
			<cl-button @tap="visible_right = true">右边</cl-button>
			<cl-button @tap="visible_bottom = true">下边</cl-button>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const visible = ref(false);
const visible_modal = ref(false);
const visible_custom = ref(false);

const visible_left = ref(false);
const visible_top = ref(false);
const visible_right = ref(false);
const visible_bottom = ref(false);
</script>
