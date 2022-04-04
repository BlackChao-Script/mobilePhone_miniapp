<template>
	<view class="goodsList">
		<text class="goodsList_title">🔥热销商品</text>
		<view class="goodsLIst_box">
			<view class="box_item" v-for="(item, index) in goodsListData" :key="item.id" @click="ClickToGoodsDet(item.id)">
				<view class="box_img"><image :src="item.goods_img" mode="aspectFit"></image></view>
				<view class="box_name">{{ item.goods_name }}</view>
				<view class="box_price">￥{{ item.goods_price }}</view>
			</view>
		</view>
		<u-loading-icon :show="loading" color="#d4237a"></u-loading-icon>
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
	onLoad() {},
	methods: {
		ClickToGoodsDet(id) {
			if (this.$store.state.token == '') {
				uni.$u.toast('请先登录')
				setTimeout(() => {
					this.$u.route({
						url: 'pages/auth/login'
					})
				}, 1500)
			} else {
				this.$u.route({
					url: 'pages/goodsDet/index',
					params: {
						id
					}
				})
			}
		}
	}
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
