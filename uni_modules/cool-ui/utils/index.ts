import { isString } from "lodash-es";

// 获取当前颜色
export function getCurrentColor({
	color,
	max,
	value,
}: {
	color: string | string[];
	max: number;
	value: number;
}) {
	if (isString(color)) {
		return color;
	} else {
		const colorArray = color
			.map((item, index) => {
				if (isString(item)) {
					return {
						color: item,
						value: (index + 1) * (max / color.length),
					};
				}
				return item;
			})
			.sort((a, b) => a.value - b.value);

		for (let i = 0; i < colorArray.length; i++) {
			if (colorArray[i].value >= value) {
				return colorArray[i].color;
			}
		}

		return colorArray[colorArray.length - 1].color;
	}
}
