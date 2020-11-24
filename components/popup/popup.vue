<template>
	<view
		v-if="show"
		:class="[
			'cl-popup__wrapper',
			`cl-popup__wrapper--${direction}`,
			`is-${status ? 'open' : 'close'}`,
		]"
		@touchmove.stop.prevent
	>
		<view class="cl-popup__modal" @tap="modalClose"></view>

		<view
			:class="['cl-popup']"
			:style="{ height, width, backgroundColor, borderRadius: parseRpx(borderRadius) }"
		>
			<view class="cl-popup__container" :style="{ padding: parseRpx(padding) }">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
import { parseRpx } from "../../utils";

export default {
	props: {
		visible: Boolean,
		beforeClose: Function,
		direction: {
			type: String,
			default: "left",
		},
		closeOnClickModal: {
			type: Boolean,
			default: true,
		},
		size: {
			type: [String, Number],
			default: "auto",
		},
		backgroundColor: {
			type: String,
			default: "#fff",
		},
		borderRadius: [String, Number],
		padding: {
			type: [String, Number],
			default: 20,
		},
	},

	data() {
		return {
			show: false,
			status: false,
			timer: null,
		};
	},

	computed: {
		height() {
			switch (this.direction) {
				case "top":
				case "bottom":
					return parseRpx(this.size);
				case "left":
				case "right":
					return "100%";
			}
		},

		width() {
			switch (this.direction) {
				case "top":
				case "bottom":
					return "100%";
				case "left":
				case "right":
				case "center":
					return parseRpx(this.size);
			}
		},
	},

	watch: {
		visible(val) {
			if (val) {
				this.open();
			} else {
				this.close();
			}
		},
	},

	methods: {
		parseRpx,

		open() {
			if (!this.show) {
				this.show = true;

				this.$emit("update:visible", true);
				this.$emit("open");

				clearTimeout(this.timer);

				this.timer = setTimeout(() => {
					this.status = true;
				}, 50);
			}
		},

		close() {
			if (this.status) {
				const done = () => {
					this.status = false;

					this.$emit("update:visible", false);
					this.$emit("close");

					clearTimeout(this.timer);

					this.timer = setTimeout(() => {
						this.show = false;
					}, 300);
				};

				if (this.beforeClose) {
					this.beforeClose(done);
				} else {
					done();
				}
			}
		},

		modalClose() {
			if (!this.closeOnClickModal) {
				return false;
			}

			this.close();
		},
	},
};
</script>
