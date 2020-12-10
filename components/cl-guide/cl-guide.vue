<template>
	<view class="cl-guide">
		<slot></slot>

		<!-- 遮罩层 -->
		<view
			class="cl-guide__mask"
			:style="{
				'mix-blend-mode': mode,
			}"
			v-if="visible"
		>
			<!-- 显示区域 -->
			<view
				class="cl-guide__display"
				:style="[display.style, step.style]"
				@tap="onTap"
			></view>

			<!-- 工具 -->
			<view
				class="cl-guide__tools"
				:class="[step.justify]"
				:style="[tools.style]"
				v-if="step"
			>
				<slot name="tools" :step="step" :current="current">
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
						<!-- 上一步按钮 -->
						<button @tap="toPrev" v-if="isPrev && step.showPrev">
							{{ step.prevText || "上一步" }}
						</button>
						<!-- 下一步按钮 -->
						<button @tap="toNext" v-if="isNext && step.showNext">
							{{ step.nextText || "下一步" }}
						</button>
						<!-- 跳过按钮 -->
						<button @tap="toSkip" v-if="step.showSkip">
							{{ step.skipText || "跳过" }}
						</button>
						<!-- 完成按钮 -->
						<button @tap="toDone" v-if="!isNext">{{ step.doneText || "完成" }}</button>
					</view>
				</slot>
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
 * @property {Number} value 当前步骤序号
 * @property {String} mode mix-blend-mode 选项 hard-light | darken
 * @event {Function} change 切换步骤时触发
 * @event {Function} done 完成时触发
 * @event {Function} skip 跳过时触发
 * @example <cl-guide ref="guide" />
 */

export default {
	name: "cl-guide",

	props: {
		value: {
			type: Number,
			default: 0,
		},
		mode: {
			type: String,
			default: "hard-light",
		},
	},

	data() {
		return {
			visible: false,
			current: 0,
			steps: [],
			display: {
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

			if (step) {
				if (step.showPrev === undefined) {
					step.showPrev = true;
				}

				if (step.showNext === undefined) {
					step.showNext = true;
				}
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
		// 设置数据
		defineSteps(steps) {
			this.steps = steps;
		},

		// 开始
		start(index) {
			this.visible = true;

			this.$nextTick(() => {
				this.current = index || 0;
				this.init();
			});
		},

		// 关闭
		close() {
			this.visible = false;
		},

		// 重置
		reset() {
			this.current = 0;
		},

		// 初始化
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
			).then(() => {
				this.updateStyle();
			});
		},

		// 更新显示区域样式,工具栏样式
		updateStyle() {
			let { height, width, left, top } = this.step.rect || {};

			this.display.style = {
				height: height + "px",
				width: width + "px",
				marginLeft: left + "px",
				marginTop: top + "px",
				"background-color": this.mode == "hard-light" ? "gray" : "#fff",
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

		// 上一步
		async toPrev() {
			let prev = () => {
				if (this.current > 0) {
					this.current -= 1;
					this.onChange();
				}
			};

			if (this.step.onPrev) {
				await this.step.onPrev({
					prev,
					next: this.toNext,
					skip: this.toSkip,
					done: this.toDone,
					current: this.current,
					step: this.step,
				});
			} else {
				prev();
			}
		},

		// 下一步
		async toNext() {
			let next = () => {
				if (this.current < this.steps.length - 1) {
					this.current += 1;
					this.onChange();
				}
			};

			if (this.step.onNext) {
				await this.step.onNext({
					next,
					prev: this.toPrev,
					skip: this.toSkip,
					done: this.toDone,
					current: this.current,
					step: this.step,
				});
			} else {
				next();
			}
		},

		// 跳过
		toSkip() {
			this.close();
			this.$emit("skip", this.current);
		},

		// 完成
		toDone() {
			this.close();
			this.$emit("done", this.step);
		},

		// 点击
		onTap() {
			if (this.step.onClick) {
				this.step.onClick({
					next: this.toNext,
					prev: this.toPrev,
					skip: this.toSkip,
					done: this.toDone,
					current: this.current,
					step: this.step,
				});
			}
		},

		// 切换
		onChange() {
			this.updateStyle();
			this.$emit("change", this.current);
		},
	},
};
</script>
