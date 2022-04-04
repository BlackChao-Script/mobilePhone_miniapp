<template>
	<view class="mine">
		<view class="mine_box">
			<view class="mine_card" v-if="token !== ''">
				<view class="card_img"><u-avatar :src="img" size="70"></u-avatar></view>
				<view class="card_content">
					<text>昵称: {{ userInfo.user_name }}</text>
					<text>登录名: {{ userInfo.user_name }}</text>
				</view>
			</view>
			<view class="mine_card" v-else @click="clickToLogin">
				<view class="card_img"><u-avatar src="img" size="70"></u-avatar></view>
				<view class="card_content"><text style="margin-top: 50rpx; font-size: 35rpx;">点击登录</text></view>
			</view>
		</view>
		<view class="mine_list">
			<view class="list_item" v-for="(item, index) in mineListData" :key="index">
				<view class="item_box">
					<view class="box_name">{{ item }}</view>
					<view class="box_icon"><u-icon name="arrow-right"></u-icon></view>
				</view>
				<u-line></u-line>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			img: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
			mineListData: ['我的订单', '账号管理', '地址管理', '关于我们'],
			userInfo: {},
			token: ''
		}
	},
	onLoad() {
		this.token = this.$store.state.token
	},
	methods: {
		clickToLogin() {
			this.$u.route({
				url: 'pages/auth/login'
			})
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
