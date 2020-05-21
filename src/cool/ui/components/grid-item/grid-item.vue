<template>
	<view class="cl-grid-item" :style="{ width }" @tap="onTap">
		<slot></slot>
	</view>
</template>

<script>
import { getParent } from "../../utils";
import Emitter from "../../mixins/emitter";

export default {
	componentName: "ClGridItem",

	props: {
		index: [Number, String]
	},

	mixins: [Emitter],

	computed: {
		parent() {
			return getParent.call(this, "ClGrid", ["column", "border"]);
		},

		width() {
			return 100 / (this.parent.column || 0) + "%";
		}
	},

	methods: {
		onTap() {
			this.dispatch("ClGrid", "grid.tap", this.index);
		}
	}
};
</script>