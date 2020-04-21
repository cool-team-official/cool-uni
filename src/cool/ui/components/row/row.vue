<template>
	<view
		:class="['cl-row', classList]"
		:style="{
			marginLeft,
			marginRight
		}"
	>
		<slot></slot>
	</view>
</template>

<script>
export default {
	name: 'ClRow',
	componentName: 'ClRow',
	props: {
		gutter: [Number, String],
		type: String,
		justify: {
			type: String,
			default: 'start'
		},
		align: {
			type: String,
			default: 'top'
		},
		wrap: Boolean
	},
	computed: {
		classList() {
			let list = [];

			if (this.justify !== 'start') {
				list.push(`is-justify-${this.justify}`);
			}

			if (this.align !== 'top') {
				list.push(`is-align-${this.align}`);
			}

			if (this.wrap) {
				list.push('is-wrap');
			}

			switch (this.type) {
				default:
					list.push(`cl-row--${this.type}`);
			}

			return list;
		},
		marginLeft() {
			return `-${this.gutter / 2}rpx`;
		},
		marginRight() {
			return this.marginLeft;
		}
	}
};
</script>