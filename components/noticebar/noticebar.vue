<template>
	<view
		v-if="visible"
		class="cl-noticebar"
		:class="[
			{
				'cl-noticebar--scrollable': scrollable
			}
		]"
		:style="{
			color,
			backgroundColor
		}"
	>
		<view class="cl-noticebar__close" v-if="closeable" @tap="close">
			<cl-icon name="cl-icon-round-close-fill"></cl-icon>
		</view>

		<view class="cl-noticebar__icon" v-if="$slots.icon || icon">
			<slot v-if="$slots.icon" name="icon"></slot>
			<cl-icon v-else :name="icon"></cl-icon>
		</view>

		<view class="cl-noticebar__box">
			<view
				class="cl-noticebar__scroller"
				:class="[`is-${direction}`]"
				:style="{
					top: scroll.top + 'px'
				}"
			>
				<text
					class="cl-noticebar__text"
					v-for="(item, index) in list"
					:key="index"
					:style="{
						marginLeft: scroll.left + 'px'
					}"
					>{{ item }}</text
				>
			</view>
		</view>

		<view class="cl-noticebar__more"></view>
	</view>
</template>

<script>
import { isArray } from '../../utils';

export default {
	props: {
		// 文本内容
		text: {
			type: [String, Array],
			default: '',
			required: true
		},
		// 方向 horizontal, vertical
		direction: {
			type: String,
			default: 'horizontal'
		},
		// 字体颜色
		color: {
			type: String,
			default: '#444'
		},
		// 背景颜色
		backgroundColor: {
			type: String,
			default: '#fff'
		},
		// 通知类型
		type: {
			type: String,
			default: 'default'
		},
		// 能否滚动
		scrollable: Boolean,
		// 能否关闭
		closeable: Boolean,
		// 图标
		icon: String,
		// 速度（0-100）越大越快
		speed: {
			type: Number,
			default: 86
		}
	},

	data() {
		return {
			scroll: {
				left: 0,
				top: 0
			},
			timer: null,
			visible: true
		};
	},

	computed: {
		list() {
			return isArray(this.text) ? this.text : [this.text];
		}
	},

	mounted() {
		if (this.scrollable) {
			uni.createSelectorQuery()
				.in(this)
				.select(`.cl-noticebar__box`)
				.boundingClientRect(box => {
					uni.createSelectorQuery()
						.in(this)
						.select(`.cl-noticebar__text`)
						.boundingClientRect(text => {
							if (this.direction == 'horizontal') {
								this.timer = setInterval(() => {
									if (
										Math.abs(this.scroll.left) > Math.max(box.width, text.width)
									) {
										this.scroll.left = box.width;
									} else {
										this.scroll.left -= 1;
									}
								}, 100 - this.speed);

								this.scroll.left = box.width;
							} else {
								this.timer = setInterval(() => {
									if (
										Math.abs(this.scroll.top) >=
										box.height * (this.list.length - 1)
									) {
										this.scroll.top = 0;
									} else {
										this.scroll.top -= box.height;
									}
								}, 3000);
							}
						})
						.exec();
				})
				.exec();
		}
	},

	destroyed() {
		clearInterval(this.timer);
		this.timer = null;
	},

	methods: {
		close() {
			this.visible = false;
		}
	}
};
</script>
