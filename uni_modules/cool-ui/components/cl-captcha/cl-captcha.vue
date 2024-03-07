<template>
	<view
		class="cl-captcha"
		:class="{
			'is-border': border,
		}"
	>
		<input
			class="cl-captcha__input"
			v-model="value"
			type="number"
			:focus="focus"
			:maxlength="len"
			@focus="onFocus"
			@blur="onBlur"
			@input="onInput"
		/>

		<view class="cl-captcha__code">
			<view
				class="cl-captcha__item"
				:style="{
					height: parseRpx(height),
					margin: `0 ${parseRpx(gutter)}`,
					backgroundColor,
				}"
				v-for="(_, index) in list"
				:key="index"
			>
				<text class="cl-captcha__value">{{ value[index] }}</text>
				<view class="cl-captcha__cursor" v-if="value.length == index && isFocus"></view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-captcha",

	props: {
		// 绑定值
		modelValue: String,
		// 是否自动聚焦
		focus: Boolean,
		// 验证码高度
		height: {
			type: [String, Number],
			default: 140,
		},
		// 验证码位数
		len: {
			type: Number,
			default: 4,
		},
		// 间隔
		gutter: {
			type: Number,
			default: 20,
		},
		// 带边框
		border: Boolean,
		// 背景色
		backgroundColor: {
			type: String,
			default: "#ebecee",
		},
	},

	emits: ["update:modelValue", "done"],

	setup(props, { emit }) {
		const value = ref();

		// 是否聚焦
		const isFocus = ref(props.focus);

		// 头条小程序下，无法 v-for 数字
		const list = computed(() => new Array(props.len).fill(1));

		watch(
			() => props.modelValue,
			(val) => {
				value.value = val || "";
			},
			{
				immediate: true,
			},
		);

		function onFocus() {
			isFocus.value = true;
		}

		function onBlur() {
			isFocus.value = false;
		}

		function onInput(e: any) {
			const val = e.detail.value;

			emit("update:modelValue", val);

			if (val.length === props.len) {
				emit("done", val);
			}
		}

		return {
			value,
			isFocus,
			list,
			parseRpx,
			onFocus,
			onBlur,
			onInput,
		};
	},
});
</script>
