<template>
	<view class="cart">
		<u-empty mode="car" icon="http://cdn.uviewui.com/uview/empty/car.png" v-if="CartListData.length == 0">
			<u-button @tap="toIndex" shape="circle" color="#d4237a">前往选购</u-button>
		</u-empty>
		<view class="cart_box" v-else>
			<view class="box_list" v-for="item in CartListData" :key="item.id">
				<view class="list_checkbox"><checkbox color="#d4237a" :checked="item.selected" /></view>
				<view class="list_img"><image :src="item.goods_info.goods_img"></image></view>
				<view class="list_content">
					<view class="content_num">×1</view>
					<view class="content_name u-line-1">{{ item.goods_info.goods_name }}</view>
					<view class="content_price">￥{{ item.goods_info.goods_price }}</view>
					<view class="content_button">
						<view class="button_red"><u-icon name="minus"></u-icon></view>
						<view class="button_inp"><input type="text" :value="item.number" /></view>
						<view class="button_add"><u-icon name="plus"></u-icon></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getCartList } from '@/utils/http.api.js'

export default {
	data() {
		return {
			CartListData: []
		}
	},
	onLoad() {
		this.getCartListData()
	},
	methods: {
		toIndex() {
			this.$u.route({
				type: 'reLaunch',
				url: 'pages/index/index'
			})
		},
		async getCartListData() {
			const res = await getCartList({ custom: { auth: true } })
			this.CartListData = res.list
		}
	}
}
</script>

<style lang="scss">
.cart {
	.cart_box {
		.box_list {
			display: flex;
			height: 220rpx;
			margin-top: 20rpx;
			.list_checkbox {
				width: 10%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 10rpx;
			}
			.list_img {
				width: 35%;
				display: flex;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.list_content {
				width: 55%;
				position: relative;
				.content_name {
					width: 300rpx;
					margin-top: 20rpx;
					color: $uni-text-color-grey;
				}
				.content_price {
					color: $uni-color-error;
					font-weight: 900;
					margin-top: 20rpx;
				}
				.content_button {
					margin-top: 20rpx;
					float: right;
					margin-right: 40rpx;
					display: flex;
					.button_red,
					.button_inp,
					.button_add {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 60rpx;
						height: 60rpx;
						margin-left: 10rpx;
						text-align: center;
						background-color: $uni-bg-color-grey;
					}
				}
				.content_num {
					position: absolute;
					top: 20rpx;
					right: 40rpx;
				}
			}
		}
	}
}
</style>
