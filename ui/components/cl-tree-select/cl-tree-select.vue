<template>
    <cl-popup
        v-model="visible"
        direction="bottom"
        type="select"
        title="选择节点"
        :padding="0"
        :confirm-disabled="!isChecked"
        @confirm="save"
    >
        <scroll-view
            scroll-y
            class="cl-tree-select"
            :style="{
                maxHeight: parseRpx(maxHeight)
            }"
        >
            <view class="cl-tree-select__wrap">
                <cl-tree
                    v-if="visible"
                    v-model="value"
                    :data="data"
                    :row-height="rowHeight"
                    :check-strictly="checkStrictly"
                    :default-expand-all="defaultExpandAll"
                    :auto-expand="autoExpand"
                    :accordion="accordion"
                    :multiple="multiple"
                    :keys="keys"
                />
            </view>
        </scroll-view>
    </cl-popup>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import { TreeProps, useTree } from "../cl-tree/helper"
import { parseRpx } from "/@/cool/utils"
import { cloneDeep, isEmpty } from "lodash-es"

export default defineComponent({
    name: "cl-tree-select",

    props: {
        maxHeight: {
            type: [String, Number],
            default: 800
        },
        ...TreeProps
    },

    emits: ["update:modelValue", "change"],

    setup(props, { emit }) {
        const { label } = useTree({ props })

        // 绑定值
        const value = ref()

        // 是否显示
        const visible = ref(false)

        // 是否选择了
        const isChecked = computed(() => {
            return !(props.multiple
                ? isEmpty(value.value)
                : value.value === undefined || value.value === null || value.value === "")
        })

        // 打开
        function open() {
            value.value = cloneDeep(props.modelValue)
            visible.value = true
        }

        // 关闭
        function close() {
            visible.value = false
        }

        // 保存
        function save() {
            emit("update:modelValue", value.value)
            emit("change", value.value)
            close()
        }

        return {
            value,
            visible,
            label,
            open,
            close,
            save,
            parseRpx,
            isChecked
        }
    }
})
</script>
