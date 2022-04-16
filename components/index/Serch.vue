<template>
	<view class="serch">
		<view class="serch_content">
			<view class="content_text" @tap="tapGoSerch">
				<view class="text_icon"><u-icon name="search" size="35"></u-icon></view>
				<view class="text_content">搜索</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		tapGoSerch() {
			if (this.$store.state.token == '') {
				uni.$u.toast('请先登录')
				setTimeout(() => {
					this.$u.route({
						url: 'pages/auth/login'
					})
				}, 1500)
			} else {
				this.$u.route({
					url: 'pages/serch/index'
				})
			}
		}
	}
}
</script>

<style lang="scss">
.serch {
	width: 100%;
	.serch_content {
		display: flex;
		justify-content: center;
		margin-bottom: 20rpx;
		/* #ifdef MP-WEIXIN */
		.content_text {
			background-color: #ffffff;
		}
		/* #endif */
		/* #ifdef H5 */
		.content_text {
			background-color: $uni-bg-color-grey;
		}
		/* #endif */
		.content_text {
			width: 90%;
			margin: 20rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			border-radius: 10rpx;
			color: #ccc;
			.text_icon {
				margin-left: 15rpx;
				margin-right: 70rpx;
			}
		}
	}
}
</style>
