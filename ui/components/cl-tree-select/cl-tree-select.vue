<template>
	<cl-select-popup ref="popup" title="选择节点" :max-height="maxHeight" @close="onClose">
		<view class="cl-tree-select">
			<cl-tree
				v-if="visible"
				v-model="value"
				:data="data"
				:row-height="rowHeight"
				:check-strictly="checkStrictly"
				:default-expand-all="defaultExpandAll"
				:auto-expand="autoExpand"
				:accordion="accordion"
				:multiple="multiple"
				:keys="keys"
			/>
		</view>

		<template #confirm>
			<cl-button round fill type="primary" size="large" :disabled="!isChecked" @tap="save"
				>确定</cl-button
			>
		</template>
	</cl-select-popup>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { TreeProps, useTree } from "../cl-tree/helper";
import { parseRpx } from "/@/cool/utils";
import { cloneDeep, isEmpty } from "lodash-es";

export default defineComponent({
	name: "cl-tree-select",

	props: {
		maxHeight: {
			type: [String, Number],
			default: 800,
		},
		...TreeProps,
	},

	emits: ["update:modelValue", "change"],

	setup(props, { emit }) {
		const { label } = useTree({ props });

		// 选择弹框
		const popup = ref();

		// 是否可见
		const visible = ref(false);

		// 绑定值
		const value = ref();

		// 是否选择了
		const isChecked = computed(() => {
			return !(props.multiple
				? isEmpty(value.value)
				: value.value === undefined || value.value === null || value.value === "");
		});

		// 打开
		function open() {
			visible.value = true;
			value.value = cloneDeep(props.modelValue);
			popup.value?.open();
		}

		// 关闭
		function close() {
			popup.value?.close();
		}

		// 关闭事件
		function onClose() {
			visible.value = false;
		}

		// 保存
		function save() {
			emit("update:modelValue", value.value);
			emit("change", value.value);
			close();
		}

		return {
			popup,
			visible,
			value,
			label,
			open,
			close,
			save,
			onClose,
			parseRpx,
			isChecked,
		};
	},
});
</script>
