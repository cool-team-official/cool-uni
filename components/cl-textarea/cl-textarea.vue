<template>
	<view class="cl-textarea">
		<textarea
			v-model="value2"
			:style="{ height }"
			:placeholder="placeholder"
			:disabled="disabled"
			:focus="focus"
			:auto-height="autoHeight"
			:fixed="fixed"
			:cursor-spacing="cursorSpacing"
			:cursor="cursor"
			:show-confirm-bar="showConfirmBar"
			:selection-start="selectionStart"
			:selection-end="selectionEnd"
			:adjust-position="adjustPosition"
			:disable-default-padding="disableDefaultPadding"
			:hold-keyboard="holdKeyboard"
			:maxlength="maxlength"
			@focus="onFocus"
			@blur="onBlur"
			@linechange="onLinechange"
			@input="onInput"
			@confirm="onConfirm"
			@keyboardheightchange="onKeyboardheightchange"
		></textarea>
	</view>
</template>

<script>
/**
 * textarea 文本域
 * @description 文本域
 * @tutorial https://docs.cool-js.com/uni/components/form/textarea.html
 * @property {String} value 绑定值
 * @property {String} placeholder 占位内容
 * @property {String} height 输入框高度，默认140rpx
 * @event {Function} change 绑定值改变时触发
 * @example <cl-textarea v-model="val" />
 */

export default {
	name: "cl-textarea",

	props: {
		// 绑定值
		value: String,
		// 占位内容
		placeholder: String,
		// 输入框高度
		height: {
			type: String,
			default: "140rpx"
		},
		disabled: Boolean,
		focus: Boolean,
		autoHeight: Boolean,
		fixed: Boolean,
		cursorSpacing: {
			type: Number,
			default: 0
		},
		cursor: Number,
		showConfirmBar: {
			type: Boolean,
			default: true
		},
		selectionStart: {
			type: Number,
			default: -1
		},
		selectionEnd: {
			type: Number,
			default: -1
		},
		adjustPosition: {
			type: Boolean,
			default: true
		},
		disableDefaultPadding: Boolean,
		holdKeyboard: Boolean,
		maxlength: {
			type: Number,
			default: 140
		}
	},

	data() {
		return {
			value2: ""
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.value2 = val;
			}
		}
	},

	methods: {
		onFocus(e) {
			this.$emit("focus", e);
		},
		onBlur(e) {
			this.$emit("blur", e);
		},
		onLinechange(e) {
			this.$emit("linechange", e);
		},
		onInput(e) {
			this.$emit("input", e.detail.value);
		},
		onConfirm(e) {
			this.$emit("confirm", e);
		},
		onKeyboardheightchange(e) {
			this.$emit("keyboardheightchange", e);
		}
	}
};
</script>
