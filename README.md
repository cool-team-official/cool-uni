# COOL-UNI

让你不用想太多就能开发完功能，7.0 携带 vue3、vite、ts、pinia 等众多新特性细节曝光！！[文档地址](https://cool-js.com/uni/introduce.html)

## 更快

-   启动快：基于 `vite`，快速的冷启动，不需要等待打包，即时的热模块更新，真正的按需编译。

-   开发快：`eps` 模式下，无须手动添加接口请求方法。

## 更强

内置请求、路由、文件上传、组件通信、缓存等方法及 ui 库和 hooks

```html
<script lang="ts" setup>
	import { useCool } from "/@/cool";
	import { useUi } from "/@/ui";

	const { service, router, mitt, storage, upload } = useCool();
	const ui = useUi();

	// 请求
	service.test.page().then((res) => {
		consoe.log(res);
	});

	// 跳转
	router.push({
		path: "/pages/goods/info",
		// 方式1
		query: {
			id: 1,
		},
		// 方式2
		params: {
			id: 2,
		},
	});

	// ui全局事件
	ui.showLoading();
	ui.showToast();

	// 通信
	mitt.emit("refresh", { page: 1 });
	mitt.on("refresh", (params) => {});

	// 储存
	storage.set("token", "a123huis");

	// 文件上传
	uni.chooseImage({
		count: 1,
		sourceType: ["album", "camera"],
		success(res) {
			upload(res.tempFiles[0]).then((url) => {
				console.log(url);
			});
		},
	});
</script>
```

## 更细

全面的代码描述
