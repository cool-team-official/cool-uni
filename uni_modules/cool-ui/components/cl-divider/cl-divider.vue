<template>
    <view class="cl-divider">
        <view class="cl-divider__line" :style="{ background: lineColor, width }"></view>

        <view
            class="cl-divider__text"
            :style="{
                backgroundColor
            }"
        >
            <slot></slot>
        </view>
    </view>
</template>

<script lang="ts">
/**
 * @description 分割符组件，区隔内容的分割线
 * @property {String} backgroundColor 背景颜色，默认#fff
 * @property {String, Array} color 线条颜色，Array 下当渐变色处理
 * @property {String} width 线条宽度
 */

import { computed, defineComponent } from "vue"
import { isArray } from "lodash-es"

export default defineComponent({
    name: "cl-divider",

    props: {
        backgroundColor: {
            type: String,
            default: "#fff"
        },
        color: {
            type: [String, Array],
            default: "#dcdfe6"
        },
        width: {
            type: String,
            default: "100%"
        }
    },

    setup(props) {
        const lineColor = computed(() => {
            if (isArray(props.color)) {
                const [a, b] = props.color || []
                return `linear-gradient(to right, ${a}, ${b}, ${b}, ${a})`
            } else {
                return props.color
            }
        })

        return {
            lineColor
        }
    }
})
</script>
