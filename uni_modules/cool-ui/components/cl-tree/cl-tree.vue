<template>
	<view class="cl-tree">
		<cl-tree-item v-for="(item, index) in data" :key="index" :data="item" :siblings="data">
			<!-- <template #item="{ data, level }">
				<slot name="item" :data="data" :level="level"></slot>
			</template> -->
		</cl-tree-item>
	</view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TreeProps, useTree } from "./helper";

export default defineComponent({
	name: "cl-tree",

	props: {
		...TreeProps,
	},

	emits: ["update:modelValue", "change"],

	setup(props, { emit }) {
		return {
			...useTree({ props, emit }),
		};
	},
});
</script>
