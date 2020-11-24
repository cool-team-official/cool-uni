<template>
	<view
		class="cl-filter-bar"
		:class="[
			{
				'is-sticky': isSticky,
			},
		]"
	>
		<view class="cl-filter-bar-sort">
			<view
				class="cl-filter-bar-sort__field"
				v-for="(item, index) in list2"
				:key="index"
				:class="{
					'is-active': item.value == prop,
				}"
				@tap="changeOrder(item)"
			>
				<text class="cl-filter-bar-sort__label">{{ item.label }}</text>

				<view
					class="cl-filter-bar-sort__order"
					:class="[`is-${item.order}`]"
					v-if="item.order !== undefined"
				>
					<text class="cl-filter-bar-sort__asc"></text>
					<text class="cl-filter-bar-sort__desc"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		value: String,
		list: Array,
		isSticky: Boolean,
	},

	data() {
		return {
			prop: this.value,
			list2: this.list,
		};
	},

	methods: {
		changeOrder(item) {
			if (item.order !== undefined) {
				this.prop = item.value;

				if (!item.order) {
					item.order = "asc";
				} else if (item.order == "asc") {
					item.order = "desc";
				} else if (item.order == "desc") {
					item.order = "";
					this.prop = "";
				}
			} else {
				this.prop = this.prop == item.value ? "" : item.value;
			}

			this.list2.map((e) => {
				if (e.order !== undefined) {
					e.order = e.value == item.value ? e.order : "";
				}
			});

			let params = {
				order: "",
				prop: "",
			};

			if (this.prop) {
				params = {
					order: item.order,
					prop: item.value,
				};

				if (params.prop && params.order) {
				} else if (params.prop && params.order === undefined) {
					params.order = "desc";
				}
			}

			this.$emit("input", params.prop);
			this.$emit("change", params);
		},
	},
};
</script>
