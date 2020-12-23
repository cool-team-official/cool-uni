<template>
	<view class="cl-cropper__wrap" v-if="visible" @touchmove.stop.prevent catchtouchmove="false">
		<view class="cl-cropper">
			<view class="cl-cropper__container">
				<!-- 原图片 -->
				<view
					class="cl-cropper__image"
					:class="[filterBlur ? 'is-filter-blur' : '']"
					:style="[imageSize, imageTransform]"
					@touchstart.stop.prevent="onTouchStart"
					@touchmove.stop.prevent="onTouchMove"
					@touchend.stop.prevent="onTouchEnd"
				>
					<image :src="image.url" />
				</view>

				<!-- 选择框 -->
				<view
					class="cl-cropper__view"
					:class="[round ? 'is-round' : '']"
					:style="[cropStyle]"
				>
					<image :src="image.url" :style="[imageSize, cropTransform]" />
				</view>

				<!-- 工具 -->
				<view class="cl-cropper__tools">
					<!-- 选择图片 -->
					<view class="cl-cropper__tools-item" @tap="chooseImage">
						<cl-icon name="image" :size="30"></cl-icon>
						<text>选择图片</text>
					</view>

					<!-- 旋转 -->
					<view class="cl-cropper__tools-item" @tap="rotateImage">
						<cl-icon name="refresh" :size="30"></cl-icon>
						<text>旋转</text>
					</view>
				</view>

				<!-- 遮罩层 -->
				<view class="cl-cropper__mask"></view>
			</view>

			<view class="cl-cropper__footer">
				<button @tap="cancel">取消</button>
				<button @tap="confirm">确认</button>
			</view>
		</view>

		<!-- Canvas -->
		<canvas
			id="canvas"
			canvas-id="canvas"
			class="cl-cropper__canvas"
			:style="[cropStyle]"
		></canvas>

		<!-- Loading -->
		<cl-loading-mask fullscreen :loading="loading"></cl-loading-mask>
		<!-- Toast -->
		<cl-toast ref="toast"></cl-toast>
	</view>
</template>

<script>
const { windowWidth, windowHeight, pixelRatio } = uni.getSystemInfoSync();

/**
 * cropper 图片裁剪
 * @description 支持圆形,方形,背景高斯模糊
 * @tutorial https://docs.cool-js.com/uni/components/advanced/cropper.html
 * @property {String} url 图片地址
 * @property {Number} imageWidth 图片宽度，默认320
 * @property {Number} cropHeight 裁剪高度，默认200
 * @property {Number} cropWidth 裁剪宽度，默认200
 * @property {String} backgroundColor 底色
 * @property {Boolean} round 是否圆形
 * @property {Boolean} filterBlur 高斯模糊
 * @event {Function} success 裁剪成功时触发
 * @event {Function} error 裁剪失败时触发
 * @example 见教程
 */

