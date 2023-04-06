<template>
	<view class="cl-input-number">
		<!-- 减 -->
		<view class="cl-input-number__minus" @tap="onMinus">
			<text class="cl-icon-minus"></text>
		</view>

		<!-- 值 -->
		<view class="cl-input-number__value" :style="{ width: width2 }">
			<input
				type="number"
				v-model="value"
				:disabled="isDisabled"
				@blur="onBlur"
				v-if="input"
			/>
			<text v-else>{{ value }}</text>
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
 * @property {Boolean} input 是否能编辑，默认false
 * @property {Numbder} width 输入框宽度，默认100
 * @property {Numbder} precision 数值精度
 * @property {Boolean} disabled 是否禁用
 * @event {Function} change 绑定值改变时触发
 * @example <cl-input-number v-model="val" />
 */

import { computed, defineComponent, ref, watch } from "vue";
import { useForm } from "../../hook";
import { parseRpx, isDecimal } from "/@/cool/utils";
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
		input: {
			type: Boolean,
			default: false,
		},
		width: {
			type: Number,
			default: 100,
		},
		precision: Number,
		disabled: Boolean,
	},

	emits: ["update:modelValue", "change"],

	setup(props, { emit }) {
		const { disabled } = useForm();

		// 绑定值
		const value = ref<number>(0);

		watch(() => props.modelValue, check, {
			immediate: true,
		});

		// 监听最大最小值变化
		watch(() => props.max, update);
		watch(() => props.min, update);

		// 是否禁用
		const isDisabled = computed(() => disabled.value || props.disabled);

		// 宽度
		const width2 = computed(() => (props.input ? parseRpx(props.width) : "auto"));

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

		// 失焦
		function onBlur() {
			update();
		}

		return {
			value,
			width2,
			isDisabled,
			onPlus,
			onMinus,
			onBlur,
		};
	},
});
</script>
