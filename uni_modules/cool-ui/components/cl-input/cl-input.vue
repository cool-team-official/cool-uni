<template>
	<view
		class="cl-input"
		:class="[
			{
				'is-round': round,
				'is-border': border,
				'is-disabled': isDisabled,
				'is-focus': isFocus,
			},
		]"
		:style="[baseStyle]"
		@click="click"
	>
		<!-- 只读 -->
		<view class="cl-input__readonly" v-if="readonly"></view>

		<!-- 前 -->
		<view class="cl-input__prepend" v-if="$slots.prepend">
			<slot name="prepend"></slot>
		</view>

		<view class="cl-input__wrap">
			<input
				class="cl-input__inner"
				v-model="value"
				:type="type"
				:password="password"
				:placeholder="placeholder"
				:disabled="isDisabled"
				:focus="focus"
				:placeholder-style="placeholderStyle"
				:placeholder-class="placeholderClass"
				:maxlength="maxlength"
				:cursor-spacing="cursorSpacing"
				:confirm-type="confirmType"
				:confirm-hold="confirmHold"
				:adjust-position="adjustPosition"
				:holdKeyboard="holdKeyboard"
				@input="onInput"
				@focus="onFocus"
				@blur="onBlur"
				@confirm="onConfirm"
				@keyboardheightchange="onKeyboardheightchange"
			/>

			<!-- 清空 -->
			<view class="cl-input__clear" v-show="isFocus && clearable" @tap="clear">
				<text class="cl-icon-close-border"></text>
			</view>
		</view>

		<!-- 后 -->
		<view class="cl-input__append" v-if="$slots.append">
			<slot name="append"></slot>
		</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import type { PropType } from "vue";
import { useForm, useStyle, useTap } from "../../hooks";
import { keys } from "lodash-es";
import { t } from "/@/locale";

export default defineComponent({
	name: "cl-input",

	props: {
		modelValue: {
			type: String,
			default: "",
		},
		type: {
			type: String as PropType<
				"text" | "number" | "idcard" | "digit" | "tel" | "safe-password" | "nickname"
			>,
			default: "text",
		},
		password: Boolean,
		placeholder: {
			type: String,
			default: t("请填写"),
		},

		clearable: {
			type: Boolean,
			default: true,
		},
		placeholderStyle: Object,
		placeholderClass: String,
		readonly: Boolean,
		disabled: Boolean,
		round: Boolean,
		border: {
			type: Boolean,
			default: true,
		},
		focus: Boolean,
		maxlength: {
			type: [Number, String],
			default: 140,
		},
		cursorSpacing: {
			type: Number,
			default: 0,
		},
		confirmType: {
			type: String,
			default: "done",
		},
		confirmHold: Boolean,
		adjustPosition: {
			type: Boolean,
			default: true,
		},
		holdKeyboard: {
			type: Boolean,
			default: false,
		},
	},

	setup(props, { emit }) {
		const { tap } = useTap(emit);

		const form = useForm();

		// 绑定值
		const value = ref("");

		watch(
			() => props.modelValue,
			(val: string) => {
				value.value = val;
			},
			{
				immediate: true,
			}
		);

		// 是否聚焦
		const isFocus = ref(props.focus);

		// 是否禁用
		const isDisabled = computed(() => {
			return form.disabled.value || props.disabled;
		});

		// 占位符样式
		const placeholderStyle = computed(() => {
			const d: any = {
				lineHeight: 1,
				color: "#a8abb2",
				...props.placeholderStyle,
			};

			return keys(d)
				.map((k) => `${k}:${d[k]};`)
				.join("");
		});

		// 输入
		function onInput() {
			emit("update:modelValue", value.value);
			emit("change", value.value);

			isFocus.value = Boolean(value.value);
		}

		// 聚焦
		function onFocus(e: any) {
			emit("focus", e);

			if (value.value) {
				isFocus.value = true;
			}
		}

		// 失焦
		function onBlur(e: any) {
			emit("blur", e);

			setTimeout(() => {
				isFocus.value = false;
			}, 0);
		}

		// 按下确认键
		function onConfirm(e: any) {
			emit("confirm", e);
			search();
		}

		// 按下搜索键
		function search() {
			emit("search", value.value);
		}

		// 清空
		function clear() {
			value.value = "";
			emit("update:modelValue", "");
			emit("change", "");
			emit("clear");
		}

		// 键盘高度变化
		function onKeyboardheightchange(e: any) {
			emit("keyboardheightchange", e);
		}

		// 点击
		function click(e: any) {
			if (!isDisabled.value) {
				tap(e);
			}
		}

		return {
			value,
			isDisabled,
			isFocus,
			click,
			onInput,
			onFocus,
			onBlur,
			onConfirm,
			search,
			clear,
			onKeyboardheightchange,
			placeholderStyle,
			...useStyle({
				padding: "0 20rpx",
				fontSize: 26,
			}),
		};
	},
});
</script>
