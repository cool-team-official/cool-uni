import { computed, ref, watch } from "vue"
import type { PropType } from "vue"
import { deepMerge } from "/@/cool/utils"
import { cloneDeep } from "lodash-es"

export const TreeProps = {
    // 绑定值
    modelValue: [String, Number, Array],
    // 数据
    data: {
        type: Array as PropType<ClTree.Item[]>,
        default: () => []
    },
    // 是否多选
    multiple: Boolean,
    // 每一行的高度
    rowHeight: {
        type: Number,
        default: 64
    },
    // 是否每项都能选择
    checkStrictly: Boolean,
    // 是否默认全部展开
    defaultExpandAll: Boolean,
    // 默认值是否自动展开
    autoExpand: {
        type: Boolean,
        default: true
    },
    // 是否每次只打开一个同级树节点展开
    accordion: Boolean,
    // 关键字
    keys: Object as PropType<ClTree.Keys>
}

export function useTree({ props, emit }: any) {
    // 绑定值
    const value = ref<any[]>([])

    watch(
        () => props.modelValue,
        (val) => {
            value.value = props.multiple ? val : [val]
        },
        {
            immediate: true
        }
    )

    // 更新值
    function updateValue(val: any) {
        if (props.multiple) {
            const i = value.value.indexOf(val)

            if (i >= 0) {
                value.value.splice(i, 1)
            } else {
                value.value.push(val)
            }
        } else {
            value.value = [val]
        }

        const v = props.multiple ? value.value : value.value[0]

        emit("update:modelValue", v)
        emit("change", v)
    }

    // 关键字
    const keys = computed(() => {
        return deepMerge({ label: "label", value: "value", children: "children" }, props.keys)
    })

    // 获取key
    function getKey(key: string, value: ClTree.Item) {
        return value[keys.value[key]]
    }

    // 显示内容
    const label = computed(() => {
        const t: string[] = []

        function deep(arr: ClTree.Item[]) {
            arr.forEach((e) => {
                if (value.value.includes(getKey("value", e))) {
                    t.push(getKey("label", e))
                }

                if (getKey("children", e)) {
                    deep(getKey("children", e))
                }
            })
        }

        deep(props.data)

        return t.join("、")
    })

    // 数据
    const data = ref<ClTree.Item[]>([])

    // 没有子集
    const noChildren = computed(() => {
        return !data.value.find((e) => e.children)
    })

    // 格式化数据
    function getData(val: any[]) {
        const d = cloneDeep(val)

        function deep(arr: ClTree.Item[], p?: ClTree.Item) {
            arr.forEach((e) => {
                // 默认值展开
                if (props.autoExpand && value.value.includes(getKey("value", e))) {
                    if (p) {
                        p.isExpand = true
                    }
                }

                if (getKey("children", e)) {
                    // 默认全部展开
                    if (props.defaultExpandAll) {
                        e.isExpand = true
                    }

                    deep(getKey("children", e), e)

                    if (e?.isExpand) {
                        if (p) {
                            p.isExpand = true
                        }
                    }
                }
            })
        }

        deep(d)

        data.value = d
    }

    // 监听数据
    watch(() => props.data, getData, {
        immediate: true
    })

    return {
        value,
        updateValue,
        keys,
        getKey,
        label,
        data,
        noChildren
    }
}
