<template>
	<view class="goodsDet">
		<view class="goodsDet_img"></view>
		<view class="goodsDet_content"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			goods_id: 0,
			
		}
	},
	onLoad(options) {
		this.goods_id = options.id
	},
	methods: {
	}
}
</script>

<style></style>
