<template>
	<view class="popup">
		<u-popup :show="showPopup" mode="bottom" @close="close">
			<view class="box_buttona"><u-button color="#5ac725" text="微信支付" @click="createOrderData"></u-button></view>
			<view class="box_buttonb"><u-button color="#3c9cff" text="支付宝支付" @click="createOrderData"></u-button></view>
		</u-popup>
	</view>
</template>

<script>
export default {
	props: {
		showPopup: Boolean
	},
	methods: {
		close() {
			this.$emit('close')
		},
		createOrderData() {
			this.$emit('createOrderData')
		}
	}
}
</script>

<style lang="scss">
.popup {
	height: 300rpx;
	.box_buttona,
	.box_buttonb {
		padding: 0 40rpx;
		margin: 20rpx;
	}
}
</style>
