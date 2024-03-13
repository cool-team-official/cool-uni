<script setup lang="ts">
import { useStore } from "/@/cool";
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
	console.log("App Launch");

	const { dict, user } = useStore();

	// 获取字典
	// dict.refresh();

	if (user.token) {
		// 获取登录用户信息
		// user.get();
	}
});

onShow(() => {
	console.log("App Show");
});

onHide(() => {
	console.log("App Hide");
});
</script>

<style lang="scss">
@import "/$/cool-ui/index.scss";
@import "/@/static/css/index.scss";
</style>
