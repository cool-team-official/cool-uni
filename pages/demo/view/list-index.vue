<template>
	<cl-page fullscreen>
		<cl-list-index :data="CityPcas"></cl-list-index>
	</cl-page>
</template>

<script lang="ts" setup>
import CityPcas from "../static/city-pcas.json";
</script>
