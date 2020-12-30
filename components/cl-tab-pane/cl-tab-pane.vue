<template>
	<view class="cl-tab-pane" v-show="visible" v-if="loaded">
		<template v-if="parent.scrollView">
			<scroll-view
				class="cl-tab-pane__scroller"
				scroll-y
				:refresher-enabled="refresherEnabled"
				:lower-threshold="100"
				:refresher-triggered="triggered"
				@refresherrefresh="handlePullDownRefresh"
				@scrolltolower="handleReachBottom"
			>
				<slot></slot>
			</scroll-view>
		</template>

		<template v-else>
			<slot></slot>
		</template>
	</view>
</template>

<script>
import Parent from "../../mixins/parent";

/**
 * tab-pane 选项卡内容
 * @description 选项卡内容
 * @tutorial https://docs.cool-js.com/uni/components/nav/tabs.html
 * @property {String, Number} value 绑定值
 * @property {Array} label 标签内容
 * @property {Boolean} name 唯一标识
 * @property {Boolean} prefixIcon 前缀图标
 * @property {Number} suffixIcon 后缀图标
 * @property {Boolean} lazy 是否延迟加载
 * @property {Boolean} refresherEnabled 开启自定义下拉刷新
 * @example 见教程
 */

export default {
	name: "cl-tab-pane",

	componentName: "ClTabPane",

	props: {
		// 标签内容
		label: [String, Number],
		// 唯一标识
		name: [String, Number],
		// 前缀图标
		prefixIcon: String,
		// 后缀图标
		suffixIcon: String,
		// 是否延迟加载
		lazy: Boolean,
		// 开启自定义下拉刷新
		refresherEnabled: Boolean,
	},

	mixins: [Parent],

	data() {
		return {
			loaded: this.lazy ? false : true,
			triggered: false,
			Keys: ["current", "scrollView"],
			ComponentName: "ClTabs",
		};
	},

	computed: {
		visible() {
			return this.parent.current == this.name;
		},
	},

	watch: {
		visible: {
			immediate: true,
			handler(val) {
				if (val) {
					this.loaded = true;
				}
			},
		},
	},

	methods: {
		handlePullDownRefresh() {
			if (this.refresherEnabled) {
				this.triggered = "restore";

				this.$emit("pull-refresh", {
					done: () => {
						setTimeout(() => {
							this.triggered = false;
						}, 10);
					},
				});
			}
		},

		handleReachBottom() {
			this.$emit("loadmore");
		},
	},
};
</script>
