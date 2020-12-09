<template>
	<view class="cl-guide">
		<slot></slot>

		<view class="cl-guide__mask" v-if="visible">
			<view class="cl-guide__display" :style="[mask.style, step.style]"></view>

			<view class="cl-guide__tools" :class="[step.justify]" :style="[tools.style]">
				<!-- 图片 -->
				<image
					class="cl-guide__image"
					:src="step.image.url"
					:style="[step.image.style]"
					v-if="step.image"
				/>

				<!-- 内容 -->
				<view class="cl-guide__content" v-if="step.content">
					{{ step.content }}
				</view>

				<!-- 按钮组 -->
				<view class="cl-guide__op is-left">
					<button @tap="toPrev" v-if="isPrev && step.showPrev">
						{{ step.prevText || "上一步" }}
					</button>
					<button @tap="toNext" v-if="isNext && step.showNext">
						{{ step.nextText || "下一步" }}
					</button>
					<button @tap="toSkip" v-if="step.showSkip">
						{{ step.skipText || "跳过" }}
					</button>
					<button @tap="toDone" v-if="!isNext">{{ step.doneText || "完成" }}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const { windowHeight } = uni.getSystemInfoSync();

/**
 * guide 操作引导
 * @description 步骤引导
 * @tutorial https://docs.cool-js.com/uni/components/advanced/guide.html
 * @property {Array} steps 步骤列表
 * @property {Number} value 当前步骤序号
 * @event {Function} change 切换步骤时触发
 * @event {Function} done 完成时触发
 * @event {Function} skip 跳过时触发
 * @example <cl-steps :steps="[]" />
 */

export default {
	name: "cl-guide",

	props: {
		steps: {
			required: true,
			type: Array,
			default: [],
		},
		value: {
			type: Number,
			default: 0,
		},
	},

	data() {
		return {
			visible: false,
			current: 0,
			mask: {
				style: {},
			},
			tools: {
				style: {},
			},
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(v) {
				this.current = v;
			},
		},
	},

	computed: {
		step() {
			let step = this.steps[this.current];

			if (step.showPrev === undefined) {
				step.showPrev = true;
			}

			if (step.showNext === undefined) {
				step.showNext = true;
			}

			return step;
		},

		isPrev() {
			return this.current > 0;
		},

		isNext() {
			return this.current < this.steps.length - 1;
		},
	},

	methods: {
		open() {
			this.visible = true;

			this.$nextTick(() => {
				this.init().then(() => {
					this.updateMask();
				});
			});
		},

		close() {
			this.visible = false;
		},

		init() {
			return Promise.all(
				this.steps.map((e) => {
					return new Promise((resolve) => {
						uni.createSelectorQuery()
							.select(e.selector)
							.boundingClientRect((res) => {
								e.rect = res;
								resolve(e);
							})
							.exec();
					});
				})
			);
		},

		updateMask() {
			let { height, width, left, top } = this.step.rect || {};

			this.mask.style = {
				height: height + "px",
				width: width + "px",
				marginLeft: left + "px",
				marginTop: top + "px",
			};

			this.$nextTick(() => {
				uni.createSelectorQuery()
					.in(this)
					.select(".cl-guide__tools")
					.boundingClientRect((res) => {
						let _top = top + height;

						if (top + height + res.height > windowHeight) {
							_top = top - res.height - 10;
						}

						this.tools.style = {
							top: _top + "px",
						};
					})
					.exec();
			});
		},

		toPrev() {
			this.current -= 1;
			this.onChange();
		},

		toNext() {
			this.current += 1;
			this.onChange();
		},

		toSkip() {
			this.close();
			this.$emit("skip", this.current);
		},

		toDone() {
			this.close();
			this.$emit("done", this.step);
		},

		onChange() {
			this.updateMask();
			this.$emit("change", this.current);
		},
	},
};
</script>
