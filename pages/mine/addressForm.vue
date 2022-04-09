<template>
	<view class="addressform">
		<view class="addressform_box">
			<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
				<u-form-item label="姓名" prop="userInfo.consignee" borderBottom ref="item1"><u--input v-model="model1.userInfo.consignee" border="none"></u--input></u-form-item>
				<u-form-item label="电话" prop="userInfo.phone" borderBottom ref="item1"><u--input v-model="model1.userInfo.phone" border="none"></u--input></u-form-item>
				<u-form-item label="地区" prop="userInfo.address" borderBottom ref="item1" @click="showAddress = true">
					<u--input v-model="model1.userInfo.address" disabled disabledColor="#ffffff" placeholder="请选择地区" border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="默认" ref="item1"><u-switch v-model="is_default" @change="changeDefault"></u-switch></u-form-item>
			</u--form>
		</view>
		<u-picker :show="showAddress" ref="uPicker" :columns="columns" @confirm="confirm" @cancel="cancelPicker" @change="changeHandler"></u-picker>
		<view class="addressform_button"><view class="button" @tap="sumAddressFrom">保存</view></view>
	</view>
</template>

<script>
import { columns, columnData } from '@/utils/addressData.js'
import { addAddress } from '@/utils/http.api.js'

export default {
	data() {
		return {
			showAddress: false,
			columns: columns,
			columnData: columnData,
			model1: {
				userInfo: {
					consignee: '',
					phone: '',
					address: ''
				}
			},
			is_default: false,
			rules: {
				'userInfo.consignee': {
					type: 'string',
					required: true,
					message: '请填写姓名',
					trigger: ['blur', 'change']
				},
				'userInfo.phone': [
					{
						required: true,
						message: '请输入手机号',
						trigger: ['blur']
					},
					{
						validator: (rule, value, callback) => {
							return uni.$u.test.mobile(value)
						},
						message: '手机号码不正确',
						trigger: ['blur']
					}
				],
				'userInfo.address': {
					required: true,
					message: '请选择地址',
					trigger: ['blur', 'change']
				}
			}
		}
	},
	methods: {
		changeHandler(e) {
			const { columnIndex, value, values, index, picker = this.$refs.uPicker } = e
			if (columnIndex === 0) {
				picker.setColumnValues(1, this.columnData[index])
			}
		},
		confirm(e) {
			const { value } = e
			const data = value.join()
			this.model1.userInfo.address = data
			this.showAddress = false
		},
		cancelPicker() {
			this.showAddress = false
		},
		changeDefault(e) {
			this.is_default = e
		},
		sumAddressFrom() {
			this.$refs.form1
				.validate()
				.then(async res => {
					const params = this.model1.userInfo
					await addAddress(params, { custom: { auth: true } })
					uni.$u.toast('保存成功')
					setTimeout(() => {
						this.$u.route({
							type: 'navigateBack',
							delta: 1
						})
					}, 1500)
				})
				.catch(err => {
					uni.$u.toast('校验失败')
				})
		}
	}
}
</script>

<style lang="scss">
.addressform {
	.addressform_box {
		padding: 30rpx;
	}
	.addressform_button {
		display: flex;
		justify-content: center;
		.button {
			width: 70%;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			border-radius: 10rpx;
			color: #fff;
			background-color: $uni-color-error;
		}
	}
}
</style>
