<template>
	<view class="cl-tag" :class="classList" @tap="click" v-if="visible">
		<slot></slot>
		<text class="cl-tag__close cl-icon-close" v-if="closable" @tap.stop="close"></text>
	</view>
</template>

<script>
/**
 * tag 标签
 * @description 用于标记和选择
 * @tutorial https://docs.cool-js.com/uni/components/basic/tag.html
 * @property {String} type 类型 (primary | success | error | warning | info)
 * @property {Boolean} plain 图片裁剪、缩放的模式
 * @property {String} size 图片大小 (small | mini)，默认small
 * @property {Boolean} closable 是否可关闭
 * @property {Boolean} round 是否圆角
 * @event {Function} click 点击时触发
 * @event {Function} close 关闭时触发
 * @example <cl-tag>COOL UNI</cl-tag>
 */

export default {
	name: "cl-tag",

	props: {
		// 类型 primary | success | error | warning | info
		type: {
			type: String,
			default: "primary",
		},
		// 是否镂空
		plain: Boolean,
		// 尺寸 small | mini
		size: {
			type: String,
			default: "small",
		},
		// 是否可关闭
		closable: Boolean,
		// 是否圆角
		round: Boolean,
	},

	data() {
		return {
			visible: true,
		};
	},

	computed: {
		classList() {
			let list = [];

			if (this.type) {
				list.push(`cl-tag--${this.type}`);
			}

			if (this.size) {
				list.push(`cl-tag--${this.size}`);
			}

			if (this.plain) {
				list.push("is-plain");
			}

			if (this.round) {
				list.push("is-round");
			}

			return list.join(" ");
		},
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
