// @ts-nocheck
import { last } from "lodash";
import { storage } from "../../utils";
import { config } from "../../config";

if (!__UNI_PAGES__) {
	console.error("@dcloudio/uni-cli-shared 依赖未安装！");
}

// pages.json 配置参数
const ctx = JSON.parse(__UNI_PAGES__);

// 底栏选项页
const tabs = ctx.tabBar ? ctx.tabBar.list : [];

// 路由列表
const routes = [...ctx.pages];

ctx.subPackages.forEach((a) => {
	a.pages.forEach((b) => {
		routes.push({
			...b,
			path: a.root + "/" + b.path,
		});
	});
});

// 路由
const router = {
	// 钩子函数
	fn: {
		beforeEach: null,
		afterLogin: null,
	},

	// 底部导航
	tabs,

	// 全局样式配置
	globalStyle: ctx.globalStyle,

	// 路由列表
	routes,

	// 地址栏参数
	get query() {
		const info = this.info();
		return info ? info.query : {};
	},

	// 临时参数
	get params() {
		return storage.get("router-params") || {};
	},

	// 页面地址
	get pages() {
		return {
			home: "/" + (ctx.tabBar ? tabs[0].pagePath : ctx.pages[0].path),
			...config.app.pages,
		};
	},

	// 当前页
	get path() {
		return router.info()?.path;
	},

	// 跳转
	push(
		options:
			| string
			| {
					path: string;
					mode?: "navigateTo" | "redirectTo" | "reLaunch" | "switchTab" | "preloadPage";
					query?: object;
					[key: string]: any;
			  }
	) {
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
			success,
			fail,
			complete,
			query,
			params,
		}: any = options || {};

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

		if (this.fn.beforeEach) {
			this.fn.beforeEach({ path: options.path, query }, next, (options: any) => {
				this.push(options);
			});
		} else {
			next();
		}
	},

	// 后退
	back(options?: UniApp.NavigateBackOptions) {
		const { delta = 1, animationDuration, animationType, duration = 0 } = options || {};

		setTimeout(() => {
			uni.navigateBack({
				delta,
				animationDuration,
				animationType,
			});
		}, duration);
	},

	// 当前路由信息
	info() {
		const page = last(getCurrentPages());

		if (page) {
			const { route, $page, $vm }: any = page;

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

	// 执行当前页面的某个方法
	callMethod(name: string, data?: any) {
		const { $vm }: any = this.info();

		if ($vm[name]) {
			return $vm[name](data);
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
		this.push({
			path: this.pages.home,
			mode: this.isTab(this.pages.home) ? "switchTab" : "navigateTo",
		});
	},

	/**
	 * 跳转 tabbar
	 * @param {*} name
	 */
	switchTab(name: string) {
		let item = tabs.find((e: any) => e.pagePath.includes(name));

		if (item) {
			this.push({
				path: `/${item.pagePath}`,
				mode: "switchTab",
			});
		} else {
			console.error("不存在Tab页", name);
		}
	},

	// 是否是Tab页
	isTab(path: string) {
		return !!tabs.find((e: any) => path.includes(e.pagePath));
	},

	/**
	 * 登录流程 redirectTo
	 * 1. 记录失效页
	 * 2. 关闭当前失效页，跳转到登录页
	 * 3. 登录成功后关闭登录页，打开失效页
	 */
	login(options?: { reLaunch: boolean }) {
		const { reLaunch = false } = options || {};
		const data = this.info();

		if (data) {
			if (data.path != this.pages.login) {
				storage.set(
					"invalid-page",
					reLaunch
						? {
								path: this.pages.home,
						  }
						: {
								...data,
								$vm: null,
						  }
				);
			}
		}

		this.push({
			path: this.pages.login,
			mode: reLaunch ? "reLaunch" : "navigateTo",
		});
	},

	// 返回登录失效页
	nextLogin() {
		const data = storage.get("invalid-page");

		if (data) {
			data.mode = this.isTab(data.path) ? "switchTab" : "reLaunch";
			this.push(data);
			storage.remove("invalid-page");
		} else {
			this.home();
		}

		// 登录回调
		if (this.fn.afterLogin) {
			this.fn.afterLogin(data);
		}
	},

	// 跳转前钩子
	beforeEach(callback: (to: any, next: () => void) => void) {
		this.fn.beforeEach = callback;
	},

	// 登录后回调
	afterLogin(callback: (data: any) => void) {
		this.fn.afterLogin = callback;
	},
};

export { router };
