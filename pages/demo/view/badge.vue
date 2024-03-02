<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-badge :value="16">
				<cl-button>消息</cl-button>
			</cl-badge>
		</cl-card>

		<cl-card label="自定义内容">
			<cl-badge value="NEW">
				<cl-button>自定义内容</cl-button>
			</cl-badge>
		</cl-card>

		<cl-card label="自定义内容">
			<cl-badge :value="132" :max="99">
				<cl-button>最大</cl-button>
			</cl-badge>
		</cl-card>

		<cl-card label="点形状">
			<cl-badge :value="132" is-dot>
				<cl-button>点形状</cl-button>
			</cl-badge>
		</cl-card>

		<cl-card label="不同样式">
			<cl-badge :value="132" plain>
				<cl-button>不同样式</cl-button>
			</cl-badge>
		</cl-card>

		<cl-card label="不同状态">
			<cl-row>
				<cl-col :span="6">
					<cl-badge type="primary" is-dot>
						<cl-button>主要</cl-button>
					</cl-badge>
				</cl-col>

				<cl-col :span="6">
					<cl-badge type="success" value="Hot">
						<cl-button>成功</cl-button>
					</cl-badge>
				</cl-col>

				<cl-col :span="6">
					<cl-badge type="error" is-dot>
						<cl-button>失败</cl-button>
					</cl-badge>
				</cl-col>

				<cl-col :span="6">
					<cl-badge type="warning" :value="20">
						<cl-button>警告</cl-button>
					</cl-badge>
				</cl-col>
			</cl-row>
		</cl-card>
	</cl-page>
</template>
