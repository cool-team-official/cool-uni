<template>
	<view class="cl-radio" :class="[classList]" @tap="change">
		<view
			class="cl-radio__input"
			:style="{
				height: size,
				width: size,
			}"
		>
			<text v-if="checked"></text>
		</view>

		<view class="cl-radio__label">
			<slot></slot>
		</view>
	</view>
</template>

<script lang="ts">
/**
 * @description 单选框
 * @property {String, Number} value 绑定值
 * @property {String, Number} label 标识
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} border 是否边框样式
 * @property {Boolean} fill 是否宽度填充
 * @event {Function} change 绑定值改变时触发
 */

import { computed, defineComponent, ref, watch } from "vue";
import { useForm } from "../../hook";
import { isBoolean } from "lodash-es";
import { getParent, parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-radio",

	props: {
		modelValue: [String, Number],
		label: [String, Number],
		disabled: {
			type: Boolean,
			default: null,
		},
		border: {
			type: Boolean,
			default: null,
		},
		size: {
			type: [String, Number],
			default: 40,
		},
	},

	emits: ["update:modelValue", "change"],

	setup(props, { emit }) {
		const { disabled } = useForm();

		// cl-radio-group
		const parent = getParent("cl-radio-group", [
			"modelValue",
			"disabled",
			"border",
			"fill",
			"size",
			"change",
		]);

		// 是否选中
		const checked = ref(false);

		// 监听绑定值变化
		watch(
			() => (parent.value ? parent.value.modelValue : props.modelValue),
			(val: any) => {
				checked.value = val === props.label;
			},
			{
				immediate: true,
			}
		);

		// 是否禁用
		const isDisabled = computed(() => {
			return (
				disabled.value ||
				(isBoolean(props.disabled) ? props.disabled : parent.value?.disabled)
			);
		});

		// 大小
		const size = computed(() => {
			return parseRpx(parent.value?.size || props.size);
		});

		// 样式
		const classList = computed(() => {
			return [
				{
					"is-border": isBoolean(props.border) ? props.border : parent.value?.border,
					"is-disabled": isDisabled.value,
					"is-checked": checked.value,
					"is-fill": parent.value?.fill,
				},
			];
		});

		// 值改变
		function change() {
			if (isDisabled.value) {
				return false;
			}

			checked.value = true;

			// 更新 cl-checkbox-group
			if (parent.value) {
				parent.value.change(props.label);
			} else {
				emit("update:modelValue", props.label);
				emit("change", props.label);
			}
		}

		return {
			size,
			checked,
			classList,
			change,
		};
	},
});
</script>
