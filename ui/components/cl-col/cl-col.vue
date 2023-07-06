<template>
    <view
        class="cl-col"
        :class="[classList]"
        :style="{
            'padding-left': padding,
            'padding-right': padding
        }"
        @click="tap"
    >
        <slot></slot>
    </view>
</template>

<script lang="ts">
/**
 * @description 布局组件
 * @property {Number} span 栅格占据的列数
 * @property {Number} offset 栅格左侧的间隔格数
 * @property {Number} pull 栅格向右移动格数
 * @property {Number} push 栅格向左移动格数
 * @example <cl-col :span="12"></cl-col>
 */

import { computed, defineComponent } from "vue"
import { useTap } from "../../hook"
import { getParent } from "/@/cool/utils"

export default defineComponent({
    name: "cl-col",

    props: {
        span: {
            type: Number,
            default: 24
        },
        offset: Number,
        pull: Number,
        push: Number
    },

    setup(props, { emit }) {
        const { tap } = useTap(emit)

        // cl-row
        const parent = getParent("cl-row", ["gutter"])

        // 间距
        const padding = computed(() => (parent.value ? parent.value.gutter / 2 + "rpx" : 0))

        // 样式
        const classList = computed(() => {
            let list: string[] = []
            const validProps: (keyof typeof props)[] = ["span", "offset", "pull", "push"]
            validProps.forEach((k) => {
                let value = props[k] as number
                if (value || value === 0) {
                    list.push(k !== "span" ? `cl-col-${k}-${value}` : `cl-col-${value}`)
                }
            })
            return list.join(" ")
        })

        return {
            classList,
            parent,
            padding,
            tap
        }
    }
})
</script>
