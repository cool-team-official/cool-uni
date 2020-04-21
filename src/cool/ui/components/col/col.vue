<template>
	<view
		:class="['cl-col', classList]"
		:style="{
			'padding-left': padding,
			'padding-right': padding
		}"
	>
		<slot></slot>
	</view>
</template>

<script>
export default {
	name: 'ClCol',
	props: {
		span: {
			type: [Number, String],
			default: 24
		},
		offset: [Number, String],
		pull: [Number, String],
		push: [Number, String]
	},
	computed: {
		gutter() {
			let parent = this.$parent;
			while (parent && parent.$options.componentName !== 'ClRow') {
				parent = parent.$parent;
			}
			return parent ? parent.gutter : 0;
		},

		padding() {
			return this.gutter / 2 + 'rpx';
		},

		classList() {
			let list = [];

			['span', 'offset', 'pull', 'push'].forEach(prop => {
				let value = this[prop];

				if (value || value === 0) {
					list.push(prop !== 'span' ? `cl-col-${prop}-${value}` : `cl-col-${value}`);
				}
			});

			return list;
		}
	}
};
</script>
