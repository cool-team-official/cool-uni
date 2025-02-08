import { config } from "../../config";
import request from "./request";

export class BaseService {
	namespace?: string;

	constructor(namespace?: string) {
		if (namespace) {
			this.namespace = namespace;
		}
	}

	// 发送请求
	async request(options: any = {}) {
		let url = options.url;

		if (url && url.indexOf("http") < 0) {
			if (this.namespace) {
				url = this.namespace + url;
			}

			if (options.proxy !== false) {
				url = config.baseUrl + "/" + url;
			}
		}

		// 处理参数
		options.data =
			options.method?.toLocaleUpperCase() == "POST" ? options.data : options.params;

		return request({
			...options,
			url,
		});
	}

	// 获取列表
	async list(data: any) {
		return this.request({
			url: "/list",
			method: "POST",
			data,
		});
	}

	// 分页查询
	async page(data: any) {
		return this.request({
			url: "/page",
			method: "POST",
			data,
		});
	}

	// 获取信息
	async info(params: any) {
		return this.request({
			url: "/info",
			params,
		});
	}

	// 更新数据
	async update(data: any) {
		return this.request({
			url: "/update",
			method: "POST",
			data,
		});
	}

	// 删除数据
	async delete(data: any) {
		return this.request({
			url: "/delete",
			method: "POST",
			data,
		});
	}

	// 添加数据
	async add(data: any) {
		return this.request({
			url: "/add",
			method: "POST",
			data,
		});
	}
}
