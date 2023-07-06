<template>
    <view class="cl-timeline">
        <slot></slot>
    </view>
</template>

<script lang="ts">
/**
 * @description 时间线
 * @property {Number} timestampWidth 左侧时间宽度，默认140
 */

import { defineComponent } from "vue"

export default defineComponent({
    name: "cl-timeline",

    props: {
        timestampWidth: {
            type: Number,
            default: 150
        }
    }
})
</script>
