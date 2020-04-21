<template>
	<button
		class="cl-button"
		:class="[
			`cl-button--${type}`,
			`cl-button--${size}`,
			{
				'cl-button--round': round,
				'cl-button--shadow': shadow,
				'is-loading': loading,
				'is-plain': plain,
				'is-fill': fill
			}
		]"
		:size="size"
		:type="type"
		:plain="plain"
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
		@tap="tap"
	>
		<cl-loading v-if="loading" :size="18" :color="type ? '#fff' : ''"></cl-loading>
		<text :class="['cl-button__icon', icon]" v-if="icon"></text>
		<text class="cl-button__text"><slot></slot></text>
	</button>
</template>

<script>
export default {
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
		fill: Boolean,
		formType: String,
		openType: String,
		hoverClass: {
			type: String,
			default: 'button-hover'
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
			default: 'en'
		},
		sessionForm: String,
		sendMessageTitle: String,
		sendMessagePath: String,
		sendMessageImg: String,
		showMessageCard: Boolean
	},

	methods: {
		getphonenumber(e) {
			this.$emit('getphonenumber', e);
		},
		getuserinfo(e) {
			this.$emit('getuserinfo', e);
		},
		error(e) {
			this.$emit('error', e);
		},
		opensetting(e) {
			this.$emit('opensetting', e);
		},
		launchapp(e) {
			this.$emit('launchapp', e);
		},
		tap(e) {
			this.$emit('click', e);
		}
	}
};
</script>
