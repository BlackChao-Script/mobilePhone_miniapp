<template>
	<view class="goodsList">
		<text class="goodsList_title">🔥热销商品</text>
		<!-- #ifdef H5 -->
		<view class="goodsLIst_box">
			<view class="box_item" v-for="(item,index) in goodsListData.length !== 0 ? goodsListData : 4" :key="index">
				<view class="box_img"><image :src="item.goods_img" mode="aspectFit"></image></view>
				<view class="box_name">{{ item.goods_name }}</view>
				<view class="box_price">￥{{ item.goods_price }}</view>
			</view>
		</view> 
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="goodsLIst_box">
			<view class="box_item" v-for="item in goodsListData" :key="item.id">
				<view class="box_img"><image :src="item.goods_img" mode="aspectFit"></image></view>
				<view class="box_name">{{ item.goods_name }}</view>
				<view class="box_price">￥{{ item.goods_price }}</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- 骨架�-->
		<u-skeleton bg-color="#fff" :loading="loading" :animation="true"></u-skeleton>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	props: {
		goodsListData: Array,
		loading: Boolean
	},
	onLoad() {}
}
</script>

<style lang="scss">
.goodsList {
	.goodsList_title {
		display: flex;
		justify-content: center;
		margin: 20rpx;
	}
	.goodsLIst_box {
		display: flex;
		flex-wrap: wrap;
		.box_item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 47%;
			height: 500rpx;
			margin-bottom: 20rpx;
			border-radius: 10rpx;
			margin-left: 15rpx;
			background-color: #fff;
			.box_img {
				margin-top: 30rpx;
				height: 350rpx;
				image {
					height: 100%;
				}
			}
			.box_name {
				font-size: 28rpx;
				margin-top: 20rpx;
			} 
			.box_price {
				margin-top: 20rpx;
				font-size: 25rpx;
				color: $uni-color-error;
			}
		}
	}
}
</style>
