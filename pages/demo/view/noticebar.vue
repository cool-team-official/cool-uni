<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-noticebar text="云想衣裳花想容，春风拂槛露华浓。"></cl-noticebar>
		</cl-card>

		<cl-card label="带图标">
			<cl-noticebar
				icon="cl-icon-notification"
				text="云想衣裳花想容，春风拂槛露华浓。"
			></cl-noticebar>
		</cl-card>

		<cl-card label="可关闭">
			<cl-noticebar text="云想衣裳花想容，春风拂槛露华浓。" closeable></cl-noticebar>
		</cl-card>

		<cl-card label="可滑动">
			<cl-noticebar text="云想衣裳花想容，春风拂槛露华浓。" scrollable></cl-noticebar>
		</cl-card>

		<cl-card label="不同方向">
			<cl-noticebar
				:text="[
					'云想衣裳花想容，春风拂槛露华浓云想衣裳花想容，春风拂槛露华浓云想衣裳花想容，春风拂槛露华浓。',
					'这世界那么多人',
					'目光所至则心向往之',
				]"
				direction="vertical"
				scrollable
				:duration="3"
			></cl-noticebar>
		</cl-card>
	</cl-page>
</template>
