<template>
	<view
		class="cl-textarea"
		:class="[
			{
				'is-disabled': isDisabled,
				'is-count': count,
				'is-border': border,
			},
		]"
		:style="[baseStyle]"
	>
		<textarea
			class="cl-textarea__inner"
			v-model="value"
			:placeholder="placeholder"
			:disabled="isDisabled"
			:auto-focus="autoFocus"
			:focus="focus"
			:auto-height="autoHeight"
			:fixed="fixed"
			:placeholder-style="placeholderStyle"
			:cursor-spacing="cursorSpacing"
			:cursor="cursor"
			:show-confirm-bar="showConfirmBar"
			:selection-start="selectionStart"
			:selection-end="selectionEnd"
			:adjust-position="adjustPosition"
			:disable-default-padding="disableDefaultPadding"
			:hold-keyboard="holdKeyboard"
			:maxlength="maxlength"
			@focus="onFocus"
			@blur="onBlur"
			@linechange="onLinechange"
			@input="onInput"
			@confirm="onConfirm"
			@keyboardheightchange="onKeyboardheightchange"
		/>

		<!-- #ifndef MP-ALIPAY -->
		<text class="cl-textarea__count" v-if="count"
			>{{ value?.length || 0 }}/{{ maxlength }}</text
		>
		<!-- #endif -->
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useForm, useStyle } from "../../hooks";
import { keys } from "lodash-es";

export default defineComponent({
	name: "cl-textarea",

	props: {
		// 绑定值
		modelValue: {
			type: String,
			default: "",
		},
		// 是否显示统计字数
		placeholder: {
			type: String,
			default: "请填写",
		},
		// 是否禁用
		disabled: {
			type: Boolean,
			default: null,
		},
		// 带边框
		border: {
			type: Boolean,
			default: true,
		},
		// 统计数字
		count: Boolean,
		// 自动聚焦
		autoFocus: Boolean,
		// 获取焦点
		focus: Boolean,
		placeholderStyle: Object,
		autoHeight: Boolean,
		fixed: Boolean,
		cursorSpacing: {
			type: Number,
			default: 0,
		},
		cursor: Number,
		showConfirmBar: {
			type: Boolean,
			default: true,
		},
		selectionStart: {
			type: Number,
			default: -1,
		},
		selectionEnd: {
			type: Number,
			default: -1,
		},
		adjustPosition: {
			type: Boolean,
			default: true,
		},
		disableDefaultPadding: {
			type: Boolean,
			default: true,
		},
		holdKeyboard: Boolean,
		maxlength: {
			type: Number,
			default: 150,
		},
	},

	emits: [
		"update:modelValue",
		"change",
		"clear",
		"focus",
		"blur",
		"linechange",
		"confirm",
		"keyboardheightchange",
	],

	setup(props, { emit }) {
		const { disabled } = useForm();

		// 绑定值
		const value = ref("");

		watch(
			() => props.modelValue,
			(val) => {
				value.value = val;
			},
			{
				immediate: true,
			},
		);

		// 是否禁用
		const isDisabled = computed(() => disabled.value || props.disabled);

		// 占位符样式
		const placeholderStyle = computed(() => {
			const d: any = {
				lineHeight: 1.2,
				color: "#a8abb2",
				...props.placeholderStyle,
			};

			return keys(d)
				.map((k) => `${k}:${d[k]};`)
				.join("");
		});

		function onFocus(e: any) {
			emit("focus", e);
		}

		function onBlur(e: any) {
			emit("blur", e);
		}

		function onLinechange(e: any) {
			emit("linechange", e);
		}

		function onInput(e: any) {
			emit("update:modelValue", e.detail.value);
		}

		function onConfirm(e: any) {
			emit("confirm", e);
		}

		function onKeyboardheightchange(e: any) {
			emit("keyboardheightchange", e);
		}

		return {
			value,
			isDisabled,
			placeholderStyle,
			onFocus,
			onBlur,
			onLinechange,
			onInput,
			onConfirm,
			onKeyboardheightchange,
			...useStyle({
				height: 150,
			}),
		};
	},
});
</script>
