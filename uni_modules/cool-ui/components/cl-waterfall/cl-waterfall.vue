<template>
    <view class="cl-waterfall" v-if="visible">
        <!-- 纵向 -->
        <template v-if="direction === 'vertical'">
            <view class="cl-waterfall__item" v-for="(item, index) in list" :key="index">
                <slot :item="item" :index="index"></slot>
            </view>
        </template>

        <!-- 横向 -->
        <template v-else-if="direction === 'horizontal'">
            <slot :list="list"></slot>
        </template>
    </view>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick, getCurrentInstance } from "vue"
import type { PropType } from "vue"
import { isEmpty } from "lodash-es"
import { parseRpx } from "/@/cool/utils"

/**
 * @description 瀑布流布局，自定义内容
 * @property {Array} list 数据列表
 * @property {Number} column 列的数量，默认2
 * @property {Number} gutter 列间隔，默认20
 * @property {String} direction 布局方向
 * @property {String} nodeKey 匹配值，默认 id
 */

export default defineComponent({
    name: "cl-waterfall",

    props: {
        column: {
            type: Number,
            default: 2
        },
        gutter: {
            type: Number,
            default: 20
        },
        direction: {
            type: String as PropType<"horizontal" | "vertical">,
            default: "horizontal"
        },
        nodeKey: {
            type: String,
            default: "id"
        }
    },

    setup(props) {
        const { proxy }: any = getCurrentInstance()

        const visible = ref(true)

        // 列表
        const list = ref<any[]>([])

        // 列数量
        const columnCount = computed(() => (props.direction == "vertical" ? props.column : "none"))

        // 列间距
        const columnGap = computed(() => (props.direction == "vertical" ? parseRpx(props.gutter) : "none"))

        // 刷新列表
        function refresh(data: any[]) {
            visible.value = false

            nextTick(() => {
                visible.value = true

                switch (props.direction) {
                    case "horizontal":
                        list.value = new Array(props.column).fill(1).map(() => [])

                        // 等待 cl-waterfall-column 渲染完成后追加数据
                        nextTick(() => {
                            append(data)
                        })
                        break
                    case "vertical":
                        list.value = data
                        break
                }
            })
        }

        // 计算高度，一个个往列表追加
        async function append(arr: any[]) {
            for (let i in arr) {
                const next = async () => {
                    const rects: any = await getRect()

                    // 获取 cl-waterfall-column 的高度，比较后在最小的列中塞入
                    return Promise.all(rects).then((res) => {
                        let colsHeight = res.map((e: any) => e.height)

                        let minH = Math.min(...colsHeight)
                        let index = colsHeight.indexOf(minH)

                        if (index < 0) {
                            index = 0
                        }

                        list.value[index].push(arr[i])

                        return true
                    })
                }

                await next()
            }
        }

        // 更新单条数据，根据nodeKey来匹配
        function update(id: string | number, data: any) {
            const next = (e: any) => {
                const d = e[props.nodeKey] === id

                if (d) {
                    Object.assign(e, data)
                }

                return Boolean(d)
            }

            switch (props.direction) {
                case "horizontal":
                    list.value.find((col) => {
                        return col.find(next)
                    })
                    break
                case "vertical":
                    list.value.find(next)
                    break
            }
        }

        // 清空列表
        function clear() {
            list.value = []
        }

        // 获取列
        function getRect() {
            return new Promise((resolve) => {
                // #ifdef MP
                let timer: any = null

                function fn() {
                    const children: any[] = proxy.$children

                    if (isEmpty(children)) {
                        timer = setTimeout(() => {
                            fn()
                        }, 50)
                    } else {
                        clearTimeout(timer)
                        let arr = children.filter((e) => e.getRect).map((e) => e.getRect())
                        resolve(arr)
                    }
                }

                fn()
                // #endif

                // #ifndef MP
                nextTick(() => {
                    uni.createSelectorQuery()
                        .in(proxy.$root)
                        .selectAll(`.cl-waterfall-column`)
                        .boundingClientRect(resolve)
                        .exec()
                })
                // #endif
            })
        }

        return {
            visible,
            list,
            columnCount,
            columnGap,
            refresh,
            append,
            update,
            clear
        }
    }
})
</script>
