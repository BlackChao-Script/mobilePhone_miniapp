// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		config.baseURL = 'http://localhost:8080'
		config.dataType = 'json'
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => {
		config.data = config.data || {}
		config.header.token = vm.$store.state.token
		return config
	}, config => {
		return Promise.reject(config)
	})

	// 响应拦截   
	uni.$u.http.interceptors.response.use((response) => {
		const {
			statusCode,
			data
		} = response
		const custom = response.config?.custom

		if (statusCode !== 200) {
			if (custom.toast !== false) {
				uni.$u.toast(data.message)
			}
			if (custom?.catch) {
				return Promise.reject(data)
			} else {
				return new Promise(() => {})
			}
		}
		return data.result === undefined ? {} : data.result
	}, (response) => {
		uni.$u.toast(response.data.message)
		return Promise.reject(response)
	})
}
