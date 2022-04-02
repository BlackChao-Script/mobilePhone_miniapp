<template>
	<!-- #ifndef APP-NVUE || MP-TOUTIAO -->
	<view class="u-demo-block">
		<u-swiper :list="list3" previousMargin="30" nextMargin="30" circular :autoplay="true" radius="5" bgColor="#ffffff"></u-swiper>
	</view>
	<!-- #endif -->
</template>  

<script>
export default {
	data() {
		return {
			list3: ['https://cdn.uviewui.com/uview/swiper/swiper3.png', 'https://cdn.uviewui.com/uview/swiper/swiper2.png', 'https://cdn.uviewui.com/uview/swiper/swiper1.png']
		}
	}
}
</script>

<style lang="scss">
</style>
