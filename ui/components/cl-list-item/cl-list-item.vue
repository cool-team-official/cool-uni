<template>
    <view
        class="cl-list-item"
        :class="itemClass"
        :style="customStyle"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @click="tap"
    >
        <view
            class="cl-list-item__swiper"
            :style="{
                transform: `translateX(${touch.x}px)`
            }"
        >
            <view class="cl-list-item__container">
                <view class="cl-list-item__icon" v-if="$slots.icon">
                    <slot name="icon"></slot>
                </view>

                <text class="cl-list-item__label" v-if="label && label != 'true'">{{ label }}</text>

                <view class="cl-list-item__content" :class="contentClass">
                    <slot></slot>
                </view>

                <view class="cl-list-item__append">
                    <slot name="append">
                        <text v-if="arrowIcon" class="cl-icon-arrow-right"></text>
                    </slot>
                </view>
            </view>

            <template v-if="swipe != 'none'">
                <view :class="[`cl-list-item__menu-${swipe}`]">
                    <slot name="menu"></slot>
                </view>
            </template>
        </view>
    </view>
</template>

<script lang="ts">
/**
 * @description 列表项,自定义内容,支持滑动
 * @property {String} label 标签内容
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} border 是否带有下边框，默认true
 * @property {Boolean} type 类型 primary | success | error | warning | info
 * @property {Boolean} justify 水平布局方式，默认end
 * @property {Boolean} swipe 是否滑动 none | left | right，默认none
 * @property {Object} customStyle 自定义样式
 * @property {Boolean} arrowIcon 是否显示右侧箭头，默认true
 * @event {Function} tap 点击时触发
 */

import { computed, defineComponent, getCurrentInstance, onMounted, reactive, watch } from "vue"
import type { PropType } from "vue"
import { isBoolean } from "lodash-es"
import { useTap } from "../../hook"
import { getParent } from "/@/cool/utils"

export default defineComponent({
    name: "cl-list-item",

    props: {
        label: String,
        disabled: {
            type: Boolean,
            default: null
        },
        border: {
            type: Boolean,
            default: null
        },
        type: String as PropType<"primary" | "success" | "error" | "warning" | "info">,
        justify: String as PropType<"start" | "end" | "center">,
        swipe: {
            type: String as PropType<"none" | "left" | "right">,
            default: "none"
        },
        customStyle: Object,
        arrowIcon: {
            type: Boolean,
            default: true
        }
    },

    setup(props, { slots, emit }) {
        const { proxy }: any = getCurrentInstance()
        const { tap } = useTap(emit)

        // cl-list
        const parent = getParent("cl-list", ["justify", "border", "disabled"])

        // 是否禁用
        const isDisabled = computed(() => {
            return isBoolean(props.disabled) ? props.disabled : parent.value?.disabled
        })

        // 样式
        const itemClass = computed(() => {
            return [
                {
                    "is-append": slots.append,
                    "is-border": isBoolean(props.border) ? props.border : parent.value?.border,
                    "is-disabled": isDisabled.value
                }
            ]
        })

        // 内容样式
        const contentClass = computed(() => {
            let list: string[] = []

            if (props.type) {
                list.push(`is-color-${props.type}`)
            }

            return [`is-color-${props.type}`, `is-justify-${props.justify || parent.value?.justify || "end"}`]
        })

        // 触摸
        const touch = reactive({
            start: 0,
            end: 0,
            x: 0,
            maxX: 0,
            direction: "left",
            lock: true
        })

        // 滑动菜单
        const menu = reactive({
            width: 0
        })

        // 滑动开始
        function onTouchStart(e: any) {
            if (props.swipe != "none") {
                touch.start = e.touches[0].pageX
                touch.lock = false
            }
        }

        // 滑动中
        function onTouchMove(e: any) {
            const { start, end, lock, maxX } = touch

            if (!lock) {
                // 滑动距离
                const offsetX = e.touches[0].pageX - start

                // 移动方向
                touch.direction = offsetX > 0 ? "right" : "left"

                // 偏移距离
                let x = end + offsetX

                if (props.swipe == "left") {
                    if (x > maxX) {
                        x = maxX
                    }

                    if (x < 0) {
                        x = 0
                    }
                }

                if (props.swipe == "right") {
                    if (x < maxX) {
                        x = maxX
                    }

                    if (x > 0) {
                        x = 0
                    }
                }

                touch.x = x
            }
        }

        // 滑动结束
        function onTouchEnd() {
            const { direction, x, end, lock, maxX } = touch
            const sw = menu.width / 2 > 50 ? 50 : menu.width / 2

            if (!lock) {
                if (Math.abs(x - end) > sw) {
                    if (direction === props.swipe) {
                        touch.x = 0
                    } else {
                        touch.x = maxX
                    }

                    touch.end = touch.x
                } else {
                    touch.x = end === 0 ? 0 : maxX
                }

                touch.lock = true
            }
        }

        // 设置菜单宽度
        function setMenu() {
            if (props.swipe != "none") {
                const query = uni.createSelectorQuery().in(proxy)

                query
                    .select(`.cl-list-item__menu-${props.swipe}`)
                    .boundingClientRect((data) => {
                        if (data) {
                            //@ts-ignore
                            menu.width = data.width || 0
                            touch.maxX = menu.width * (props.swipe === "right" ? -1 : 1)
                        }
                    })
                    .exec()
            }
        }

        // 滑动后还原位置的方法
        function restore(cb: Function) {
            touch.start = 0
            touch.end = 0
            touch.lock = true
            touch.x = 0

            if (cb) {
                setTimeout(() => {
                    cb()
                }, 300)
            }
        }

        // 重新设置滑动菜单
        watch(() => props.swipe, setMenu)

        onMounted(() => {
            setMenu()
        })

        return {
            itemClass,
            contentClass,
            touch,
            menu,
            restore,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            tap
        }
    }
})
</script>
