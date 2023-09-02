import { router, useStore } from "/@/cool";

const ignoreToken = ["/pages/user/login", "/pages/user/captcha", "/pages/user/doc"];

router.beforeEach((to, next) => {
	const { user } = useStore();

	if (ignoreToken.includes(to.path)) {
		next();
	} else {
		if (user.token) {
			next();
		} else {
			router.login();
		}
	}
});
