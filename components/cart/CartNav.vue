<template>
	<view class="cart_nav">
		<view class="nav_checkbox">
			<checkbox color="#d4237a" :checked="checkedAll" @tap="TapChecked" />
			<text class="checkbox_text">全选</text>
		</view>
		<view class="nav_price">
			合计:
			<text class="price_text">￥{{ cartPriceTol }}</text>
		</view>
		<view class="nav_button" @tap="toCreateOrder">结算</view>
	</view>
</template>

<script>
export default {
	props: {
		checkedAll: Boolean,
		cartPriceTol: Number,
		CartListData: Array
	},
	methods: {
		TapChecked() {
			this.$emit('TapChecked')
		},
		toCreateOrder() {
			const data = []
			const id = []
			this.CartListData.forEach(i => {
				if (i.selected == true) {
					data.push(i.goods_info.id)
					id.push(i.id)
				}
			})

			this.$u.route({
				url: 'pages/createorder/index',
				params: {
					id: id.join(),
					data: data.join(),
					price: this.cartPriceTol
				}
			})
		}
	}
}
</script>

<style lang="scss">
/* #ifdef MP-WEIXIN */
.cart_nav {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100rpx;
	background-color: #fff;
	z-index: 999;
}
/* #endif */
/* #ifdef H5 */
.cart_nav {
	position: fixed;
	bottom: 50px;
	left: 0;
	right: 0;
	height: 100rpx;
	background-color: #fff;
	z-index: 999;
}
/* #endif */
.cart_nav {
	display: flex;
	align-items: center;
	.nav_checkbox {
		width: 30%;
		margin-left: 20rpx;
		.checkbox_text {
			margin-left: 10rpx;
		}
	}
	.nav_price {
		width: 40%;
		.price_text {
			color: $uni-color-error;
			font-size: 35rpx;
			margin-left: 10rpx;
		}
	}
	.nav_button {
		width: 30%;
		height: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 20rpx;
		border-radius: 15rpx;
		color: #fff;
		background-color: $uni-color-error;
	}
}
</style>
