/// <reference types="vite/client" />
/// <reference types="@dcloudio/types/uni-app" />
/// <reference types="./build/cool/dist/eps" />
/// <reference types="./ui/types" />

declare module "*.vue" {
	import { DefineComponent } from "vue";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare module "virtual:ctx";
declare module "virtual:eps";
