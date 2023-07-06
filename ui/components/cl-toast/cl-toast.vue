<template>
    <view class="cl-toast__wrap">
        <template v-for="item in list" :key="item.id">
            <cl-popup
                v-model="item.visible"
                :padding="0"
                :modal="false"
                :direction="item.position"
                background-color="transparent"
            >
                <view
                    class="cl-toast"
                    :class="[
                        `cl-toast--${item.type}`,
                        {
                            'is-icon': item.icon || item.image
                        }
                    ]"
                >
                    <view class="cl-toast__icon" v-if="item.image || item.icon">
                        <image
                            :src="item.image.url"
                            :mode="item.image.mode || 'aspectFill'"
                            :style="item.image.style"
                            v-if="item.image"
                        />
                        <text :class="item.icon" v-else></text>
                    </view>

                    <slot>
                        <text class="cl-toast__content">{{ item.message }}</text>
                    </slot>
                </view>
            </cl-popup>
        </template>
    </view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { isFunction, last, has } from "lodash-es"

let id = 0

/**
 * @description 吐司提示
 * @property {Boolean} single 是否单个显示，默认false
 * @example <cl-toast ref="toast"></cl-toast>
 */

export default defineComponent({
    name: "cl-toast",

    props: {
        single: {
            type: Boolean,
            default: null
        }
    },

    setup(props) {
        // 列表
        const list = ref<any[]>([])

        // 打开
        function open(d: ClToast.Options) {
            // 默认配置
            const options = {
                id: id++,
                visible: false,
                closed: false,
                icon: "",
                image: null,
                message: "",
                duration: 2000,
                type: "default",
                position: "center"
            }

            // 合并参数
            if (has(d, "message")) {
                Object.assign(options, d)
            } else {
                options.message = String(d)
            }

            // 是否同时存在多个提示
            if (props.single) {
                list.value = [options]
            } else {
                list.value.push(options)
            }

            // 有图标默认居中显示
            if (options.image || options.icon) {
                options.position = "center"
            }

            setTimeout(() => {
                create(last(list.value))
            }, 50)
        }

        // 关闭
        function close(item: any) {
            // 清空计时器
            clearTimeout(item.timer)
            item.visible = false

            // 关闭回调
            if (isFunction(item.onClose)) {
                item.onClose()
            }

            setTimeout(() => {
                item.closed = true
            }, 300)
        }

        // 创建
        function create(item: any) {
            const { duration } = item || {}

            if (duration > 0) {
                item.visible = true

                item.timer = setTimeout(() => {
                    close(item)
                }, duration)
            }
        }

        return {
            list,
            open,
            close,
            create
        }
    }
})
</script>
