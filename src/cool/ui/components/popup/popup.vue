<template>
	<view
		class="cl-popup__wrapper"
		:class="[
			`cl-popup__wrapper--${direction}`,
			{
				'is-show': visible
			}
		]"
	>
		<view class="cl-popup__modal" @tap="modalClose"></view>

		<view :class="['cl-popup']" :style="{ height, width }">
			<view class="cl-popup__container">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		visible: Boolean,
		beforeClose: Boolean,
		modal: Boolean,
		direction: {
			type: String,
			default: 'left'
		},
		wrapperClosable: {
			type: Boolean,
			default: true
		},
		size: {
			type: String,
			default: 'auto'
		}
	},

	computed: {
		height() {
			switch (this.direction) {
				case 'top':
				case 'bottom':
				case 'center':
					return this.size;
				case 'left':
				case 'right':
					return '100%';
			}
		},

		width() {
			switch (this.direction) {
				case 'top':
				case 'bottom':
					return '100%';
				case 'left':
				case 'right':
				case 'center':
					return this.size;
			}
		}
	},

	watch: {
		visible(flag) {
			if (!flag) {
				this.close();
			}
		}
	},

	methods: {
		close() {
			if (this.beforeClose) {
				this.$emit('close', () => {
					this.$emit('update:visible', false);
				});
			} else {
				this.$emit('update:visible', false);
				this.$emit('close');
			}
		},

		modalClose() {
			if (!this.wrapperClosable) {
				return false;
			}

			this.close();
		}
	}
};
</script>
