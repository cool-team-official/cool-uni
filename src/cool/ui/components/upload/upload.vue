<template>
	<view class="cl-upload-list" :class="[isDisabled]">
		<cl-loading-mask :loading="loading" text="上传图片中"></cl-loading-mask>
		<cl-toast ref="toast"></cl-toast>

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
			<image class="cl-upload__target" v-show="url" :src="url" :mode="imageMode"></image>
			<text
				class="cl-upload__remove cl-icon-round-close-fill"
				@tap.stop="remove(index)"
			></text>
		</view>

		<view
			v-show="isAppend"
			class="cl-upload"
			@tap="choose()"
			:style="{
				height: size[0],
				width: size[1]
			}"
		>
			<text class="cl-upload__add cl-icon-add"></text>
		</view>
	</view>
</template>

<script>
import { isArray, isString } from '../../utils';

export default {
	props: {
		value: [String, Array],
		count: {
			type: Number,
			default: 9
		},
		sizeType: {
			type: Array,
			default: () => ['original', 'compressed']
		},
		sourceType: {
			type: Array,
			default: () => ['album', 'camera']
		},
		success: Function,
		fail: Function,
		complete: Function,
		size: {
			type: Array,
			default: () => ['200rpx', '200rpx']
		},
		imageMode: {
			type: String,
			default: 'aspectFill'
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
			default: 'file'
		},
		beforeUpload: {
			type: Function
		},
		disabled: Boolean,
		test: {
			type: Boolean,
			default: true
		}
	},

	data() {
		return {
			loading: false,
			urls: []
		};
	},

	watch: {
		value: {
			immediate: true,
			handler() {
				this.urls = isArray(this.value)
					? this.value
					: isString(this.value)
					? this.value.split(',').filter(Boolean)
					: [];
			}
		},

		urls(val) {
			let data = this.multiple ? val : val[0];
			this.$emit('input', data);
			this.$emit('change', data);
			data = null;
		}
	},

	computed: {
		isAppend() {
			return this.urls.length < (this.multiple ? this.limit : 1);
		},

		isDisabled() {
			return this.disabled ? 'is-disabled' : '';
		}
	},

	methods: {
		choose(index) {
			let isAppend = index === undefined;

			if (this.disabled) {
				return false;
			}

			uni.chooseImage({
				count: isAppend ? this.count : 1,
				sizeType: this.sizeType,
				sourceType: this.sourceType,
				success: async res => {
					// 文件信息
					const file = res.tempFiles[0];

					// 进度
					this.loading = true;

					// 上传前验证
					if (this.beforeUpload) {
						const valid = await this.beforeUpload(file, index);

						if (valid === false) {
							return (this.loading = false);
						}
					}

					// 测试
					if (this.test) {
						if (isAppend) {
							this.urls.push(file.path);
						} else {
							this.urls[index] = file.path;
						}

						return (this.loading = false);
					}

					// 上传
					uni.uploadFile({
						url: this.action,
						filePath: file.path,
						name: this.name,
						header: this.headers,
						formData: this.data,
						success: res => {
							try {
								const { data } = JSON.parse(res.data);

								if (isAppend) {
									this.urls.push(data);
								} else {
									this.urls[index] = data;
								}

								isAppend = null;
							} catch (err) {
								console.error(err);
								this.$refs['toast'].open('上传失败，格式异常');
							}
						},
						fail: err => {
							this.$refs['toast'].open(err);
						},
						complete: () => {
							this.loading = false;
						}
					});
				}
			});
		},

		remove(index) {
			if (this.disabled) {
				return false;
			}

			this.urls.splice(index, 1);
		}
	}
};
</script>
