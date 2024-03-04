<template>
    <view class="cl-avatar-group">
        <template v-for="(item, index) in urls" :key="index">
            <cl-avatar v-if="index < max" :size="size" :mode="mode" :shape="shape" :src="item"></cl-avatar>
        </template>

        <cl-avatar :size="size" v-if="overLen > 0 && showMore">
            <view class="cl-avatar-group__more"> {{ overLen }} </view>
        </cl-avatar>
    </view>
</template>

<script lang="ts">
/**
 * @description 头像组
 * @property {Array} urls 图片链接
 * @property {Number} max 最大数量，默认5
 * @property {Number} size 头像大小，默认80
 * @property {String} shape 头像的形状，默认circle
 * @property {String} mode 裁剪,缩放模式
 */

import { computed, defineComponent } from "vue"
import type { PropType } from "vue"

export default defineComponent({
    name: "cl-avatar-group",

    props: {
        urls: {
            type: Array as PropType<string[]>,
            default: () => []
        },
        size: {
            type: Number,
            default: 80
        },
        max: {
            type: Number,
            default: 5
        },
        showMore: {
            type: Boolean,
            default: true
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

    setup(props) {
        const overLen = computed(() => props.urls.length - props.max)

        return {
            overLen
        }
    }
})
</script>
