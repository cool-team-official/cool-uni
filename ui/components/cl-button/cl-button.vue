<template>
	<button
		:class="buttonClass"
		:style="buttonStyle"
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
		@click="handleClick"
		@tap.stop="handleTap"
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
		const buttonClass = computed(() => {
			const list = [
				"cl-button",
				`cl-button--${props.type}`,
				`cl-button--${props.size}`,
				{ "is-round": props.round },
				{ "is-loading": props.loading },
				{ "is-loading-mask": props.loadingMask },
				{ "is-plain": props.plain },
				{ "is-fill": props.fill },
				{ "is-disabled": props.disabled },
				{ "is-border": props.border },
				{ "is-bold": props.bold },
			];
			return list;
		});

		const buttonStyle = computed(() => ({
			color: props.color,
			backgroundColor: props.backgroundColor,
			height: parseRpx(props.height),
			width: parseRpx(props.width),
			fontSize: parseRpx(props.fontSize),
			margin: parseRpx(props.margin),
		}));

		function handleClick(e: MouseEvent) {
			if (!props.disabled && !props.loading) {
				emit("click", e);
				emit("tap", e);
			}
		}

		function handleTap(e: MouseEvent) {
			if (!props.disabled && !props.loading) {
				emit("tap", e);
			}
		}

		return {
			buttonClass,
			buttonStyle,
			parseRpx,
			isImg: computed(() => props.icon?.includes("/")),
			loadingColor: computed(() => (props.type ? "#fff" : "")),
			handleClick,
			handleTap,
		};
	},
});
</script>
