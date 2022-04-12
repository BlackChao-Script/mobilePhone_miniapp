<template>
	<view class="nav">
		<view class="createorder_nav">
			<view class="nav_top">
				<view class="top_text">商品金额</view>
				<view class="top_price">￥{{ price }}</view>
			</view>
			<view class="nav_button" @tap="TopShowPopup">提交订单</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		price: String
	},
	methods: {
		TopShowPopup() {
			this.$emit('TopShowPopup')
		}
	}
}
</script>

<style lang="scss">
.createorder_nav {
	position: fixed;
	bottom: 0;
	height: 200rpx;
	width: 100%;
	border-top: 5rpx solid $uni-bg-color-grey;
	.nav_top {
		height: 90rpx;
		line-height: 90rpx;
		display: flex;
		.top_text {
			width: 73%;
			margin-left: 40rpx;
		}
		.top_price {
			font-size: 35rpx;
			font-weight: 700;
			color: $uni-color-error;
		}
	}
	.nav_button {
		height: 90rpx;
		width: 90%;
		margin: 0 auto;
		text-align: center;
		line-height: 90rpx;
		border-radius: 10rpx;
		color: #fff;
		background-color: $uni-color-error;
	}
}
</style>
