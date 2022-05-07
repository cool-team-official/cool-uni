<template>
    <cl-page :padding="20">
        <cl-card label="基础用法">
            <cl-timeline>
                <cl-timeline-item v-for="(item, index) in list" :key="index" :timestamp="item.timestamp"
                    :show-line="item.showLine" :content="item.content" :icon="item.icon" :color="item.color">
                </cl-timeline-item>
            </cl-timeline>
        </cl-card>

        <cl-card label="自定义内容">
            <cl-timeline>
                <cl-timeline-item v-for="(item, index) in list" :key="index" :timestamp="item.timestamp"
                    :show-line="item.showLine" :content="item.content" :icon="item.icon" :color="item.color">
                    <template #content>
                        <cl-tag>{{ item.content }}</cl-tag>
                    </template>
                </cl-timeline-item>
            </cl-timeline>
        </cl-card>
    </cl-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const list = ref<ClTimeline.Item[]>([
    {
        timestamp: "昨天",
        content: "开通账号，赠送500"
    },
    {
        timestamp: "今天",
        content: "成功转入9000",
        color: "#409EFF"
    },
    {
        timestamp: "11-06",
        content: "开始计算收益",
        icon: "cl-icon-toast-waiting",
        color: "#E6A23C"
    },
    {
        timestamp: "11-09",
        content: "收益到账",
        showLine: true,
        icon: "cl-icon-check-border",
        color: "#67C23A"
    }
])
</script>
