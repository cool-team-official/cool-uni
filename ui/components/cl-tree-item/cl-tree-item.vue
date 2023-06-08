<template>
	<view
		class="cl-tree-item"
		:class="{
			'is-expand': conf.isExpand,
		}"
		:style="{
			paddingLeft: (level ? 33 : 0) + 'rpx',
		}"
	>
		<view class="cl-tree-item__content">
			<view class="cl-tree-item__expand" @tap="toExpand">
				<template v-if="data.children">
					<text class="cl-icon-caret-bottom" v-show="conf.isExpand"></text>
					<text class="cl-icon-caret-top" v-show="!conf.isExpand"></text>
				</template>
			</view>

			<view class="cl-tree-item__label">{{ data.label }}</view>
		</view>

		<view class="cl-tree-item__children" v-if="data.children">
			<view class="cl-tree-item__children-wrap">
				<cl-tree-item
					v-for="(item, index) in data.children"
					:data="item"
					:key="index"
					:level="level + 1"
				/>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { PropType, defineComponent, reactive, ref } from "vue";

export default defineComponent({
	name: "cl-tree-item",

	props: {
		data: {
			type: Object as PropType<any>,
			default: () => {
				return {};
			},
		},
		level: {
			type: Number,
			default: 0,
		},
	},

	setup(props) {
		const conf = reactive<{ isExpand: boolean }>(props.data);

		function toExpand() {
			if (props.data.children) {
				conf.isExpand = !conf.isExpand;
			}
		}

		return {
			conf,
			toExpand,
		};
	},
});
</script>
