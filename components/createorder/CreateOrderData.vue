<template>
	<view class="data">
		<view class="createorder_data">
			<view class="data_item" v-for="item in goodsInfo" :key="item.id">
				<view class="item_price"><image class="price_image" :src="item.goods_img"></image></view>
				<view class="item_content">
					<view class="content_text">{{ item.goods_name }}</view>
					<view class="content_price">￥{{ item.goods_price }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		goodsInfo: Array
	}
}
</script>

<style lang="scss">
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
</style>
