<template>
	<view class="index">
		<!-- 轮播图 --> 
		<Swipers />
		<!-- 搜索 -->
		<Serch />
	</view>
</template>

<script>
import Serch from '@/components/index/Serch.vue'
import Swipers from '@/components/index/Swipers.vue'
export default {
	components: {
		Serch,
		Swipers
	},
	data() {
		return {}
	},
	onLoad() {},
	methods: {}
}
</script>

<style lang="scss">
body {
	background-color: $uni-bg-color-grey;
}
</style>
