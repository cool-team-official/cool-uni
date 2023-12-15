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
		:style="{
			backgroundColor,
			borderRadius: parseRpx(borderRadius),
			height: parseRpx(height),
			fontSize: parseRpx(fontSize),
			padding: parseRpx(padding),
		}"
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
/**
 * @description 该组件基于官方的 input 组件。参数与官方一致，同时添加新的支持。
 * @property {Boolean} round 是否圆角
 * @property {Boolean} border 是否带有边框
 * @event {Function} change 值发生改变时触发
 * @event {Function} search 搜索时触发
 * @event {Function} clear 清空值时触发
 */

import { computed, defineComponent, ref, watch } from "vue";
import type { PropType } from "vue";
import { useForm, useTap } from "../../hook";
import { parseRpx } from "/@/cool/utils";
import { keys } from "lodash-es";

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
			default: "请输入",
		},
		clearable: {
			type: Boolean,
			default: true,
		},
		placeholderStyle: Object,
		placeholderClass: String,
		readonly: Boolean,
		disabled: Boolean,
		height: [String, Number],
		padding: {
			type: [String, Number],
			default: "0 20rpx",
		},
		round: Boolean,
		borderRadius: [String, Number],
		border: {
			type: Boolean,
			default: true,
		},
		fontSize: {
			type: [Number, String],
			default: 26,
		},
		backgroundColor: String,
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
			},
		);

		// 是否聚焦
		const isFocus = ref(props.focus);

		// 是否禁用
		const isDisabled = computed(() => {
			return form.disabled.value || props.disabled;
		});

		// 占位符
		const placeholderStyle = computed(() => {
			const d = {
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
			parseRpx,
			placeholderStyle,
		};
	},
});
</script>
