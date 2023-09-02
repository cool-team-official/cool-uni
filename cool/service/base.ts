// @ts-nocheck
import { has } from "lodash-es";
import { isDev, config } from "../../config";
import request from "./request";

export function Service(
	value:
		| {
				namespace?: string;
				url?: string;
				mock?: boolean;
		  }
		| string
) {
	return function (target: any) {
		// 命名
		if (typeof value == "string") {
			target.prototype.namespace = value;
		}

		// 复杂项
		if (has(value, "namespace")) {
			target.prototype.namespace = value.namespace;
			target.prototype.mock = value.mock;

			if (value.url) {
				target.prototype.url = value.url;
			}
		}
	};
}

export class BaseService {
	constructor(
		options = {} as {
			namespace?: string;
		}
	) {
		if (options?.namespace) {
			this.namespace = options.namespace;
		}
	}

	request(options: any = {}) {
		if (!options.params) options.params = {};

		let ns = "";

		// 是否 mock 模式
		if (this.mock || config.test.mock) {
			// 测试
		} else {
			if (isDev) {
				ns = this.proxy || config.baseUrl;
			} else {
				ns = this.proxy ? this.url : config.baseUrl;
			}
		}

		// 拼接前缀
		if (this.namespace) {
			ns += "/" + this.namespace;
		}

		// 处理地址
		if (options.proxy === undefined || options.proxy) {
			options.url = ns + options.url;
		}

		// 处理参数
		options.data =
			options.method?.toLocaleUpperCase() == "POST" ? options.data : options.params;

		return request(options);
	}

	list(data: any) {
		return this.request({
			url: "/list",
			method: "POST",
			data,
		});
	}

	page(data: any) {
		return this.request({
			url: "/page",
			method: "POST",
			data,
		});
	}

	info(params: any) {
		return this.request({
			url: "/info",
			params,
		});
	}

	update(data: any) {
		return this.request({
			url: "/update",
			method: "POST",
			data,
		});
	}

	delete(data: any) {
		return this.request({
			url: "/delete",
			method: "POST",
			data,
		});
	}

	add(data: any) {
		return this.request({
			url: "/add",
			method: "POST",
			data,
		});
	}
}
