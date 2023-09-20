import dayjs from "dayjs";
import { config } from "../../config";
import { service } from "../service";
import { basename, pathJoin, uuid } from "../utils";
import { useStore } from "../store";
import { videoPoster, resizeImage } from "./comm";

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

	// 本地上传
	const isLocal = mode == "local";

	// 文件名
	const fileName = uuid() + "_" + (file.name || basename(file.path));

	// Key
	const key = isLocal ? fileName : pathJoin("app", dayjs().format("YYYY-MM-DD"), fileName);

	// 多种上传请求
	return new Promise((resolve, reject) => {
		// 上传文件
		function next({ host, preview, data }: { host: string; preview?: string; data?: any }) {
			// 签名数据
			const fd = {
				...data,
				key,
			};

			// 上传
			const task = uni.uploadFile({
				url: host,
				filePath: file.path,
				name: "file",
				header: isLocal
					? {
							Authorization: user.token,
					  }
					: {},
				formData: fd,
				success(res) {
					if (isLocal) {
						const { code, data, message } = JSON.parse(res.data);
						if (code == 1000) {
							resolve(data);
						} else {
							reject(message);
						}
					} else {
						resolve(pathJoin(preview || host, fd.key));
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

		if (isLocal) {
			next({
				host: config.baseUrl + "/app/base/comm/upload",
			});
		} else {
			service.base.comm
				.upload(
					type == "aws"
						? {
								key,
						  }
						: {}
				)
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
						// aws
						case "aws":
							next({
								host: res.url,
								data: res.fields,
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
