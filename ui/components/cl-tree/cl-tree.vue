<template>
	<view class="cl-tree">
		<cl-tree-item :data="item" v-for="(item, index) in data" :key="index"> </cl-tree-item>
	</view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "cl-tree",

	props: {
		itemHeight: {
			type: Number,
			default: 50,
		},
	},

	emits: ["change"],

	setup(props, { emit }) {
		const data = ref([
			{
				label: "A",
				value: "A",
				children: [
					{
						label: "A-1",
						value: "A-1",
						children: [
							{
								label: "A-1-1",
								value: "A-1-1",
							},
							{
								label: "A-1-2",
								value: "A-1-2",
							},
						],
					},
					{
						label: "A-2",
						value: "A-2",
					},
				],
			},
			{
				label: "B",
				value: "B",
				children: [
					{
						label: "B-1",
						value: "B-1",
						children: [
							{
								label: "B-1-1",
								value: "B-1-1",
							},
							{
								label: "B-1-2",
								value: "B-1-2",
							},
						],
					},
					{
						label: "B-2",
						value: "B-2",
						children: [
							{
								label: "B-2-1",
								value: "B-2-1",
							},
							{
								label: "B-2-2",
								value: "B-2-2",
								children: [
									{
										label: "B-2-2-1",
										value: "B-2-2-1",
									},
									{
										label: "B-2-2-2",
										value: "B-2-2-2",
									},
								],
							},
						],
					},
				],
			},
			{
				label: "C",
				value: "C",
			},
		]);

		const value = ref();

		function setValue(val: any) {
			value.value = val;
			console.log(val);
			emit("change", val);
		}

		return {
			data,
			setValue,
		};
	},
});
</script>
