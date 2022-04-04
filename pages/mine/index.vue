<template>
	<view class="mine">
		<view class="mine_box">
			<view class="mine_card" v-if="token !== ''">
				<view class="card_img"><u-avatar :src="img" size="70"></u-avatar></view>
				<view class="card_content">
					<text>
						昵称:
						<text style="margin-left: 20rpx;">{{ userInfo.user_name }}</text>
					</text>
					<text>
						登录名:
						<text style="margin-left: 20rpx;">{{ userInfo.user_name }}</text>
					</text>
				</view>
			</view>
			<view class="mine_card" v-else @click="clickToLogin">
				<view class="card_img"><u-avatar size="70"></u-avatar></view>
				<view class="card_content"><text style="margin-top: 50rpx; font-size: 35rpx;">点击登录</text></view>
			</view>
		</view>
		<view class="mine_list">
			<view class="list_item" v-for="(item, index) in mineListData" @tap="toMinePage(item.path)" :key="index">
				<view class="item_box">
					<view class="box_name">{{ item.name }}</view>
					<view class="box_icon"><u-icon name="arrow-right"></u-icon></view>
				</view>
				<u-line></u-line>
			</view>
		</view>
	</view>
</template>

<script>
import { getUserInfo } from '@/utils/http.api.js'

export default {
	data() {
		return {
			img: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
			mineListData: [
				{
					name: '我的订单',
					path: 'order'
				},
				{
					name: '账号管理',
					path: 'account'
				},
				{
					name: '地址管理',
					path: 'address'
				},
				{
					name: '关于我们',
					path: 'about'
				}
			],
			userInfo: {},
			token: ''
		}
	},
	onLoad() {
		this.token = this.$store.state.token
	},
	onShow() {
		this.getUserInfoData()
	},
	methods: {
		async getUserInfoData() {
			if (this.$store.state.token !== '') {
				const res = await getUserInfo({ custom: { auth: true } })
				this.userInfo = res
			}
		},
		clickToLogin() {
			this.$u.route({
				url: 'pages/auth/login'
			})
		},
		toMinePage(path) {
			if (this.$store.state.token == '') {
				uni.$u.toast('请先登录')
				setTimeout(() => {
					this.$u.route({
						url: `pages/auth/login`
					})
				}, 1500)
			} else {
				this.$u.route({
					url: `pages/mine/${path}`
				})
			}
		}
	}
}
</script>

<style lang="scss">
.mine {
	.mine_box {
		display: flex;
		align-items: center;
		flex-direction: column;
		.mine_card {
			display: flex;
			width: 95%;
			height: 240rpx;
			background-color: $uni-color-error;
			border-radius: 10rpx;
			box-shadow: -1px -1px 15rpx #d4237a;
			.card_img {
				width: 30%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.card_content {
				display: flex;
				flex-direction: column;
				margin-top: 50rpx;
				color: $uni-text-color-inverse;
				font-size: 30rpx;
				text {
					margin-top: 20rpx;
				}
			}
		}
	}
	.mine_list {
		margin-top: 70rpx;
		.list_item {
			height: 100rpx;
			.item_box {
				display: flex;
				margin-bottom: 20rpx;
				.box_name {
					width: 90%;
					margin-left: 25rpx;
				}
			}
		}
	}
}
</style>
