<template>
	<view class="cl-tab-pane" v-if="visible">
		<scroll-view class="cl-tab-pane__scroller" scroll-y>
			<slot></slot>
		</scroll-view>
	</view>
</template>

<script>
import Emitter from '../../mixins/emitter';

export default {
	componentName: 'ClTabPane',

	props: {
		label: [String, Number],
		name: [String, Number],
		disabled: Boolean,
		closable: Boolean,
		prefixIcon: String,
		suffixIcon: String
	},

	data() {
		return {
			visible: false
		};
	},

	mixins: [Emitter],

	created() {
		const that = ['label', 'disabled', 'name', 'closable', 'prefixIcon', 'suffixIcon'].reduce(
			(result, key) => {
				result[key] = this[key];
				return result;
			},
			{}
		);

		this.dispatch('ClTabs', 'tabs.addPane', that);
		this.$on('tabs.change', name => {
			this.visible = this.name == name;
		});
	}
};
</script>
