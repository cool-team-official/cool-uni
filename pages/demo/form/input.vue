<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-input />
		</cl-card>

		<cl-card label="可清空">
			<cl-input clearable />
		</cl-card>

		<cl-card label="禁用">
			<cl-input disabled />
		</cl-card>

		<cl-card label="插槽：prepend">
			<cl-input>
				<template #prepend>
					<text>https://</text>
				</template>
			</cl-input>
		</cl-card>

		<cl-card label="插槽：append">
			<cl-input>
				<template #append>
					<text>.com</text>
				</template>
			</cl-input>
		</cl-card>
	</cl-page>
</template>

<script lang="ts"></script>
