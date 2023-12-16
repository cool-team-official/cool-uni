<template>
	<view class="cl-select-date" @tap="open">
		<slot :value="modelValue" :label="modelValue">
			<cl-select-inner
				:height="height"
				:placeholder="placeholder"
				:disabled="disabled"
				:border="border"
				:round="round"
				:backgroundColor="backgroundColor"
				:borderRadius="borderRadius"
				arrowIcon="cl-icon-time"
				:padding="padding"
				:text="modelValue"
			>
			</cl-select-inner>
		</slot>
	</view>

	<!-- 弹出框 -->
	<cl-select-popup :ref="setRefs('popup')" :title="title" :show-picker="false">
		<template #list>
			<view class="cl-select-date__wrap">
				<picker-view :value="value" @change="onChange" class="cl-select-date__picker">
					<picker-view-column v-for="(c, ci) in columns" :key="ci">
						<view
							class="cl-select-date__picker-item"
							v-for="(item, index) in c.list"
							:key="index"
						>
							{{ item }}{{ c.unit }}
						</view>
					</picker-view-column>
				</picker-view>
			</view>
		</template>

		<template #confirm>
			<cl-button type="primary" size="large" round fill @tap="confirm">选择</cl-button>
		</template>
	</cl-select-popup>
</template>

<script lang="ts">
import { range } from "lodash-es";
import dayjs from "dayjs";
import { type PropType, computed, defineComponent, ref, nextTick } from "vue";
import { useRefs } from "/@/cool";
import { Props } from "../cl-select-inner/config";

export default defineComponent({
	name: "cl-select-date",

	props: {
		modelValue: String,
		title: {
			type: String,
			default: "选择日期",
		},
		startYear: {
			type: Number,
			default: 2000,
		},
		mode: {
			type: Array as PropType<("year" | "month" | "date" | "hour" | "minute" | "second")[]>,
			default: ["year", "month", "date", "hour", "minute", "second"],
		},
		format: {
			type: String,
			default: "YYYY-MM-DD HH:mm:ss",
		},
		start: String,
		end: String,
		...Props,
		placeholder: {
			type: String,
			default: "请选择时间",
		},
	},

	emits: ["update:modelValue", "change"],

	setup(props, { emit }) {
		const { refs, setRefs } = useRefs();

		// 选中日期
		const date = ref();

		// picker 绑定值
		const value = ref<number[]>([]);

		// 列数据
		const columns = computed(() => {
			const years = range(props.startYear, props.startYear + 50);
			const months = range(1, 13);

			// 当前月多少天
			const ed = dayjs(date.value).endOf("month").date();
			const days = range(1, ed + 1);

			const hours = range(24);
			const minutes = range(60);
			const seconds = range(60);

			// 格式化
			const d = {
				year: {
					list: years,
					unit: "年",
				},
				month: {
					list: months,
					unit: "月",
				},
				date: {
					list: days,
					unit: "日",
				},
				hour: {
					list: hours,
					unit: "时",
				},
				minute: {
					list: minutes,
					unit: "分",
				},
				second: {
					list: seconds,
					unit: "秒",
				},
			};

			return props.mode.map((k) => d[k]);
		});

		// 获取时间
		function getDate(val: string) {
			if (val) {
				// 只有时分秒的时候拼上默认年月日
				if (!["year", "month", "date"].some((e: any) => props.mode.includes(e))) {
					return dayjs().format("YYYY-MM-DD") + " " + val;
				}
			}

			return val;
		}

		// 设置值
		function set(val?: string, isChange = true) {
			date.value = val || undefined;

			// 日期
			const d = dayjs(getDate(date.value));

			// 取下标
			const arr = props.mode.map((k, i) => {
				let v = d[k]?.();

				if (k == "month") {
					v += 1;
				}

				return columns.value[i].list.findIndex((e) => e == v);
			});

			// 清空，避免 value 重复不刷新
			value.value = props.mode.map(() => 0);

			nextTick(() => {
				value.value = arr;

				// 触发监听
				if (isChange) {
					onChange({ detail: { value: arr } });
				}
			});
		}

		// 监听选择
		function onChange(e: { detail: { value: number[] } }) {
			value.value = e.detail.value;

			let d = dayjs();

			// 设置值
			props.mode.forEach((k, i) => {
				let v = value.value[i];

				if (k == "year") {
					v += props.startYear;
				}

				if (k == "date") {
					v += 1;

					const ed = d.endOf("month").date();

					if (v > ed) {
						v = ed;
					}
				}

				d = d.set(k, v);
			});

			date.value = d.format(props.format);

			// 小于开始时间
			if (props.start) {
				if (d.isBefore(dayjs(getDate(props.start)))) {
					set(props.start, false);
				}
			}

			// 大于结束时间
			if (props.end) {
				if (d.isAfter(dayjs(getDate(props.end)))) {
					set(props.end, false);
				}
			}
		}

		// 保存
		function confirm() {
			emit("update:modelValue", date.value);
			emit("change", date.value);
			close();
		}

		// 打开
		function open() {
			set(props.modelValue);
			refs.popup.open();
		}

		// 关闭
		function close() {
			refs.popup.close();
		}

		return {
			date,
			columns,
			value,
			set,
			confirm,
			onChange,
			refs,
			setRefs,
			open,
			close,
		};
	},
});
</script>
