<template>
	<view class="tabs">
		<u-sticky bgColor="#fff">
			<u-tabs
				:list="sortList"
				lineColor="#d4237a"
				:activeStyle="{
					color: '#d4237a',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				}"
				:inactiveStyle="{
					color: '#606266',
					transform: 'scale(1)'
				}"
				itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
				@click="(item)=>{$emit('clickChangTab',item)}"
			></u-tabs>
		</u-sticky>
	</view>
</template>

<script>
export default {
	props: {
		sortList: Array
	},
	methods:{
		
	}
}
</script>

<style></style>
