import { isArray, isNumber } from './index'

export function parseRpx(val) {
    return isArray(val) ? val.map(parseRpx).join(" ") : (isNumber(val) ? val + "rpx" : val);
}
