export const proxy = {
	"/dev": {
		target: "http://192.168.0.110:8001",
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/dev/, ""),
	},

	"/prod": {
		target: "https://show.cool-admin.com",
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/prod/, "/api"),
	},
};
