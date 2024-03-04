<template>
    <view class="cl-select-region">
        <cl-select
            mode="multiSelector"
            :model-value="value"
            :options="list"
            :label-key="labelKey"
            :value-key="valueKey"
            :separator="separator"
            :disabled="disabled"
            :border="border"
            set-options-is-parse-value
            @column-change="onColumnChange"
            @change="onChange"
        />
    </view>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import { isEmpty } from "lodash-es"

let cities: any[] = []

/**
 * @description 下拉城市选择
 * @property {null} value 绑定值
 * @property {String} api 城市数据接口
 * @property {Array} options 城市数据列表
 * @property {String} disabled 是否禁用
 * @property {String} border 是否带有边框
 * @property {String} labelKey 内容关键字，默认label
 * @property {String} valueKey 值关键字，默认value
 * @property {String} separator 分隔符，默认 -
 */

export default defineComponent({
    name: "cl-select-region",

    props: {
        modelValue: Array,
        api: {
            type: String,
            default: "https://cool-uni.oss-cn-shanghai.aliyuncs.com/comm/city-pca.json"
        },
        options: Array,
        disabled: {
            type: Boolean,
            default: null
        },
        border: {
            type: Boolean,
            default: true
        },
        labelKey: {
            type: String,
            default: "name"
        },
        valueKey: {
            type: String,
            default: "code"
        },
        separator: {
            type: String,
            default: "-"
        }
    },

    setup(props, { emit }) {
        const list = ref<any[]>([[], [], []])

        // 绑定值
        const value = ref<any[]>([])

        // 监听值改变
        function onChange(arr: any[]) {
            value.value = arr
            emit("update:modelValue", arr)
            emit("change", arr)
        }

        // 监听更新
        function onUpdate() {
            const [x, y, z]: any = props.modelValue
            value.value = [x, y, z]

            let a = 0
            let b = 0

            if (!x) {
                a = 0
                b = 0
            } else {
                a = cities.findIndex((e) => e[props.valueKey] == x)

                if (a >= 0) {
                    b = cities[a].children.findIndex((e: any) => e[props.valueKey] == y)
                }
            }

            updateList([a, b])
        }

        // 监听列变化
        function onColumnChange({ selects }: any) {
            updateList(selects.map((e: any) => (e < 0 ? 0 : e)))
        }

        // 更新列表值
        function updateList([a = 0, b = 0]: any) {
            if (a < 0) {
                a = 0
            }
            if (b < 0) {
                b = 0
            }

            list.value = [cities, cities[a].children, cities[a].children[b].children]
        }

        watch(
            () => props.modelValue,
            () => {
                if (!isEmpty(cities)) {
                    onUpdate()
                } else {
                    uni.request({
                        url: props.api,
                        success: (res: any) => {
                            cities = res.data
                            onUpdate()
                        }
                    })
                }
            },
            {
                immediate: true
            }
        )

        return {
            list,
            value,
            onChange,
            onUpdate,
            onColumnChange,
            updateList
        }
    }
})
</script>
