<template>
    <view
        class="cl-tree-item"
        :class="{
            'is-expand': data.isExpand,
            'is-checked': isChecked
        }"
        :style="itemStyle"
    >
        <view class="cl-tree-item__content" :style="childStyle" @tap="toTap">
            <view class="cl-tree-item__expand" @tap.stop="toExpand()" v-if="!isLeaf">
                <text class="icon-caret cl-icon-caret-bottom"></text>
            </view>

            <view class="cl-tree-item__label">
                <slot name="item" :data="data" :level="level">
                    {{ label }}
                </slot>
            </view>

            <text class="cl-tree-item__check cl-icon-check"></text>
        </view>

        <view
            class="cl-tree-item__children"
            :style="{
                maxHeight: maxHeight
            }"
            v-if="isExpand"
        >
            <cl-tree-item
                v-for="(item, index) in children"
                :data="item"
                :siblings="children"
                :key="index"
                :level="level + 1"
            >
                <!-- <template #item="{ data, level }">
					<slot name="item" :data="data" :level="level"> </slot>
				</template> -->
            </cl-tree-item>
        </view>
    </view>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from "vue"
import type { PropType } from "vue"
import { getParent, parseRpx } from "/@/cool/utils"
import { isEmpty } from "lodash-es"

export default defineComponent({
    name: "cl-tree-item",

    props: {
        data: {
            type: Object as PropType<ClTree.Item>,
            default: () => {
                return {}
            }
        },
        siblings: {
            type: Array as PropType<ClTree.Item[]>,
            default: () => []
        },
        level: {
            type: Number,
            default: 0
        }
    },

    setup(props) {
        // cl-tree
        const parent = getParent("cl-tree", [
            "value",
            "updateValue",
            "data",
            "keys",
            "getKey",
            "rowHeight",
            "checkStrictly",
            "accordion",
            "noChildren"
        ])

        // 是否展开
        const isExpand = ref(props.data.isExpand || false)

        // 最大高度
        const maxHeight = ref()

        // 样式
        const itemStyle = computed(() => {
            return {
                paddingLeft: (props.level ? 26 : 0) + "rpx"
            }
        })

        // 子集样式
        const childStyle = computed(() => {
            return {
                marginLeft: parent.value?.noChildren ? 0 : isLeaf.value ? "32rpx" : "0",
                height: parseRpx(parent.value?.rowHeight)
            }
        })

        // 是否叶子节点
        const isLeaf = computed(() => isEmpty(getKey("children")))

        // 是否选中
        const isChecked = computed(() => parent.value?.value.includes(getKey("value")))

        // 文本
        const label = computed(() => getKey("label"))

        // 子集
        const children = computed(() => getKey("children"))

        // 获取高度
        function getHeight() {
            let n = 0

            function deep(arr: any[]) {
                arr.forEach((e) => {
                    n += 1
                    if (e.isExpand && getKey("children", e)) {
                        deep(getKey("children", e))
                    }
                })
            }

            deep(getKey("children") || [])

            return n * (parent.value?.rowHeight || 50) + "rpx"
        }

        // 展开
        let timer: any

        async function toExpand(invert: boolean = true) {
            if (getKey("children")) {
                if (invert) {
                    props.data.isExpand = !props.data.isExpand
                }

                clearTimeout(timer)

                if (props.data.isExpand) {
                    isExpand.value = true

                    // 1 设置0
                    maxHeight.value = "0"

                    await nextTick()

                    setTimeout(() => {
                        // 2 获取高度
                        maxHeight.value = getHeight()

                        timer = setTimeout(() => {
                            // 3 清除高度
                            maxHeight.value = undefined

                            // 是否每次只打开一个同级树节点展开
                            if (parent.value?.accordion) {
                                props.siblings.forEach((e) => {
                                    if (getKey("value", e) !== getKey("value")) {
                                        e.isExpand = false
                                    }
                                })
                            }
                        }, 300)
                    }, 50)
                } else {
                    // 1 获取高度
                    maxHeight.value = getHeight()

                    await nextTick()

                    setTimeout(() => {
                        // 2 设置0
                        maxHeight.value = "0rpx"

                        timer = setTimeout(() => {
                            isExpand.value = false
                        }, 300)
                    }, 50)
                }
            }
        }

        // 选择
        function toCheck() {
            parent.value?.updateValue(getKey("value"))
        }

        // 获取key
        function getKey(key: string, value?: ClTree.Item) {
            if (!value) {
                value = props.data
            }
            return parent.value?.getKey?.(key, value)
        }

        // 点击
        function toTap() {
            if (isLeaf.value || parent.value?.checkStrictly) {
                toCheck()
            } else {
                toExpand()
            }
        }

        watch(
            () => props.data.isExpand,
            (val) => {
                if (!val) {
                    toExpand(false)
                }
            }
        )

        return {
            isExpand,
            maxHeight,
            itemStyle,
            childStyle,
            isLeaf,
            isChecked,
            label,
            children,
            toExpand,
            getKey,
            toTap
        }
    }
})
</script>
