# COOL-UNI 项目脚手架

## 简介

7.0 携带 vue3、vite、ts、pinia 等众多新特性细节曝光！！[文档地址](https://cool-js.com/uni/introduce.html)

[演示地址](https://cool-js.com/uni/index.html#/)

<img src="https://cool-js.com/demo/uniapp/cover1.jpg" height="300px" />
<img src="https://cool-js.com/demo/uniapp/cover2.jpg" height="300px" />
<img src="https://cool-js.com/demo/uniapp/cover3.jpg" height="300px" />
<img src="https://cool-js.com/demo/uniapp/cover4.jpg" height="300px" />
<img src="https://cool-js.com/demo/uniapp/cover5.jpg" height="300px" />

## 更快

#### 启动快

基于 `vite`，快速的冷启动，不需要等待打包，即时的热模块更新，真正的按需编译。

#### 开发快

新增 `eps` 模式，自动扫描接口，代码智能提示。

<img src="https://cool-js.com/assets/service-tip.c2b03c26.gif" height="300px" />

#### 对接快

有什么功能是前端一个人做不了？？大不了全干了

👉👉 [管理前端（vue3）开发文档、强大的 CRUD 组件](https://cool-js.com/admin/vue/introduce.html#%E4%BB%A3%E7%A0%81%E4%BB%93%E5%BA%93)

👉👉 [服务端（node、midway）开发文档、一键生成代码](https://cool-js.com/admin/node/introduce.html#%E4%BB%A3%E7%A0%81%E4%BB%93%E5%BA%93)

👉👉 [演示地址](https://show.cool-admin.com) 😁 账户：admin 密码：123456

-   ✔ 管理系统

    <img src="https://cool-js.com/admin/show.png" width="500px" />

-   ✔ ai编码

    <img src="https://cool-js.com/ai/show/AI%E7%BC%96%E7%A0%81.gif" width="500px" />

## 更强

内置请求、路由、文件上传、组件通信、缓存等方法及 ui 库和 hooks

```html
<script lang="ts" setup>
	import { useCool } from "/@/cool";
	import { useUi } from "/$/cool-ui";

	const { service, router, mitt, storage, upload } = useCool();
	const ui = useUi();

	// 请求
	service.test.page().then((res) => {
		consoe.log(res);
	});

	// 跳转
	router.push({
		path: "/pages/goods/info",
		query: {
			id: 1,
		},
	});

	// 全局事件
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

## 更全

#### 细腻的代码

-   `service` 无感刷新，直接调用后端接口

    ```ts
    const { service } = useCool();
    ```

-   提供 `entity` 描述，写 `any` 和不写的都哭了

    ```ts
    const list = ref<Eps.UserInfoEntity[]>([]);
    ```

#### 活跃的社区

-   拥有自己的知识库系统

-   [官方有问必答](https://cool-js.com/help/list.html)

#### 丰富的插件

-   [Ai智能模块](https://cool-js.com/plugin/detail.html?id=58)

-   [客服聊天模块](https://cool-js.com/plugin/detail.html?id=56)

-   [企业机器人](https://cool-js.com/plugin/detail.html?id=41)、[飞书推送](https://cool-js.com/plugin/detail.html?id=30)

-   [各厂商的支付模块](https://cool-js.com/plugin/detail.html?id=33)

-   [云存储](https://cool-js.com/plugin/detail.html?id=36)

-   [PDF打印](https://cool-js.com/plugin/detail.html?id=44)

-   [更多](https://cool-js.com/plugin/list.html)
