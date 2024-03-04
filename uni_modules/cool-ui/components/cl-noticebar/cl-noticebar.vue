<template>
    <view
        class="cl-noticebar"
        :class="[
            {
                'is-scrollable': scrollable
            }
        ]"
        :style="{
            color,
            backgroundColor
        }"
        v-if="visible"
    >
        <view class="cl-noticebar__close" @tap="close" v-if="closeable">
            <cl-icon name="close-border" :size="36"></cl-icon>
        </view>

        <view class="cl-noticebar__icon" v-if="$slots.icon || icon">
            <slot v-if="$slots.icon" name="icon"></slot>
            <cl-icon v-else :class-name="icon" :size="36"></cl-icon>
        </view>

        <view class="cl-noticebar__box">
            <view
                class="cl-noticebar__scroller"
                :class="[`is-${direction}`]"
                :style="{
                    top: scroll.top + 'px',
                    left: scroll.left + 'px',
                    transition,
                    transform: `translateX(-${scroll.translateX}px)`
                }"
            >
                <text class="cl-noticebar__text" v-for="(item, index) in list" :key="index">{{ item }}</text>
            </view>
        </view>

        <view class="cl-noticebar__more"></view>
    </view>
</template>

<script lang="ts">
/**
 * @description 通知栏
 * @property {String, Array} text 文本内容
 * @property {String} direction 方向 horizontal | vertical，默认horizontal
 * @property {String} color 字体颜色
 * @property {String} backgroundColor 背景颜色
 * @property {String} type 通知类型
 * @property {Boolean} scrollable 能否滚动
 * @property {Boolean} closeable 能否关闭
 * @property {String} icon 图标
 * @property {Number} duration 滑动时长（秒），默认6
 */

import { defineComponent, onMounted, onUnmounted, reactive, ref, computed, getCurrentInstance } from "vue"
import type { PropType } from "vue"
import { isArray } from "lodash-es"

export default defineComponent({
    name: "cl-noticebar",

    props: {
        text: {
            type: [String, Array],
            default: "",
            required: true
        },
        direction: {
            type: String as PropType<"horizontal" | "vertical">,
            default: "horizontal"
        },
        color: {
            type: String,
            default: "#444"
        },
        backgroundColor: {
            type: String,
            default: "#fff"
        },
        type: {
            type: String,
            default: "default"
        },
        scrollable: Boolean,
        closeable: Boolean,
        icon: String,
        duration: {
            type: Number,
            default: 10
        }
    },

    emits: ["close"],

    setup(props, { emit }) {
        const { proxy }: any = getCurrentInstance()

        // 是否可见
        const visible = ref(true)

        // 滚动配置
        const scroll = reactive({
            left: 0,
            top: 0,
            translateX: 0,
            duration: 0
        })

        // 计时器
        let timer: any = null

        // 文案列表
        const list = computed(() => {
            return isArray(props.text) ? props.text : [props.text]
        })

        // 动画过度
        const transition = computed(() => {
            if (props.direction == "horizontal") {
                return `transform ${scroll.duration}s linear`
            } else {
                return `top 0.3s`
            }
        })

        // 刷新
        function refresh() {
            if (props.scrollable) {
                // 清除定时器
                clear()

                // 获取盒子大小
                uni.createSelectorQuery()
                    .in(proxy)
                    .select(`.cl-noticebar__box`)
                    .boundingClientRect((box: any) => {
                        // 获取文本大小
                        uni.createSelectorQuery()
                            .in(proxy)
                            .select(`.cl-noticebar__text`)
                            .boundingClientRect((text: any) => {
                                const duration = props.duration * 1000

                                // 水平滑动
                                if (props.direction == "horizontal") {
                                    const fn = () => {
                                        scroll.duration = props.duration
                                        scroll.left = box.width
                                        scroll.translateX = text.width + scroll.left

                                        timer = setTimeout(() => {
                                            scroll.translateX = 0
                                            scroll.duration = 0

                                            setTimeout(fn, 500)
                                        }, duration)
                                    }

                                    fn()
                                }
                                // 垂直滑动
                                else {
                                    timer = setInterval(() => {
                                        if (Math.abs(scroll.top) >= box.height * (list.value.length - 1)) {
                                            scroll.top = 0
                                        } else {
                                            scroll.top -= box.height
                                        }
                                    }, duration)
                                }
                            })
                            .exec()
                    })
                    .exec()
            }
        }

        // 关闭
        function close() {
            clear()
            visible.value = false
            emit("close")
        }

        // 清空
        function clear() {
            clearInterval(timer)
            clearTimeout(timer)
            timer = null
        }

        onMounted(() => {
            refresh()
        })

        onUnmounted(() => {
            clear()
        })

        return {
            visible,
            scroll,
            list,
            transition,
            refresh,
            close,
            clear
        }
    }
})
</script>
