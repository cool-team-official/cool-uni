<template>
    <view class="cl-loading" :class="[`cl-loading--${theme}`]" :style="{ height: size + 'px', width: size + 'px' }">
        <!-- 菊花 -->
        <template v-if="theme == 'spin'">
            <view
                class="cl-loading__spin"
                v-for="(a, i) in 5"
                :key="a"
                :style="{
                    transform: `rotate(${i * 45}deg)`
                }"
            >
                <text class="cl-loading__spin-item" :style="spin" v-for="i in 2" :key="i"></text>
            </view>
        </template>

        <!-- 默认 -->
        <view
            class="cl-loading__inner"
            :style="{
                color,
                borderColor,
                borderWidth: spin.width,
                'border-bottom-color': 'currentColor'
            }"
            v-else
        >
        </view>
    </view>
</template>

<script lang="ts">
/**
 * @description 加载图标
 * @property {String} color 图标颜色
 * @property {String} borderColor 边框颜色
 * @property {String} borderWidth 边框大小
 * @property {String} theme 主题
 * @property {Number} size 图标大小
 */

import { computed, defineComponent } from "vue"
import type { PropType } from "vue"
import { parseRpx } from "/@/cool/utils"

export default defineComponent({
    name: "cl-loading",

    props: {
        color: String,
        borderColor: {
            type: String,
            default: "rgba(0, 0, 0, 0.1)"
        },
        borderWidth: {
            type: [String, Number],
            default: 4
        },
        theme: {
            type: String as PropType<"default" | "spin">,
            default: "default"
        },
        size: {
            type: Number,
            default: 25
        }
    },

    setup(props) {
        const rh = computed(() => props.size / 8)
        const rw = computed(() => props.size / 20)

        return {
            rh,
            rw,
            spin: {
                backgroundColor: props.color,
                width: parseRpx(props.borderWidth),
                height: "20%"
            }
        }
    }
})
</script>
