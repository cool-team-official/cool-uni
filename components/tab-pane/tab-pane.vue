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
import { getParent } from "../../utils";

export default {
	componentName: "ClTabPane",

	props: {
		label: [String, Number],
		name: [String, Number],
		prefixIcon: String,
		suffixIcon: String,
		lazy: Boolean,
		refresherEnabled: Boolean,
	},

	data() {
		return {
			loaded: this.lazy ? false : true,
			triggered: false,
		};
	},

	computed: {
		parent() {
			return getParent.call(this, "ClTabs", ["current", "scrollView"]);
		},

		visible() {
			return this.parent ? this.parent.current == this.name : false;
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
