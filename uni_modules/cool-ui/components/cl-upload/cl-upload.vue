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
			:style="{
				height: parseRpx(size[0]),
				width: parseRpx(size[1]),
			}"
			@tap="choose(index)"
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
			class="cl-upload"
			:style="{
				height: parseRpx(size[0]),
				width: parseRpx(size[1]),
			}"
			@tap="choose()"
			v-if="isAppend"
		>
			<slot>
				<view class="cl-upload__demo">
					<text class="cl-icon-camera-fill"></text>
					<text class="text" v-if="text">{{ text }}</text>
				</view>
			</slot>
		</view>
	</view>
</template>

<script lang="ts">
import { type PropType, computed, defineComponent, ref, watch } from "vue";
import { parseRpx, uuid } from "/@/cool/utils";
import { isArray } from "lodash-es";
import { upload } from "/@/cool";
import { useForm } from "../../hooks";
import { useI18n } from "vue-i18n";
import { t } from "/@/locale";

export default defineComponent({
	name: "cl-upload",

	props: {
		// 绑定值
		modelValue: [String, Array],
		// 文本
		text: {
			type: String,
			default: t("上传/拍摄"),
		},
		// 压缩方式
		sizeType: {
			type: [String, Array] as PropType<string[] | string>,
			default: () => ["original", "compressed"],
		},
		// 选择方式
		sourceType: {
			type: Array as PropType<string[]>,
			default: () => ["album", "camera"],
		},
		// 大小
		size: {
			type: Array,
			default: () => [200, 200],
		},
		// 裁剪模式
		imageMode: {
			type: String,
			default: "aspectFill",
		},
		// 是否多选
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
		// 是否禁用
		disabled: {
			type: Boolean,
			default: null,
		},
		// 是否自动上传
		autoUpload: {
			type: Boolean,
			default: true,
		},

		// 演示下测试使用
		test: Boolean,
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
		const { t } = useI18n();
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
				} else {
					list.value = [];
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
						function fail(message: string | any = t("图片地址错误")) {
							emit("error", message);
							remove(list.value.findIndex((e) => e.uid == uid));
						}

						if (props.test) {
							return done(file.path);
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
