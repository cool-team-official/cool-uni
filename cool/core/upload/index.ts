import dayjs from "dayjs";
import { baseUrl } from "../../config";
import { service } from "../service";
import { extname } from "../../utils";
import { useStore } from "../store";
import { videoPoster, resizeImage } from "./url";

declare interface UploadCallback {
	onProgressUpdate?(options: UniApp.OnProgressUpdateResult): void;
	onTask?(task: UniApp.UploadTask): void;
}

export async function upload(file: any, cb?: UploadCallback): Promise<string> {
	const { onProgressUpdate, onTask } = cb || {};

	// 获取上传模式
	const { mode } = await service.base.comm.uploadMode();

	// 用户缓存
	const { user } = useStore();

	// 多种上传请求
	return new Promise((resolve, reject) => {
		function next(res: any) {
			// 随机值
			const rd: string = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			// 重命名
			const filename = `${rd}.${extname(file.name || file.path)}`;
			// 上传表单
			const formData: any = {
				key: filename,
			};

			if (mode != "local") {
				formData.OSSAccessKeyId = res.OSSAccessKeyId;
				formData.policy = res.policy;
				formData.signature = res.signature;
				formData.success_action_status = res.success_action_status;
				formData.key = `app/${dayjs().unix()}/${filename}`;
			}

			// 上传
			const task = uni.uploadFile({
				url: res.host,
				filePath: file.path,
				name: "file",
				header: {
					Authorization: user.token || "",
				},
				formData,
				success(res2) {
					if (mode === "local") {
						const { code, data, message } = JSON.parse(res2.data);
						if (code == 1000) {
							resolve(data);
						} else {
							reject(message);
						}
					} else {
						resolve(`${res.host}/${formData.key}`);
					}
				},
				fail: (err) => {
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
				host: baseUrl + "/app/base/comm/upload",
			});
		} else {
			service.base.comm.upload().then(next).catch(reject);
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