export default {
	name: "cl-cropper",

	props: {
		// 图片地址
		url: String,
		// 图片宽度
		imageWidth: {
			type: Number,
			default: 320,
		},
		// 裁剪高度
		cropHeight: {
			type: Number,
			default: 200,
		},
		// 裁剪宽度
		cropWidth: {
			type: Number,
			default: 200,
		},
		// 底色
		backgroundColor: String,
		// 是否圆形
		round: Boolean,
		// 高斯模糊
		filterBlur: Boolean,
	},

	data() {
		return {
			visible: false,
			loading: false,
			lock: false,
			image: {
				height: "",
				width: "",
				left: 0,
				top: 0,
				scale: 1,
				rotate: 0,
				url: "",
			},
			crop: {
				height: this.cropHeight,
				width: this.cropWidth,
				left: 0,
				top: 0,
			},
			start: {
				x: 0,
				y: 0,
				hyp: 0,
				scale: 1,
			},
		};
	},

	computed: {
		imageSize() {
			return {
				height: `${this.image.height}px`,
				width: `${this.image.width}px`,
			};
		},

		cropStyle() {
			return {
				height: `${this.crop.height}px`,
				width: `${this.crop.width}px`,
				backgroundColor: this.backgroundColor,
			};
		},

		imageTransform() {
			let { scale, rotate, left, top } = this.image;

			return {
				transform: `scale(${scale}, ${scale}) translate3d(${left / scale}px, ${
					top / scale
				}px, 0) rotateZ(${rotate}deg)`,
			};
		},

		cropTransform() {
			let { scale, rotate, left, top } = this.image;

			return {
				transform: `scale(${scale}, ${scale}) translate(${
					(left - this.crop.left) / scale
				}px, ${(top - this.crop.top) / scale}px) rotateZ(${rotate}deg)`,
			};
		},
	},

	methods: {
		open() {
			this.visible = true;

			this.$nextTick(() => {
				if (this.url) {
					this.setImage(this.url);
				}
			});
		},

		close() {
			this.visible = false;
			this.loading = false;
			this.image.rotate = 0;
			this.image.scale = 1;
			this.image.url = "";
		},

		setImage(url) {
			this.image.url = url;

			uni.getImageInfo({
				src: this.image.url,
				success: (res) => {
					// 图片大小位置
					this.image.width = this.imageWidth * this.image.scale;
					this.image.height = (this.image.width / res.width) * res.height;
					this.image.left = (windowWidth - this.image.width) / 2;
					this.image.top = (windowHeight - this.image.height) / 2;

					// 裁剪框的位置
					this.crop.left = (windowWidth - this.crop.width) / 2;
					this.crop.top = (windowHeight - this.crop.height) / 2;
				},
			});
		},

		chooseImage() {
			uni.chooseImage({
				success: (res) => {
					this.image.rotate = 0;
					this.image.scale = 1;
					this.setImage(res.tempFilePaths[0]);
				},
			});
		},

		rotateImage() {
			this.image.rotate += 90;

			if (this.image.rotate >= 360) {
				this.image.rotate = 0;
			}
		},

		confirm() {
			const ctx = uni.createCanvasContext("canvas", this);

			// 图片信息
			let { url, height, width, scale, rotate, left, top } = this.image;

			if (!url) {
				return this.$refs["toast"].open("请先选择图片");
			}

			// 加载动画
			this.loading = true;

			// 画布大小
			let h = height * scale;
			let w = width * scale;

			// 图片位置
			let x = this.crop.left - left - (width - w) / 2;
			let y = this.crop.top - top - (height - h) / 2;

			// 填充底色
			if (this.backgroundColor) {
				ctx.setFillStyle(this.backgroundColor);
			}

			// 旋转
			ctx.rotate((rotate * Math.PI) / 180);

			// 设置大小
			ctx.fillRect(0, 0, w, h);
			ctx.save();

			// 画圆
			if (this.round) {
				switch (rotate) {
					case 90:
						ctx.arc(100, -100, 100, 0, 2 * Math.PI);
						break;
					case 180:
						ctx.arc(-100, -100, 100, 0, 2 * Math.PI);
						break;
					case 270:
						ctx.arc(-100, 100, 100, 0, 2 * Math.PI);
						break;
					default:
						ctx.arc(100, 100, 100, 0, 2 * Math.PI);
						break;
				}
				ctx.arc(100, 100, 100, 0, 2 * Math.PI);

				ctx.fill();
				ctx.clip();
			}

			// 绘图
			switch (rotate) {
				case 90:
					x += (h - w) / 2;
					y -= (h - w) / 2;
					ctx.drawImage(url, -y, x, w, -h);
					break;
				case 180:
					ctx.drawImage(url, x, y, -w, -h);
					break;
				case 270:
					x += (h - w) / 2;
					y -= (h - w) / 2;
					ctx.drawImage(url, y, -x, -w, h);
					break;
				default:
					ctx.drawImage(url, -x, -y, w, h);
					break;
			}

			ctx.restore();

			ctx.draw(false, () => {
				// 导出base64
				uni.canvasToTempFilePath(
					{
						canvasId: "canvas",
						destWidth: this.crop.width * pixelRatio,
						destHeight: this.crop.height * pixelRatio,
						success: (res) => {
							this.$emit("success", res.tempFilePath);
							this.close();
						},
						fail: (e) => {
							this.loading = false;
							this.$refs.toast.open(e.errMsg);
							this.$emit("fail", e.errMsg);
						},
					},
					this
				);
			});
		},

		cancel() {
			this.close();
		},

		// 缩放偏移
		getScaleOffset() {
			let { rotate, scale, width, height } = this.image;
			let d = null;
			let x = 0;
			let y = 0;

			if (rotate == 90 || rotate == 270) {
				let r = ((height - width) / 2) * scale + (scale - 1) * 60;

				x = r;
				y = -r;
			} else {
				x = ((scale - 1) * width) / 2;
				y = ((scale - 1) * height) / 2;
			}

			return {
				x,
				y,
			};
		},

		onTouchStart(e) {
			// 加锁
			this.lock = true;

			// 双指放大缩小
			if (e.touches.length >= 2) {
				let x = e.touches[0].pageX - e.touches[1].pageX;
				let y = e.touches[0].pageY - e.touches[1].pageY;

				// 比例
				this.start.scale = this.image.scale;
				// 斜边
				this.start.hyp = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
			}
			// 单指拖动
			else {
				this.start.x = e.touches[0].pageX - this.image.left;
				this.start.y = e.touches[0].pageY - this.image.top;
			}
		},

		onTouchMove(e) {
			if (this.lock) {
				// 双指放大缩小
				if (e.touches.length >= 2) {
					// 计算双指位置
					let x = e.touches[0].pageX - e.touches[1].pageX;
					let y = e.touches[0].pageY - e.touches[1].pageY;

					// 斜边
					let hyp = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

					// 比例
					let scale = this.start.scale + (hyp - this.start.hyp) / 100;

					// 最小
					if (scale < 0.3) {
						scale = 0.3;
					}

					// 最大
					if (scale > 4) {
						scale = 4;
					}

					// 设置比例
					this.image.scale = scale;
				}
				// 单指拖动
				else {
					// 移动位置
					let x = e.touches[0].pageX - this.start.x;
					let y = e.touches[0].pageY - this.start.y;

					// 设置位置
					this.image.left = x;
					this.image.top = y;
				}
			}
		},

		onTouchEnd(e) {
			this.lock = false;
		},
	},
};
</script>
