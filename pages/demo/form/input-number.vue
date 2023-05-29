<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-input-number />
		</cl-card>

		<cl-card label="步数">
			<cl-input-number :step="500" :max="10000" />
		</cl-card>

		<cl-card label="禁用">
			<cl-input-number disabled />
		</cl-card>

		<cl-card label="范围（4-10）">
			<cl-input-number :max="10" :min="4" />
		</cl-card>

		<cl-card label="单位">
			<cl-input-number unit="个" />
		</cl-card>
	</cl-page>
</template>

<script lang="ts"></script>
