export const Props = {
	// 组件高
	height: [String, Number],
	// 占位文本
	placeholder: {
		type: String,
		default: "请选择",
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: null,
	},
	// 是否带有边框
	border: {
		type: Boolean,
		default: true,
	},
	// 是否圆角
	round: {
		type: Boolean,
		default: null,
	},
	// 图标
	arrowIcon: {
		type: String,
		default: "cl-icon-arrow-bottom",
	},
	// 背景色
	backgroundColor: String,
	// 圆角边框
	borderRadius: [String, Number, Array],
	// 内间距
	padding: [String, Number, Array],
};
