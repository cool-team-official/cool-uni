<template>
	<view
		class="cl-upload-list"
		:class="[
			{
				'is-disabled': isDisabled,
			},
		]"
	>
		<!-- 上传列表 -->
		<view
			class="cl-upload"
			v-for="(item, index) in list"
			:key="item.uid"
			@tap="choose(index)"
			:style="{
				height: parseRpx(size[0]),
				width: parseRpx(size[1]),
			}"
		>
			<!-- 图片 -->
			<image class="cl-upload__target" v-show="item.url" :src="item.url" :mode="imageMode" />

			<!-- 移除 -->
			<text
				class="cl-upload__remove cl-icon-toast-error"
				@tap.stop="remove(index)"
				v-if="!isDisabled"
			></text>

			<!-- 进度 -->
			<view class="cl-upload__progress" v-if="item.progress < 100">
				<cl-progress :value="item.progress" :show-text="false"></cl-progress>
			</view>
		</view>

		<!-- 添加按钮 -->
		<view
			v-if="isAppend"
			class="cl-upload"
			:style="{
				height: parseRpx(size[0]),
				width: parseRpx(size[1]),
			}"
			@tap="choose()"
		>
			<slot>
				<view class="cl-upload__demo">
					<text class="cl-icon-camera-fill"></text>
					<text class="text">{{ text }}</text>
				</view>
			</slot>
		</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import type { PropType } from "vue";
import { parseRpx, uuid } from "/@/cool/utils";
import { isArray } from "lodash-es";
import { upload } from "/@/cool";
import { useForm } from "../../hook";

/**
 * @description 图片上传，支持单图和多图
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
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} autoUpload 是否自动上传
 * @event {Function} success 上传成功时触发，function(response)
 * @event {Function} error 上传失败时触发，function(error)
 * @event {Function} upload 自定义上传时触发，function(file)
 * @event {Function} remove 移除时触发，function(index)
 * @example <cl-upload action="http://" />
 */

export default defineComponent({
	name: "cl-upload",

	props: {
		modelValue: [String, Array],
		text: {
			type: String,
			default: "上传/拍摄",
		},
		sizeType: {
			type: [String, Array] as PropType<string[] | string>,
			default: () => ["original", "compressed"],
		},
		sourceType: {
			type: Array as PropType<string[]>,
			default: () => ["album", "camera"],
		},
		size: {
			type: Array,
			default: () => [200, 200],
		},
		imageMode: {
			type: String,
			default: "aspectFill",
		},
		multiple: Boolean,
		limit: {
			type: Number,
			default: 9,
		},
		action: String,
		headers: Object,
		data: Object,
		name: {
			type: String,
			default: "file",
		},
		disabled: {
			type: Boolean,
			default: null,
		},
		autoUpload: {
			type: Boolean,
			default: true,
		},
	},

	emits: [
		"update:modelValue",
		"change",
		"exceed",
		"success",
		"error",
		"upload",
		"remove",
		"progress",
	],

	setup(props, { emit }) {
		const { disabled } = useForm();

		// 图片列表
		const list = ref<any[]>([]);

		// 下标
		const index = ref();

		// 是否禁用
		const isDisabled = computed(() => disabled.value || props.disabled);

		// 监听值
		watch(
			() => props.modelValue,
			(val: any) => {
				if (val) {
					const _list = list.value;
					const arr: string[] = isArray(val) ? val : val.split(",");

					list.value = arr
						.map((e: string) => {
							const d = _list.find((a) => a.url == e);

							return {
								uid: d ? d.uid : uuid(),
								url: e,
								progress: 100,
							};
						})
						.filter((e) => e.url);
				}
			},
			{
				immediate: true,
			}
		);

		// 能否追加
		const isAppend = computed(() => {
			const n = list.value.length;

			if (isDisabled.value) {
				return n == 0;
			} else {
				return n < (props.multiple ? props.limit : 1);
			}
		});

		// 选择
		function choose(i?: number) {
			if (isDisabled.value) {
				return false;
			}

			index.value = i;

			// 可选数量
			const count = index.value === undefined ? props.limit - list.value.length : 1;

			// 可选数量验证
			if (count <= 0) {
				emit("exceed", list.value);
				return false;
			}

			uni.chooseImage({
				sizeType: props.sizeType,
				sourceType: props.sourceType,
				count,
				success(res: any) {
					// 文件信息
					res.tempFiles.forEach(async (file: any) => {
						// 预览
						const uid = append(file.path);

						// 成功
						function done(url: string) {
							if (url) {
								update(uid, { url, progress: 100 });
								emit("success", url, file);
							} else {
								fail();
							}
						}

						// 失败
						function fail(message: string | any = "图片地址错误") {
							emit("error", message);
							remove(list.value.findIndex((e) => e.uid == uid));
						}

						if (props.action) {
							const task = uni.uploadFile({
								url: props.action || "",
								filePath: file.path,
								name: props.name,
								header: props.headers,
								formData: props.data,
								success: (res: any) => {
									const { data } = JSON.parse(res.data);
									done(data);
								},
								fail,
							});

							task.onProgressUpdate((res) => {
								emit("progress", res);
							});
						} else {
							if (props.autoUpload) {
								// 自动上传
								upload(file, {
									onProgressUpdate: ({ progress }: any) => {
										update(uid, { progress });
									},
								})
									.then(done)
									.catch(fail);
							} else {
								// 自定义上传
								emit("upload", { file, done, fail, update, uid });
							}
						}
					});
				},
			});
		}

		// 添加
		function append(url: string) {
			let d: any = {};

			if (index.value !== undefined) {
				d = list.value[index.value];
				d.progress = 0;
				d.url = url;
			} else {
				d = {
					uid: uuid(),
					url,
					progress: 0,
				};

				list.value.push(d);
			}

			return d.uid;
		}

		// 更新
		function update(uid: string, data?: any) {
			const d = list.value.find((e) => e.uid == uid);

			if (d) {
				Object.assign(d, data);

				if (d.progress == 100) {
					change();
				}
			}
		}

		// 移除
		function remove(index: number) {
			if (disabled.value) {
				return false;
			}

			list.value.splice(index, 1);
			emit("remove", index);
			change();
		}

		// 检测是否上传完成
		function check() {
			return list.value.find((e) => e.progress != 100);
		}

		// 完成
		function change() {
			if (!check()) {
				const v = props.multiple ? list.value.map((e) => e.url) : list.value[0]?.url;

				emit("update:modelValue", v);
				emit("change", v);
			}
		}

		return {
			isDisabled,
			list,
			index,
			isAppend,
			check,
			choose,
			update,
			remove,
			parseRpx,
		};
	},
});
</script>
