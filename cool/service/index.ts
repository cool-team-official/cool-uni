import { BaseService } from "./base";

// 服务
export const service: Eps.Service = {
	request: new BaseService().request,
};

export * from "./base";
export * from "./request";
