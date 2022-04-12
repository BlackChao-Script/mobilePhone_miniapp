<template>
	<view class="createorder">
		<CreateOrderAddress @toAddress="toAddress" :showAddress="showAddress" :addressData="addressData" :addressa="addressa" :addressb="addressb" />
		<CreateOrderData :goodsInfo="goodsInfo" />
		<CreateNav :price="price" @TopShowPopup="TopShowPopup" />
		<CreatePopup :showPopup="showPopup" @close="close" @createOrderData="createOrderData" />
	</view>
</template>

<script>
import CreateOrderAddress from '@/components/createorder/CreateOrderAddress.vue'
import CreateOrderData from '@/components/createorder/CreateOrderData.vue'
import CreateNav from '@/components/createorder/CreateNav.vue'
import CreatePopup from '@/components/createorder/CreatePopup.vue'

import { getAddress, findgoods, createOrder, updataOrder, remCart } from '@/utils/http.api.js'

export default {
	components: {
		CreateOrderAddress,
		CreateOrderData,
		CreateNav,
		CreatePopup
	},
	data() {
		return {
			addressData: {},
			ids: '',
			goodsInfo: [],
			price: 0,
			addressa: '',
			addressb: '',
			showPopup: false,
			CartId: '',
			showAddress: false
		}
	},
	onLoad(op) {
		this.price = op.price
		this.ids = op.data
		this.CartId = op.id
		this.findgoodsData()
	},
	onShow() {
		this.getAddressData()
	},
	methods: {
		async getAddressData() {
			const res = await getAddress({ custom: { auth: true } })
			if (res.length != 0) {
				const data = res.find(i => i.is_default == true)
				this.showAddress = true
				data.address = data.address.split(',')
				this.addressData = data
				this.addressa = this.addressData.address[0]
				this.addressb = this.addressData.address[1]
			}
		},
		async findgoodsData() {
			const params = {
				ids: this.ids
			}
			const res = await findgoods({ params })
			this.goodsInfo = res
		},
		toAddress() {
			this.$u.route({
				url: 'pages/mine/address'
			})
		},
		TopShowPopup() {
			this.showPopup = true
		},
		close() {
			this.showPopup = false
		},
		async createOrderData() {
			const params = {
				address_id: this.addressData.id,
				goods_info: this.ids,
				total: this.price
			}
			await createOrder(params, { custom: { auth: true } })
			await remCart(this.CartId, {}, { custom: { auth: true } })
			uni.$u.toast('支付成功')
			setTimeout(() => {
				this.$u.route({
					type: 'redirectTo',
					url: 'pages/mine/order'
				})
			}, 1500)
		}
	}
}
</script>
