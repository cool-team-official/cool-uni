<template>
    <view class="cl-progress">
        <view class="cl-progress-bar" v-if="type === 'line'">
            <view class="cl-progress-bar__outer" :style="{ height: parseRpx(strokeWidth), backgroundColor: unColor }">
                <view
                    class="cl-progress-bar__inner"
                    :style="{
                        backgroundColor,
                        width
                    }"
                ></view>
            </view>
        </view>

        <slot name="text">
            <view class="cl-progress__text" v-if="showText">
                <template v-if="!status">{{ value }}%</template>
                <text class="cl-progress__icon" v-else :class="icon"></text>
            </view>
        </slot>
    </view>
</template>

<script lang="ts">
/**
 * @description 进度条，支持多种颜色显示
 * @property {Number} value 绑定值
 * @property {String} type 类型
 * @property {String} strokeWidth 线条宽度
 * @property {String} showText 是否显示文本
 * @property {String} color 线条颜色, 支持多色
 * @property {String} status 状态
 * @property {Boolean} icon 尾部图标
 * @example <cl-progress :value="40"></cl-progress>
 */

import { computed, defineComponent } from "vue"
import { parseRpx } from "/@/cool/utils"
import { getCurrentColor } from "../../utils"

export default defineComponent({
    name: "cl-progress",

    props: {
        value: {
            type: Number,
            default: 0,
            required: true
        },
        type: {
            type: String,
            default: "line"
        },
        strokeWidth: {
            type: Number,
            default: 12
        },
        showText: {
            type: Boolean,
            default: true
        },
        color: {
            type: [String, Array],
            default: ""
        },
        unColor: {
            type: String,
            default: "#ebeef5"
        },
        status: {
            type: Boolean
        },
        icon: String
    },

    setup(props) {
        // 宽度
        const width = computed(() => {
            if (props.value > 100) {
                return "100%"
            } else if (props.value < 0) {
                return 0
            } else {
                return `${props.value}%`
            }
        })

        // 背景颜色
        const backgroundColor = computed(() => {
            return getCurrentColor({
                value: props.value,
                color: props.color,
                max: 100
            })
        })

        return {
            parseRpx,
            width,
            backgroundColor
        }
    }
})
</script>
