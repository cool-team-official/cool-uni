<template>
	<text
		:class="[
			'cl-icon',
			className || `cl-icon-${name}`,
			{
				'is-primary': color == 'primary',
			},
		]"
		:style="{
			fontSize: parseRpx(size),
			margin: parseRpx(margin),
			color,
		}"
	></text>
</template>

<script lang="ts">
/**
 * @description 字体图标
 * @property {String} name 图标名称
 * @property {String} className 自定义图标名称
 * @property {String, Number} size 图标大小
 * @property {String} color 图标颜色
 */

import { defineComponent } from "vue";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-icon",
	props: {
		name: String,
		className: String,
		size: {
			type: [String, Number],
			default: 30,
		},
		color: String,
		margin: [String, Number, Array],
	},
	setup() {
		return {
			parseRpx,
		};
	},
});
</script>
