import { isArray, isNumber } from "../utils";

export default {
	props: {
		height: [String, Number],
		width: [String, Number],
		margin: [String, Number, Array],
		padding: [String, Number, Array],
		borderRadius: [String, Number, Array],
	},

	computed: {
		height2() {
			return this.parse_rpx(this.height);
		},
		width2() {
			return this.parse_rpx(this.width);
		},
		margin2() {
			return this.parse_prop(this.margin);
		},
		padding2() {
			return this.parse_prop(this.padding);
		},
		borderRadius2() {
			return this.parse_prop(this.borderRadius);
		},
	},

	methods: {
		parse_rpx(val) {
			return isNumber(val) ? val + "rpx" : val;
		},
		parse_prop(val) {
			return isArray(val) ? val.map(this.parse_rpx).join(" ") : this.parse_rpx(val);
		},
	},
};
