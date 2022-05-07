<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-search placeholder="搜索图片、文章、链接"></cl-search>
		</cl-card>

		<cl-card label="不显示按钮">
			<cl-search placeholder="搜索图片、文章、链接" :show-search-button="false"></cl-search>
		</cl-card>

		<cl-card label="追加内容">
			<cl-search placeholder="搜索图片、文章、链接">
				<template #append>
					<cl-avatar :size="60" src=""></cl-avatar>
				</template>
			</cl-search>
		</cl-card>
	</cl-page>
</template>
