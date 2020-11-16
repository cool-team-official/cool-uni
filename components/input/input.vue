<template>
	<view
		class="cl-input"
		:class="[
			{
				'cl-input--prefix': prefixIcon,
				'cl-input--suffix': suffixIcon,
				'cl-input--focus': isFocus,
				'is-disabled': disabled,
				'is-round': round,
				'is-border': border
			}
		]"
	>
		<view class="cl-input__prepend" v-if="$slots.prepend">
			<slot name="prepend"></slot>
		</view>

		<view class="cl-input__wrap">
			<text class="cl-input__icon" :class="[prefixIcon]" v-if="prefixIcon"></text>
			<text class="cl-input__icon" :class="[suffixIcon]" v-if="suffixIcon"></text>

			<template v-if="type == 'password'">
				<input
					class="cl-input__inner"
					v-model="value2"
					type="password"
					:password="password"
					:placeholder="placeholder"
					:disabled="disabled"
					:focus="focus"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderClass"
					:maxlength="maxlength"
					:cursor-spacing="cursorSpacing"
					:confirm-hold="confirmHold"
					:adjust-position="adjustPosition"
					:holdKeyboard="holdKeyboard"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
					@confirm="onConfirm"
					@keyboardheightchange="onKeyboardheightchange"
				/>
			</template>

			<template v-else-if="type == 'number'">
				<input
					class="cl-input__inner"
					v-model="value2"
					type="number"
					:password="password"
					:placeholder="placeholder"
					:disabled="disabled"
					:focus="focus"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderClass"
					:maxlength="maxlength"
					:cursor-spacing="cursorSpacing"
					:confirm-hold="confirmHold"
					:adjust-position="adjustPosition"
					:holdKeyboard="holdKeyboard"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
					@confirm="onConfirm"
					@keyboardheightchange="onKeyboardheightchange"
				/>
			</template>

			<template v-else-if="type == 'idcard'">
				<input
					class="cl-input__inner"
					v-model="value2"
					type="idcard"
					:password="password"
					:placeholder="placeholder"
					:disabled="disabled"
					:focus="focus"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderClass"
					:maxlength="maxlength"
					:cursor-spacing="cursorSpacing"
					:confirm-hold="confirmHold"
					:adjust-position="adjustPosition"
					:holdKeyboard="holdKeyboard"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
					@confirm="onConfirm"
					@keyboardheightchange="onKeyboardheightchange"
				/>
			</template>

			<template v-else-if="type == 'digit'">
				<input
					class="cl-input__inner"
					v-model="value2"
					type="digit"
					:password="password"
					:placeholder="placeholder"
					:disabled="disabled"
					:focus="focus"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderClass"
					:maxlength="maxlength"
					:cursor-spacing="cursorSpacing"
					:confirm-hold="confirmHold"
					:adjust-position="adjustPosition"
					:holdKeyboard="holdKeyboard"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
					@confirm="onConfirm"
					@keyboardheightchange="onKeyboardheightchange"
				/>
			</template>

			<template v-else>
				<input
					class="cl-input__inner"
					v-model="value2"
					type="text"
					:password="password"
					:placeholder="placeholder"
					:disabled="disabled"
					:focus="focus"
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
				/>
			</template>

			<text
				class="cl-input__clear cl-icon-round-close-fill"
				@tap="clear"
				v-if="isFocus && clearable"
			></text>
		</view>

		<view class="cl-input__append" v-if="$slots.append">
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
			default: "text"
		},
		password: Boolean,
		placeholder: String,
		clearable: Boolean,
		placeholderStyle: String,
		placeholderClass: String,
		disabled: Boolean,
		round: Boolean,
		border: {
			type: Boolean,
			default: true
		},
		focus: Boolean,
		maxlength: {
			type: [Number, String],
			default: 140
		},
		cursorSpacing: {
			type: Number,
			default: 0
		},
		confirmType: {
			type: String,
			default: "done"
		},
		confirmHold: Boolean,
		adjustPosition: {
			type: Boolean,
			default: true
		},
		holdKeyboard: {
			type: Boolean,
			default: false
		},
		prefixIcon: String,
		suffixIcon: String
	},

	data() {
		return {
			value2: null,
			isFocus: false
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
		onInput() {
			this.$emit("input", this.value2);
			this.$emit("change", this.value2);
		},

		onFocus(e) {
			this.$emit("focus", e);
			this.isFocus = true;
		},

		onBlur(e) {
			this.$emit("blur", e);

			setTimeout(() => {
				this.isFocus = false;
			}, 0);
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

		clear() {
			this.value2 = "";
			this.$emit("input", "");
			this.$emit("change", "");
			this.$emit("clear");
		}
	}
};
</script>
