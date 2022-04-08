<template>
	<view class="sort">
		<Tabs :sortList="sortList" @clickChangTab="clickChangTab" />
		<GoodsList :goodsListData="sortListData" :loading="loading" :showTitle="showTitle" />
		<u-empty v-if="sortListData.length == 0" icon="https://cdn.uviewui.com/uview/empty/data.png"></u-empty>
	</view>
</template>

<script>
import { getSort, getSortData } from '@/utils/http.api.js'
import Tabs from '@/components/sort/Tabs.vue'
import GoodsList from '@/common/GoodsList.vue'

export default {
	components: {
		Tabs,
		GoodsList
	},
	data() {
		return {
			sortList: [],
			sortListData: [],
			loading: true,
			showTitle: false
		}
	},
	onLoad() {
		this.getSortList()
		this.clickChangTab()
	},
	methods: {
		async getSortList() {
			const res = await getSort()
			this.sortList = res.map(({ id, sort_name: name }) => {
				return {
					id,
					name
				}
			})
		},
		async clickChangTab(item) {
			let data = {}
			if (item == undefined) {
				data = {
					id: 1
				}
			} else {
				data = {
					id: item.id
				}
			}
			const res = await getSortData({ data })
			this.loading = false
			this.sortListData = res.res
		}
	}
}
</script>

<style></style>
