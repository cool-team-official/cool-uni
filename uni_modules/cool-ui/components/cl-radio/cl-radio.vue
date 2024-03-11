<template>
	<view class="cl-radio" :class="[classList]" :style="[baseStyle]" @tap.stop="change">
		<slot name="icon" :checked="checked">
			<view
				class="cl-radio__input"
				:style="{
					height: size,
					width: size,
				}"
			>
				<text v-if="checked"></text>
			</view>
		</slot>

		<view class="cl-radio__label">
			<cl-text :ellipsis="1" :size="28">
				<slot></slot>
			</cl-text>
		</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useForm, useStyle } from "../../hooks";
import { isBoolean } from "lodash-es";
import { getParent, parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-radio",

	props: {
		// 绑定值
		modelValue: [String, Number],
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
		// 是否宽度填充
		fill: {
			type: Boolean,
			default: null,
		},
		// 是否只显示文字
		text: {
			type: Boolean,
			default: null,
		},
		// 是否圆角
		round: {
			type: Boolean,
			default: null,
		},
		// 图标大小
		size: [String, Number],
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
			"text",
			"round",
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
			},
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

		// 值改变
		function change() {
			if (isDisabled.value) {
				return false;
			}

			checked.value = true;

			// 更新 <cl-checkbox-group />
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
			...useStyle(),
		};
	},
});
</script>
