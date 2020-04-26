<template>
	<view class="cl-badge" v-show="$slots.default">
		<slot></slot>
		<text
			v-if="!hidden && (content || content === 0 || isDot)"
			:class="[
				'cl-badge__content',
				'cl-badge__content--' + type,
				{
					'is-dot': isDot
				}
			]"
		>{{ content }}</text>
	</view>
</template>

<script>
import { isNumber } from '../../utils';

export default {
	name: 'ClBadge',

	props: {
		value: [String, Number],
		max: Number,
		isDot: Boolean,
		hidden: Boolean,
		type: String
	},

	computed: {
		content() {
			if (this.isDot) return '';

			const value = this.value;
			const max = this.max;

			if (isNumber(value) && isNumber(max) && max > 0) {
				return max < value ? `${max}+` : value;
			}

			return value;
		}
	}
};
</script>
