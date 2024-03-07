<template>
	<switch
		class="cl-switch"
		:checked="checked"
		:disabled="isDisabled"
		:color="color"
		@change="onChange"
	/>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useForm } from "../../hooks";

export default defineComponent({
	props: {
		// 绑定值
		modelValue: [Boolean, String, Number],
		// 是否禁用
		disabled: {
			type: Boolean,
			default: null,
		},
		// 打开时的值
		activeValue: {
			type: [Boolean, String, Number],
			default: true,
		},
		// 关闭时的值
		inactiveValue: {
			type: [Boolean, String, Number],
			default: false,
		},
		// 打开时的背景色
		color: {
			type: String,
			default: "#6b69f8",
		},
	},

	emits: ["update:modelValue", "change"],

	setup(props, { emit }) {
		const { disabled } = useForm();

		// 是否选中
		const checked = computed(() => props.modelValue === props.activeValue);

		// 是否禁用
		const isDisabled = computed(() => disabled.value || props.disabled);

		// 监听变化
		function onChange(e: any) {
			const v = e.detail.value ? props.activeValue : props.inactiveValue;

			emit("update:modelValue", v);
			emit("change", v);
		}

		return {
			checked,
			isDisabled,
			onChange,
		};
	},
});
</script>
