<template>
	<view class="cl-list-index">
		<!-- 搜索栏 -->
		<view class="cl-list-index__search">
			<cl-input
				v-model="keyWord"
				:border="false"
				round
				:placeholder="placeholder"
				background-color="#f6f7fa"
				clearable
			>
				<template #prepend>
					<text class="cl-icon-search"></text>
				</template>
			</cl-input>
		</view>

		<view class="cl-list-index__container">
			<!-- 滚动视图 -->
			<scroll-view
				class="cl-list-index__scroller"
				scroll-y
				enable-back-to-top
				scroll-with-animation
				:scroll-into-view="`index-${label}`"
				@scroll="onScroll"
			>
				<!-- 追加内容到头部 -->
				<slot name="prepend"></slot>

				<!-- 分组数据 -->
				<view
					class="group"
					v-for="(item, index) in flist"
					:key="index"
					:id="`index-${item.label}`"
				>
					<!-- 关键字 -->
					<view
						class="header"
						:class="{
							'is-active': curr.label == item.label,
						}"
					>
						<slot name="header" :item="item" :isActive="curr.label == item.label">
							<text>{{ item.label }}</text>
						</slot>
					</view>

					<!-- 数据列表 -->
					<view class="container">
						<view v-for="(item2, index2) in item.children" :key="index2">
							<slot
								name="item"
								:item="item2"
								:index="index2"
								:group="item"
								:isActive="curr.label == item.label"
							>
								<view
									class="item"
									:class="{
										'is-disabled': item2.disabled,
									}"
									@tap="onSelect(item2)"
								>
									<cl-checkbox
										:model-value="isChecked(item2)"
										:disabled="item2.disabled"
										round
										v-if="selectable"
									></cl-checkbox>

									<view class="avatar">
										<cl-avatar :src="item2[dict.avatar]"></cl-avatar>
									</view>

									<view class="text">
										{{ item2[dict.name] }}
									</view>
								</view>
							</slot>
						</view>
					</view>
				</view>

				<!-- 追加内容到尾部 -->
				<slot name="append"></slot>
			</scroll-view>
		</view>

		<!-- 索引栏 -->
		<view class="cl-list-index__bar" v-if="indexBar">
			<view class="list" @touchmove.stop.prevent="barMove" @touchend="barEnd">
				<view
					class="block"
					:class="{
						'is-active': curr.label == item.label,
					}"
					v-for="(item, index) in flist"
					:key="index"
					:id="`${index}`"
					@touchstart.stop.prevent="toRow(item)"
				>
					<text>{{ item.label }}</text>
				</view>
			</view>
		</view>

		<!-- 索引关键字 -->
		<view class="cl-list-index__alert" v-show="alert">{{ curr.label }}</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive, ref, watch } from "vue";
import type { PropType } from "vue";
import py from "js-pinyin";
import { groupBy, isEmpty } from "lodash-es";

