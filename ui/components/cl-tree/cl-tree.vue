<template>
	<view class="cl-tree">
		<cl-tree-item v-for="(item, index) in data" :key="index" :data="item" :siblings="data">
		</cl-tree-item>
	</view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TreeProps, useTree } from "./helper";

export default defineComponent({
	name: "cl-tree",

	props: {
		modelValue: [String, Number],
		...TreeProps,
	},

	emits: ["update:modelValue", "change"],

	setup(props, { emit }) {
		const { keys, label, data } = useTree(props);

		// 更新绑定值
		function updateModelValue(val: any) {
			emit("update:modelValue", val);
			emit("change", val);
		}

		return {
			keys,
			label,
			data,
			updateModelValue,
		};
	},
});
</script>
