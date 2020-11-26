<template>
	<view class="cl-slider">
		<slider
			:value="value2"
			:min="min"
			:max="max"
			:step="step"
			:active-color="activeColor"
			:background-color="backgroundColor"
			:block-size="blockSize"
			:show-value="showValue"
			:disabled="disabled"
			@change="onChange"
			@changing="onChanging"
		></slider>
	</view>
</template>

<script>
/**
 * progress 进度条
 * @description 支持多种颜色显示
 * @tutorial https://docs.cool-js.com/uni/components/view/slider.html
 * @property {Number} value 绑定值
 * @property {Boolean} disabled 是否禁用
 * @property {Number} min 最小值
 * @property {Number} max 最大值
 * @property {Number} step 步长，默认1
 * @property {String} activeColor 滑块左侧已选择部分的线条颜色
 * @property {String} backgroundColor 滑块右侧背景条的颜色，默认#e9e9e9
 * @property {Number} blockSize 滑块的大小，默认20
 * @property {Boolean} showValue 是否显示当前 value
 * @event {Function} change 绑定值改变时触发
 * @event {Function} changing 拖动过程中触发
 * @example <cl-slider v-model="val" show-value></cl-slider>
 */

export default {
	name: "cl-slider",

	props: {
		// 绑定值
		value: Number,
		// 是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		// 最小值
		min: {
			type: Number,
			default: 0
		},
		// 最大值
		max: {
			type: Number,
			default: 100
		},
		// 步长
		step: {
			type: Number,
			default: 1
		},
		// 滑块左侧已选择部分的线条颜色
		activeColor: String,
		// 滑块右侧背景条的颜色
		backgroundColor: {
			type: String,
			default: "#e9e9e9"
		},
		// 滑块的大小
		blockSize: {
			type: Number,
			default: 20
		},
		// 是否显示当前 value
		showValue: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			value2: 0
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.value2 = val;
			}
		}
	},

	methods: {
		onChange(e) {
			this.$emit("input", e.detail.value);
			this.$emit("change", e);
		},

		onChanging(e) {
			this.$emit("input", e.detail.value);
			this.$emit("changing", e);
		}
	}
};
</script>
