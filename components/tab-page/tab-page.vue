<template>
	<view class="cl-tab-page" v-if="lazy ? visible : true" :class="[{ 'is-show': visible }]">
		<slot></slot>
	</view>
</template>

<script>
import Emitter from "../../mixins/emitter";
import { getParent } from "../../utils";

export default {
	componentName: "ClTabPage",
	mixins: [Emitter],

	props: {
		name: [String, Number],
		lazy: Boolean,
	},

	computed: {
		parent() {
			return getParent.call(this, "ClTabbar", ["name"]);
		},

		visible() {
			return this.name == this.parent.name;
		},
	},
};
</script>
