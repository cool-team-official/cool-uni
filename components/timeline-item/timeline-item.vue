<template>
	<view
		class="cl-timeline-item"
		:class="[
			{
				'is-last': last
			}
		]"
	>
		<view
			class="cl-timeline-item__timestamp"
			:style="{
				width: `${parent.timestampWidth}rpx`
			}"
		>
			<slot name="timestamp">
				<text class="cl-timeline-item__date">{{ timestampText[0] }}</text>
				<text class="cl-timeline-item__time">{{ timestampText[1] }}</text>
			</slot>
		</view>
		<view class="cl-timeline-item__node">
			<slot name="icon">
				<text
					class="cl-timeline-item__node-dot"
					:style="{
						'background-color': color
					}"
				></text>
			</slot>
		</view>
		<view
			class="cl-timeline-item__line"
			:style="{
				left: `${parent.timestampWidth + 62}rpx`
			}"
		></view>
		<view class="cl-timeline-item__content">
			<slot name="content">{{ content }}</slot>
		</view>
	</view>
</template>

<script>
import { getParent } from "../../utils";

export default {
	componentName: "ClTimelineItem",
	props: {
		timestamp: String,
		content: String,
		last: Boolean,
		color: {
			type: String,
			default: "#999"
		}
	},
	computed: {
		parent() {
			return getParent.call(this, "ClTimeline", ["timestampWidth"]);
		},
		timestampText() {
			return (this.timestamp || "").split(" ");
		}
	}
};
</script>
