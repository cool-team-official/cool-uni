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
		v-if="visible"
		@tap="click"
	>
		<slot></slot>
		<text class="cl-tag__close cl-icon-close" v-show="closable" @tap.stop="close"></text>
	</view>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: "primary",
		},
		plain: Boolean,
		size: {
			type: String,
			default: "small",
		},
		closable: Boolean,
		round: Boolean,
	},

	data() {
		return {
			visible: true,
		};
	},

	methods: {
		click() {
			this.$emit("click");
		},

		open() {
			this.visible = true;
		},

		close() {
			this.visible = false;
			this.$emit("close");
		},
	},
};
</script>
