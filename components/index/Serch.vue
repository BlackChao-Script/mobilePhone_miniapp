<template>
	<view class="serch">
		<view class="serch_content">
			<u--input placeholder="搜索商品" prefixIcon="search" prefixIconStyle="font-size: 22px;color: #909399" clearable shape="circle"></u--input>
		</view>
	</view>
</template>

<script></script>

<style lang="scss">
.serch {
	position: relative;
	.serch_content {
		width: 90%;
		display: flex;
		position: absolute;
		left: 50%;
		transform: translate(-50%);
		margin-top: 10rpx;
		justify-content: center;
		background-color: $uni-bg-color;
		border-radius: 30%;
	}
}
</style>
