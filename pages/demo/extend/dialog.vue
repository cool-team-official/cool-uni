<template>
	<cl-page :padding="20">
		<cl-dialog title="标题" v-model="visible">
			<text>云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。</text>
		</cl-dialog>

		<cl-card label="基础用法">
			<cl-button @tap="open">打开</cl-button>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const visible = ref<boolean>(false);

function open() {
	visible.value = true;
}
</script>
