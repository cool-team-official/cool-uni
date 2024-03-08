<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-list-item label="账单"></cl-list-item>
		</cl-card>

		<cl-card label="带图标">
			<cl-list-item label="神仙">
				<template #icon>
					<cl-image :size="60" src="/pages/demo/static/avatar.png" />
				</template>
			</cl-list-item>
		</cl-card>

		<cl-card label="带描述">
			<cl-list-item label="余额">
				<cl-text type="price" :size="30" :value="159.2"></cl-text>
			</cl-list-item>
		</cl-card>

		<cl-card label="禁用">
			<cl-list-item label="银行卡" disabled>
				<text>兴业银行(***1113)</text>
			</cl-list-item>
		</cl-card>

		<cl-card label="滑动">
			<cl-list-item label="向右滑动" swipe="left">
				<template #menu>
					<cl-button type="primary">置顶</cl-button>
					<cl-button type="error">删除</cl-button>
				</template>
			</cl-list-item>

			<cl-list-item label="向左滑动" swipe="right">
				<template #menu>
					<cl-button type="primary">置顶</cl-button>
					<cl-button type="error">删除</cl-button>
				</template>
			</cl-list-item>
		</cl-card>

		<cl-card label="自定义">
			<cl-list-item justify="start">
				<cl-row type="flex" align="center">
					<cl-avatar></cl-avatar>
					<cl-text value="神仙都没用" :margin="[0, 0, 0, 20]"></cl-text>
				</cl-row>

				<template #append>
					<cl-button>修改头像</cl-button>
				</template>
			</cl-list-item>
		</cl-card>

		<cl-card label="按钮组">
			<cl-list :radius="20">
				<cl-list-item label="A"></cl-list-item>
				<cl-list-item label="B"></cl-list-item>
				<cl-list-item label="C"></cl-list-item>
			</cl-list>
		</cl-card>
	</cl-page>
</template>
