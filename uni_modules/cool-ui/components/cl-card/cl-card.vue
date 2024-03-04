<template>
    <view
        class="cl-card"
        :style="{
            backgroundColor
        }"
    >
        <view class="cl-card__header" v-if="label">
            <cl-text :size="fontSize" bold :value="label"></cl-text>

            <view class="cl-card__loading" v-if="loading">
                <cl-loading :size="18" :loading="loading"></cl-loading>
            </view>

            <template v-else>
                <view class="cl-card__more" v-if="more" @tap="toMore">
                    <slot name="more">
                        <text class="text">{{ moreText }}</text>
                        <text class="cl-icon-arrow-right"></text>
                    </slot>
                </view>
            </template>
        </view>

        <view class="cl-card__container">
            <slot></slot>
        </view>

        <view class="cl-card__footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </view>
    </view>
</template>

<script lang="ts">
/**
 * @description 卡片
 * @property {String} label 标签内容
 * @property {Boolean} loading 是否加载中
 * @property {Number} fontSize 字体大小
 * @property {Boolean} more 是否显示查看更多
 * @property {Boolean} moreText 更多的文本内容,默认"查看更多"
 * @event {Function} more 点击更多时触发
 */

import { defineComponent } from "vue"

export default defineComponent({
    name: "cl-card",

    props: {
        label: String,
        loading: Boolean,
        fontSize: {
            type: Number,
            default: 28
        },
        more: Boolean,
        moreText: String,
        backgroundColor: {
            type: String,
            default: "#ffffff"
        }
    },

    setup(_, { emit }) {
        function toMore() {
            emit("more")
        }

        return {
            toMore
        }
    }
})
</script>
