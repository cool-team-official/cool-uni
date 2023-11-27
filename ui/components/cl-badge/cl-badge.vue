<template>
	<view
		class="cl-badge"
		:class="[
			`cl-badge--${type}`,
			{
				'is-dot': isDot,
			},
		]"
		v-if="$slots.default"
	>
		<slot></slot>
		<text
			class="cl-badge__content"
			:style="{
				backgroundColor: color,
				margin: parseRpx(offset),
			}"
			v-if="!hidden && ((content && content != 0) || isDot)"
			>{{ content }}</text
		>
	</view>
</template>

<script lang="ts">
/**
 * @description 位于右上角的角标
 * @property {Boolean} value 文本内容
 * @property {Number} max 最大值
 * @property {Boolean} isDot 是否点状
 * @property {Boolean} hidden 是否隐藏
 * @property {String} type 类型 primary | success | warning | error
 * @property {String} color 颜色
 * @example <cl-badge :value="10">Hello !</cl-badge>
 */

import { computed, defineComponent } from "vue";
import type { PropType } from "vue";
import { isNumber } from "lodash-es";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-badge",

	props: {
		value: [String, Number],
		max: Number,
		isDot: Boolean,
		hidden: Boolean,
		type: {
			type: String as PropType<"primary" | "success" | "warning" | "error">,
			default: "error",
		},
		color: String,
		offset: Number,
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
			parseRpx,
		};
	},
});
</script>
