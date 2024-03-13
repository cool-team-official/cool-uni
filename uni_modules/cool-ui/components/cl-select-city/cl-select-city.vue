<template>
	<view class="cl-select-city" @tap="open">
		<slot :value="modelValue" :label="text" :selection="selection">
			<cl-select-inner
				:height="height"
				:placeholder="placeholder"
				:disabled="disabled"
				:border="border"
				:round="round"
				:backgroundColor="backgroundColor"
				:borderRadius="borderRadius"
				:padding="padding"
				:text="text"
			/>
		</slot>
	</view>

	<!-- 弹出框 -->
	<cl-select-popup
		:ref="setRefs('popup')"
		:title="title"
		:show-picker="false"
		:show-footer="false"
		scroller-height="70vh"
	>
		<template #list>
			<view class="cl-select-city__wrap">
				<view class="cl-select-city__tabs">
					<cl-tag
						v-for="(item, index) in tabs"
						:key="index"
						round
						:type="active == index ? 'primary' : 'info'"
						:margin="[0, 20, 20, 0]"
						@tap="toActive(index)"
					>
						{{ item?.[labelKey] || "请选择" }}
					</cl-tag>
				</view>

				<view class="cl-select-city__list">
					<swiper :current="active" @change="onActiveChange">
						<swiper-item v-for="(item, index) in list" :key="cache.list[index]">
							<cl-list-index
								:data="item"
								:search-bar="false"
								:dict="{ id: valueKey }"
								:delay="500"
							>
								<template #item="{ item }">
									<view
										class="cl-select-city__item"
										:class="{
											'is-active': item[valueKey] == value[index],
										}"
										@tap="select(item, index)"
									>
										<text class="cl-icon-toast-success" />
										<text>{{ item[labelKey] }}</text>
									</view>
								</template>
							</cl-list-index>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</template>

		<template #confirm></template>
	</cl-select-popup>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive, ref, watch, type PropType } from "vue";
import { useRefs } from "/@/cool";
import { cloneDeep, isEmpty } from "lodash-es";
import { Props } from "../cl-select-inner/config";
import { uuid } from "/@/cool/utils";

import CityPca from "../../data/city-pca.json";
// 省市区其他数据来源 https://github.com/modood/Administrative-divisions-of-China

interface Item {
	name: string;
	code: String;
	children?: Item[];
	[key: string]: any;
}

export default defineComponent({
	name: "cl-select-city",

	props: {
		...Props,

		data: {
			type: Array as PropType<Item[]>,
			default: CityPca,
		},

		// 绑定值
		modelValue: Array as PropType<any[]>,
		// 标题
		title: {
			type: String,
			default: "请选择所在地区",
		},
		// 显示关键字
		labelKey: {
			type: String,
			default: "name",
		},
		// 值关键字
		valueKey: {
			type: String,
			default: "name",
		},
		// 占位文本
		placeholder: {
			type: String,
			default: "请选择所在地区",
		},
		// 分隔符
		separator: {
			type: String,
			default: " - ",
		},
	},

	emits: ["update:modelValue", "change"],

	setup(props, { emit }) {
		const { refs, setRefs } = useRefs();

		// picker 绑定值
		const value = ref<any[]>([]);

		// 第几个块
		const active = ref(0);

		// 各个列表
		const list = computed<Item[][]>(() => {
			let arr = props.data;

			const ots = value.value.map((a) => {
				const d = arr.find((b) => b[props.valueKey] == a);

				if (d) {
					arr = d.children || [];
					return arr;
				} else {
					return [];
				}
			});

			return [props.data, ...ots].filter((e) => !isEmpty(e));
		});

		// 选项卡
		const tabs = computed(() => {
			return value.value.map((a, i) => {
				return list.value[i].find((b) => b[props.valueKey] == a)!;
			});
		});

		// 已选
		const selection = ref<Item[]>([]);

		// 显示文本
		const text = computed(() => {
			return selection.value.map((e) => e?.[props.labelKey]).join(props.separator);
		});

		// 设置值
		function setData(val?: any[]) {
			value.value = cloneDeep(val || props.modelValue || []);

			// 默认值
			if (isEmpty(value.value) || value.value.find((e) => !e)) {
				value.value = [""];
				active.value = 0;
			}

			// 设置已选
			selection.value = tabs.value.filter(Boolean).map((e) => {
				return {
					...e,
					children: undefined,
				};
			});
		}

		// 缓存，重新渲染 list-index
		const cache = reactive({
			list: [] as string[],

			create() {
				cache.list = value.value.map(uuid);
			},

			update() {
				value.value.forEach((e, i) => {
					if (!e) {
						cache.list.splice(i, 99);
						cache.list[i] = uuid();
					}
				});
			},
		});

		// 打开
		function open() {
			// 打开弹窗
			refs.popup.open();

			// 设置值
			setData();

			// 创建缓存
			cache.create();
		}

		// 关闭
		function close() {
			refs.popup.close();
		}

		// 保存
		function confirm() {
			emit("update:modelValue", value.value);
			emit("change", value.value);
			close();
		}

		// 选择
		function select(item: Item, index: number) {
			// 编辑值，清空后几个
			if (value.value[index]) {
				value.value.splice(index, 99);
			}

			// 设置值
			value.value[index] = item[props.valueKey];

			// 当前选择块
			const d = list.value[index].find((e) => e[props.valueKey] == value.value[index]);

			if (isEmpty(d?.children)) {
				// 最后一个直接完成
				confirm();
			} else {
				// 添加一块
				value.value.push("");

				// 更新缓存
				cache.update();

				// swiper 滚动
				nextTick(() => {
					active.value += 1;
				});
			}
		}

		// 监听块滚动
		function onActiveChange(e: { detail: { current: number } }) {
			// 设置序号
			active.value = e.detail.current;
		}

		// 滚动到指定块
		function toActive(index?: number) {
			if (index !== undefined) {
				active.value = index;
			} else {
				active.value = value.value.length;
			}
		}

		// 监听值
		watch(() => props.modelValue, setData, {
			immediate: true,
			deep: true,
		});

		return {
			refs,
			setRefs,
			list,
			value,
			cache,
			text,
			tabs,
			selection,
			confirm,
			open,
			close,
			select,
			onActiveChange,
			active,
			toActive,
		};
	},
});
</script>
