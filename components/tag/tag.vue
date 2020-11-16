<template>
	<view :class="['cl-tag', classList]" @tap="click" v-if="visible">
		<slot></slot>
		<text class="cl-tag__close cl-icon-close" @tap.stop="close" v-show="closable"></text>
	</view>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: 'primary'
		},
		plain: Boolean,
		size: {
			type: String,
			default: 'small'
		},
		closable: Boolean,
		round: Boolean
	},

	data() {
		return {
			visible: true
		};
	},

	computed: {
		classList() {
			let list = [];

			['type', 'plain', 'size', 'round'].forEach(k => {
				if (this[k]) {
					switch (k) {
						case 'plain':
						case 'round':
							list.push(`cl-tag--${k}`);
							break;
						default:
							list.push(`cl-tag--${this[k]}`);
							break;
					}
				}
			});

			return list;
		}
	},

	methods: {
		click() {
			this.$emit('click');
		},

		close() {
			this.visible = false;
			this.$emit('close');
		}
	}
};
</script>
