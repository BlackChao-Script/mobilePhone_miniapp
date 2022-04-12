<template>
	<view class="order"><Tabs :sortList="sortList" @clickChangTab="clickChangTab" /></view>
</template>

<script>
import { getOrder } from '@/utils/http.api.js'
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
			orderData: []
		}
	},
	onLoad() {
		this.clickChangTab()
	},
	methods: {
		async clickChangTab(item) {
			let res = []
			if (item == undefined) {
				res = await getOrder({ custom: { auth: true } })
				this.orderData = res.list
				for (let i in this.orderData) {
					this.orderData[i].createdAT = this.orderData[i].createdAT.split('T')[0]
				}
				console.log(this.orderData)
				return
			}
			let data = []
			const finorderData = async id => {
				let j = 0
				res = await getOrder({ custom: { auth: true } })
				this.orderData = res.list
				for (let i in this.orderData) {
					this.orderData[i].createdAT = this.orderData[i].createdAT.split('T')[0]
					if (this.orderData[i].state == id) {
						data[j++] = this.orderData[i]
					}
				}
			}
			switch (item.id) {
				case 0:
					finorderData(0)
					this.orderData = data
					break
				case 1:
					finorderData(1)
					this.orderData = data
					break
				case 2:
					finorderData(2)
					this.orderData = data
					break
				case 3:
					finorderData(3)
					this.orderData = data
					break
				case 4:
					finorderData(4)
					this.orderData = data
					break
			}
		}
	}
}
</script>

<style lang="scss"></style>
