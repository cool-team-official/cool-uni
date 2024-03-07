<template>
	<view class="cl-progress">
		<view class="cl-progress-bar" v-if="type === 'line'">
			<view
				class="cl-progress-bar__outer"
				:style="{ height: parseRpx(strokeWidth), backgroundColor: unColor }"
			>
				<view
					class="cl-progress-bar__inner"
					:style="{
						backgroundColor,
						width,
					}"
				></view>
			</view>
		</view>

		<slot name="text">
			<view class="cl-progress__text" v-if="showText">
				<template v-if="!status">{{ value }}%</template>
				<text class="cl-progress__icon" v-else :class="icon"></text>
			</view>
		</slot>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import { parseRpx } from "/@/cool/utils";
import { getCurrentColor } from "../../utils";

export default defineComponent({
	name: "cl-progress",

	props: {
		// 绑定值
		value: {
			type: Number,
			default: 0,
			required: true,
		},
		// 类型
		type: {
			type: String,
			default: "line",
		},
		// 线条宽度
		strokeWidth: {
			type: Number,
			default: 12,
		},
		// 是否显示文本
		showText: {
			type: Boolean,
			default: true,
		},
		// 线条颜色, 支持多色
		color: {
			type: [String, Array] as PropType<string | string[]>,
			default: "",
		},
		// 未选中颜色
		unColor: {
			type: String,
			default: "#ebeef5",
		},
		// 状态
		status: Boolean,
		// 尾部图标
		icon: String,
	},

	setup(props) {
		// 宽度
		const width = computed(() => {
			if (props.value > 100) {
				return "100%";
			} else if (props.value < 0) {
				return 0;
			} else {
				return `${props.value}%`;
			}
		});

		// 背景颜色
		const backgroundColor = computed(() => {
			return getCurrentColor({
				value: props.value,
				color: props.color,
				max: 100,
			});
		});

		return {
			parseRpx,
			width,
			backgroundColor,
		};
	},
});
</script>
