<template>
	<switch
		class="cl-switch"
		:checked="checked"
		:disabled="isDisabled"
		:color="color"
		@change="onChange"
	></switch>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useForm } from "../../hook";

/**
 * @description 开关
 * @property {String, Number} modelValue 绑定值
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} activeValue 打开时的值，默认true
 * @property {Boolean} inactiveValue 关闭时的值，默认false
 * @property {Boolean} color 打开时的背景色，默认#409eff
 * @event {Function} change 绑定值改变时触发
 * @example <cl-switch />
 */

export default defineComponent({
	props: {
		modelValue: [Boolean, String, Number],
		disabled: {
			type: Boolean,
			default: null,
		},
		activeValue: {
			type: [Boolean, String, Number],
			default: true,
		},
		inactiveValue: {
			type: [Boolean, String, Number],
			default: false,
		},
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
