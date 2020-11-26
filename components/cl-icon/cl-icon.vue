<template>
	<text
		:class="['cl-icon', name]"
		:style="{
			fontSize: parseRpx(size),
			color
		}"
	></text>
</template>

<script>
import { isNumber, parseRpx } from "../../utils";

/**
 * icon 图标
 * @description 字体图标
 * @tutorial https://docs.cool-js.com/uni/components/basic/icon.html
 * @property {String} name 图标名称
 * @property {String, Number} size 图标大小
 * @property {String} color 图标颜色
 * @example <cl-icon name="search" />
 */

export default {
	name: "cl-icon",

	props: {
		name: String,
		size: [String, Number],
		color: String
	},

	methods: {
		parseRpx
	}
};
</script>
