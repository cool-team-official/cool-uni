import io from "@hyoga/uni-socket.io";
import { isString } from "lodash";
import { config } from "../../config";
import { useCool } from "../hook";
import { useStore } from "../store";

declare interface Socket {
	client: any;
	token: string | unknown;
	connect(): void;
	close(): void;
	on(name: string, cb: (msg: any) => void): void;
	send(data: any): void;
}

const socket: Socket = {
	client: null,
	token: null,

	// 连接
	async connect() {
		const { mitt } = useCool();
		const { user } = useStore();

		if (!user.token || !user.info) {
			return false;
		}

		if (user.token == this.token) {
			return false;
		}

		if (this.client) {
			this.close();
			return false;
		}

		this.client = io(`${config.host}/chat?token=${user.token}`, {
			query: {},
			transports: ["websocket", "polling"],
			timeout: 5000,
		});

		// 连接
		this.on("connect", () => {
			console.log("连接成功", user.info?.nickName);

			// 记录上次
			this.token = user.token;

			// 监听消息
			this.on("message", (msg: any) => {
				if (!isString(msg)) {
					console.log("接收消息", msg);

					if (user.info?.id != msg.fromId) {
						mitt.emit("chat-message", msg);
					}
				}
			});
		});

		// 异常
		this.on("error", (msg: string) => {
			console.error("连接失败", msg);
		});
	},

	// 监听
	on(name: string, cb: (msg: any) => void) {
		this.client.on(name, cb);
	},

	// 关闭
	close() {
		this.client.close();
	},

	// 发消息
	send(data: any) {
		this.client.emit("message", {
			...data,
			content: JSON.stringify(data.content),
		});
	},
};

export { socket };
