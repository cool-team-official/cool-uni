import { isString } from "lodash";

// 获取当前颜色
export function getCurrentColor({ color, max, value }: any) {
	if (isString(color)) {
		return color;
	} else {
		const colorArray = color
			.map((item: any, index: number) => {
				if (isString(item)) {
					return {
						color: item,
						value: (index + 1) * (max / color.length),
					};
				}
				return item;
			})
			.sort((a: any, b: any) => a.value - b.value);

		for (let i = 0; i < colorArray.length; i++) {
			if (colorArray[i].value >= value) {
				return colorArray[i].color;
			}
		}

		return colorArray[colorArray.length - 1].color;
	}
}
