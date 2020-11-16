<template>
    <view
        class="cl-step"
        :class="[
			{
				'is-active': index < active,
				'is-last': index == number
			}
		]"
    >
        <slot>
            <text class="cl-step__title">{{ title }}</text>
            <view class="cl-step__value">
                {{ number }}
                <text v-if="showIndex">1</text>
            </view>
            <text class="cl-step__description">{{ description }}</text>
        </slot>
    </view>
</template>

<script>
import { getParent } from "../../utils";

export default {
	componentName: "ClStep",

	props: {
		title: String,
		description: String,
		showIndex: Boolean,
		index: Number,
	},

	data() {
		return {
			active: null,
		};
	},

	computed: {
		number() {
			return this.$parent.$children.map((e) => e._uid).indexOf(this._uid);
		},
	},

	created() {
		this.$on("steps.change", (val) => {
			this.active = val;
		});
	},
};
</script>
