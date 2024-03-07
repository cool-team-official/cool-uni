<template>
	<view
		class="cl-countdown"
		:style="{
			'font-size': parseRpx(fontSize),
		}"
		v-if="visible"
	>
		<template v-for="(item, index) in list" :key="index">
			<view class="cl-countdown__item" :style="item.ch ? textStyle : numberStyle">
				{{ item.value }}
			</view>
		</template>
	</view>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick, onBeforeUnmount, onBeforeMount } from "vue";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-countdown",

	props: {
		// 格式化
		format: {
			type: String,
			default: "{h}:{m}:{s}",
		},
		// 是否精简：为00时自动隐藏
		simple: {
			type: Boolean,
			default: false,
		},
		// 还有多少天
		day: {
			type: Number,
			default: 0,
		},
		// 还有多少小时
		hour: {
			type: Number,
			default: 0,
		},
		// 还有多少分钟
		minute: {
			type: Number,
			default: 0,
		},
		// 还有多少秒
		second: {
			type: Number,
			default: 0,
		},
		// 结束时间
		datetime: [Date, String],
		// 数字样式
		numberStyle: Object,
		// 分隔符样式
		textStyle: Object,
		// 字体大小
		fontSize: {
			type: Number,
			default: 26,
		},
	},

	emits: ["stop", "done", "change"],

	setup(props, { emit }) {
		let timer: any = null;

		// 秒
		const seconds = ref(0);

		// 状态
		let status = false;

		// 是否显示
		const visible = ref(true);

		// 列表
		const list = ref<any[]>([]);

		// 转成秒
		function toSeconds({ day = 0, hour = 0, minute = 0, second = 0, datetime }: any) {
			if (datetime) {
				return (
					(new Date(datetime.replace(/-/g, "/")).getTime() - new Date().getTime()) / 1000
				);
			} else {
				return day * 60 * 60 * 24 + hour * 60 * 60 + minute * 60 + second;
			}
		}

		// 开始倒计时
		function start(options?: any) {
			visible.value = true;

			nextTick(() => {
				let { day, hour, minute, second, datetime } = options || {};

				if (!day) {
					day = props.day;
				}

				if (!hour) {
					hour = props.hour;
				}

				if (!minute) {
					minute = props.minute;
				}

				if (!second) {
					second = props.second;
				}

				if (!datetime) {
					datetime = props.datetime;
				}

				seconds.value = toSeconds({
					day,
					hour,
					minute,
					second,
					datetime,
				});

				next();
			});
		}

		// 继续倒计时
		function next() {
			if (seconds.value <= 0) {
				return;
			}

			if (status) {
				return;
			}

			status = true;

			// 开始
			function next() {
				countDown();

				if (seconds.value <= 0) {
					done();
					return;
				} else {
					seconds.value--;
					timer = setTimeout(next, 1000);
				}
			}

			next();
		}

		// 停止
		function stop() {
			clear();
			emit("stop");
		}

		// 结束
		function done() {
			visible.value = false;
			clear();
			emit("done");
		}

		// 清除定时器
		function clear() {
			clearTimeout(timer);

			timer = null;
			status = false;
		}

		// 倒计时执行
		function countDown() {
			let [day, hour, minute, second]: any = [0, 0, 0, 0];

			day = Math.floor(seconds.value / (60 * 60 * 24));
			hour = Math.floor(seconds.value / (60 * 60)) - day * 24;
			minute = Math.floor(seconds.value / 60) - day * 24 * 60 - hour * 60;
			second = Math.floor(seconds.value) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;

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

			const d: any = {
				d: day,
				h: hour,
				m: minute,
				s: second,
			};

			let arr: any[] = props.format
				.split(/[{,}]/)
				.filter(Boolean)
				.map((e) => {
					return {
						value: d[e] ? d[e] : e,
						ch: d[e] === undefined,
					};
				});

			let f = true;
			let n = -1;

			list.value = arr
				.map((e, i) => {
					if (props.simple) {
						if (!e.ch) {
							if (f) {
								if (e.value == "00") {
									n = i;
									f = true;
								} else {
									f = false;
								}
							}
						}
					}

					return e;
				})
				.filter((_, i) => {
					return n == -1 ? true : n + 1 < i;
				});

			emit(
				"change",
				list.value.map((e) => e.value),
			);
		}

		onBeforeUnmount(clear);
		onBeforeMount(start);

		watch(() => props.day, start);
		watch(() => props.hour, start);
		watch(() => props.minute, start);
		watch(() => props.second, start);
		watch(() => props.datetime, start);

		return {
			visible,
			seconds,
			list,
			start,
			stop,
			toSeconds,
			parseRpx,
		};
	},
});
</script>
