<template>
	<view class="account">
		<view class="account_box">
			<view class="box_name">
				<view class="names">用户名</view>
				<view class="names">修改密码</view>
			</view>
			<view class="box_input"> 
				<view class="ints">{{ userInfo.user_name }}</view>
				<view class="ints"><input class="u-border-bottom int" v-model="password" type="password" /></view>
			</view>
		</view>
		<view class="account_buttons">
			<view class="buttons"><u-button color="#d4237a" text="保存" @tap="clickModifyPassword"></u-button></view>
			<view class="buttons"><u-button color="#d4237a" text="退出登录" @tap="clickExit"></u-button></view>
		</view>
	</view>
</template>

<script>
import { getUserInfo, modifyPassword } from '@/utils/http.api.js'

export default {
	data() {
		return {
			userInfo: {},
			password: ''
		}
	},
	onLoad() {
		this.getUserInfoData()
	},
	methods: {
		async getUserInfoData() {
			const res = await getUserInfo({ custom: { auth: true } })
			this.userInfo = res
		},
		async clickModifyPassword() {
			if (this.password == '') {
				uni.$u.toast('您未修改值')
			} else {
				const params = {
					password: this.password
				}
				await modifyPassword({ params, custom: { auth: true } })
				uni.$u.toast('保存成功')
			}
		},
		clickExit() {
			this.$store.commit('remdateToken')
			uni.$u.toast('退出成功')
			setTimeout(() => {
				this.$u.route({
					type: 'reLaunch',
					url: 'pages/mine/index'
				})
			}, 1500)
		}
	}
}
</script>

<style lang="scss">
.account {
	.account_box {
		display: flex;
		height: 200rpx;
		.box_name {
			width: 30%;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: $uni-text-color-grey;
			font-size: 30rpx;
			.names {
				height: 90rpx;
			}
		}
		.box_input {
			display: flex;
			flex-direction: column;
			.ints {
				margin-bottom: 30rpx;
				.int {
					height: 60rpx;
				}
			}
		}
	}
	.account_buttons {
		display: flex;
		flex-direction: column;
		align-items: center;
		.buttons {
			margin-top: 20rpx;
			width: 75%;
		}
	}
}
</style>
