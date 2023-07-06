<template>
    <view class="cl-scroller__wrap">
        <view
            class="cl-scroller__loading"
            :style="{
                transform,
                transition
            }"
        >
            <slot name="loading" :text="text" :status="status" :move="touch.move">
                <cl-loading :size="20" v-if="status == 'loading'"></cl-loading>
                <cl-text :size="26" :margin="[0, 0, 0, 14]" :value="text"></cl-text>
            </slot>
        </view>

        <view
            class="cl-scroller"
            :style="{
                transform,
                transition
            }"
            @touchmove="onTouchMove"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
        >
            <scroll-view
                class="cl-scroller__view"
                scroll-y
                :lower-top="bottom"
                :scroll-top="scrollTop2"
                :scroll-into-view="scrollIntoView"
                :scroll-with-animation="scrollWithAnimation"
                :enable-back-to-top="enableBackToTop"
                :show-scrollbar="showScrollbar"
                :enable-flex="enableFlex"
                @scroll="onScroll"
                @scrolltolower="up"
            >
                <slot></slot>
            </scroll-view>
        </view>

        <!-- 回到顶部 -->
        <view
            class="cl-scroller__back-top"
            :class="[
                {
                    fadeIn: backTopButtonFadeIn
                }
            ]"
            @tap="backTop"
            v-if="showBackTopButton"
        >
            <cl-icon name="top" color="#666"></cl-icon>
            <text class="cl-scroller__back-top-text">顶部</text>
        </view>
    </view>
</template>

<script lang="ts">
/**
 * @description 滚动区域
 * @property {Number} top 距离顶部多少px触发
 * @property {Number} bottom 距离底部多少px触发
 * @property {String} loadingText 正在刷新文案
 * @property {String} pullingText 下拉刷新文案
 * @property {String} releaseText 释放刷新文案
 * @property {Number} scrollTop 滚动条距离顶部位置
 * @property {String} scrollIntoView 滚动到对应元素id
 */

import { computed, defineComponent, getCurrentInstance, reactive, ref, watch } from "vue"

export default defineComponent({
    props: {
        top: {
            type: Number,
            default: 80
        },
        bottom: {
            type: Number,
            default: 100
        },
        loadingText: {
            type: String,
            default: "正在刷新"
        },
        pullingText: {
            type: String,
            default: "下拉刷新"
        },
        releaseText: {
            type: String,
            default: "释放刷新"
        },
        scrollTop: Number,
        scrollIntoView: String,
        scrollWithAnimation: {
            type: Boolean,
            default: true
        },
        enableBackToTop: Boolean,
        showBackTopButton: {
            type: Boolean,
            default: true
        },
        showScrollbar: Boolean,
        enableFlex: Boolean,
        refresherEnabled: {
            type: Boolean,
            default: true
        }
    },

    setup(props, { emit }) {
        const { proxy }: any = getCurrentInstance()

        // 按下
        const touch = reactive({
            start: 0,
            move: 0
        })

        // 滚动距离
        const scrollTop2 = ref(0)

        watch(
            () => props.scrollTop,
            (val: any) => {
                scrollTop2.value = val || 0
            },
            {
                immediate: true
            }
        )

        // 回到顶部
        const backTopButtonFadeIn = ref(false)

        // 状态
        const status = ref("end")

        // 过渡效果
        const transform = computed(() => {
            return touch.move ? `translate3d(0, ${touch.move}px, 0)` : ""
        })

        // 动画
        const transition = computed(() => {
            return ["end", "loading"].includes(status.value) ? "transform 0.3s" : ""
        })

        const isReleasable = computed(() => touch.move >= props.top)

        //文案
        const text = computed(() => {
            switch (status.value) {
                case "pulling":
                    return isReleasable.value ? props.releaseText : props.pullingText
                case "loading":
                    return props.loadingText
                default:
                    return props.pullingText
            }
        })

        // 滚动开始
        function onTouchStart(e: any) {
            if (status.value == "end" && props.refresherEnabled) {
                touch.start = e.changedTouches[0].clientY
                status.value = "pulling"
            }
        }

        // 滚动中
        function onTouchMove(e: any) {
            if (status.value == "pulling" && scrollTop2.value <= 10) {
                let offset = e.changedTouches[0].clientY - touch.start

                if (offset <= 200) {
                    touch.move = offset
                }
            }
        }

        // 滚动结束
        function onTouchEnd() {
            if (isReleasable.value) {
                down()
            } else {
                end()
            }
        }

        // 滚动监听
        function onScroll(e: any) {
            backTopButtonFadeIn.value = e.detail.scrollTop >= 200
            emit("scroll", e)
        }

        // 下拉刷新
        function down() {
            uni.createSelectorQuery()
                .in(proxy)
                .select(".cl-scroller__loading")
                .fields({ size: true }, (d) => {
                    status.value = "loading"
                    //@ts-ignore
                    touch.move = d.height || 0
                    emit("down")
                })
                .exec()
        }

        // 上拉加载
        function up() {
            emit("up")
        }

        // 收起，结束
        function end() {
            status.value = "end"
            touch.move = 0
        }

        // 滚动到
        function scrollTo(top: number) {
            scrollTop2.value = top
        }

        // 回到顶部
        function backTop() {
            scrollTop2.value = Math.random()
        }

        return {
            touch,
            scrollTop2,
            backTopButtonFadeIn,
            status,
            transform,
            transition,
            isReleasable,
            text,
            onScroll,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            down,
            up,
            end,
            scrollTo,
            backTop
        }
    }
})
</script>
