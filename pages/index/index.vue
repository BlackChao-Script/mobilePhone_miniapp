<template>
	<view class="index">
		<!-- 搜索 -->
		<Serch />
		<!-- 轮播图 -->
		<Swipers :swipersData="swipersData" />
		<!-- 导航栏 -->
		<SortNav />
		<!-- 商品列表 -->
		<GoodsList :goodsListData="goodsListData" :loading="loading" :showTitle="showTitle" />
		<!-- 返回顶部 -->
		<view class="blkTop" v-if="showBlkTop" @click="clickBlkTop">↑️</view>
	</view>
</template>

<script>
import Serch from '@/components/index/Serch.vue'
import Swipers from '@/components/index/Swipers.vue'
import SortNav from '@/components/index/SortNav.vue'
import GoodsList from '@/common/GoodsList.vue'
import { getGoods, getSwipers } from '@/utils/http.api.js'

export default {
	components: {
		Serch,
		Swipers,
		SortNav,
		GoodsList
	},
	data() {
		return {
			swipersData: [],
			goodsListData: [],
			pageData: {
				pageNum: 1,
				pageSize: 6
			},
			showBlkTop: false,
			loading: true,
			showTitle: true
		}
	},
	onLoad() {
		this.getGoodsListData()
		this.getSwipersData()
	},
	// 触底钩子
	onReachBottom() {
		this.pageData.pageNum += 1
		this.getGoodsListData()
	},
	// 监听页面滚动钩子
	onPageScroll(e) {
		if (e.scrollTop >= 600) {
			this.showBlkTop = true
		} else {
			this.showBlkTop = false
		}
	},
	methods: {
		async getSwipersData() {
			const res = await getSwipers()
			const imgSrc = []
			res.list.forEach(element => {
				imgSrc.push(element.carousel_src)
			})
			this.swipersData = imgSrc
		},
		async getGoodsListData() {
			const data = this.pageData
			const res = await getGoods({ data })
			this.loading = false
			this.goodsListData = [...this.goodsListData, ...res.list]
		},
		clickBlkTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			})
		}
	}
}
</script>

<style lang="scss">
body {
	background-color: $uni-bg-color-grey;
}
.index {
	.blkTop {
		position: fixed;
		bottom: 10%;
		right: 10%;
		width: 70rpx;
		height: 70rpx;
		background-color: $uni-color-error;
		display: flex;
		justify-content: center;
		align-items: center;
		color: $uni-text-color-inverse;
		border-radius: $uni-border-radius-circle;
	}
}
</style>
