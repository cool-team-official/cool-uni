<template>
    <view
        class="cl-checkbox-group"
        :class="{
            'is-fill': fill
        }"
    >
        <slot></slot>
    </view>
</template>

<script lang="ts">
/**
 * @description 多选框组
 * @property {String, Number} value 绑定值
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} border 是否边框样式
 * @property {Boolean} round 是否圆角
 * @property {Boolean} fill 是否宽度填充
 * @property {Boolean} size 尺寸
 * @event {Function} change 绑定值改变时触发
 */

import { defineComponent } from "vue"
import { cloneDeep } from "lodash-es"

export default defineComponent({
    name: "cl-checkbox-group",

    props: {
        modelValue: {
            type: Array,
            default: () => []
        },
        border: {
            type: Boolean,
            default: null
        },
        disabled: {
            type: Boolean,
            default: null
        },
        round: {
            type: Boolean,
            default: null
        },
        fill: {
            type: Boolean,
            default: null
        },
        size: {
            type: [String, Number],
            default: null
        }
    },

    emits: ["update:modelValue", "change"],

    setup(props, { emit }) {
        function onChange(label: string) {
            const index = props.modelValue.findIndex((e) => e == label)
            let list = cloneDeep(props.modelValue)

            if (index >= 0) {
                list.splice(index, 1)
            } else {
                list.push(label)
            }

            emit("update:modelValue", list)
            emit("change", list)
        }

        return {
            onChange
        }
    }
})
</script>
