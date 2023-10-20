<template>
	<button
		:class="[
			'cl-button',
			type && `cl-button--${type}`,
			size && `cl-button--${size}`,
			{
				'is-round': round,
				'is-loading': loading,
				'is-plain': plain,
				'is-fill': fill,
				'is-disabled': disabled,
				'is-border': border,
				'is-bold': bold,
				'is-custom': custom,
			},
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
		:disabled="disabled || loading"
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
		<cl-loading :size="16" :color="loadingColor" :theme="loadingTheme" v-if="loading" />

		<!-- 图标 -->
		<view class="cl-button__icon" v-if="icon">
			<image :src="icon" mode="aspectFit" v-if="isImg" />
			<text :class="[icon]" v-else></text>
		</view>

		<!-- 本文 -->
		<view class="cl-button__text" :style="{ color }">
			<slot></slot>
		</view>
	</button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import type { PropType } from "vue";
import { useTap } from "../../hook";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-button",

	props: {
		size: String as PropType<"large" | "default" | "small">,
		type: {
			type: String as PropType<
				"default" | "primary" | "success" | "danger" | "warning" | "info"
			>,
			default: "default",
		},
		plain: Boolean,
		disabled: Boolean,
		loading: Boolean,
		loadingTheme: {
			type: String as PropType<"default" | "spin">,
			default: "default",
		},
		round: Boolean,
		border: {
			type: Boolean,
			default: true,
		},
		borderRadius: Number,
		bold: Boolean,
		margin: [String, Number, Array],
		icon: String,
		loadingColor: String,
		fill: Boolean,
		height: Number,
		width: Number,
		color: String,
		backgroundColor: String,
		fontSize: Number,
		custom: Boolean,
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
		const { tap } = useTap(emit);

		// 是否图片
		const isImg = computed(() => props.icon?.includes("/"));

		// loading 颜色
		const loadingColor = computed(() => props.loadingColor);

		// 事件
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
			tap(e);
		}

		return {
			getPhoneNumber,
			getUserInfo,
			error,
			openSetting,
			launchApp,
			click,
			parseRpx,
			isImg,
			loadingColor,
		};
	},
});
</script>
