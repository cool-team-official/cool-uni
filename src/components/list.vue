<template>
	<view>
		<view v-for="item in 20" :key="item">{{ item }}</view>
	</view>
</template>

<script>
export default {
	props: {
		d: Number
    },
    
    mounted() {
        console.log(this)
    }
};
</script>
