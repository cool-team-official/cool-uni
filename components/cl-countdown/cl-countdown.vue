<template>
	<view class="cl-countdown">
		<template v-for="(item, index) in list">
			<view class="cl-countdown-item" :key="index" :style="[customStyle]" v-if="item.visible">
				<text class="cl-countdown__number" :style="[numberStyle]">{{ item.value }}</text>
				<text class="cl-countdown__splitor" :style="[splitorStyle]">{{
					item.splitor
				}}</text>
			</view>
		</template>

		<view class="cl-countdown-item" v-if="isMillisecond">
			<text class="cl-countdown__number">{{ millisecond }}</text>
		</view>
	</view>
</template>

<script>
import { isArray } from "../../utils";

/**
 * countdown 倒计时
 * @description 倒计时, 支持布局显示, 自定义样式
 * @tutorial https://docs.cool-js.com/uni/components/view/countdown.html
 * @property {String, Array} splitor 图片链接
 * @property {Array} layout 布局, ["day", "hour", "minute", "second"]
 * @property {String} mode default 默认 | simple 是否精简：为00时自动隐藏，默认dfault
 * @property {Number} day 还有多少天
 * @property {Number} hour 还有多少小时
 * @property {Number} minute 还有多少分钟
 * @property {Number} second 还有多少秒
 * @property {Date, String} datetime 结束时间
 * @property {Boolean} isMillisecond 是否带有毫秒
 * @property {Object} customStyle 自定义样式
 * @property {Object} numberStyle 数字样式
 * @property {Object} splitorStyle 分隔符样式
 * @example <cl-countdown :day="5" />
 */

export default {
	name: "cl-countdown",

	props: {
		// 分隔符 [day, hour, minute, second]
		splitor: {
			type: [String, Array],
			default: "default"
		},
		// 布局
		layout: {
			type: Array,
			default: () => ["day", "hour", "minute", "second"]
		},
		// simple 是否精简：为00时自动隐藏
		mode: {
			type: String,
			default: "default"
		},
		// 还有多少天
		day: {
			type: Number,
			default: 0
		},
		// 还有多少小时
		hour: {
			type: Number,
			default: 0
		},
		// 还有多少分钟
		minute: {
			type: Number,
			default: 0
		},
		// 还有多少秒
		second: {
			type: Number,
			default: 0
		},
		// 结束时间
		datetime: [Date, String],
		// 是否带有毫秒
		isMillisecond: Boolean,
		// 自定义样式
		customStyle: Object,
		// 数字样式
		numberStyle: Object,
		// 分隔符样式
		splitorStyle: Object
	},

	data() {
		return {
			timer: null,
			millisecondTimer: null,
			syncFlag: false,
			seconds: 0,
			list: [],
			millisecond: 9,
			status: false
		};
	},

	watch: {
		day() {
			this.changeFlag();
		},
		hour() {
			this.changeFlag();
		},
		minute() {
			this.changeFlag();
		},
		second() {
			this.changeFlag();
		},
		datetime() {
			this.changeFlag();
		}
	},

	beforeDestroy() {
		this.clear();
	},

	created() {
		this.start();
	},

	methods: {
		// 转成秒
		toSeconds({ day = 0, hour = 0, minute = 0, second = 0, datetime }) {
			if (datetime) {
				return (
					(new Date(datetime.replace(/-/g, "/")).getTime() - new Date().getTime()) / 1000
				);
			} else {
				return day * 60 * 60 * 24 + hour * 60 * 60 + minute * 60 + second;
			}
		},

		// 开始倒计时
		start(options) {
			let { day, hour, minute, second, datetime } = options || {};

			if (!day) {
				day = this.day;
			}

			if (!hour) {
				hour = this.hour;
			}

			if (!minute) {
				minute = this.minute;
			}

			if (!second) {
				second = this.second;
			}

			if (!datetime) {
				datetime = this.datetime;
			}

			this.seconds = this.toSeconds({
				day,
				hour,
				minute,
				second,
				datetime
			});

			this.next();
		},

		// 继续倒计时
		next() {
			if (this.seconds <= 0) {
				return;
			}

			if (this.status) {
				return;
			}

			this.status = true;

			// Start coundown
			const next = () => {
				this.countDown();

				if (this.seconds <= 0) {
					this.done();
					return;
				} else {
					this.seconds--;

					this.timer = setTimeout(next, 1000);
				}
			};

			// Use setTimeout instead setInterval
			next();

			// milli second
			if (this.isMillisecond) {
				const next = () => {
					this.millisecond--;

					if (this.millisecond < 0) {
						this.millisecond = 9;
					}

					this.millisecondTimer = setTimeout(next, 100);
				};

				next();
			}
		},

		// 停止
		stop() {
			this.clear();
			this.$emit("stop");
		},

		// 结束
		done() {
			this.clear();
			this.$emit("done");
		},

		// 清除定时器
		clear() {
			clearTimeout(this.timer);
			clearTimeout(this.millisecondTimer);

			this.timer = null;
			this.millisecondTimer = null;
			this.status = false;
		},

		// 倒计时执行
		countDown() {
			let seconds = this.seconds;
			let [day, hour, minute, second] = [0, 0, 0, 0];

			day = Math.floor(seconds / (60 * 60 * 24));
			hour = Math.floor(seconds / (60 * 60)) - day * 24;
			minute = Math.floor(seconds / 60) - day * 24 * 60 - hour * 60;
			second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;

			if (day < 10) {
				day = "0" + day;
			}
			if (hour < 10) {
				hour = "0" + hour;
			}
			if (minute < 10) {
				minute = "0" + minute;
			}
			if (second < 10) {
				second = "0" + second;
			}

			const obj = {
				day,
				hour,
				minute,
				second
			};

			let flag = day === "00";

			this.list = this.layout.map((e, i) => {
				let item = {
					value: obj[e],
					splitor: this.splitorText(i),
					visible: this.mode === "simple" ? (flag ? obj[e] !== "00" : true) : true
				};

				if (flag) {
					flag = obj[e] === "00";
				}

				return item;
			});

			this.$emit(
				"change",
				this.list.map(e => e.value)
			);
		},

		// 分隔符内容
		splitorText(i) {
			let arr = [];

			if (isArray(this.splitor)) {
				arr = this.splitor;
			} else {
				switch (this.splitor) {
					case "cn":
						arr = ["天", "时", "分", "秒"];
						break;
					case "en":
						arr = ["Day", "Hour", "Minute", "Second"];
						break;
					case "":
					case false:
					case null:
						arr = ["", "", "", ""];
						break;
					case "default":
					default:
						arr = ["天", ":", ":", ""];
						break;
				}
			}

			return arr[i];
		},

		changeFlag() {
			this.$nextTick(() => {
				this.start();
			});
		}
	}
};
</script>
