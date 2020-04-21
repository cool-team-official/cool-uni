<template>
	<view
		:class="['cl-list', isSuffix, isDisabled, isBorder]"
		@touchstart="onTouchStart"
		@touchmove="onTouchMove"
		@touchend="onTouchEnd"
	>
		<view
			class="cl-list__swiper"
			:style="{
				transform: `translateX(${left}rpx)`
			}"
		>
			<view class="cl-list__container">
				<view class="cl-list__icon" v-if="$slots.icon">
					<slot name="icon"></slot>
				</view>

				<text class="cl-list__label" v-if="label && label != 'true'">{{ label }}</text>

				<view :class="['cl-list__content', isJustify, isColor]">
					<slot></slot>
				</view>

				<view class="cl-list__suffix">
					<slot name="suffix"></slot>
				</view>
			</view>

			<!-- 后菜单 -->
			<template v-if="swipe != 'none'">
				<view :class="[`cl-list__menu-${swipe}`]">
					<slot name="menu"> </slot>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
const { platform } = uni.getSystemInfoSync();

export default {
	props: {
		prop: String,
		label: String,
		disabled: Boolean,
		border: {
			type: Boolean,
			default: true
		},
		type: String,
		justify: {
			type: String,
			default: 'end'
		},
		swipe: {
			type: String,
			default: 'none',
			validator: val => {
				return ['none', 'left', 'right'].indexOf(val) !== -1;
			}
		}
	},

	data() {
		return {
			touch: {
				start: 0,
				end: 0,
				x: 0,
				direction: 'left',
				lock: true
			},

			menu: {
				width: 0
			}
		};
	},

	computed: {
		isColor() {
			return this.type ? `is-color-${this.type}` : '';
		},

		isBorder() {
			return this.border ? `is-border` : '';
		},

		isJustify() {
			return this.justify !== 'start' ? `is-justify-${this.justify}` : '';
		},

		isSuffix() {
			return this.$scopedSlots.suffix ? 'cl-list--suffix' : '';
		},

		isDisabled() {
			return this.disabled ? 'cl-list--disabled' : '';
		},

		left() {
			return this.touch.end + this.touch.x;
		}
	},

	watch: {
		swipe() {
			this.setMenu();
		}
	},

	mounted() {
		this.setMenu();
	},

	methods: {
		onTouchStart(e) {
			if (this.swipe != 'none') {
				this.touch.start = e.touches[0].pageX;
				this.touch.lock = false;
			}
		},
		onTouchMove(e) {
			const { direction, start, end, lock } = this.touch;

			if (!lock) {
				let offsetX = e.touches[0].pageX - start;

				this.touch.direction = offsetX > 0 ? 'right' : 'left';
				this.touch.x = end + offsetX;

				offsetX = null;
			}
		},
		onTouchEnd(e) {
			const { direction, x, end, lock } = this.touch;

			if (!lock) {
				const maxX = this.menu.width * (this.swipe === 'right' ? -1 : 1);

				if (Math.abs(x - end) > 50) {
					if (direction === this.swipe) {
						this.touch.x = 0;
					} else {
						this.touch.x = maxX;
					}

					this.touch.end = this.touch.x;
				} else {
					this.touch.x = end === 0 ? 0 : maxX;
				}

				this.touch.lock = true;
			}
		},
		setMenu() {
			if (this.swipe != 'none') {
				const query = uni.createSelectorQuery().in(this);

				query
					.select(`.cl-list__menu-${this.swipe}`)
					.boundingClientRect(data => {
						if (data) {
							this.menu.width = data.width - (platform == 'ios' ? 15 : 0);
						}
					})
					.exec();
			}
		},
		restore() {
			this.touch.start = 0;
			this.touch.end = 0;
			this.touch.lock = true;
			this.touch.x = 0;
		}
	}
};
</script>
