const http = uni.$u.http

// 登录
export const login = (params, config = {}) => http.post('/user/login', params, config)
// 注册
export const register = (params, config = {}) => http.post('/user/register', params, config)
// 获取用户信息
export const getUserInfo = (params, config = {}) => http.get('/user/userinfo', params, config)
// 修改密码
export const modifyPassword = (params, config = {}) => http.patch('/user/modify', params, config)

// 获取轮播图数据
export const getSwipers = (params, config = {}) => http.get('/carousel', params, config)

//获取商品列表
export const getGoods = (data) => http.get('/goods', data)
// 获取商品详细
export const getGoodsDet = (data, config = {}) => http.get('/goods/getgoodsDet', data, config)
