<template>
	<view class="cl-timeline-item" :class="[showLine ? 'show-line' : '']">
		<view
			class="cl-timeline-item__timestamp"
			:style="{
				width: `${parent.timestampWidth}rpx`,
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

<script>
import Parent from "../../mixins/parent";

/**
 * timeline 时间线
 * @description 时间线
 * @tutorial https://docs.cool-js.com/uni/components/view/timeline.html
 * @property {String} timestamp 时间
 * @property {String} content 内容
 * @property {Boolean} showLine 是否显示竖线
 * @property {String} icon 图标
 * @property {String} color 图标颜色，默认#999
 * @example 见教程
 */

export default {
	name: "cl-timeline",
	componentName: "ClTimelineItem",
	props: {
		// 时间
		timestamp: String,
		// 内容
		content: String,
		// 是否显示竖线
		showLine: Boolean,
		// 图标
		icon: String,
		// 图标颜色，默认#999
		color: {
			type: String,
			default: "#999",
		},
	},
	mixins: [Parent],
	data() {
		return {
			ComponentName: "ClTimeline",
			Keys: ["timestampWidth"],
		};
	},
	computed: {
		timestampText() {
			return (this.timestamp || "").split(" ");
		},
	},
};
</script>
