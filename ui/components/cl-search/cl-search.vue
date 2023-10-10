<template>
	<view
		class="cl-search"
		:style="{
			padding: parseRpx(padding),
		}"
	>
		<view class="cl-search__prepend" v-if="$slots.prepend">
			<slot name="prepend"></slot>
		</view>

		<view
			class="cl-search__input"
			:style="{
				height: parseRpx(height),
			}"
		>
			<view class="cl-search__inner">
				<cl-input
					v-model="value"
					:height="height"
					:type="type"
					:placeholder="placeholder"
					:disabled="disabled"
					:clearable="clearable"
					:focus="isFocus"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderClass"
					:maxlength="maxlength"
					:cursor-spacing="cursorSpacing"
					:confirm-type="confirmType"
					:confirm-hold="confirmHold"
					:adjust-position="adjustPosition"
					:holdKeyboard="holdKeyboard"
					round
					@change="onChange"
					@focus="onFocus"
					@blur="onBlur"
					@confirm="onConfirm"
					@clear="onClear"
					@keyboardheightchange="onKeyboardheightchange"
				>
					<template #prepend>
						<text class="cl-icon-search"></text>
					</template>
				</cl-input>
			</view>

			<view class="cl-search__btn">
				<cl-button
					type="primary"
					round
					:border="false"
					@tap="search"
					v-if="showSearchButton"
				>
					{{ searchButtonText }}
				</cl-button>
			</view>
		</view>
		<view class="cl-search__append" v-if="$slots.append">
			<slot name="append"></slot>
		</view>
	</view>
</template>

<script lang="ts">
/**
 * @description 搜索框，可自定义前后内容
 * @example <cl-search v-model="val" />
 */

import { defineComponent, ref, watch } from "vue";
import type { PropType } from "vue";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-search",

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
		padding: {
			type: [String, Number],
			default: "15rpx 20rpx",
		},
		height: Number,
		password: Boolean,
		placeholder: String,
		placeholderStyle: String,
		placeholderClass: String,
		disabled: Boolean,
		focus: Boolean,
		clearable: {
			type: Boolean,
			default: true,
		},
		maxlength: {
			type: Number,
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
		searchIcon: {
			type: String,
			default: "cl-icon-search",
		},
		showSearchButton: {
			type: Boolean,
			default: true,
		},
		searchButtonText: {
			type: String,
			default: "搜索",
		},
	},

	emits: ["update:modelValue", "focus", "blur", "confirm", "keyboardheightchange", "search"],

	setup(props, { emit }) {
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
		const isFocus = ref(false);

		watch(
			() => props.focus,
			(val) => {
				isFocus.value = val;
			},
			{
				immediate: true,
			}
		);

		function onChange(e: any) {
			emit("update:modelValue", e);
		}

		function onFocus(e: any) {
			emit("focus", e);
		}

		function onBlur(e: any) {
			emit("blur", e);
		}

		function onConfirm(e: any) {
			emit("confirm", e);
			search();
		}

		function onClear() {
			search();
		}

		function onKeyboardheightchange(e: any) {
			emit("keyboardheightchange", e);
		}

		function search() {
			emit("search", value.value);
		}

		return {
			value,
			isFocus,
			onChange,
			onFocus,
			onBlur,
			onConfirm,
			onClear,
			onKeyboardheightchange,
			search,
			parseRpx,
		};
	},
});
</script>
