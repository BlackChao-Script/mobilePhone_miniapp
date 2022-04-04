<template>
	<view class="register">
		<view class="top"></view>
		<view class="content">
			<view class="title">注册账号</view>
			<input class="u-border-bottom" v-model="user_name" placeholder="用户名" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<input class="u-border-bottom" type="password" v-model="password_confirmation" placeholder="请确定密码" />
			<button @tap="submitThrottle" class="getCaptcha">完成注册</button>
		</view>
	</view>
</template>

<script>
import { register } from '@/utils/http.api.js'

export default {
	data() {
		return {
			user_name: '',
			password: '',
			password_confirmation: ''
		}
	},
	methods: {
		submitThrottle() {
			uni.$u.debounce(this.submit, 500)
		},
		async submit() {
			if (!this.user_name || !this.password) {
				uni.$u.toast('用户名或密码不能为空')
			} else if (this.password !== this.password_confirmation) {
				uni.$u.toast('两次密码不一致')
			} else {
				const pamams = {
					user_name: this.user_name,
					password: this.password
				}
				await register(pamams)
				this.$u.toast('注册成功')
				setTimeout(() => {
					this.$u.route({
						type: 'reLaunch',
						url: 'pages/auth/login'
					})
				}, 1500)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.register {
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
