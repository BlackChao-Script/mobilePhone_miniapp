<template>
	<view class="address">
		<view class="address_list" v-for="item in addressData" :key="item.id">
			<view class="list_left">
				<view class="left_top">
					<text class="top_phone">{{ item.consignee }}</text>
					<text>{{ item.phone }}</text>
					<text class="top_icon" v-show="item.is_default">默认</text>
				</view>
				<view class="left_bottom">
					<text class="bottom_one">江西省</text>
					<text class="bottom_two">宜春市</text>
					<text class="bottom_three">丰城市</text>
					<text class="bottom_last">213321312321223211</text>
				</view>
			</view>
			<view class="list_right"><u-icon name="edit-pen" size="28" @tap="updateAddress"></u-icon></view>
		</view>
		<view class="addres_nav"><view class="nav_button" @tap="addAddress">新增地址</view></view>
	</view>
</template>

<script>
import { getAddress } from '@/utils/http.api.js'

export default {
	components: {},
	data() {
		return {
			addressData: []
		}
	},
	onLoad() {
		this.getAddressData()
	},
	methods: {
		async getAddressData() {
			const res = await getAddress({ custom: { auth: true } })
			this.addressData = res
			// console.log(this.addressData)
		},
		updateAddress() {},
		addAddress() {
			this.$u.route({
				url: 'pages/mine/addressForm'
			})
		}
	}
}
</script>

<style lang="scss">
.address {
	margin-bottom: 100rpx;
	.address_list {
		display: flex;
		align-items: center;
		padding: 20rpx;
		height: 130rpx;
		margin-top: 10rpx;
		.list_left {
			width: 80%;
			margin-left: 60rpx;
			.left_top {
				.top_phone {
					margin-right: 20rpx;
				}
				.top_icon {
					display: inline-block;
					width: 90rpx;
					height: 50rpx;
					margin-left: 30rpx;
					line-height: 50rpx;
					text-align: center;
					color: #fff;
					border-radius: 20rpx;
					background-color: $uni-color-error;
				}
			}
			.left_bottom {
				color: $uni-text-color-grey;
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				.bottom_one,
				.bottom_two,
				.bottom_three {
					margin-right: 10rpx;
				}
				.bottom_last {
					display: inline-block;
					width: 250rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
	.addres_nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 120rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1rpx solid $uni-color-error;
		z-index: 999;
		.nav_button {
			width: 90%;
			height: 85%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 10rpx;
			color: $uni-text-color-inverse;
			background-color: $uni-color-error;
		}
	}
}
</style>
