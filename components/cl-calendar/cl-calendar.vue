<template>
	<cl-popup border-radius="20rpx 20rpx 0 0" :visible.sync="visible" direction="bottom">
		<view class="cl-calendar">
			<view class="cl-calendar__header">
				<text class="cl-calendar__title">{{ title }}</text>
				<text class="cl-calendar__close cl-icon-close" @tap="cancel"></text>
			</view>

			<view class="cl-calendar__container">
				<view class="cl-calendar__selector">
					<!-- 左箭头 -->
					<view class="cl-calendar__selector-icon is-prev" @tap="prevMonth">
						<cl-icon :size="36" name="arrow-left"></cl-icon>
					</view>

					<!-- 当前日期 -->
					<text class="cl-calendar__selector-date">{{ date | format_date }}</text>

					<!-- 右箭头 -->
					<view class="cl-calendar__selector-icon is-next" @tap="nextMonth">
						<cl-icon :size="36" name="arrow-right"></cl-icon>
					</view>

					<!-- 回到今天 -->
					<button class="cl-calendar__today-btn" @tap="toToday">回到今天</button>
				</view>

				<!-- 数据面板 -->
				<view class="cl-calendar__table">
					<view class="cl-calendar__tr">
						<view class="cl-calendar__td">一</view>
						<view class="cl-calendar__td">二</view>
						<view class="cl-calendar__td">三</view>
						<view class="cl-calendar__td">四</view>
						<view class="cl-calendar__td">五</view>
						<view class="cl-calendar__td">六</view>
						<view class="cl-calendar__td">日</view>
					</view>

					<!-- 行 -->
					<view class="cl-calendar__tr" v-for="(tr, index) in table" :key="index">
						<!-- 列 -->
						<view
							class="cl-calendar__td"
							v-for="td in tr"
							:key="td.index"
							:class="{
								'is-disabled': td.disabled,
								'is-start': isStart(td),
								'is-end': isEnd(td),
								'is-through': isThrough(td),
							}"
							@tap="selectDate(td)"
						>
							<!-- 日 -->
							<view class="cl-calendar__value">
								{{ td.value }}
							</view>

							<!-- 小点 -->
							<text
								class="cl-calendar__dot"
								:style="{
									backgroundColor: td.color,
								}"
							></text>

							<!-- 备注 -->
							<text class="cl-calendar__remark" v-if="td.remark || td.lunar">
								{{ td.remark || td.lunar }}
							</text>
						</view>
					</view>
				</view>
			</view>

			<view class="cl-calendar__footer">
				<cl-row :gutter="20">
					<cl-col :span="12">
						<cl-button fill round @tap="cancel">取消</cl-button>
					</cl-col>

					<cl-col :span="12">
						<cl-button fill round type="primary" :disabled="!isConfirm" @tap="confirm"
							>确定</cl-button
						>
					</cl-col>
				</cl-row>
			</view>
		</view>
	</cl-popup>
</template>

<script>
import { isArray, isString } from "../../utils";
import dayjs from "../../utils/dayjs";
import Calendar from "./calendar";

/**
 * calendar 日历
 * @description 支持单选，多选，自定义日期
 * @tutorial https://docs.cool-js.com/uni/components/advanced/calendar.html
 * @property {String, Array} value 绑定值
 * @property {String} type 类型 date | daterange，默认date
 * @property {String} title 标题
 * @property {Array} customList 自定义列表
 * @property {Boolean} lunar 是否显示农历
 * @event {Function} change 值改变时触发
 * @event {Function} cancel 取消时时触发
 * @example <cl-calendar ref="calendar" v-model="date" />
 */

