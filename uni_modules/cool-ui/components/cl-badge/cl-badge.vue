<template>
	<view
		class="cl-badge"
		:class="[
			`cl-badge--${type}`,
			{
				'is-dot': isDot,
				'is-plain': plain,
			},
		]"
		v-if="$slots.default"
	>
		<slot></slot>
		<text
			class="cl-badge__content"
			:style="[
				baseStyle,
				{
					backgroundColor: color,
				},
			]"
			v-if="!hidden && ((content && content != 0) || isDot)"
			>{{ content }}</text
		>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { type PropType } from "vue";
import { isNumber } from "lodash-es";
import { useStyle } from "../../hooks";

export default defineComponent({
	name: "cl-badge",

	props: {
		// 文本内容
		value: [String, Number],
		// 最大值
		max: Number,
		// 是否点状
		isDot: Boolean,
		// 是否隐藏
		hidden: Boolean,
		// 类型
		type: {
			type: String as PropType<"primary" | "success" | "warning" | "error">,
			default: "error",
		},
		// 颜色
		color: String,
		// 朴素
		plain: Boolean,
	},

	setup(props) {
		const content = computed(() => {
			if (props.isDot) return "";

			const value: any = props.value;
			const max: any = props.max;

			if (isNumber(value) && isNumber(max) && max > 0) {
				return max < value ? `${max}+` : value;
			}

			return value;
		});

		return {
			content,
			...useStyle(),
		};
	},
});
</script>
