<template>
	<view class="cl-search">
		<view class="cl-search__prepend" v-if="$slots.prepend">
			<slot name="prepend"></slot>
		</view>
		<view class="cl-search__input">
			<cl-input
				:prefix-icon="searchIcon"
				v-model="value2"
				:type="type"
				:placeholder="placeholder"
				:disabled="disabled"
				:focus="focus2"
				:placeholder-style="placeholderStyle"
				:placeholder-class="placeholderClass"
				:maxlength="maxlength"
				:cursor-spacing="cursorSpacing"
				:confirm-type="confirmType"
				:confirm-hold="confirmHold"
				:adjust-position="adjustPosition"
				:holdKeyboard="holdKeyboard"
				@input="onInput"
				@focus="onFocus"
				@blur="onBlur"
				@confirm="onConfirm"
				@keyboardheightchange="onKeyboardheightchange"
			></cl-input>
			<cl-button
				class="cl-search__input-btn"
				type="primary"
				round
				v-if="showSearchButton"
				@tap="search"
			>
				{{ searchButtonText }}
			</cl-button>
		</view>
		<view class="cl-search__append" v-if="$slots.append">
			<slot name="append"></slot>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		value: [String, Number],
		type: {
			type: String,
			default: "text",
		},
		password: Boolean,
		placeholder: String,
		placeholderStyle: String,
		placeholderClass: String,
		disabled: Boolean,
		focus: Boolean,
		maxlength: {
			type: Number,
			default: 140,
		},
		cursorSpacing: {
			type: Number,
			default: 0,
		},
		confirmType: {
			type: String,
			default: "done",
		},
		confirmHold: Boolean,
		adjustPosition: {
			type: Boolean,
			default: true,
		},
		holdKeyboard: {
			type: Boolean,
			default: false,
		},
		searchIcon: {
			type: String,
			default: "cl-icon-search",
		},
		showSearchButton: {
			type: Boolean,
			default: true,
		},
		searchButtonText: {
			type: String,
			default: "搜索",
		},
	},

	data() {
		return {
			value2: null,
			focus2: false,
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.value2 = val;
			},
		},

		focus: {
			immediate: true,
			handler(val) {
				this.focus2 = val;
			},
		},
	},

	methods: {
		onInput(e) {
			this.$emit("input", e);
		},

		onFocus(e) {
			this.$emit("focus", e);
		},

		onBlur(e) {
			this.$emit("blur", e);
		},

		onConfirm(e) {
			this.$emit("confirm", e);
			this.search();
		},

		onKeyboardheightchange(e) {
			this.$emit("keyboardheightchange", e);
		},

		search() {
			this.$emit("search", this.value2);
		},
	},
};
</script>
