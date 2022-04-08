<template>
	<view class="empty">
		<u-empty mode="car" icon="http://cdn.uviewui.com/uview/empty/car.png"><u-button @tap="toIndex" shape="circle" color="#d4237a">前往选购</u-button></u-empty>
	</view>
</template>

<script>
export default {
	methods: {
		toIndex() {
			this.$emit('toIndex')
		}
	}
}
</script>
