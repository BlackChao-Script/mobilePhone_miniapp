<template>
	<view class="order">
		<Tabs :sortList="sortList" @clickChangTab="clickChangTab" />
		<view class="order_box" v-for="item in orderData" :key="item.id">
			<view class="box_title">
				<view class="title_time">订单时间：{{ item.createdAT }}</view>
				<view class="title_start" v-if="item.state == 0">未支付</view>
				<view class="title_start" v-else-if="item.state == 1">已支付</view>
				<view class="title_start" v-else-if="item.state == 2">已发货</view>
				<view class="title_start" v-else-if="item.state == 3">已签收</view>
				<view class="title_start" v-else>取消</view>
			</view>
			<view class="box_item" v-for="value in item.goods_info" :key="value.id">
				<view class="item_price"><image class="price_img" :src="value.goods_img"></image></view>
				<view class="item_content">
					<view class="content_title">
						<view class="title_a">{{ value.goods_name }}</view>
						<view class="title_b">全场包邮</view>
					</view>
					<view class="content_bottom">
						<view class="bottom_price">￥{{ value.goods_price }}</view>
					</view>
				</view>
			</view>
		</view>
		<u-loading-icon :show="showLogin"></u-loading-icon>
		<u-empty v-if="orderData.length == 0" icon="https://cdn.uviewui.com/uview/empty/data.png"></u-empty>
	</view>
</template>

<script>
import { getOrder, findgoods, updataOrder } from '@/utils/http.api.js'
import Tabs from '@/common/Tabs.vue'

export default {
	components: {
		Tabs
	},
	data() {
		return {
			sortList: [
				{
					id: 5,
					name: '全部'
				},
				{
					id: 0,
					name: '未支付'
				},
				{
					id: 1,
					name: '已支付'
				},
				{
					id: 2,
					name: '已发货'
				},
				{
					id: 3,
					name: '已签收'
				},
				{
					id: 4,
					name: '取消'
				}
			],
			orderData: [],
			showLogin: true
		}
	},
	onLoad() {
		this.clickChangTab()
	},
	methods: {
		getGoodsInfo(ids) {
			const params = {
				ids
			}
			return new Promise(resolve => {
				findgoods({ params }).then(res => {
					resolve(res)
				})
			})
		},
		async asyncFn(ids) {
			const resData = await this.getGoodsInfo(ids)
			return resData
		},
		async getOrderData(id) {
			const params = {
				state: 1
			}
			let res = await getOrder({ custom: { auth: true } })
			if (id == 5) {
				if (res.list.toString() == this.orderData.toString()) return
			}
			res.list.forEach(async i => {
				await updataOrder(i.id, params, { custom: { auth: true } })
				i.createdAT = i.createdAT.split('T')[0]
				this.asyncFn(i.goods_info).then(value => (i.goods_info = value))
			})
			this.orderData = res.list
			let data = []
			let j = 0
			const findId = idData => {
				res.list.forEach(i => {
					if (i.state == idData) {
						data[j++] = i
					}
				})
				this.orderData = data
			}
			switch (id) {
				case 0:
					findId(0)
					break
				case 1:
					findId(1)
					break
				case 2:
					findId(2)
					break
				case 3:
					findId(3)
					break
				case 4:
					findId(4)
					break
			}
			this.showLogin = false
		},
		clickChangTab(item) {
			if (item == undefined) {
				this.getOrderData(5)
			} else {
				this.getOrderData(item.id)
			}
		}
	}
}
</script>

<style lang="scss">
.order {
	.order_box {
		padding: 30rpx;
		.box_title {
			display: flex;
			font-size: 26rpx;
			color: $uni-text-color-grey;
			.title_time {
				width: 85%;
			}
		}
		.box_item {
			display: flex;
			.item_price {
				width: 30%;
				height: 250rpx;
				.price_img {
					width: 100%;
					height: 100%;
				}
			}
			.item_content {
				position: relative;
				.content_title {
					.title_a {
						margin-top: 20rpx;
					}
					.title_b {
						margin-top: 10rpx;
						font-size: 26rpx;
						color: $uni-text-color-grey;
					}
				}
				.content_bottom {
					position: absolute;
					bottom: 30rpx;
				}
			}
		}
	}
}
</style>
