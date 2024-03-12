<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-select-city v-model="v1" />
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const v1 = ref([]);
</script>
