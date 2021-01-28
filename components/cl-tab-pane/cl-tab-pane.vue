<template>
	<view class="cl-tab-pane" v-show="visible" v-if="loaded">
		<template v-if="parent.scrollView">
			<cl-scroller
				ref="scroller"
				:refresher-enabled="refresherEnabled"
				@up="handleReachBottom"
				@down="handlePullDownRefresh"
			>
				<template #loading="{ status, text, move }">
					<slot name="loading" :status="status" :text="text" :move="move"></slot>
				</template>

				<slot></slot>
			</cl-scroller>
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
 * @property {Boolean} refresherEnabled 启用下拉刷新
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
		// 启用下拉刷新
		refresherEnabled: {
			type: Boolean,
			default: true,
		},
	},

	mixins: [Parent],

	data() {
		return {
			loaded: this.lazy ? false : true,
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
				this.$emit("pull-refresh", {
					done: () => {
						this.$refs["scroller"].end();
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
