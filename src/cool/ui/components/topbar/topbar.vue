<template>
	<view
		class="cl-topbar"
		:class="[
			{
				'is-border': border
			}
		]"
		:style="{
			'padding-top': top
		}"
	>
		<view class="cl-topbar__content">
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
				top
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
				top
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
			default: true
		},
		showBack: {
			type: Boolean,
			default: true
		}
	},

	computed: {
		top() {
			return platform === 'android' ? `${statusBarHeight}px` : 'env(safe-area-inset-top)';
		}
	},

	methods: {
		back() {
			uni.navigateBack();
		},

		tapText(e) {
			this.$emit('click', e);
		}
	}
};
</script>