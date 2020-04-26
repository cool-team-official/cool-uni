<template>
	<view class="cl-grid-item" :style="{ width }">
		<slot></slot>
	</view>
</template>

<script>
import { getParent } from '../../utils';

export default {
	componentName: 'ClGridItem',

	computed: {
		parent() {
			return getParent.call(this, 'ClGrid', ['column', 'border']);
		},

		width() {
			return 100 / (this.parent.column || 0) + '%';
		}
	}
};
</script>