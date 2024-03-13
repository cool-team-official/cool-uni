<template>
	<view class="cl-checkbox" :class="[classList]" :style="[baseStyle]" @tap.stop="change">
		<slot name="icon" :checked="checked">
			<view
				class="cl-checkbox__input"
				:style="{
					height: size,
					width: size,
				}"
			>
				<text class="cl-icon-toast-success" v-if="checked"></text>
			</view>
		</slot>

		<view class="cl-checkbox__label">
			<slot></slot>
		</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { isArray, isBoolean } from "lodash-es";
import { getParent, parseRpx } from "/@/cool/utils";
import { useForm, useStyle } from "../../hooks";

export default defineComponent({
	name: "cl-checkbox",

	props: {
		// 绑定值
		modelValue: [String, Number, Boolean],
		// 标识
		label: [String, Number, Boolean],
		// 是否禁用
		disabled: {
			type: Boolean,
			default: null,
		},
		// 是否边框样式
		border: {
			type: Boolean,
			default: null,
		},
		// 是否圆角
		round: {
			type: Boolean,
			default: null,
		},
		// 是否只显示文字
		text: {
			type: Boolean,
			default: null,
		},
		// 图标大小
		size: [String, Number],
	},

	emits: ["update:modelValue", "change"],

	setup(props, { emit }) {
		const { disabled } = useForm();

		// <cl-checkbox-group />
		const parent = getParent("cl-checkbox-group", [
			"modelValue",
			"round",
			"border",
			"fill",
			"disabled",
			"size",
			"text",
			"onChange",
		]);

		// 是否选中
		const checked = ref(false);

		// 是否禁用
		const isDisabled = computed(() => {
			return (
				disabled.value ||
				(isBoolean(props.disabled) ? props.disabled : parent.value?.disabled)
			);
		});

		// 大小
		const size = computed(() => {
			return parseRpx(props.size || parent.value?.size);
		});

		// 样式
		const classList = computed(() => {
			const d = {
				"is-disabled": isDisabled.value,
				"is-checked": checked.value,
			};

			["border", "fill", "text", "round"].forEach((k) => {
				// @ts-ignore
				d[`is-${k}`] = isBoolean(props[k]) ? props[k] : parent.value?.[k];
			});

			return d;
		});

		// 绑定值改变
		function change() {
			if (isDisabled.value) {
				return false;
			}

			checked.value = !checked.value;

			emit("update:modelValue", checked.value);
			emit("change", checked.value);

			// 传递给父组件
			if (parent.value) {
				parent.value.onChange(props.label);
			}
		}

		// 监听绑定值变化
		watch(
			() => (parent.value ? parent.value.modelValue : props.modelValue),
			(val: any) => {
				if (isArray(val)) {
					checked.value = val.includes(props.label);
				} else {
					checked.value = val;
				}
			},
			{
				immediate: true,
			},
		);

		return {
			size,
			checked,
			classList,
			change,
			...useStyle(),
		};
	},
});
</script>
