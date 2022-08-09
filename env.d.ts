/// <reference types="vite/client" />
/// <reference types="@dcloudio/types/uni-app" />
/// <reference types="./build/cool/temp/eps" />
/// <reference types="./cool/ui/types" />

declare module "*.vue" {
	import { DefineComponent } from "vue";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare const __UNI_PAGES__: string;
declare const __EPS__: string;
