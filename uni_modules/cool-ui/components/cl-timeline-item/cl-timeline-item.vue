<template>
	<view
		class="cl-timeline-item"
		:class="[
			{
				'is-line': showLine,
			},
		]"
	>
		<view
			class="cl-timeline-item__timestamp"
			:style="{
				width: `${parent?.timestampWidth}rpx`,
			}"
		>
			<slot name="timestamp">
				<text class="cl-timeline-item__date">{{ timestampText[0] }}</text>
				<text class="cl-timeline-item__time">{{ timestampText[1] }}</text>
			</slot>
		</view>

		<view class="cl-timeline-item__node">
			<view class="cl-timeline-item__node-box">
				<slot name="icon">
					<text
						v-if="icon"
						class="cl-timeline-item__icon"
						:class="[icon]"
						:style="{ color }"
					></text>

					<text
						v-else
						class="cl-timeline-item__dot"
						:style="{
							'background-color': color || '#999',
						}"
					></text>
				</slot>
			</view>
		</view>

		<view class="cl-timeline-item__content" select>
			<slot name="content">
				<text selectable user-select>{{ content }}</text>
			</slot>
		</view>
	</view>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { getParent } from "/@/cool/utils";

export default defineComponent({
	name: "cl-timeline",

	props: {
		// 时间
		timestamp: String,
		// 内容
		content: String,
		// 是否显示竖线
		showLine: Boolean,
		// 图标
		icon: String,
		// 图标颜色
		color: {
			type: String,
			default: "#999",
		},
	},

	setup(props) {
		// cl-timeline
		const parent = getParent("cl-timeline", ["timestampWidth"]);

		// 时间
		const timestampText = computed(() => {
			return (props.timestamp || "").split(" ");
		});

		return {
			timestampText,
			parent,
		};
	},
});
</script>
