<template>
    <view class="cl-action-sheet">
        <cl-popup
            v-model="visible"
            direction="bottom"
            :padding="0"
            border-radius="32rpx 32rpx 0 0"
            :close-on-click-modal="conf.closeOnClickModal"
        >
            <view class="cl-action-sheet__title" v-if="conf.title">
                {{ conf.title }}
            </view>

            <!-- 列表 -->
            <button
                class="cl-action-sheet__item"
                v-for="(item, index) in conf.list"
                :key="index"
                :class="[item.disabled ? 'is-disabled' : '']"
                :style="{
                    color: item.color,
                    fontSize: item.size
                }"
                :open-type="item.openType"
                @getphonenumber="onEvent(item, 'getphonenumber')"
                @getuserinfo="onEvent(item, 'getuserinfo')"
                @contact="onEvent(item, 'contact')"
                @error="onEvent(item, 'error')"
                @opensetting="onEvent(item, 'opensetting')"
                @tap="select(index, item)"
            >
                <text class="cl-action-sheet__icon" :class="[item.icon]"></text>
                <text class="cl-action-sheet__label">{{ item.label }}</text>
            </button>

            <!-- 取消按钮 -->
            <button
                class="cl-action-sheet__item cl-action-sheet__item--cancel"
                @tap="close('cancel')"
                v-if="conf.showCancel"
            >
                {{ conf.cancelText }}
            </button>
        </cl-popup>
    </view>
</template>

<script lang="ts">
/**
 * @description 从底部弹出的一个操作菜单，类似于 uni.showActionSheetAPI，同时添加新的支持。
 */

import { ref, defineComponent } from "vue"

export default defineComponent({
    name: "cl-action-sheet",

    setup() {
        // 是否可见
        const visible = ref(false)

        // 配置
        const conf = ref<any>({})

        // 打开
        function open(options: ClActionSheet.Options) {
            conf.value = Object.assign(
                {
                    title: "",
                    list: [],
                    callback: null,
                    closeOnClickModal: true,
                    showCancel: true,
                    cancelText: "取消"
                },
                options
            )

            visible.value = true
        }

        // 关闭
        function close(action: ClActionSheet.Action) {
            const done = () => {
                visible.value = false

                if (conf.value.callback) {
                    conf.value.callback(action)
                }
            }

            if (conf.value.beforeClose) {
                conf.value.beforeClose(action, done)
            } else {
                done()
            }
        }

        // 选择
        function select(index: number, item: any) {
            if (item.disabled) {
                return false
            }

            if (item.click) {
                item.click(() => {
                    visible.value = false
                })
            } else {
                close(index)
            }
        }

        // 事件
        function onEvent(item: any, name: string) {
            if (item[name]) {
                item[name]()
            }
        }

        return {
            visible,
            conf,
            open,
            close,
            select,
            onEvent
        }
    }
})
</script>
