import { router, useStore } from "/@/cool";

const ignoreToken = ["/pages/user/captcha"];

router.beforeEach((to, next) => {
	const { user } = useStore();

	if (ignoreToken.includes(to.path)) {
		return next();
	} else {
		if (user.token) {
			next();
		} else {
			router.login();
		}
	}
});
