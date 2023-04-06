<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-progress :value="40"></cl-progress>
		</cl-card>

		<cl-card label="不同颜色">
			<cl-progress color="#67C23A" :value="40"></cl-progress>
		</cl-card>

		<cl-card label="可调节颜色">
			<cl-progress :value="60" :color="['#F56C6C', '#E6A23C', '#67C23A']"></cl-progress>
		</cl-card>

		<cl-card label="自定义">
			<cl-progress :value="val">
				<template #text>
					<text v-if="val >= 90">优</text>
					<text v-else-if="val >= 80">良</text>
					<text v-else-if="val >= 60">及格</text>
					<text v-else>{{ val }}</text>
				</template>
			</cl-progress>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const val = ref(80);
</script>
