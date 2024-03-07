<template>
	<view
		class="cl-tag"
		:class="[
			`cl-tag--${type}`,
			`cl-tag--${size}`,
			{
				'is-plain': plain,
				'is-round': round,
			},
		]"
		:style="[
			baseStyle,
			{
				backgroundColor: color,
			},
		]"
		@click="tap"
		v-if="visible"
	>
		<slot></slot>
		<text class="cl-tag__close cl-icon-close" v-if="closable" @tap.stop="close"></text>
	</view>
</template>

<script lang="ts">
import { type PropType, defineComponent, ref } from "vue";
import { useStyle, useTap } from "../../hooks";

export default defineComponent({
	name: "cl-tag",

	props: {
		// 类型
		type: {
			type: String as PropType<"primary" | "success" | "error" | "warning" | "info">,
			default: "primary",
		},
		// 朴素样式
		plain: Boolean,
		// 标签大小
		size: {
			type: String as PropType<"default" | "small" | "larget">,
			default: "default",
		},
		// 颜色
		color: String,
		// 是否可关闭
		closable: Boolean,
		// 圆角
		round: Boolean,
	},

	setup(_, { emit }) {
		const { tap } = useTap(emit);

		// 是否可见
		const visible = ref(true);

		// 打开
		function open() {
			visible.value = true;
		}

		// 关闭
		function close() {
			visible.value = false;
			emit("close");
		}

		return {
			visible,
			tap,
			open,
			close,
			...useStyle(),
		};
	},
});
</script>
