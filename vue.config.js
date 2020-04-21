const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	publicPath: '/',
	lintOnSave: true,
	productionSourceMap: false,
	parallel: require('os').cpus().length > 1,

	css: {
		extract: isProduction,
		sourceMap: false
	},

	devServer: {
		disableHostCheck: true,
		port: 9000,
		open: false,
		compress: false,
		overlay: {
			warnings: false,
			errors: true
		},

		proxy: {
			'/dev': {
				target: 'http://127.0.0.1:7001',

				changeOrigin: true,
				pathRewrite: { '^/dev': '' }
			},
			'/pro': {
				target: 'https://show.cool-admin.com',

				changeOrigin: true,
				pathRewrite: { '^/pro': '/api' }
			}
		}
	}
};
