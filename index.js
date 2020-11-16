import Storage from "./utils/storage";
import Emitter from "./mixins/emitter";

import "./common";

const install = (Vue) => {
	Vue.prototype.$cl = {
		Storage,
	};
};

export { Emitter };

export default {
	install,
};
