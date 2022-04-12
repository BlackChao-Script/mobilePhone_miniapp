<template>
	<view class="address">
		<view class="createorder_address" @tap="toAddress">
			<view class="address_left" v-if="showAddress">
				<view class="left">
					<view class="left_name">{{ addressData.consignee }}</view>
					<view class="left_phone">{{ addressData.phone }}</view>
				</view>
				<view class="left_conetne">
					<view class="content">{{ addressa }}</view>
					<view class="content">{{ addressb }}</view>
				</view>
			</view>
			<view class="address_left" v-else>暂无地址,请前往添加地址</view>
			<view class="address_right"><u-icon name="arrow-right" size="25"></u-icon></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		addressData: Object,
		addressa: String,
		addressb: String,
		showAddress: Boolean
	},
	methods: {
		toAddress() {
			this.$emit('toAddress')
		}
	}
}
</script>

<style lang="scss">
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
</style>
