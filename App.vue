<script>
import { useStore } from "./cool";

export default {
	onLaunch: function () {
		const { dict } = useStore();
		dict.refresh();
		console.log("App Launch");
	},
	onShow: function () {
		console.log("App Show");
	},
	onHide: function () {
		console.log("App Hide");
	},
};
</script>

<style lang="scss">
@import "/@/ui/index.scss";
@import "/@/static/index.scss";
</style>
