import { last } from "lodash-es";
import { ctx } from "virtual:ctx";
import { storage } from "../utils";
import { config } from "../../config";

type PushOptions =
	| string
	| {
			path: string;
			mode?: "navigateTo" | "redirectTo" | "reLaunch" | "switchTab" | "preloadPage";
			events?: {
				[key: string]: (data: any) => void;
			};
			query?: {
				[key: string]: any;
			};
			params?: {
				[key: string]: any;
			};
			isGuard?: boolean;
			[key: string]: any;
	  };

type Tabs = {
	text?: string;
	pagePath: string;
	iconPath?: string;
	selectedIconPath?: string;
	[key: string]: any;
}[];

// 路由列表
const routes = [...ctx.pages];

// 子包
if (ctx.subPackages) {
	ctx.subPackages.forEach((a: { pages: any[]; root: string }) => {
		a.pages.forEach((b) => {
			routes.push({
				...b,
				path: a.root + "/" + b.path,
			});
		});
	});
}

// 钩子函数
const fn: { [key: string]: (...args: any[]) => any } = {};

// 路由
const router = {
	// 底部导航
	get tabs(): Tabs {
		if (ctx.tabBar) {
			return ctx.tabBar.list || [];
		} else {
			return [];
		}
	},

	// 全局样式配置
	globalStyle: ctx.globalStyle,

	// 路由列表
	routes,

	// 跳转参数（地址栏）
	get query() {
		const info = this.info();

		return {
			...info?.query,
		};
	},

	// 跳转参数（缓存）
	get params() {
		return storage.get("router-params") || {};
	},

	// 页面路径
	get pages() {
		return {
			home: "/" + (ctx.tabBar ? this.tabs[0].pagePath : ctx.pages[0].path),
			...config.app.pages,
		};
	},

	// 当前页面信息
	currentPage(): { [key: string]: any } {
		return last(getCurrentPages())!;
	},

	// 当前路由路径
	get path() {
		return router.info()?.path;
	},

	// 当前路由信息
	info() {
		const page = last(getCurrentPages());

		if (page) {
			const { route, $page, $vm, $getAppWebview }: any = page;

			const q: any = {};

			try {
				$page?.fullPath
					.split("?")[1]
					.split("&")
					.forEach((e: string) => {
						const [k, v] = e.split("=");
						q[k] = decodeURIComponent(v);
					});
			} catch (e) {}

			// 页面配置
			const style = this.routes.find((e) => e.path == route)?.style;

			let d = {
				$vm,
				$getAppWebview,
				path: `/${route}`,
				fullPath: $page?.fullPath,
				query: q || {},
				isTab: this.isTab(route),
				style,
				isCustomNavbar: style?.navigationStyle == "custom",
			};

			return d;
		} else {
			return null;
		}
	},

	// 路由跳转
	push(options: PushOptions) {
		if (typeof options == "string") {
			options = {
				path: options,
				mode: "navigateTo",
			};
		}

		let {
			path,
			mode = "navigateTo",
			animationType,
			animationDuration,
			events,
			success,
			fail,
			complete,
			query,
			params,
			isGuard = true,
		} = options || {};

		if (query) {
			let arr = [];

			for (let i in query) {
				if (query[i] !== undefined) {
					arr.push(`${i}=${query[i]}`);
				}
			}

			path += "?" + arr.join("&");
		}

		if (params) {
			storage.set("router-params", params);
		}

		let data = {
			url: path,
			animationType,
			animationDuration,
			events,
			success,
			fail,
			complete,
		};

		if (this.isTab(path)) {
			mode = "switchTab";
		}

		const next = () => {
			switch (mode) {
				case "navigateTo":
					uni.navigateTo(data);
					break;

				case "redirectTo":
					uni.redirectTo(data);
					break;

				case "reLaunch":
					uni.reLaunch(data);
					break;

				case "switchTab":
					uni.switchTab(data);
					break;

				case "preloadPage":
					uni.preloadPage(data);
					break;
			}
		};

		if (fn.beforeEach && isGuard) {
			fn.beforeEach({ path: options.path, query }, next, (options: PushOptions) => {
				this.push(options);
			});
		} else {
			next();
		}
	},

	// 后退
	back(options?: UniApp.NavigateBackOptions) {
		if (this.isFirstPage()) {
			this.home();
		} else {
			uni.navigateBack(options || {});
		}
	},

	// 执行当前页面的某个方法
	callMethod(name: string, data?: any) {
		const { $vm } = this.info()!;

		if ($vm) {
			if ($vm.$.exposed?.[name]) {
				return $vm.$.exposed[name](data);
			}
		}
	},

	// 页面栈长度是否只有1
	isFirstPage() {
		return getCurrentPages().length == 1;
	},

	// 是否当前页
	isCurrentPage(path: string) {
		return this.info()?.path == path;
	},

	// 回到首页
	home() {
		this.push(this.pages.home);
	},

	// 跳转 Tab 页
	switchTab(name: string) {
		let item = this.tabs.find((e) => e.pagePath.includes(name));

		if (item) {
			this.push({
				path: `/${item.pagePath}`,
				mode: "switchTab",
			});
		} else {
			console.error("Not found tab", name);
		}
	},

	// 是否是 Tab 页
	isTab(path: string) {
		return !!this.tabs.find((e) => path == `/${e.pagePath}`);
	},

	// 去登陆
	login(options?: { reLaunch: boolean }) {
		const { reLaunch = false } = options || {};

		this.push({
			path: this.pages.login,
			mode: reLaunch ? "reLaunch" : "navigateTo",
			isGuard: false,
		});
	},

	// 登录成功后操作
	nextLogin(type?: string) {
		const pages = getCurrentPages();
		const index = pages.findIndex((e) => this.pages.login.includes(e.route!));

		if (index <= 0) {
			this.home();
		} else {
			router.back({
				delta: pages.length - index,
			});
		}

		// 登录方式
		storage.set("loginType", type);

		// 登录回调
		if (fn.afterLogin) {
			fn.afterLogin();
		}

		// 事件
		uni.$emit("afterLogin", { type });
	},

	// 跳转前钩子
	beforeEach(callback: (to: any, next: () => void) => void) {
		fn.beforeEach = callback;
	},

	// 登录后回调
	afterLogin(callback: () => void) {
		fn.afterLogin = callback;
	},
};

export { router };
