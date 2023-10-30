import type { Plugin } from "vite";
import { createEps } from "./eps";
import { createCtx } from "./ctx";

export function virtual(): Plugin {
	const virtualModuleIds = ["virtual:eps", "virtual:ctx"];

	return {
		name: "vite-cool-virtual",
		enforce: "pre",
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				// 页面刷新时触发
				if (req.url == "/@vite/client") {
					// 重新加载虚拟模块
					virtualModuleIds.forEach((vm) => {
						const mod = server.moduleGraph.getModuleById(`\0${vm}`);

						if (mod) {
							server.moduleGraph.invalidateModule(mod);
						}
					});
				}

				next();
			});
		},
		async handleHotUpdate({ file, server }) {
			// 代码保存时触发
			if (!file.includes("build/cool/dist")) {
				const { service } = await createEps();

				// 通知客户端刷新
				server.ws.send({
					type: "custom",
					event: "eps-update",
					data: {
						service,
					},
				});
			}
		},
		resolveId(id) {
			if (virtualModuleIds.includes(id)) {
				return "\0" + id;
			}
		},
		async load(id) {
			if (id === "\0virtual:eps") {
				const { service } = await createEps();

				return `
					export const eps = ${JSON.stringify({ service })}
				`;
			}

			if (id === "\0virtual:ctx") {
				const { pages } = createCtx();

				return `
                    export const ctx = ${JSON.stringify(JSON.parse(pages))}
                `;
			}
		},
	};
}
