<template>
    <view
        class="cl-radio-group"
        :class="{
            'is-fill': fill
        }"
    >
        <slot></slot>
    </view>
</template>

<script lang="ts">
/**
 * @description 单选框组
 * @property {String, Number} value 绑定值
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} border 是否边框样式
 * @property {Boolean} fill 是否宽度填充
 * @property {Boolean} size 尺寸
 * @event {Function} change 绑定值改变时触发
 */

import { defineComponent } from "vue"

export default defineComponent({
    name: "cl-radio-group",

    props: {
        modelValue: null,
        disabled: Boolean,
        border: Boolean,
        fill: Boolean,
        size: {
            type: [String, Number],
            default: null
        }
    },

    emits: ["update:modelValue", "change"],

    setup(_, { emit }) {
        function change(label: any) {
            emit("update:modelValue", label)
            emit("change", label)
        }

        return {
            change
        }
    }
})
</script>
