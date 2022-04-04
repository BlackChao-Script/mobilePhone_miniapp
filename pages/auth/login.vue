<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录</view>
			<input class="u-border-bottom" v-model="user_name" placeholder="请输入用户名" />
			<input class="u-border-bottom" v-model="password" type="password" placeholder="请输入密码" />
			<button @tap="submitThrottle" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password">找回密码</view>
				<view class="issue" @tap="toRegister">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
import { login } from '../../utils/http.api.js'

export default {
	data() {
		return {
			user_name: '',
			password: ''
		}
	},
	methods: {
		submitThrottle() {
			uni.$u.debounce(this.submit, 500)
		},
		async submit() {
			if (!this.user_name || !this.password) {
				uni.$u.toast('用户名或密码不能为空')
			} else {
				const params = {
					user_name: this.user_name,
					password: this.password
				}
				const res = await login(params)
				this.$store.commit('updateToken', res.token)
				uni.$u.toast('登录成功')
				setTimeout(() => {
					this.$u.route({
						type: 'reLaunch',
						url: 'pages/index/index'
					})
				}, 1500)
			}
		},
		toRegister() {
			this.$u.route({
				url: 'pages/auth/register'
			})
		}
	}
}
</script>

<style lang="scss">
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;
		.u-border-bottom {
			margin-top: 30rpx;
			margin-bottom: 20rpx;
		}
		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $uni-text-color-grey;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: $uni-color-error;
			color: $uni-text-color-inverse;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;

			&::after {
				border: none;
			}
		}
		.alternative {
			color: $uni-text-color-grey;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
}
</style>
