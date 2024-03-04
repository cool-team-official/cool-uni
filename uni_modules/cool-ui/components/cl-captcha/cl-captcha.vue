<template>
    <view
        class="cl-captcha"
        :class="{
            'is-border': border
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
                    backgroundColor
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
/**
 * @description 验证码输入框
 * @property {String} value 绑定值
 * @property {Boolean} focus 是否聚焦
 * @property {String, Number} height 验证码高度
 * @property {Number} len 验证码位数，默认4
 * @property {Number} gutter 间隔，默认20
 * @event {Function} done 输入完成时触发
 */

import { computed, defineComponent, ref, watch } from "vue"
import { parseRpx } from "/@/cool/utils"

export default defineComponent({
    name: "cl-captcha",

    props: {
        modelValue: String,
        focus: Boolean,
        height: {
            type: [String, Number],
            default: 140
        },
        len: {
            type: Number,
            default: 4
        },
        gutter: {
            type: Number,
            default: 20
        },
        border: Boolean,
        backgroundColor: {
            type: String,
            default: "#ebecee"
        }
    },

    emits: ["update:modelValue", "done"],

    setup(props, { emit }) {
        const value = ref(props.modelValue || "")

        // 是否聚焦
        const isFocus = ref(props.focus)

        // 头条小程序下，无法 v-for 数字
        const list = computed(() => new Array(props.len).fill(1))

        watch(
            () => props.modelValue,
            (val: any) => {
                value.value = val
            }
        )

        function onFocus() {
            isFocus.value = true
        }

        function onBlur() {
            isFocus.value = false
        }

        function onInput(e: any) {
            const val = e.detail.value

            emit("update:modelValue", val)

            if (val.length === props.len) {
                emit("done", val)
            }
        }

        return {
            value,
            isFocus,
            list,
            parseRpx,
            onFocus,
            onBlur,
            onInput
        }
    }
})
</script>
