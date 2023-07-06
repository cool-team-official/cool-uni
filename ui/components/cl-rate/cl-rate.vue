<template>
    <view class="cl-rate">
        <view class="cl-rate__icon" v-for="(item, index) in list" :key="index" @tap="onTap(index)">
            <cl-icon :class-name="icon" :size="size" :color="voidColor"></cl-icon>

            <view
                class="cl-rate__icon-active"
                :style="{
                    width: item.width
                }"
            >
                <cl-icon :class-name="icon" :size="size" :color="item.color"></cl-icon>
            </view>
        </view>

        <view class="cl-rate__text" v-if="showText">
            {{ text }}
        </view>
    </view>
</template>

<script lang="ts">
/**
 * @description 评分，可自定义图标
 * @property {Number, String} value 绑定值
 * @property {String} icon 评分图标，默认cl-icon-favor-fill
 * @property {String, Array} color 选中颜色，Array下为多色。默认主色
 * @property {String} voidColor 未选中颜色，默认#C6D1DE
 * @property {Number} size 图标大小，默认40
 * @property {Number, String} max 最大值，默认5
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} showText 是否显示分数
 * @event {Function} change 绑定值改变时触发
 */

import { computed, defineComponent, ref, watch } from "vue"
import { useForm } from "../../hook"
import { getCurrentColor } from "../../utils"
import { isEmpty } from "lodash-es"

export default defineComponent({
    name: "cl-rate",

    props: {
        modelValue: {
            type: Number,
            default: 0
        },
        icon: {
            type: String,
            default: "cl-icon-favor-fill"
        },
        color: {
            type: [String, Array],
            default: ""
        },
        voidColor: {
            type: String,
            default: "#C6D1DE"
        },
        size: {
            type: [Number, String],
            default: 40
        },
        max: {
            type: [Number, String],
            default: 5
        },
        disabled: {
            type: Boolean,
            default: null
        },
        showText: {
            type: Boolean,
            default: null
        },
        texts: {
            type: Array,
            default: () => []
        }
    },

    setup(props, { emit }) {
        const { disabled } = useForm()

        // 绑定值
        const value = ref(0)

        watch(
            () => props.modelValue,
            (val: number) => {
                value.value = Number(val)
            },
            {
                immediate: true
            }
        )

        // 文本内容
        const text = computed(() => {
            return isEmpty(props.texts) ? value.value : props.texts[Math.ceil(value.value) - 1]
        })

        // 列表
        const list = computed(() => {
            return new Array(props.max).fill(1).map((_, i) => {
                const int: number = parseInt(String(value.value))
                const dec: number = value.value - int

                // 处理宽度和颜色
                return {
                    width: (value.value > i ? (int > i ? 100 : dec * 100) : 0) + "%",
                    color: getCurrentColor({
                        value: value.value,
                        color: props.color,
                        max: props.max
                    })
                }
            })
        })

        // 点击
        function onTap(index: number) {
            if (disabled.value || props.disabled) {
                return false
            }

            value.value = index + 1

            emit("update:modelValue", value.value)
            emit("change", value.value)
        }

        return {
            value,
            list,
            text,
            onTap
        }
    }
})
</script>
