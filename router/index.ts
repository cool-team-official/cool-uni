import { router, useStore } from "/@/cool";

const ignoreToken = ["/pages/user/set", "/pages/user/feedback"];

router.beforeEach((to: any, next: Function) => {
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
