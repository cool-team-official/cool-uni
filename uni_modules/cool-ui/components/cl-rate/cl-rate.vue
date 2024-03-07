<template>
	<view class="cl-rate">
		<view class="cl-rate__icon" v-for="(item, index) in list" :key="index" @tap="onTap(index)">
			<cl-icon :class-name="icon" :size="size" :color="voidColor"></cl-icon>

			<view
				class="cl-rate__icon-active"
				:style="{
					width: item.width,
				}"
			>
				<cl-icon :class-name="icon" :size="size" :color="item.color"></cl-icon>
			</view>
		</view>

		<view class="cl-rate__text" v-if="showText">
			{{ text }}
		</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, type PropType } from "vue";
import { useForm } from "../../hooks";
import { getCurrentColor } from "../../utils";
import { isEmpty } from "lodash-es";

export default defineComponent({
	name: "cl-rate",

	props: {
		// 绑定值
		modelValue: {
			type: Number,
			default: 0,
		},
		// 评分图标
		icon: {
			type: String,
			default: "cl-icon-favor-fill",
		},
		// 选中颜色，Array下为多色
		color: {
			type: [String, Array] as PropType<string | string[]>,
			default: "",
		},
		// 空的颜色
		voidColor: {
			type: String,
			default: "#C6D1DE",
		},
		// 图标大小
		size: {
			type: [Number, String],
			default: 40,
		},
		// 最大值
		max: {
			type: Number,
			default: 5,
		},
		// 是否禁用
		disabled: {
			type: Boolean,
			default: null,
		},
		// 显示文本
		showText: {
			type: Boolean,
			default: null,
		},
		// 文本组
		texts: {
			type: Array,
			default: () => [],
		},
	},

	setup(props, { emit }) {
		const { disabled } = useForm();

		// 绑定值
		const value = ref(0);

		watch(
			() => props.modelValue,
			(val) => {
				value.value = Number(val);
			},
			{
				immediate: true,
			},
		);

		// 文本内容
		const text = computed(() => {
			return isEmpty(props.texts) ? value.value : props.texts[Math.ceil(value.value) - 1];
		});

		// 列表
		const list = computed(() => {
			return new Array(props.max).fill(1).map((_, i) => {
				const int: number = parseInt(String(value.value));
				const dec: number = value.value - int;

				// 处理宽度和颜色
				return {
					width: (value.value > i ? (int > i ? 100 : dec * 100) : 0) + "%",
					color: getCurrentColor({
						value: value.value,
						color: props.color,
						max: props.max,
					}),
				};
			});
		});

		// 点击
		function onTap(index: number) {
			if (disabled.value || props.disabled) {
				return false;
			}

			value.value = index + 1;

			emit("update:modelValue", value.value);
			emit("change", value.value);
		}

		return {
			value,
			list,
			text,
			onTap,
		};
	},
});
</script>
