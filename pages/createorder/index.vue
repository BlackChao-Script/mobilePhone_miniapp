<template>
	<view class="createorder">
		<view class="createorder_address" @tap="toAddress">
			<view class="address_left">
				<view class="left">
					<view class="left_name">{{ addressData.consignee }}</view>
					<view class="left_phone">{{ addressData.phone }}</view>
				</view>
				<view class="left_conetne">
					<view class="content">{{ addressData.address[0] }}</view>
					<view class="content">{{ addressData.address[1] }}</view>
				</view>
			</view>
			<view class="address_right"><u-icon name="arrow-right" size="25"></u-icon></view>
		</view>
		<view class="createorder_data">
			<view class="data_item" v-for="item in goodsInfo" :key="item.id">
				<view class="item_price"><image class="price_image" :src="item.goods_img"></image></view>
				<view class="item_content">
					<view class="content_text">{{ item.goods_name }}</view>
					<view class="content_price">￥{{ item.goods_price }}</view>
				</view>
			</view>
		</view>
		<view class="createorder_nav">
			<view class="nav_top">
				<view class="top_text">商品金额</view>
				<view class="top_price">￥{{ price }}</view>
			</view>
			<view class="nav_button">提交订单</view>
		</view>
	</view>
</template>

<script>
import { getAddress, findgoods } from '@/utils/http.api.js'

export default {
	data() {
		return {
			addressData: [],
			ids: '',
			goodsInfo: [],
			price: 0
		}
	},
	onLoad(op) {
		this.price = op.price

		this.findgoodsData(op.data)
	},
	onShow() {
		this.getAddressData()
	},
	methods: {
		async getAddressData() {
			const res = await getAddress({ custom: { auth: true } })
			const data = res.find(i => i.is_default == true)
			data.address = data.address.split(',')
			this.addressData = data
		},
		async findgoodsData(ids) {
			const params = {
				ids
			}
			const res = await findgoods({ params })
			this.goodsInfo = res
		},
		toAddress() {
			this.$u.route({
				url: 'pages/mine/address'
			})
		}
	}
}
</script>

<style lang="scss">
.createorder {
	.createorder_address {
		height: 150rpx;
		padding: 20rpx;
		display: flex;
		align-items: center;
		border-bottom: 5rpx solid $uni-bg-color-grey;
		.address_left {
			width: 90%;
			.left {
				display: flex;
				.left_name {
					margin-right: 20rpx;
				}
				.left_phone {
					margin-bottom: 10rpx;
				}
			}

			.left_conetne {
				display: flex;
				color: $uni-text-color-grey;
				.content {
					margin-left: 10rpx;
				}
			}
		}
	}
	.createorder_data {
		.data_item {
			display: flex;
			.item_price {
				width: 30%;
				height: 250rpx;
				.price_image {
					width: 100%;
					height: 100%;
				}
			}
			.item_content {
				.content_text {
					margin: 20rpx 0;
				}
				.content_price {
					margin-top: 40rpx;
					font-size: 34rpx;
					color: $uni-color-error;
				}
			}
		}
	}
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
}
</style>
