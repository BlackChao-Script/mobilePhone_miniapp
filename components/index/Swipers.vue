<template>
	<!-- #ifndef APP-NVUE || MP-TOUTIAO -->
	<view class="u-demo-block">
		<u-swiper :list="swipersData" previousMargin="30" nextMargin="30" circular :autoplay="true" radius="5" bgColor="#ffffff"></u-swiper>
	</view>
	<!-- #endif -->
</template>

<script>
export default {
	data() {
		return {}
	},
	props: {
		swipersData: Array
	}
}
</script>

<style lang="scss"></style>
