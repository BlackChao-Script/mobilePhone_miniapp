<template>
	<view class="sortNav">
		<view class="sortNav_item" v-for="(item, index) in sortNav_itemData" :key="index">
			<view class="item_icon"><u-icon :name="item.iconName" color="#fff" size="28"></u-icon></view>
			<view class="item_text">{{ item.text }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			sortNav_itemData: [
				{
					iconName: 'grid',
					color: '#ff0000',
					text: '全部分类'
				},
				{
					iconName: 'file-text',
					color: '#fabb51',
					text: '我的订单'
				},
				{
					iconName: 'star',
					color: '#eca8d8',
					text: '我的收藏'
				}
			]
		}
	},
	methods: {}
}
</script>

<style lang="scss">
.sortNav {
	display: flex;
	height: 200rpx;
	margin: 20rpx 0;
	background-color: $uni-bg-color;
	.sortNav_item {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		margin: 0 10rpx;
		.item_icon {
			width: 50%;
			height: 55%;
			border-radius: $uni-border-radius-circle;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: $uni-color-error;
		}
		.item_text {
			font-size: 26rpx;
			color: $uni-text-color-grey;
		}
	}
}
</style>
