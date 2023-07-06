<template>
    <view
        :class="['cl-avatar', `cl-avatar--${shape}`]"
        :style="{ height: parseRpx(size), width: parseRpx(size), backgroundColor }"
        @click="tap"
    >
        <slot v-if="$slots.default || $slots.$default"> </slot>

        <template v-else>
            <slot name="placeholder" v-if="!src">
                <view class="cl-avatar__placeholder">
                    <text
                        :class="{
                            'cl-icon-my': !name
                        }"
                        :style="{ fontSize: parseRpx(size / 2) }"
                        >{{ name[0] }}</text
                    >
                </view>
            </slot>

            <slot name="error" v-else-if="isError">
                <view class="cl-avatar__error"> Error </view>
            </slot>

            <image
                v-else
                class="cl-avatar__target"
                :src="src"
                :mode="mode"
                :lazy-load="lazyLoad"
                @error="handleError"
                @load="handleLoad"
            ></image>
        </template>
    </view>
</template>

<script lang="ts">
/**
 * @description 头像
 * @property {String} src 图片链接
 * @property {Boolean} lazyLoad 懒加载
 * @property {Number} size 头像大小，默认80
 * @property {String} shape 头像的形状，默认circle
 * @property {String} mode 裁剪，缩放模式
 */

import { computed, defineComponent, ref } from "vue"
import type { PropType } from "vue"
import { parseRpx } from "/@/cool/utils"
import { useTap } from "../../hook"

export default defineComponent({
    name: "cl-avatar",

    props: {
        src: String,
        name: {
            type: String,
            default: ""
        },
        lazyLoad: Boolean,
        size: {
            type: Number,
            default: 80
        },
        shape: {
            type: String as PropType<"circle" | "square">,
            default: "circle"
        },
        mode: {
            type: String,
            default: "scaleToFill"
        }
    },

    emits: ["error", "load"],

    setup(props, { emit }) {
        const { tap } = useTap(emit)

        // 是否加载失败
        const isError = ref(false)

        // 背景色
        const backgroundColor = computed(() => (props.src ? "" : "#c0c4cc"))

        function handleLoad(e: any) {
            isError.value = false
            emit("error", e)
        }

        function handleError(e: any) {
            isError.value = true
            emit("load", e)
        }

        return {
            isError,
            backgroundColor,
            parseRpx,
            tap,
            handleLoad,
            handleError
        }
    }
})
</script>
