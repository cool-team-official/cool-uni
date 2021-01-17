<template>
	<view
		class="cl-loading"
		:class="[`cl-loading--${theme}`]"
		:style="{ height: size + 'px', width: size + 'px' }"
	>
		<!-- 菊花 -->
		<template v-if="theme == 'spin'">
			<view class="cl-loading__spin" v-for="i in 2" :key="i">
				<text
					class="cl-loading__spin-item"
					:style="[
						spinStyle,
						{
							top: 0,
							left: `calc(50% - ${rw}px)`,
						},
					]"
				></text>

				<text
					class="cl-loading__spin-item"
					:style="[
						spinStyle,
						{
							top: `calc(50% - ${rh}px)`,
							right: `${rh - rw}px`,
							transform: 'rotate(90deg)',
						},
					]"
				></text>

				<text
					class="cl-loading__spin-item"
					:style="[
						spinStyle,
						{
							left: `calc(50% - ${rw}px)`,
							bottom: 0,
						},
					]"
				></text>

				<text
					class="cl-loading__spin-item"
					:style="[
						spinStyle,
						{
							left: `${rh - rw}px`,
							top: `calc(50% - ${rh}px)`,
							transform: 'rotate(90deg)',
						},
					]"
				></text>
			</view>
		</template>

		<!-- 默认 -->
		<view
			class="cl-loading__inner"
			:style="{
				color,
				borderColor,
				borderWidth,
				'border-bottom': `${borderWidth} solid currentColor`,
			}"
			v-else
		>
		</view>
	</view>
</template>

<script>
/**
 * loading 加载图标
 * @description 加载图标
 * @tutorial https://docs.cool-js.com/uni/components/feedback/loading.html
 * @property {String} color 图标颜色
 * @property {Number} size 图标大小
 * @property {String} theme 主题，default | spin
 * @example <cl-loading></cl-loading>
 */

export default {
	name: "cl-loading",

	props: {
		color: String,
		borderColor: {
			type: String,
			default: "rgba(0, 0, 0, 0.1)",
		},
		borderWidth: {
			type: String,
			default: "4rpx",
		},
		theme: {
			type: String,
			default: "default",
		},
		size: {
			type: Number,
			default: 25,
		},
	},

	computed: {
		rh() {
			return this.size / 8;
		},

		rw() {
			return this.size / 20;
		},

		spinStyle() {
			return {
				height: this.rh * 2 + "px",
				width: this.rw * 2 + "px",
				color: this.color,
			};
		},
	},
};
</script>
