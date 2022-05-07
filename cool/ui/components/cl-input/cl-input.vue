<template>
	<view
		class="cl-input"
		:class="[
			{
				'is-round': round,
				'is-disabled': disabled,
				'is-border': border,
				'is-focus': isFocus,
			},
		]"
		:style="{
			backgroundColor,
		}"
	>
		<!-- prepend -->
		<view class="cl-input__prepend" v-if="$slots.prepend">
			<slot name="prepend"></slot>
		</view>

		<view class="cl-input__wrap">
			<template v-if="type == 'password'">
				<input
					class="cl-input__inner"
					v-model="value"
					type="password"
					:password="password"
					:placeholder="placeholder"
					:disabled="disabled"
					:focus="focus"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderClass"
					:maxlength="maxlength"
					:cursor-spacing="cursorSpacing"
					:confirm-hold="confirmHold"
					:adjust-position="adjustPosition"
					:holdKeyboard="holdKeyboard"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
					@confirm="onConfirm"
					@keyboardheightchange="onKeyboardheightchange"
				/>
			</template>

			<template v-else-if="type == 'number'">
				<input
					class="cl-input__inner"
					v-model="value"
					type="number"
					:password="password"
					:placeholder="placeholder"
					:disabled="disabled"
					:focus="focus"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderClass"
					:maxlength="maxlength"
					:cursor-spacing="cursorSpacing"
					:confirm-hold="confirmHold"
					:adjust-position="adjustPosition"
					:holdKeyboard="holdKeyboard"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
					@confirm="onConfirm"
					@keyboardheightchange="onKeyboardheightchange"
				/>
			</template>

			<template v-else-if="type == 'idcard'">
				<input
					class="cl-input__inner"
					v-model="value"
					type="idcard"
					:password="password"
					:placeholder="placeholder"
					:disabled="disabled"
					:focus="focus"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderClass"
					:maxlength="maxlength"
					:cursor-spacing="cursorSpacing"
					:confirm-hold="confirmHold"
					:adjust-position="adjustPosition"
					:holdKeyboard="holdKeyboard"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
					@confirm="onConfirm"
					@keyboardheightchange="onKeyboardheightchange"
				/>
			</template>

			<template v-else-if="type == 'digit'">
				<input
					class="cl-input__inner"
					v-model="value"
					type="digit"
					:password="password"
					:placeholder="placeholder"
					:disabled="disabled"
					:focus="focus"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderClass"
					:maxlength="maxlength"
					:cursor-spacing="cursorSpacing"
					:confirm-hold="confirmHold"
					:adjust-position="adjustPosition"
					:holdKeyboard="holdKeyboard"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
					@confirm="onConfirm"
					@keyboardheightchange="onKeyboardheightchange"
				/>
			</template>

			<template v-else>
				<input
					class="cl-input__inner"
					v-model="value"
					type="text"
					:password="password"
					:placeholder="placeholder"
					:disabled="disabled"
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
			</template>

			<!-- clear -->
			<view class="cl-input__clear" v-show="isFocus && clearable" @tap="clear">
				<text class="cl-icon-close-border"></text>
			</view>
		</view>

		<!-- append -->
		<view class="cl-input__append" v-if="$slots.append">
			<slot name="append"></slot>
		</view>
	</view>
</template>

<script lang="ts">
/**
 * @description 该组件基于官方的 input 组件。参数与官方一致，同时添加新的支持。
 * @property {Boolean} round 是否圆角
 * @property {Boolean} border 是否带有边框
 * @event {Function} change 值发生改变时触发
 * @event {Function} search 搜索时触发
 * @event {Function} clear 清空值时触发
 */

import { defineComponent, ref, watch } from "vue";
import { useForm } from "../../hook";

export default defineComponent({
	name: "cl-input",

	props: {
		modelValue: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			default: "text",
		},
		password: Boolean,
		placeholder: {
			type: String,
			default: "请输入",
		},
		clearable: {
			type: Boolean,
			default: true,
		},
		placeholderStyle: String,
		placeholderClass: String,
		disabled: Boolean,
		round: Boolean,
		border: {
			type: Boolean,
			default: true,
		},
		backgroundColor: {
			type: String,
			default: "#fff",
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

	emits: [
		"update:modelValue",
		"change",
		"clear",
		"focus",
		"blur",
		"confirm",
		"search",
		"keyboardheightchange",
	],

	setup(props, { emit }) {
		const { disabled } = useForm();

		// 绑定值
		const value = ref<string>("");

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
		const isFocus = ref<boolean>(props.focus);

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

		return {
			value,
			disabled,
			isFocus,
			onInput,
			onFocus,
			onBlur,
			onConfirm,
			search,
			clear,
			onKeyboardheightchange,
		};
	},
});
</script>
