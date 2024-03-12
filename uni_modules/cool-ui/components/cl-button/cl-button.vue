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
		:style="[
			baseStyle,
			{
				color,
			},
		]"
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
		<cl-loading :size="32" :color="loadingColor" :theme="loadingTheme" v-if="loading" />

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
import { type PropType } from "vue";
import { useTap } from "../../hooks";
import { useStyle } from "../../hooks/style";

export default defineComponent({
	name: "cl-button",

	props: {
		// 按钮大小
		size: String as PropType<"large" | "default" | "small">,
		// 按钮类型
		type: {
			type: String as PropType<
				"default" | "primary" | "success" | "danger" | "warning" | "info"
			>,
			default: "default",
		},
		// 是否朴素
		plain: Boolean,
		// 是否禁用
		disabled: Boolean,
		// 是否加载
		loading: Boolean,
		// 加载图标主题
		loadingTheme: String,
		// 加载图标颜色
		loadingColor: String,
		// 是否圆角
		round: Boolean,
		// 是否带有边框
		border: {
			type: Boolean,
			default: true,
		},
		// 图标
		icon: String,
		// 水平填充
		fill: Boolean,
		// 字体颜色
		color: String,
		// 是否粗字体
		bold: Boolean,
		// 是否自定义
		custom: Boolean,
		// 以下查看 uniapp 文档：https://uniapp.dcloud.net.cn/component/button.html
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

		function click(e: Event) {
			tap(e);
		}

		return {
			getPhoneNumber,
			getUserInfo,
			error,
			openSetting,
			launchApp,
			click,
			isImg,
			...useStyle(),
		};
	},
});
</script>
