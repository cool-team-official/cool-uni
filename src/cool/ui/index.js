import './assets/css/index.scss';

// 消息提示
function Message() {
	this.$message = opts => {
		this.$refs['cl-message'].open(opts);
	};
}

// 全局注入
export default {
	mounted() {
		Message.bind(this)();
	}
};
