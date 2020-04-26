<template>
	<view class="cl-countdown">
		<template v-for="(item, index) in list">
			<view class="cl-countdown-item" :key="index" v-if="item.visible">
				<text class="cl-countdown__number">{{ item.value }}</text>
				<text class="cl-countdown__splitor">{{ item.splitor }}</text>
			</view>
		</template>
	</view>
</template>

<script>
import { isArray } from "../../utils";

export default {
	name: "ClCountdown",
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
		// simple 精简：为00时自动隐藏
		mode: {
			type: String,
			default: "default"
		},
		day: {
			type: Number,
			default: 0
		},
		hour: {
			type: Number,
			default: 0
		},
		minute: {
			type: Number,
			default: 0
		},
		second: {
			type: Number,
			default: 0
		},
		datetime: [Date, String]
	},

	data() {
		return {
			timer: null,
			syncFlag: false,
			seconds: 0,
			list: []
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
		clearInterval(this.timer);
	},

	created() {
		this.start();
	},

	methods: {
		toSeconds(day, hours, minutes, seconds) {
			return (
				day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds
			);
		},

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

			this.seconds = this.toSeconds(
				day,
				hour,
				minute,
				datetime
					? (new Date(datetime).getTime() - new Date().getTime()) /
							1000
					: second
			);

			if (this.seconds <= 0) {
				return;
			}

			this.countDown();

			this.timer = setInterval(() => {
				this.seconds--;
				if (this.seconds < 0) {
					this.done();
					return;
				}
				this.countDown();
			}, 1000);
		},

		stop() {
			clearInterval(this.timer);
			this.$emit("stop");
		},

		done() {
			clearInterval(this.timer);
			this.$emit("done");
		},

		countDown() {
			let seconds = this.seconds;
			let [day, hour, minute, second] = [0, 0, 0, 0];

			if (seconds > 0) {
				day = Math.floor(seconds / (60 * 60 * 24));
				hour = Math.floor(seconds / (60 * 60)) - day * 24;
				minute = Math.floor(seconds / 60) - day * 24 * 60 - hour * 60;
				second =
					Math.floor(seconds) -
					day * 24 * 60 * 60 -
					hour * 60 * 60 -
					minute * 60;
			} else {
				this.done();
			}

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
					visible:
						this.mode === "simple"
							? flag
								? obj[e] !== "00"
								: true
							: true
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
					case "default":
					default:
						arr = ["天", ":", ":", ""];
						break;
				}
			}

			return arr[i];
		},

		changeFlag() {
			if (!this.syncFlag) {
				this.start();
				this.syncFlag = true;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.cl-countdown {
	display: inline-block;

	&__number {
		display: inline-block;
		height: 50rpx;
		min-width: 40rpx;
		text-align: center;
		line-height: 50rpx;
		background-color: #eee;
		padding: 0 10rpx;
		margin: 0 14rpx;
		font-size: 30rpx;
		border-radius: 6rpx;
	}

	&__splitor {
		font-size: 24rpx;
	}

	&-item {
		display: inline-block;

		&:first-child {
			.cl-countdown__number {
				margin-left: 0;
			}
		}
	}
}
</style>
