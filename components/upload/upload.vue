<template>
	<view class="cl-upload-list" :class="[isDisabled]">
		<cl-loading-mask :loading="loading" text="上传图片中"></cl-loading-mask>

		<view
			class="cl-upload"
			v-for="(url, index) in urls"
			:key="index"
			@tap="choose(index)"
			:style="{
				height: size[0],
				width: size[1]
			}"
		>
			<image class="cl-upload__target" v-show="url" :src="url" :mode="imageMode" />
			<text
				class="cl-upload__remove cl-icon-round-close-fill"
				@tap.stop="remove(index)"
			></text>
		</view>

		<view
			v-if="isAppend"
			class="cl-upload"
			:style="{
				height: size[0],
				width: size[1]
			}"
			@tap="choose()"
		>
			<text class="cl-upload__add cl-icon-plus"></text>
		</view>
	</view>
</template>

<script>
import { isArray, isString } from "../../utils";

export default {
	props: {
		value: [String, Array],
		sizeType: {
			type: Array,
			default: () => ["original", "compressed"]
		},
		sourceType: {
			type: Array,
			default: () => ["album", "camera"]
		},
		success: Function,
		fail: Function,
		complete: Function,
		size: {
			type: Array,
			default: () => ["200rpx", "200rpx"]
		},
		imageMode: {
			type: String,
			default: "aspectFill"
		},
		multiple: Boolean,
		limit: {
			type: Number,
			default: 9
		},
		action: String,
		headers: Object,
		data: Object,
		name: {
			type: String,
			default: "file"
		},
		beforeUpload: {
			type: Function
		},
		disabled: Boolean,
		test: {
			type: Boolean,
			default: false
		},
		autoUpload: {
			type: Boolean,
			default: true
		}
	},

	data() {
		return {
			loading: false,
			urls: [],
			index: undefined
		};
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
			}
		},

		urls(val) {
			let d = this.multiple ? val : val[0];
			this.$emit("input", d);
			this.$emit("change", d);
		}
	},

	computed: {
		isAppend() {
			return this.urls.length < (this.multiple ? this.limit : 1);
		},

		isDisabled() {
			return this.disabled ? "is-disabled" : "";
		}
	},

	methods: {
		choose(index) {
			if (this.disabled) {
				return false;
			}

			this.index = index;

			let count = this.index === undefined ? this.limit - this.urls.length : 1;

			if (count <= 0) {
				this.$emit("exceed", this.urls);
				return false;
			}

			uni.chooseImage({
				count,
				sizeType: this.sizeType,
				sourceType: this.sourceType,
				success: res => {
					// 文件信息
					res.tempFiles.forEach(async file => {
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

						if (this.autoUpload) {
							uni.uploadFile({
								url: this.action,
								filePath: file.path,
								name: this.name,
								header: this.headers,
								formData: this.data,
								success: res => {
									const { data } = JSON.parse(res.data);
									this.update(data);
									this.$emit("success", data);
								},
								fail: err => {
									this.$emit("error", err);
								},
								complete: () => {
									this.done();
								}
							});
						} else {
							this.$emit("custom-upload", file);
						}
					});
				}
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
		}
	}
};
</script>
