<template>
	<view class="goodsDet">
		<view class="goodsDet_img"><image class="img" :src="goodsInfo.goods_img" mode="aspectFit"></image></view>
		<view class="loading" v-if="loading"><u-loading-icon color="#d4237a"></u-loading-icon></view>
		<view class="goodsDet_content" v-else>
			<view class="content_name">{{ goodsInfo.goods_name }}</view>
			<view class="content_title">{{ goodsData.title }}</view>
			<view class="content_text">
				<text class="text_rule">{{ goodsData.rule }}</text>
				<text style="margin: 0 10rpx ;">|</text>
				<text class="text_rule">{{ goodsData.promise }}</text>
				<text style="margin: 0 10rpx ;">|</text>
				<text class="text_rule">{{ goodsData.pay }}</text>
			</view>
			<view style="margin-top: 20rpx;">
				<text class="content_time">
					发布时间：
					<text style="color: #999;">{{ goodsInfo.createGoodsTime }}</text>
				</text>
				<text style="margin: 0 10rpx ;color: #999;">|</text>
				<text class="content_time">
					销量：
					<text style="color: #999;">{{ goodsInfo.goods_num }}</text>
				</text>
			</view>
			<view class="content_price">
				<text class="price">￥{{ goodsInfo.goods_price }}</text>
				<text class="price1">￥{{ goodsInfo.goods_price + 100 }}</text>
			</view>
		</view>
		<view class="goodsDet_nav" v-if="!loading">
			<view class="nav_icons">
				<view class="icon">
					<view class="icon_icon"><u-icon name="star-fill" size="25"></u-icon></view>
					<view class="icon_text">收藏</view>
				</view>
				<view class="icon" @tap="toCart">
					<view class="icon_icon"><u-icon name="car-fill" size="25"></u-icon></view>
					<view class="icon_text">购物车</view>
					<view class="icon_num" v-if="cartList.length !== 0">{{ cartList.length }}</view>
				</view>
			</view>
			<view class="nav_buttons">
				<view class="button" @tap="addCartData" style="background-color:#d4237a; border-radius: 10% 0 0 10%;">加入购物车</view>
				<view class="button" @tap="toOrder" style="background-color: #d40a4a; border-radius: 0 10% 10% 0;">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getGoodsDet, addCart, getCartList } from '@/utils/http.api.js'

export default {
	data() {
		return {
			goodsData: {},
			goodsInfo: {},
			cartList: [],
			num: 0,
			loading: true,
			id: 0
		}
	},
	onLoad(options) {
		this.id = options.id
		this.getGoodsDet()
		this.getCartNum()
	},
	methods: {
		async getGoodsDet() {
			const params = {
				id: this.id
			}
			const res = await getGoodsDet({ params, custom: { auth: true } })
			this.loading = false
			const { goods_info, ...data } = res
			goods_info.createGoodsTime = goods_info.createGoodsTime.split('T')[0]
			this.goodsData = data
			this.goodsInfo = goods_info
		},
		toCart() {
			this.$u.route({
				type: 'reLaunch',
				url: 'pages/cart/index'
			})
		},
		async addCartData() {
			const data = this.cartList.find(item => {
				return item.goods_info.id == this.goodsData.goods_id
			})
			if (data != undefined || this.num == 1) {
				uni.$u.toast('此商品已添加,无须重复添加')
			} else {
				const params = {
					goods_id: this.goodsData.goods_id
				}
				await addCart(params, { custom: { auth: true } })
				this.num = 1
				this.getCartNum()
			}
		},
		async getCartNum() {
			const res = await getCartList({ custom: { auth: true } })
			this.cartList = res.list
		},
		toOrder() {
			this.$u.route({
				url: 'pages/createorder/index',
				params: {
					data:  this.id,
					price: this.goodsInfo.goods_price
				}
			})
		}
	}
}
</script>

<style lang="scss">
.goodsDet {
	position: relative;
	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%);
	}
	.goodsDet_img {
		height: 800rpx;
		display: flex;
		justify-content: center;
		.img {
			width: 100%;
			height: 100%;
		}
	}
	.goodsDet_content {
		margin: 20rpx;
		box-shadow: -1rpx 1rpx 10rpx rgba(212, 35, 122, 0.3);
		padding: 50rpx;
		border-radius: 10rpx;
		.content_name {
			font-size: 35rpx;
			margin-bottom: 20rpx;
		}
		.content_title {
			font-size: 27rpx;
			margin-bottom: 20rpx;
		}
		.content_text {
			font-size: 25rpx;
			color: $uni-text-color-grey;
		}

		.content_price {
			margin-top: 20rpx;
			.price {
				color: $uni-color-error;
			}
			.price1 {
				margin-left: 10rpx;
				font-size: 25rpx;
				color: $uni-text-color-grey;
			}
		}
		.content_time {
			margin-top: 20rpx;
			font-size: 26rpx;
		}
	}
	.goodsDet_nav {
		margin: 50rpx 20rpx;
		height: 130rpx;
		box-shadow: -1rpx 1rpx 10rpx rgba(212, 35, 122, 0.3);
		display: flex;
		align-items: center;
		.nav_icons {
			width: 30%;
			display: flex;
			justify-content: space-around;
			.icon {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 25rpx;
				.icon_num {
					position: absolute;
					top: -20rpx;
					right: -20rpx;
					width: 45rpx;
					height: 45rpx;
					font-size: 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: $uni-text-color-inverse;
					border-radius: $uni-border-radius-circle;
					background-color: $uni-color-error;
				}
			}
		}
		.nav_buttons {
			margin: 15rpx;
			width: 70%;
			height: 80%;
			display: flex;
			border-radius: 30rpx;
			.button {
				height: 100%;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				color: $uni-text-color-inverse;
			}
		}
	}
}
</style>
