import App from "./app";
import User from "./user";

export function useStore() {
	return {
		app: App(),
		user: User(),
	};
}