export default defineComponent({
	name: "cl-list-index",

	props: {
		data: {
			type: Array as PropType<ClListIndex.Group>,
			required: true,
			default: () => [],
		},
		dict: Object,
		selectable: Boolean,
		selection: {
			type: Array,
			default: () => [],
		},
		isGroup: {
			type: Boolean,
			default: true,
		},
		indexBar: {
			type: Boolean,
			default: true,
		},
		placeholder: {
			type: String,
			default: "搜索关键字",
		},
	},

	emits: ["select", "selection-change", "update:selection"],

	setup(props, { emit }) {
		// 列表
		const list = ref<ClListIndex.Group>([]);

		// 已选列表
		const selection = ref<any[]>([]);

		// 字典
		const dict = reactive<ClListIndex.Dict>({
			id: "id",
			avatar: "avatar",
			name: "name",
			...props.dict,
		});

		// 关键字
		const keyWord = ref("");

		// 标签
		const label = ref("");

		// 提示框
		const alert = ref(false);

		// 当前选择
		const curr = ref<any>({});

		// 条
		const bar = reactive({
			top: 0,
			itemH: 0,
		});

		// 每项距离顶部的高度
		const tops = ref<any[]>([]);

		// 过滤列表
		const flist = computed<any[]>(() => {
			function match(e: any) {
				return e
					? (e[dict.name] || "").toLowerCase().includes(keyWord.value.toLowerCase())
					: false;
			}

			return list.value
				.filter((e) => e.children && e.children.find(match))
				.map((e) => {
					return {
						...e,
						children: e.children.filter(match),
					};
				});
		});

		// 监听滚动
		function onScroll(e: any) {
			let top = e.detail.scrollTop;
			let num = tops.value.filter((e) => top >= e - 60).length - 1;

			if (num < 0) {
				num = 0;
			}

			curr.value = list.value[num];
		}

		// 定位到某行
		function toRow(item: any) {
			alert.value = true;
			curr.value = item;
		}

		// 选择行
		function onSelect(item: any) {
			if (item.disabled) {
				return false;
			}

			if (props.selectable) {
				const index = selection.value.findIndex((e) => e[dict.id] == item[dict.id]);

				if (index < 0) {
					selection.value.push(item);
				} else {
					selection.value.splice(index, 1);
				}

				emit("selection-change", selection.value);
				emit("update:selection", selection.value);
			} else {
				emit("select", item);
			}
		}

		// 移动
		function barMove(e: any) {
			const max = list.value.length;
			let index = parseInt(String((e.touches[0].clientY - bar.top) / bar.itemH));

			if (index >= max) {
				index = max - 1;
			}

			if (index < 0) {
				index = 0;
			}

			curr.value = list.value[index];
		}

		// 离开
		function barEnd() {
			label.value = curr.value.label;
			alert.value = false;
		}

		// 整理布局
		function doLayout() {
			nextTick(() => {
				// 获取索引栏大小
				uni.createSelectorQuery()
					.select(".cl-list-index__bar .list")
					.boundingClientRect((res: any) => {
						if (res) {
							bar.top = res.top;
							bar.itemH = res.height / list.value.length;
						}
					})
					.exec();

				// 获取当前距离顶部的高度
				uni.createSelectorQuery()
					.select(".cl-list-index")
					.boundingClientRect((res: any) => {
						// 获取每项距离顶部的高度
						uni.createSelectorQuery()
							.selectAll(".header")
							.fields(
								{
									rect: true,
								},
								() => {}
							)
							.exec((d) => {
								tops.value = d[0].map((e: any) => e.top - res.top);
							});
					})
					.exec();
			});
		}

		// 是否选中
		function isChecked(item: any) {
			return Boolean(selection.value.find((e) => e.id == item.id));
		}

		// 更新行数据
		function updateRow(id: string | number, value: any) {
			list.value.forEach((a) => {
				if (a.children) {
					const d = a.children.find((e) => e[dict.id] == id);

					if (d) {
						Object.assign(d, value);
					}
				}
			});
		}

		// 刷新
		function refresh() {
			if (isEmpty(props.data)) {
				return false;
			}

			// 是否分组
			if (!props.isGroup) {
				list.value = props.data;
				return false;
			}

			// 传入列表数据
			const data = props.data.map((e: any) => {
				return {
					f: py.getCamelChars(e[dict.name] || "*")[0],
					...e,
				};
			});

			// 数据分组
			const group = [];
			const g = groupBy(data, "f");

			for (const i in g) {
				group.push({
					label: i,
					children: g[i],
				});
			}

			list.value = group.sort((a, b) => {
				const n1 = a.label.toUpperCase();
				const n2 = b.label.toUpperCase();

				if (n1 < n2) {
					return -1;
				}

				if (n1 > n2) {
					return 1;
				}

				return 0;
			});

			// 重组
			doLayout();
		}

		// 监听列表数据变化
		watch(() => props.data, refresh, {
			immediate: true,
		});

		// 监听选择数据变化
		watch(
			() => props.selection,
			(val) => {
				selection.value = [...val];

				// 更新列表数据
				selection.value.forEach((e) => {
					updateRow(e[dict.id], e);
				});
			},
			{
				immediate: true,
			}
		);

		return {
			dict,
			list,
			keyWord,
			label,
			alert,
			curr,
			bar,
			flist,
			refresh,
			doLayout,
			barEnd,
			barMove,
			toRow,
			onScroll,
			onSelect,
			isChecked,
			updateRow,
		};
	},
});
</script>
