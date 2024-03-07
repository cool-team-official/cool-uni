<template>
	<view
		class="cl-checkbox"
		:class="[classList]"
		:style="{
			height: parseRpx(height),
		}"
		@tap.stop="change"
	>
		<view
			class="cl-checkbox__input"
			:style="{
				height: size,
				width: size,
			}"
		>
			<text class="cl-icon-toast-success" v-if="checked"></text>
		</view>

		<view class="cl-checkbox__label">
			<slot></slot>
		</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { isArray, isBoolean } from "lodash-es";
import { getParent, parseRpx } from "/@/cool/utils";
import { useForm } from "../../hooks";

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
		// 高度
		height: [String, Number],
		// 尺寸
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
			return parseRpx(parent.value?.size || props.size);
		});

		// 样式
		const classList = computed(() => {
			return [
				{
					"is-checked": checked.value,
					"is-disabled": isDisabled.value,
					"is-fill": parent.value?.fill,
					"is-round": isBoolean(props.round) ? props.round : parent.value?.round,
					"is-border": isBoolean(props.border) ? props.border : parent.value?.border,
				},
			];
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
			parseRpx,
		};
	},
});
</script>
