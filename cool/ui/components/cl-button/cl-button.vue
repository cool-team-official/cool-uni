<template>
	<button
		class="cl-button"
		:class="[
			`cl-button--${type}`,
			`cl-button--${size}`,
			{
				'is-round': round,
				'is-shadow': shadow,
				'is-loading': loading,
				'is-loading-mask': loadingMask,
				'is-plain': plain,
				'is-fill': fill,
				'is-disabled': disabled,
				'is-border': border,
			},
		]"
		:style="{
			color,
			backgroundColor,
			height: parseRpx(height),
			width: parseRpx(width),
			fontSize: parseRpx(fontSize),
			borderRadius: parseRpx(borderRadius),
			margin: parseRpx(margin),
		}"
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
		@getphonenumber="getPhoneNumber"
		@getuserinfo="getUserInfo"
		@error="error"
		@opensetting="openSetting"
		@launchapp="launchApp"
		@tap.stop="tap"
	>
		<!-- 加载框 -->
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

		<!-- 图标 -->
		<view class="cl-button__icon" v-if="icon">
			<image :src="icon" v-if="isImg" mode="aspectFit" />
			<text :class="[icon]" v-else></text>
		</view>

		<!-- 本文 -->
		<view class="cl-button__text" :style="{ color }">
			<slot></slot>
		</view>
	</button>
</template>

<script lang="ts">
/**
 * @description 按钮
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
 * @property {Number} height 高度
 * @property {Number} width 宽度
 * @property {String} color 颜色
 * @property {String} backgroundColor 背景颜色
 * @property {Number} fontSize 字体大小
 */

import { computed, defineComponent, PropType } from "vue";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-button",

	props: {
		size: String,
		type: String as PropType<"button" | "submit" | "reset">,
		plain: Boolean,
		disabled: Boolean,
		loading: Boolean,
		loadingTheme: String as PropType<"default" | "spin">,
		loadingMask: Boolean,
		loadingText: String,
		round: Boolean,
		border: {
			type: Boolean,
			default: true,
		},
		borderRadius: {
			type: [Number, String],
			default: 10,
		},
		margin: [String, Number, Array],
		shadow: Boolean,
		icon: String,
		fill: Boolean,
		height: {
			type: Number,
			default: 66,
		},
		width: Number,
		color: String,
		backgroundColor: String,
		fontSize: {
			type: Number,
			default: 26,
		},
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

	emits: ["click", "tap", "getphonenumber", "getuserinfo", "error", "opensetting", "launchapp"],

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

		function tap(e: any) {
			if (!props.disabled && !props.loading) {
				emit("click", e);
				emit("tap", e);
			}
		}

		return {
			getPhoneNumber,
			getUserInfo,
			error,
			openSetting,
			launchApp,
			tap,
			parseRpx,
			isImg: computed(() => props.icon?.includes("/")),
		};
	},
});
</script>
