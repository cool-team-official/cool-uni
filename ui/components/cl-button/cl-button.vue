<template>
	<button
		:class="[
			'cl-button',
			`cl-button--${type}`,
			`cl-button--${size}`,
			{ 'is-round': round },
			{ 'is-loading': loading },
			{ 'is-loading-mask': loadingMask },
			{ 'is-plain': plain },
			{ 'is-fill': fill },
			{ 'is-disabled': disabled },
			{ 'is-border': border },
			{ 'is-bold': bold },
		]"
		:style="{
			color,
			backgroundColor,
			height: parseRpx(height),
			width: parseRpx(width),
			fontSize: parseRpx(fontSize),
			margin: parseRpx(margin),
			borderRadius: parseRpx(borderRadius),
		}"
		:size="size"
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
		@getphonenumber="getPhoneNumber"
		@getuserinfo="getUserInfo"
		@error="error"
		@opensetting="openSetting"
		@launchapp="launchApp"
		@click="click"
	>
		<!-- 加载框 -->
		<view class="cl-button__loading" v-if="loading">
			<cl-loading :size="16" :color="loadingColor" :theme="loadingTheme"></cl-loading>
			<text class="cl-button__loading-text" v-if="loadingText && loadingMask">
				{{ loadingText }}
			</text>
		</view>

		<!-- 图标 -->
		<view class="cl-button__icon" v-if="icon">
			<image :src="icon" v-if="isImg" />
			<text :class="[icon]" v-else></text>
		</view>

		<!-- 本文 -->
		<view class="cl-button__text" :style="{ color }">
			<slot></slot>
		</view>
	</button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-button",

	props: {
		size: {
			type: String as PropType<"large" | "default" | "small">,
			default: "default",
		},
		type: {
			type: String as PropType<"primary" | "success" | "danger" | "warning" | "info">,
			default: "button",
		},
		plain: Boolean,
		disabled: Boolean,
		loading: Boolean,
		loadingTheme: {
			type: String as PropType<"default" | "spin">,
			default: "default",
		},
		loadingMask: Boolean,
		loadingText: String,
		round: Boolean,
		border: {
			type: Boolean,
			default: true,
		},
		borderRadius: Number,
		bold: Boolean,
		margin: [String, Number, Array],
		icon: String,
		fill: Boolean,
		height: Number,
		width: Number,
		color: String,
		backgroundColor: String,
		fontSize: Number,
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

	setup(props, { emit }) {
		function getPhoneNumber(e: any) {
			emit("getphonenumber", e);
		}

		function getUserInfo(e: any) {
			emit("getuserinfo", e);
		}

		function error(e: any) {
			emit("error", e);
		}

		function openSetting(e: any) {
			emit("opensetting", e);
		}

		function launchApp(e: any) {
			emit("launchapp", e);
		}

		function click(e: any) {
			if (!props.disabled && !props.loading) {
				emit("click", e);

				// #ifndef MP-WEIXIN
				emit("tap", e);
				// #endif
			}
		}

		return {
			getPhoneNumber,
			getUserInfo,
			error,
			openSetting,
			launchApp,
			click,
			isImg: computed(() => props.icon?.includes("/")),
			loadingColor: computed(() => (props.type ? "#fff" : "")),
			parseRpx,
		};
	},
});
</script>
