<template>
	<view
		class="cl-timeline-item"
		:class="[
			{
				'show-line': showLine,
			},
		]"
	>
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
		showLine: Boolean,
		icon: String,
		color: {
			type: String,
			default: "#999",
		},
	},
	computed: {
		parent() {
			return getParent.call(this, "ClTimeline", ["timestampWidth"]);
		},
		timestampText() {
			return (this.timestamp || "").split(" ");
		},
	},
};
</script>
