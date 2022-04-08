<template>
	<view class="cart">
		<view v-if="CartListData.length == 0"><Empty @toIndex="toIndex" /></view>
		<view class="cart_box" v-else>
			<u-swipe-action>
				<u-swipe-action-item v-for="item in CartListData" :key="item.id" :options="options" @click="remCartItem(item.id)">
					<view class="box_list">
						<view class="list_checkbox"><checkbox color="#d4237a" :checked="item.selected" @tap="tapcheckItem(item.id)" /></view>
						<view class="list_img"><image :src="item.goods_info.goods_img"></image></view>
						<view class="list_content">
							<view class="content_num">×{{ item.number }}</view>
							<view class="content_name u-line-1">{{ item.goods_info.goods_name }}</view>
							<view class="content_price">￥{{ item.goods_info.goods_price }}</view>
							<view class="content_button">
								<view class="button_red" @tap="updateCartNum('red', item.id)"><u-icon name="minus"></u-icon></view>
								<view class="button_inp"><input type="text" :value="item.number" @blur="$event => InpUpdateCartNum($event, item.id)" /></view>
								<view class="button_add" @tap="updateCartNum('add', item.id)"><u-icon name="plus"></u-icon></view>
							</view>
						</view>
					</view>
				</u-swipe-action-item>
			</u-swipe-action>
			<CartNav :checkedAll="checkedAll" @TapChecked="TapChecked" :cartPriceTol="cartPriceTol" />
		</view>
	</view>
</template>

<script>
import { getCartList, remCart, selectAll, unselecAll, updateCart } from '@/utils/http.api.js'
import Empty from '@/components/cart/Empty.vue'
import CartNav from '@/components/cart/CartNav.vue'

export default {
	components: {
		CartNav,
		Empty
	},
	data() {
		return {
			CartListData: [],
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#d4237a'
					}
				}
			],
			checkedAll: false,
			Cartnumber: 0
		}
	},
	onLoad() {
		this.getCartListData()
	},
	computed: {
		cartPriceTol() {
			let Price = 0
			this.CartListData.forEach(i => {
				if (i.selected) {
					Price += i.number * i.goods_info.goods_price
				}
			})
			return Math.floor(Price * 100) / 100
		}
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
			const selectBoolean = this.CartListData.every(i => i.selected == true)
			if (selectBoolean) {
				this.checkedAll = true
			} else {
				this.checkedAll = false
			}
		},
		async remCartItem(id) {
			await remCart(id, {}, { custom: { auth: true } })
			this.getCartListData()
		},
		async tapcheckItem(id) {
			const { selected } = this.CartListData.find(i => i.id == id)
			let params = {}
			if (selected) {
				params = {
					selected: false
				}
			} else {
				params = {
					selected: true
				}
			}
			await updateCart(id, params, { custom: { auth: true } })
			this.getCartListData()
		},
		async updateCartNum(type, id) {
			const arr = this.CartListData.find(i => i.id == id)
			let params = {
				number: arr.number
			}
			switch (type) {
				case 'red':
					if (params.number <= 1) {
						uni.$u.toast('最少剩1件商品')
					} else {
						params.number--
						await updateCart(id, params, { custom: { auth: true } })
						this.getCartListData()
					}
					break
				case 'add':
					if (params.number >= 5) {
						uni.$u.toast('没见商品最多不超过5件')
					} else {
						params.number++
						await updateCart(id, params, { custom: { auth: true } })
						this.getCartListData()
					}
					break
			}
		},
		async InpUpdateCartNum(value, id) {
			let params = {
				number: value.detail.value * 1
			}
			if (params.number <= 1) {
				uni.$u.toast('最少剩1件商品')
			} else if (params.number >= 5) {
				uni.$u.toast('没见商品最多不超过5件')
			} else {
				await updateCart(id, params, { custom: { auth: true } })
				this.getCartListData()
			}
		},
		async TapChecked() {
			if (this.checkedAll) {
				await unselecAll({}, { custom: { auth: true } })
				this.getCartListData()
			} else {
				await selectAll({}, { custom: { auth: true } })
				this.getCartListData()
			}
		}
	}
}
</script>

<style lang="scss">
.cart {
	.cart_box {
		margin-bottom: 100rpx;
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
