<template>
	<button
		class="cl-button"
		:class="[classList]"
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
			<cl-loading
				v-if="loading"
				:size="16"
				:color="type ? '#fff' : ''"
				:theme="loadingTheme"
			></cl-loading>

			<text class="cl-button__loading-text" v-if="loadingText && loadingMask">{{
				loadingText
			}}</text>
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
 * @tutorial https://docs.cool-js.com/uni/components/basic/button.html
 * @property {String} size 按钮大小
 * @property {String} type 按钮类型
 * @property {Boolean} plain 是否镂空
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} loading 是否加载中
 * @property {String} loadingTheme 加载图标主题
 * @property {String} loadingMask 加载是否遮罩层模式
 * @property {String} loadingText 加载文案
 * @property {Boolean} round 是否圆角
 * @property {Boolean} shadow 是否阴影
 * @property {String} icon 左侧图标
 * @property {Boolean} fill 是否水平填充
 * @example <cl-button>按钮</cl-button>
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
		// 加载图标主题
		loadingTheme: String,
		// 加载是否遮罩层模式
		loadingMask: Boolean,
		// 加载文案
		loadingText: String,
		// 是否圆角
		round: Boolean,
		// 是否阴影
		shadow: Boolean,
		// 左侧图标
		icon: String,
		// 是否水平填充
		fill: Boolean,
		formType: String,
		openType: String,
		hoverClass: {
			type: String,
			default: "button-hover",
		},
		hoverStartTime: {
			type: Number,
			default: 20,
		},
		hoverStayTime: {
			type: Number,
			default: 70,
		},
		appParameter: String,
		hoverStopPropagation: Boolean,
		lang: {
			type: String,
			default: "en",
		},
		sessionForm: String,
		sendMessageTitle: String,
		sendMessagePath: String,
		sendMessageImg: String,
		showMessageCard: Boolean,
	},

	computed: {
		classList() {
			let list = [];

			if (this.type) {
				list.push(`cl-button--${this.type}`);
			}

			if (this.size) {
				list.push(`cl-button--${this.size}`);
			}

			if (this.platform) {
				list.push(`is-${this.platform}`);
			}

			if (this.round) {
				list.push("is-round");
			}

			if (this.shadow) {
				list.push("is-shadow");
			}

			if (this.loading) {
				list.push("is-loading");
			}

			if (this.loadingMask) {
				list.push("is-loading-mask");
			}

			if (this.plain) {
				list.push("is-plain");
			}

			if (this.fill) {
				list.push("is-fill");
			}

			if (this.disabled) {
				list.push("is-disabled");
			}

			return list.join(" ");
		},
	},

	data() {
		return {
			platform,
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
		},
	},
};
</script>
