<template>
	<view class="demo-noticebar">
		<cl-card label="单行" padding="0">
			<cl-noticebar text="云想衣裳花想容，春风拂槛露华浓。"></cl-noticebar>
		</cl-card>

		<cl-card label="多行" padding="0">
			<cl-noticebar
				text="锦瑟无端五十弦，一弦一柱思华年。庄生晓梦迷蝴蝶，望帝春心托杜鹃。沧海月明珠有泪，蓝田日暖玉生烟。此情可待成追忆，只是当时已惘然。"
			></cl-noticebar>
		</cl-card>

		<cl-card label="水平滚动" padding="0">
			<cl-noticebar
				scrollable
				text="枕前发尽千般愿，要休且待青山烂。水面上秤锤浮，直待黄河彻底枯"
			></cl-noticebar>
		</cl-card>

		<cl-card label="垂直滚动" padding="0">
			<cl-noticebar
				:text="[
					'云想衣裳花想容，春风拂槛露华浓。',
					'枕前发尽千般愿，要休且待青山烂。水面上秤锤浮，直待黄河彻底枯',
					'我欲与君相知，长命无绝衰。山无陵，江水为竭，冬雷震震，夏雨雪，天地合，乃敢与君绝。'
				]"
				direction="vertical"
				scrollable
			></cl-noticebar>
		</cl-card>

		<cl-card label="带图标" padding="0">
			<cl-noticebar
				scrollable
				icon="cl-icon-notification"
				text="我欲与君相知，长命无绝衰。山无陵，江水为竭，冬雷震震，夏雨雪，天地合，乃敢与君绝。"
			></cl-noticebar>
		</cl-card>

		<cl-card label="自定义" padding="0">
			<cl-noticebar
				scrollable
				color="#E6A23C"
				background-color="#FBF5E9"
				text="情不知所起，一往而深；生者可以死，死可以生。"
			>
				<cl-avatar
					slot="icon"
					:size="50"
					src="http://pic2.zhimg.com/50/v2-fb824dbb6578831f7b5d92accdae753a_hd.jpg"
				></cl-avatar>
			</cl-noticebar>
		</cl-card>

		<cl-card label="带关闭" padding="0">
			<cl-noticebar
				closeable
				text="去年今日此门中，人面桃花相映红。人面不知何处去，桃花依旧笑春风。"
			>
			</cl-noticebar>
		</cl-card>
	</view>
</template>

<style lang="scss" scoped>
.demo-noticebar {
}
</style>