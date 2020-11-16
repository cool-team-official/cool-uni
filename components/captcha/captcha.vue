<template>
	<view class="cl-captcha">
		<input
			class="cl-captcha__input"
			v-model="value2"
			type="number"
			:focus="focus"
			:maxlength="length"
			@focus="onFocus"
			@blur="onBlur"
			@input="onInput"
		/>

		<view class="cl-captcha__code">
			<view class="cl-captcha__item" v-for="(item, index) in length" :key="index">
				<text class="cl-captcha__value">{{ value2[index] }}</text>
				<view class="cl-captcha__cursor" v-if="value2.length == index && focus2"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		value: String,
		focus: Boolean,
		length: {
			type: Number,
			default: 4,
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
				this.value2 = val || "";
			},
		},
	},

	methods: {
		onFocus() {
			this.focus2 = true;
		},

		onBlur() {
			this.focus2 = false;
		},

		onInput(e) {
			const val = e.detail.value;

			this.$emit("input", val);

			if (val.length === this.length) {
				this.$emit("done", val);
			}
		},
	},
};
</script>
