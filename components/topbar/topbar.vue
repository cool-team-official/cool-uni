<template>
	<view
		class="cl-topbar"
		:class="[
			{
				'is-border': border,
				'is-fixed': fixed,
			},
		]"
		:style="{
			'padding-top': top,
			'background-color': backgroundColor,
			color,
		}"
	>
		<view
			class="cl-topbar__content"
			:style="{
				color,
			}"
		>
			<slot>
				<view class="cl-topbar__text" @tap="tapText">
					<text class="cl-topbar__title" v-if="title">{{ title }}</text>
					<text class="cl-topbar__description" v-if="description">{{ description }}</text>
				</view>
			</slot>
		</view>

		<view
			class="cl-topbar__prepend"
			:style="{
				top,
			}"
		>
			<view class="cl-topbar__icon" v-if="showBack" @tap="back">
				<text class="cl-icon-arrow-left"></text>
			</view>

			<slot name="prepend"></slot>
		</view>

		<view
			class="cl-topbar__append"
			:style="{
				top,
			}"
		>
			<slot name="append"></slot>
		</view>
	</view>
</template>

<script>
const { platform, statusBarHeight } = uni.getSystemInfoSync();

export default {
	props: {
		title: String,
		description: String,
		border: {
			type: Boolean,
			default: true,
		},
		showBack: {
			type: Boolean,
			default: true,
		},
		backgroundColor: {
			type: String,
			default: "#fff",
		},
		color: {
			type: String,
			default: "#000",
		},
		backPath: String,
		fixed: Boolean,
	},

	computed: {
		top() {
			return platform === "android" ? `${statusBarHeight}px` : "env(safe-area-inset-top)";
		},
	},

	methods: {
		back() {
			let pages = getCurrentPages();

			if (pages.length == 1) {
				uni.switchTab({
					url: this.backPath || this.$store.state.app.info.pages.home,
				});
			} else {
				uni.navigateBack({
					delta: 1,
				});
			}
		},

		tapText(e) {
			this.$emit("click", e);
		},
	},
};
</script>
