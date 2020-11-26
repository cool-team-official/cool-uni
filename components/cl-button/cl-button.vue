<template>
	<button
		class="cl-button"
		:class="[
			`cl-button--${type}`,
			`cl-button--${size}`,
			`is-${platform}`,
			{
				'is-round': round,
				'is-shadow': shadow,
				'is-loading': loading,
				'is-plain': plain,
				'is-fill': fill,
				'is-disabled': disabled
			}
		]"
		:size="size"
		:type="type"
		:disabled="disabled"
		:form-type="formType"
		:open-type="openType"
		:hover-class="hoverClass"
		:hover-start-time="hoverStartTime"
		:hover-stay-time="hoverStayTime"
		:app-parameter="appParameter"
		:hover-stop-propagation="hoverStopPropagation"
		:lang="lang"
		:session-form="sessionForm"
		:send-message-title="sendMessageTitle"
		:send-message-path="sendMessagePath"
		:send-message-img="sendMessageImg"
		:show-message-card="showMessageCard"
		@getphonenumber="getphonenumber"
		@getuserinfo="getuserinfo"
		@error="error"
		@opensetting="opensetting"
		@launchapp="launchapp"
		@tap.stop="tap"
	>
		<view class="cl-button__loading">
			<cl-loading v-if="loading" :size="16" :color="type ? '#fff' : ''"></cl-loading>
		</view>

		<text :class="['cl-button__icon', icon]" v-if="icon"></text>

		<view class="cl-button__text">
			<slot></slot>
		</view>
	</button>
</template>

<script>
const { platform } = uni.getSystemInfoSync();

/**
 * button 按钮
 * @description 该组件基于官方的 button 组件。参数与官方一致，同时添加新的支持。
 * @tutorial https://www.uviewui.com/components/button.html
 * @property {Array<Object>} list 按钮的文字数组，见官方文档示例
 * @property {Object} tips 顶部的提示文字，见官方文档示例
 * @property {String} cancel-text 取消按钮的提示文字
 * @property {Boolean} cancel-btn 是否显示底部的取消按钮（默认true）
 * @property {Number String} border-radius 弹出部分顶部左右的圆角值，单位rpx（默认0）
 * @property {Boolean} mask-close-able 点击遮罩是否可以关闭（默认true）
 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配（默认false）
 * @property {Number String} z-index z-index值（默认1075）
 * @property {String} cancel-text 取消按钮的提示文字
 * @event {Function} click 点击ActionSheet列表项时触发
 * @event {Function} close 点击取消按钮时触发
 * @example <cl-button></cl-button>
 */

export default {
	name: "cl-button",

	props: {
		// 按钮大小
		size: String,
		// 按钮类型
		type: String,
		// 是否镂空
		plain: Boolean,
		// 是否禁用
		disabled: Boolean,
		// 是否加载中
		loading: Boolean,
		// 是否圆角
		round: Boolean,
		// 是否阴影
		shadow: Boolean,
		// 图标
		icon: String,
		// 是否水平填充
		fill: Boolean,
		formType: String,
		openType: String,
		hoverClass: {
			type: String,
			default: "button-hover"
		},
		hoverStartTime: {
			type: Number,
			default: 20
		},
		hoverStayTime: {
			type: Number,
			default: 70
		},
		appParameter: String,
		hoverStopPropagation: Boolean,
		lang: {
			type: String,
			default: "en"
		},
		sessionForm: String,
		sendMessageTitle: String,
		sendMessagePath: String,
		sendMessageImg: String,
		showMessageCard: Boolean
	},
	data() {
		return {
			platform
		};
	},
	methods: {
		getphonenumber(e) {
			this.$emit("getphonenumber", e);
		},
		getuserinfo(e) {
			this.$emit("getuserinfo", e);
		},
		error(e) {
			this.$emit("error", e);
		},
		opensetting(e) {
			this.$emit("opensetting", e);
		},
		launchapp(e) {
			this.$emit("launchapp", e);
		},
		tap(e) {
			if (!this.disabled && !this.loading) {
				this.$emit("click", e);
				this.$emit("tap", e);
			}
		}
	}
};
</script>
