import App from "./app";
import User from "./user";
import Dict from "./dict";

export function useStore() {
	return {
		app: App(),
		user: User(),
		dict: Dict(),
	};
}
