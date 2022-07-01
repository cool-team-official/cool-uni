import dayjs from "dayjs";
import { config } from "../../config";
import { service } from "../service";
import { basename } from "../../utils";
import { useStore } from "../store";
import { videoPoster, resizeImage } from "./url";

declare interface UploadCallback {
	onProgressUpdate?(options: UniApp.OnProgressUpdateResult): void;
	onTask?(task: UniApp.UploadTask): void;
}

export async function upload(file: any, cb?: UploadCallback): Promise<string> {
	const { onProgressUpdate, onTask } = cb || {};

	// 获取上传模式
	const { mode, type } = await service.base.comm.uploadMode();

	// 用户缓存
	const { user } = useStore();

	// 多种上传请求
	return new Promise((resolve, reject) => {
		// 上传文件
		function next({ host, preview, data }: any) {
			// 随机值
			const rd: string = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

			// 文件名
			let fileName = rd + "_" + (file.name || basename(file.path));

			// 签名数据
			const fd: any = {
				...data,
			};

			// 云端拼接路径
			if (mode == "cloud") {
				fileName = ["app", dayjs().format("YYYY-MM-DD"), fileName]
					.filter(Boolean)
					.join("/");
			}

			// 文件名
			fd.key = fileName;

			// 上传
			const task = uni.uploadFile({
				url: host,
				filePath: file.path,
				name: "file",
				header: {
					Authorization: user.token || "",
				},
				formData: fd,
				success(res2) {
					if (mode === "local") {
						const { code, data, message } = JSON.parse(res2.data);
						if (code == 1000) {
							resolve(data);
						} else {
							reject(message);
						}
					} else {
						resolve(`${preview || host}/${fileName}`);
					}
				},
				fail(err) {
					reject(err);
				},
			});

			if (onTask) {
				onTask(task);
			}

			if (onProgressUpdate) {
				task.onProgressUpdate(onProgressUpdate);
			}
		}

		if (mode == "local") {
			next({
				host: config.baseUrl + "/app/base/comm/upload",
			});
		} else {
			service.base.comm
				.upload()
				.then((res) => {
					switch (type) {
						// 腾讯
						case "cos":
							next({
								host: res.url,
								data: res.credentials,
							});
							break;
						// 阿里
						case "oss":
							next({
								host: res.host,
								data: {
									OSSAccessKeyId: res.OSSAccessKeyId,
									policy: res.policy,
									signature: res.signature,
								},
							});
							break;
						// 七牛
						case "qiniu":
							next({
								host: res.uploadUrl,
								preview: res.publicDomain,
								data: {
									token: res.token,
								},
							});
							break;
					}
				})
				.catch(reject);
		}
	});
}

export function useUpload() {
	return {
		upload,
		videoPoster,
		resizeImage,
	};
}