export default {
	name: "cl-calendar",

	props: {
		// 绑定值
		value: [String, Array],
		// 类型
		type: {
			type: String,
			default: "date", // date | daterange
		},
		// 标题
		title: {
			type: String,
			default: "选择日期",
		},
		// 自定义列表
		customList: {
			type: Array,
			default: () => [],
		},
		// 是否显示农历
		lunar: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			// 是否可见
			visible: false,
			// 表格数据
			table: [],
			// 当前日期
			date: null,
			// 选择数据
			selects: {
				// 多选下开始日期
				start: null,
				// 多选下结束日期
				end: null,
			},
		};
	},

	filters: {
		format_date(val, fmt) {
			return val ? dayjs(val).format(fmt || "YYYY年MM月") : "";
		},
	},

	computed: {
		isConfirm() {
			switch (this.type) {
				case "date":
					return this.selects.start;

				case "daterange":
					return this.selects.start && this.selects.end;

				default:
					return false;
			}
		},
	},

	methods: {
		// 打开
		open() {
			this.visible = true;

			this.$nextTick(() => {
				// 绑定值
				let date = this.value;

				// 设置年月
				let start = null;
				let end = null;

				if (isArray(date)) {
					start = date[0];
					end = date[1];
				} else if (isString(date)) {
					start = date;
				}

				if (start) {
					this.date = dayjs(start).format("YYYY-MM-DD");
				} else {
					this.date = dayjs().format("YYYY-MM-DD");
				}

				// 设置表格
				this.setTable();

				// 找到对应的日期
				this.selects.start = this.findDate(start);

				if (isArray(date)) {
					this.selects.end = this.findDate(end);
				}
			});
		},

		// 关闭
		close() {
			this.visible = false;
		},

		// 取消
		cancel() {
			this.close();
			this.$emit("cancel");
		},

		// 确定选择
		confirm() {
			let { start, end } = this.selects;

			if (this.type == "date") {
				this.$emit("input", start.date);
				this.$emit("change", start);
			} else if (this.type == "daterange") {
				this.$emit("input", [start.date, end.date]);
				this.$emit("change", [start, end]);
			}

			this.close();
		},

		// 回到今天
		toToday() {
			this.setDate();
		},

		// 上一个月
		prevMonth() {
			this.date = dayjs(this.date).subtract(1, "month").format("YYYY-MM");
			this.setTable();
		},

		// 下一个月
		nextMonth() {
			this.date = dayjs(this.date).add(1, "month").format("YYYY-MM");
			this.setTable();
		},

		// 选择日期
		selectDate(item) {
			if (item.disabled) {
				return false;
			}

			if (this.selects.start && this.selects.start.index == item.index) {
				return false;
			}

			// 日期多选
			if (this.type == "daterange") {
				if (this.selects.start && this.selects.end) {
					this.selects.start = item;
					this.selects.end = null;
				} else {
					if (!this.selects.start) {
						this.selects.start = item;
					} else if (!this.selects.end) {
						this.selects.end = item;
					}
				}

				// 调整开始和结束的位置
				if (this.selects.start && this.selects.end) {
					if (dayjs(this.selects.end.date).isBefore(this.selects.start.date)) {
						let d = this.selects.start;
						this.selects.start = this.selects.end;
						this.selects.end = d;
					}
				}
			}
			// 日期单选
			else if (this.type == "date") {
				this.selects.start = item;
			}
		},

		// 设置表格
		setTable() {
			// 月初是周几
			let day = dayjs(this.date).date(1).day();
			let start = day == 0 ? 6 : day - 1;

			// 本月天数
			let days = dayjs(this.date).endOf("month").format("D");

			// 上个月天数
			let prevDays = dayjs(this.date).endOf("month").subtract(1, "month").format("D");

			// 日期数据
			let arr = [];
			// 清空表格
			this.table = [];

			// 添加上月数据
			arr.push(
				...new Array(start).fill(1).map((e, i) => {
					let day = prevDays - start + i + 1;

					return {
						value: day,
						disabled: true,
						date: dayjs(this.date).subtract(1, "month").date(day).format("YYYY-MM-DD"),
					};
				})
			);

			// 添加本月数据
			arr.push(
				...new Array(days - 0).fill(1).map((e, i) => {
					let day = i + 1;

					return {
						value: day,
						date: dayjs(this.date).date(day).format("YYYY-MM-DD"),
					};
				})
			);

			// 添加下个月
			arr.push(
				...new Array(42 - days - start).fill(1).map((e, i) => {
					let day = i + 1;

					return {
						value: day,
						disabled: true,
						date: dayjs(this.date).add(1, "month").date(day).format("YYYY-MM-DD"),
					};
				})
			);

			// 分割数组
			for (let n = 0; n < arr.length; n += 7) {
				this.table.push(
					arr.slice(n, n + 7).map((e, i) => {
						e.index = i + n;

						// 自定义信息
						let custom = this.customList.find((c) => c.date == e.date);

						// 农历
						if (this.lunar) {
							let { IDayCn, IMonthCn } = this.getLunar(e.date);
							e.lunar = IDayCn == "初一" ? IMonthCn : IDayCn;
						}

						return {
							...e,
							...custom,
						};
					})
				);
			}
		},

		// 设置日期
		setDate(date) {
			this.date = date || dayjs().format("YYYY-MM-DD");
			this.setTable();
			this.selects.start = this.findDate(this.date);
			this.selects.end = null;
		},

		// 从表格找日期
		findDate(date) {
			let d = null;

			this.table.forEach((tr) => {
				tr.forEach((td) => {
					if (td.date == date) {
						d = td;
					}
				});
			});

			return d;
		},

		// 获取农历
		getLunar(date) {
			let [year, month, day] = date.split("-");
			return Calendar.solar2lunar(year, month, day);
		},

		// 选择开始
		isStart({ disabled, date }) {
			return disabled
				? false
				: this.selects.start
				? dayjs(date).isSame(this.selects.start.date)
				: false;
		},

		// 选择结束
		isEnd({ disabled, date }) {
			return disabled
				? false
				: this.selects.end
				? dayjs(date).isSame(this.selects.end.date)
				: false;
		},

		// 选择路径
		isThrough({ disabled, date }) {
			if (disabled) {
				return false;
			}

			if (this.selects.start && this.selects.end) {
				return (
					dayjs(date).add(1, "second").isAfter(this.selects.start.date) &&
					dayjs(date).subtract(1, "second").isBefore(this.selects.end.date)
				);
			}
		},
	},
};
</script>
