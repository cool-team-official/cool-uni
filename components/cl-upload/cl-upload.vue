<template>
	<view class="cl-upload-list" :class="[classList]">
		<!-- 加载框 -->
		<cl-loading-mask :loading="loading" text="上传图片中"></cl-loading-mask>

		<!-- 上传列表 -->
		<view
			class="cl-upload"
			v-for="(url, index) in urls"
			:key="index"
			@tap="choose(index)"
			:style="{
				height: size[0],
				width: size[1],
			}"
		>
			<image class="cl-upload__target" v-show="url" :src="url | format" :mode="imageMode" />
			<text class="cl-upload__remove cl-icon-delete-fill" @tap.stop="remove(index)"></text>
		</view>

		<!-- 添加按钮 -->
		<view
			v-if="isAppend"
			class="cl-upload"
			:style="{
				height: size[0],
				width: size[1],
			}"
			@tap="choose()"
		>
			<text class="cl-upload__add cl-icon-plus"></text>
		</view>
	</view>
</template>

<script>
import { isArray, isString } from "../../utils";
import Form from "../../mixins/form";

/**
 * upload 图片上传
 * @description 图片上传，支持单图和多图
 * @tutorial https://docs.cool-js.com/uni/components/form/upload.html
 * @property {String, Array} value 绑定值，图片链接
 * @property {String} sizeType 压缩方式，original | compressed
 * @property {String} sourceType 选择方式，album | camera
 * @property {Array} size 图片大小，默认["200rpx", "200rpx"]
 * @property {String} imageMode 图片裁剪、缩放模式，默认aspectFill
 * @property {Boolean} multiple 是否支持多选文件
 * @property {Number} limit 最大允许上传个数，默认9
 * @property {String} action 上传的地址
 * @property {Object} headers 设置上传的请求头部
 * @property {Object} data 上传时附带的额外参数
 * @property {String} name 上传的文件字段名，默认file
 * @property {Function} beforeUpload 上传前钩子
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} autoUpload 是否自动上传
 * @event {Function} success 上传成功时触发，function(response)
 * @event {Function} error 上传失败时触发，function(error)
 * @event {Function} custom-upload 自定义上传时触发，function(file)
 * @event {Function} remove 移除时触发，function(index)
 * @example <cl-upload action="http://" />
 */

export default {
	name: "cl-upload",

	props: {
		// 绑定值，图片链接
		value: [String, Array],
		// 压缩方式
		sizeType: {
			type: Array,
			default: () => ["original", "compressed"],
		},
		// 选择方式
		sourceType: {
			type: Array,
			default: () => ["album", "camera"],
		},
		// 图片大小
		size: {
			type: Array,
			default: () => ["200rpx", "200rpx"],
		},
		// 图片裁剪、缩放模式
		imageMode: {
			type: String,
			default: "aspectFill",
		},
		// 是否支持多选文件
		multiple: Boolean,
		// 最大允许上传个数
		limit: {
			type: Number,
			default: 9,
		},
		// 上传的地址
		action: String,
		// 设置上传的请求头部
		headers: Object,
		// 上传时附带的额外参数
		data: Object,
		// 上传的文件字段名
		name: {
			type: String,
			default: "file",
		},
		// 上传前钩子
		beforeUpload: {
			type: Function,
		},
		// 是否禁用
		disabled: Boolean,
		test: {
			type: Boolean,
			default: false,
		},
		// 是否自动上传
		autoUpload: {
			type: Boolean,
			default: true,
		},
	},

	mixins: [Form],

	data() {
		return {
			loading: false,
			urls: [],
			index: undefined,
		};
	},

	filters: {
		format(url) {
			return url.replace(/\\/g, "");
		},
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.urls = isArray(val)
					? val
					: isString(val)
					? val.split(",").filter(Boolean)
					: [];
			},
		},

		urls(val) {
			let d = this.multiple ? val : val[0];
			this.$emit("input", d);
			this.$emit("change", d);
		},
	},

	computed: {
		isAppend() {
			return this.urls.length < (this.multiple ? this.limit : 1);
		},

		classList() {
			let list = [];

			if (this.isDisabled) {
				list.push("is-disabled");
			}

			return list.join(" ");
		},
	},

	methods: {
		choose(index) {
			if (this.isDisabled) {
				return false;
			}

			this.index = index;

			// 可选数量
			let count = this.index === undefined ? this.limit - this.urls.length : 1;

			// 可选数量验证
			if (count <= 0) {
				this.$emit("exceed", this.urls);
				return false;
			}

			uni.chooseImage({
				count,
				sizeType: this.sizeType,
				sourceType: this.sourceType,
				success: (res) => {
					// 文件信息
					res.tempFiles.forEach(async (file) => {
						// 进度
						this.loading = true;

						// 上传前验证
						if (this.beforeUpload) {
							const valid = await this.beforeUpload(file, index);

							if (valid === false) {
								this.done();
								return;
							}
						}

						// 测试
						if (this.test) {
							this.update(file.path);
							this.done();
							return;
						}

						// 自动上传
						if (this.autoUpload) {
							uni.uploadFile({
								url: this.action,
								filePath: file.path,
								name: this.name,
								header: this.headers,
								formData: this.data,
								success: (res) => {
									const { data } = JSON.parse(res.data);
									this.update(data);
									this.$emit("success", data);
								},
								fail: (err) => {
									this.$emit("error", err);
								},
								complete: () => {
									this.done();
								},
							});
						} else {
							// 自定义上传
							this.$emit("custom-upload", file);
						}
					});
				},
			});
		},

		update(url) {
			if (this.index !== undefined) {
				this.urls[this.index] = url;
			} else {
				this.urls.push(url);
			}

			this.done();
		},

		remove(index) {
			if (this.disabled) {
				return false;
			}

			this.urls.splice(index, 1);
			this.$emit("remove", index);
		},

		done() {
			this.loading = false;
		},
	},
};
</script>
