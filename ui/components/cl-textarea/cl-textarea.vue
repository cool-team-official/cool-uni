<template>
    <view
        class="cl-textarea"
        :class="[
            {
                'is-disabled': isDisabled,
                'is-count': count,
                'is-border': border
            }
        ]"
        :style="{
            backgroundColor,
            borderRadius: parseRpx(borderRadius)
        }"
    >
        <textarea
            v-model="value"
            :style="{ height: parseRpx(height) }"
            :placeholder="placeholder"
            :disabled="isDisabled"
            :focus="focus"
            :auto-height="autoHeight"
            :fixed="fixed"
            :cursor-spacing="cursorSpacing"
            :cursor="cursor"
            :show-confirm-bar="showConfirmBar"
            :selection-start="selectionStart"
            :selection-end="selectionEnd"
            :adjust-position="adjustPosition"
            :disable-default-padding="disableDefaultPadding"
            :hold-keyboard="holdKeyboard"
            :maxlength="maxlength"
            @focus="onFocus"
            @blur="onBlur"
            @linechange="onLinechange"
            @input="onInput"
            @confirm="onConfirm"
            @keyboardheightchange="onKeyboardheightchange"
        ></textarea>

        <!-- #ifndef MP-ALIPAY -->
        <text class="cl-textarea__count" v-if="count">{{ value?.length || 0 }}/{{ maxlength }}</text>
        <!-- #endif -->
    </view>
</template>

<script lang="ts">
/**
 * @description 文本域
 * @property {String} value 绑定值
 * @property {Boolean} count 是否显示统计字数
 * @property {String} placeholder 占位内容
 * @property {String} height 输入框高度，默认140rpx
 * @event {Function} change 绑定值改变时触发
 */

import { computed, defineComponent, ref, watch } from "vue"
import { useForm } from "../../hook"
import { parseRpx } from "/@/cool/utils"

export default defineComponent({
    name: "cl-textarea",

    props: {
        modelValue: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: "请输入"
        },
        height: {
            type: Number,
            default: 140
        },
        disabled: {
            type: Boolean,
            default: null
        },
        border: {
            type: Boolean,
            default: true
        },
        count: Boolean,
        focus: Boolean,
        autoHeight: Boolean,
        fixed: Boolean,
        cursorSpacing: {
            type: Number,
            default: 0
        },
        cursor: Number,
        showConfirmBar: {
            type: Boolean,
            default: true
        },
        selectionStart: {
            type: Number,
            default: -1
        },
        selectionEnd: {
            type: Number,
            default: -1
        },
        adjustPosition: {
            type: Boolean,
            default: true
        },
        disableDefaultPadding: Boolean,
        holdKeyboard: Boolean,
        maxlength: {
            type: Number,
            default: 140
        },
        backgroundColor: String,
        borderRadius: [String, Number]
    },

    emits: ["update:modelValue", "change", "clear", "focus", "blur", "linechange", "confirm", "keyboardheightchange"],

    setup(props, { emit }) {
        const { disabled } = useForm()

        // 绑定值
        const value = ref("")

        watch(
            () => props.modelValue,
            (val: string) => {
                value.value = val
            },
            {
                immediate: true
            }
        )

        // 是否禁用
        const isDisabled = computed(() => disabled.value || props.disabled)

        function onFocus(e: any) {
            emit("focus", e)
        }

        function onBlur(e: any) {
            emit("blur", e)
        }

        function onLinechange(e: any) {
            emit("linechange", e)
        }

        function onInput(e: any) {
            emit("update:modelValue", e.detail.value)
        }

        function onConfirm(e: any) {
            emit("confirm", e)
        }

        function onKeyboardheightchange(e: any) {
            emit("keyboardheightchange", e)
        }

        return {
            value,
            isDisabled,
            parseRpx,
            onFocus,
            onBlur,
            onLinechange,
            onInput,
            onConfirm,
            onKeyboardheightchange
        }
    }
})
</script>
