<template>
	<view class="cl-grid-item" :style="{ width }">
		<slot></slot>
	</view>
</template>

<script>
import { getParent } from "../../utils";

/**
 * grid-item 宫格布局项
 * @description 宫格布局，n * n 布局
 * @tutorial https://docs.cool-js.com/uni/components/layout/grid.html
 * @example 见教程
 */

export default {
	name: "cl-grid-item",

	componentName: "ClGridItem",

	computed: {
		parent() {
			return getParent.call(this, "ClGrid", ["column", "border"]);
		},

		width() {
			return 100 / (this.parent.column || 0) + "%";
		}
	}
};
</script>
