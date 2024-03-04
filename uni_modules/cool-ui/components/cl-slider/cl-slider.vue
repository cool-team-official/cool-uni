<template>
    <view class="cl-slider">
        <slider
            :value="value"
            :min="min"
            :max="max"
            :step="step"
            :active-color="activeColor"
            :background-color="backgroundColor"
            :block-size="blockSize"
			:block-color="blockColor"
            :show-value="showValue"
            :disabled="disabled"
            @change="onChange"
            @changing="onChanging"
        ></slider>
    </view>
</template>

<script lang="ts">
/**
 * @description 支持多种颜色显示
 * @property {Number} modelValue 绑定值
 * @property {Boolean} disabled 是否禁用
 * @property {Number} min 最小值
 * @property {Number} max 最大值
 * @property {Number} step 步长，默认1
 * @property {String} activeColor 滑块左侧已选择部分的线条颜色
 * @property {String} backgroundColor 滑块右侧背景条的颜色，默认#e9e9e9
 * @property {Number} blockSize 滑块的大小，默认20
 * @property {Number} blockColor 滑块颜色，默认#ffffff
 * @property {Boolean} showValue 是否显示当前 value
 * @event {Function} change 绑定值改变时触发
 * @event {Function} changing 拖动过程中触发
 */

import { defineComponent, ref, watch } from "vue"

export default defineComponent({
    name: "cl-slider",

    props: {
        modelValue: {
            type: Number
        },
        disabled: {
            type: Boolean,
            default: null
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        step: {
            type: Number,
            default: 1
        },
        activeColor: {
            type: String,
            default: "#409eff"
        },
        backgroundColor: {
            type: String,
            default: "#e9e9e9"
        },
        blockSize: {
            type: Number,
            default: 15
        },
		blockColor: String,
        showValue: {
            type: Boolean,
            default: false
        }
    },

    emits: ["update:modelValue", "change", "changing"],

    setup(props, { emit }) {
        const value = ref(0)

        watch(
            () => props.modelValue,
            (val) => {
                value.value = val as number
            },
            {
                immediate: true
            }
        )

        function onChange(e: any) {
            emit("update:modelValue", e.detail.value)
            emit("change", e)
        }

        function onChanging(e: any) {
            emit("update:modelValue", e.detail.value)
            emit("changing", e)
        }

        return {
            value,
            onChange,
            onChanging
        }
    }
})
</script>
