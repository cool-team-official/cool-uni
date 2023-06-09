<template>
	<view
		class="cl-tree-item"
		:class="{
			'is-expand': isExpand,
		}"
		:style="{
			paddingLeft: (level ? 33 : 0) + 'rpx',
		}"
	>
		<view class="cl-tree-item__content" @tap.stop="toTap">
			<view class="cl-tree-item__expand">
				<text class="icon-caret cl-icon-caret-bottom" v-if="!isLeaf"></text>
			</view>

			<view class="cl-tree-item__label">
				<slot>
					{{ data.label }}
				</slot>
			</view>
		</view>

		<view
			class="cl-tree-item__children"
			:style="{
				maxHeight: maxHeight,
			}"
			v-if="data.isExpand"
		>
			<cl-tree-item
				v-for="(item, index) in data.children"
				:data="item"
				:key="index"
				:level="level + 1"
			>
			</cl-tree-item>
		</view>
	</view>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, nextTick, reactive, ref } from "vue";
import { getParent } from "/@/cool/utils";

export default defineComponent({
	name: "cl-tree-item",

	props: {
		data: {
			type: Object as PropType<ClTree.Item>,
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
		// cl-tree
		const parent = getParent("cl-tree", ["itemHeight", "setValue"]);

		// 是否展开
		const isExpand = ref(props.data.isExpand || false);

		// 最大高度
		const maxHeight = ref();

		// 左间距
		const paddingLeft = computed(() => {
			return (props.level ? 33 : 0) + "rpx";
		});

		// 是否叶子节点
		const isLeaf = computed(() => !props.data?.children || props.data.children?.length == 0);

		// 获取高度
		function getHeight() {
			let n = 0;

			function deep(arr: any[]) {
				arr.forEach((e) => {
					n += 1;
					if (e.isExpand && e.children) {
						deep(e.children);
					}
				});
			}

			deep(props.data.children);

			return n * (parent.value?.itemHeight || 50) + "rpx";
		}

		// 展开
		let timer: any;

		async function toExpand() {
			if (props.data.children) {
				isExpand.value = !isExpand.value;

				clearTimeout(timer);

				if (isExpand.value) {
					props.data.isExpand = true;

					maxHeight.value = "0";

					await nextTick();

					setTimeout(() => {
						maxHeight.value = getHeight();

						timer = setTimeout(() => {
							maxHeight.value = undefined;
						}, 300);
					}, 10);
				} else {
					maxHeight.value = getHeight();

					await nextTick();

					setTimeout(() => {
						maxHeight.value = "0rpx";

						timer = setTimeout(() => {
							props.data.isExpand = false;
						}, 300);
					}, 10);
				}
			}
		}

		// 选择
		function toCheck() {
			parent.value?.setValue(props.data.value);
		}

		// 点击
		function toTap() {
			if (isLeaf.value) {
				toCheck();
			} else {
				toExpand();
			}
		}

		return {
			isExpand,
			maxHeight,
			paddingLeft,
			isLeaf,
			toTap,
		};
	},
});
</script>
