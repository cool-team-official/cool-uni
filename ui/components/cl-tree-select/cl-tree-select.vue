<template>
	<cl-popup
		v-model="visible"
		direction="bottom"
		type="select"
		title="选择节点"
		:padding="0"
		@confirm="save"
	>
		<scroll-view
			scroll-y
			class="cl-tree-select"
			:style="{
				maxHeight: parseRpx(maxHeight),
			}"
		>
			<view class="cl-tree-select__wrap">
				<cl-tree
					v-model="value"
					:data="data"
					:row-height="rowHeight"
					:check-strictly="checkStrictly"
					:default-expand-all="defaultExpandAll"
					:auto-expand="keys"
					:accordion="accordion"
					:keys="keys"
				/>
			</view>
		</scroll-view>
	</cl-popup>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { TreeProps, useTree } from "../cl-tree/helper";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-tree-select",

	props: {
		modelValue: [String, Number],
		maxHeight: {
			type: [String, Number],
			default: 800,
		},
		...TreeProps,
	},

	emits: ["update:modelValue", "change"],

	setup(props, { emit }) {
		const { label } = useTree(props);

		// 绑定值
		const value = ref();

		// 是否显示
		const visible = ref(false);

		// 打开
		function open() {
			value.value = props.modelValue;
			visible.value = true;
		}

		// 关闭
		function close() {
			visible.value = false;
		}

		// 保存
		function save() {
			emit("update:modelValue", value.value);
			emit("change", value.value);
			close();
		}

		return {
			value,
			visible,
			label,
			open,
			close,
			save,
			parseRpx,
		};
	},
});
</script>
