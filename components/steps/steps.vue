<template>
	<view class="cl-steps">
		<slot></slot>
	</view>
</template>

<script>
import Emttier from "../../mixins/emitter";

export default {
	componentName: "ClSteps",

	props: {
		active: Number
	},

	mixins: [Emttier],

	mounted() {
		this.broadcast("ClStep", "steps.change", this.active);
	}
};
</script>
