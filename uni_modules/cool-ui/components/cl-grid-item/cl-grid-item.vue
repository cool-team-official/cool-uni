<template>
	<view class="cl-grid-item" :style="{ width }">
		<slot></slot>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { getParent } from "/@/cool/utils";

export default defineComponent({
	name: "cl-grid-item",

	setup() {
		// cl-grid
		const parent = getParent("cl-grid", ["column"]);

		// 宽度
		const width = computed(() => {
			return 100 / (parent.value?.column || 0) + "%";
		});

		return {
			width,
		};
	},
});
</script>
