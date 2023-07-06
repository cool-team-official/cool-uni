<template>
    <view
        class="cl-list"
        :style="{
            'border-radius': parseRpx(radius)
        }"
    >
        <slot></slot>
    </view>
</template>

<script lang="ts">
/**
 * @description 列表
 * @property {String} justify 水平布局方式
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} border 是否带有下边框，默认true
 * @property {Number} radius 圆角大小
 */

import { defineComponent } from "vue"
import type { PropType } from "vue"
import { parseRpx } from "/@/cool/utils"

export default defineComponent({
    name: "cl-list",

    props: {
        justify: String as PropType<"start" | "end" | "center">,
        disabled: Boolean,
        border: {
            type: Boolean,
            default: true
        },
        radius: Number
    },

    setup() {
        return {
            parseRpx
        }
    }
})
</script>
