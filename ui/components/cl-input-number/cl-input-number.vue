<template>
	<view class="cl-input-number" :class="{ 'is-disabled': isDisabled }">
		<!-- 减 -->
		<view class="cl-input-number__minus" @tap="onMinus">
			<text class="cl-icon-minus"></text>
		</view>

		<!-- 值 -->
		<view class="cl-input-number__value" @tap="onFocus">
			<text class="unit" v-if="unit">{{ unit }}</text>
			<text class="num">{{ value }}</text>
			<text class="unit" v-if="unit">{{ unit }}</text>

			<input
				type="number"
				v-model="value"
				:disabled="isDisabled"
				:focus="isFocus"
				:style="[inputStyle]"
				@blur="onBlur"
			/>
		</view>

		<!-- 加 -->
		<view class="cl-input-number__plus" @tap="onPlus">
			<text class="cl-icon-plus"></text>
		</view>
	</view>
</template>

<script lang="ts">
/**
 * @description 仅允许操作标准的数字值，可定义范围
 * @property {null} value 绑定值
 * @property {Numbder} step 步进，默认1
 * @property {Numbder} max 最大值，默认100
 * @property {Numbder} min 最小值，默认0
 * @property {Numbder} precision 数值精度
 * @property {Boolean} disabled 是否禁用
 * @event {Function} change 绑定值改变时触发
 * @example <cl-input-number v-model="val" />
 */

import { computed, defineComponent, ref, watch, type PropType, type StyleValue } from "vue";
import { useForm } from "../../hook";
import { isDecimal, parseRpx } from "/@/cool/utils";
import { isString } from "lodash-es";

export default defineComponent({
	name: "cl-input-number",

	props: {
		modelValue: [String, Number],
		step: {
			type: Number,
			default: 1,
		},
		max: {
			type: Number,
			default: 100,
		},
		min: {
			type: Number,
			default: 0,
		},
		precision: Number,
		disabled: Boolean,
		unit: String,
		inputStyle: {
			type: Object as PropType<StyleValue>,
			default() {
				return {};
			},
		},
	},

	emits: ["update:modelValue", "change"],

	setup(props, { emit }) {
		const { disabled } = useForm();

		// 绑定值
		const value = ref(0);

		watch(() => props.modelValue, check, {
			immediate: true,
		});

		// 监听最大最小值变化
		watch(() => props.max, update);
		watch(() => props.min, update);

		// 是否禁用
		const isDisabled = computed(() => disabled.value || props.disabled);

		// 验证值
		function check(val?: any) {
			if (val === undefined) {
				val = value.value;
			}

			// 是否字符
			if (isString(val)) {
				val = Number(val);
			}

			// 是否小数
			if (isDecimal(val)) {
				val = Number(val.toFixed(props.precision || 0));
			}

			// 最小
			if (val < props.min) {
				val = props.min;
			}

			// 最大
			if (val > props.max) {
				val = props.max;
			}

			// 最小不能超过最大
			if (props.min > props.max) {
				val = props.max;
			}

			value.value = val;
		}

		// 更新值
		function update() {
			check();
			emit("update:modelValue", value.value);
			emit("change", value.value);
		}

		// 加
		function onPlus() {
			if (!isDisabled.value) {
				value.value += props.step;

				if (value.value > props.max && props.max !== Infinity) {
					value.value = props.max;
				}

				update();
			}
		}

		// 减
		function onMinus() {
			if (!isDisabled.value) {
				value.value -= props.step;

				if (value.value < props.min && props.min !== Infinity) {
					value.value = props.min;
				}

				update();
			}
		}

		// 是否显示输入框
		const isFocus = ref(false);

		// 聚焦
		function onFocus() {
			isFocus.value = true;
		}

		// 失焦
		function onBlur() {
			isFocus.value = false;
			update();
		}

		return {
			value,
			isDisabled,
			onPlus,
			onMinus,
			onBlur,
			onFocus,
			isFocus,
			parseRpx,
		};
	},
});
</script>
