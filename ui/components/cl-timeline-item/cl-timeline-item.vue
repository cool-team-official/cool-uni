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
/**
 * @description 时间线
 * @property {String} timestamp 时间
 * @property {String} content 内容
 * @property {Boolean} showLine 是否显示竖线
 * @property {String} icon 图标
 * @property {String} color 图标颜色，默认#999
 */

export default defineComponent({
	name: "cl-timeline",

	props: {
		timestamp: String,
		content: String,
		showLine: Boolean,
		icon: String,
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
