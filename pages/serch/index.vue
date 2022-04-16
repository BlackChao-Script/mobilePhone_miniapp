<template>
	<view class="serch">
		<view class="serch_content"><u-search :clearabled="false" :show-action="true" actionText="搜索" :animation="true" @custom="customSerch"></u-search></view>
		<view class="serch_sub"><u-subsection :list="list" :current="current" activeColor="#d4237a" @change="sectionChange"></u-subsection></view>

		<view class="serch_goodsList">
			<view class="goodsList_item" v-for="item in goodsData" :key="item.id" @click="toGoodsDet(item.id)">
				<view class="item_img"><image class="img" :src="item.goods_img" mode="aspectFit"></image></view>
				<view class="item_content">
					<view class="conetnt_name">{{ item.goods_name }}</view>
					<view class="content_price">￥{{ item.goods_price }}</view>
				</view>
			</view>
		</view>
		<view class="serch_empty" v-if="this.goodsData.length == 0"><u-empty text="搜索想要的商品"></u-empty></view>
	</view>
</template>

<script>
import { serchGoods } from '@/utils/http.api.js'

export default {
	data() {
		return {
			list: ['推荐', '新品', '价格'],
			current: 0,
			goodsData: [],
			keyWord: ''
		}
	},
	methods: {
		sectionChange(index) {
			this.current = index
			if (this.goodsData.length != 0) {
				if (this.current == 0) {
					this.customSerch(this.keyWord)
				}
				if (this.current == 1) {
					this.goodsData.sort((a, b) => {
						return a.createGoodsTime < b.createGoodsTime ? 1 : -1
					})
				}
				if (this.current == 2) {
					this.goodsData.sort((a, b) => {
						return a.goods_price > b.goods_price ? 1 : -1
					})
				}
			}
		},
		async customSerch(value) {
			this.keyWord = value
			const params = {
				keyWord: value
			}
			const res = await serchGoods({ params, custom: { auth: true } })
			this.goodsData = res
			this.current = 0
		},
		toGoodsDet(id) {
			this.$u.route({
				url: 'pages/goodsDet/index',
				params: {
					id
				}
			})
		}
	}
}
</script>

<style lang="scss">
.serch {
	.serch_content {
		width: 90%;
		display: flex;
		margin: 20rpx;
		margin-left: 50%;
		transform: translate(-50%);
		justify-content: center;
		background-color: $uni-bg-color;
		border-radius: 30%;
	}
	.serch_sub {
		width: 90%;
		margin-left: 50%;
		transform: translate(-50%);
	}
	.serch_empty {
		margin-top: 50rpx;
	}
	.serch_goodsList {
		.goodsList_item {
			display: flex;
			height: 250rpx;
			margin-bottom: 10rpx;
			.item_img {
				width: 30%;
				.img {
					width: 100%;
					height: 100%;
				}
			}
			.item_content {
				.conetnt_name {
					margin-top: 20rpx;
					font-size: 35rpx;
				}
				.content_price {
					margin-top: 50rpx;
					color: $uni-color-error;
				}
			}
		}
	}
}
</style>
