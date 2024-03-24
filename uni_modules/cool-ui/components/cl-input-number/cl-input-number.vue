<template>
	<view
		class="cl-input-number"
		:class="{ 'is-disabled': isDisabled, 'disabled-plus': !isPlus, 'disabled-minus': !isMinus }"
	>
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
import { computed, defineComponent, ref, watch, type PropType, type StyleValue } from "vue";
import { useForm } from "../../hooks";
import { isDecimal, parseRpx } from "/@/cool/utils";
import { isString } from "lodash-es";

export default defineComponent({
	name: "cl-input-number",

	props: {
		// 绑定值
		modelValue: [String, Number],
		// 步进
		step: {
			type: Number,
			default: 1,
		},
		// 最大值
		max: {
			type: Number,
			default: 100,
		},
		// 最小值
		min: {
			type: Number,
			default: 0,
		},
		// 数值精度
		precision: Number,
		// 是否禁用
		disabled: Boolean,
		// 单位
		unit: String,
		// 输入框样式
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

		// 可以加
		const isPlus = computed(() => {
			return props.max === undefined ? true : value.value < props.max;
		});

		// 可以减
		const isMinus = computed(() => {
			return props.min === undefined ? true : value.value > props.min;
		});

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

				if (value.value > props.max) {
					value.value = props.max;
				}

				update();
			}
		}

		// 减
		function onMinus() {
			if (!isDisabled.value) {
				value.value -= props.step;

				if (value.value < props.min) {
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
			isPlus,
			isMinus,
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
