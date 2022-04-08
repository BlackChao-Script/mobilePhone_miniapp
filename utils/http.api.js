const http = uni.$u.http

// 登录
export const login = (params, config = {}) => http.post('/user/login', params, config)
// 注册
export const register = (params, config = {}) => http.post('/user/register', params, config)
// 获取用户信息
export const getUserInfo = (params, config = {}) => http.get('/user/userinfo', params, config)
// 修改密码
export const modifyPassword = (params, config = {}) => http.put('/user/modify', params, config)

// 获取轮播图数据
export const getSwipers = (params, config = {}) => http.get('/carousel', params, config)

//获取商品列表
export const getGoods = (data) => http.get('/goods', data)
// 获取商品详细
export const getGoodsDet = (data, config = {}) => http.get('/goods/getgoodsDet', data, config)

// 加入购物车
export const addCart = (params, config = {}) => http.post('/cart/addcart', params, config)
// 获取购物车列表
export const getCartList = (data, config = {}) => http.get('/cart', data, config)
// 删除购物车
export const remCart = (id, params, config = {}) => http.delete(`cart/${id}`, params, config)
// 全选
export const selectAll = (params, config = {}) => http.post('/cart/selectAll', params, config)
// 取消全选
export const unselecAll = (params, config = {}) => http.post('/cart/unselectAll', params, config)
// 更新购物车
export const updateCart = (id, params, config = {}) => http.put(`/cart/${id}`, params, config)

// 获取分类列表
export const getSort = (data, config = {}) => http.get('/sort/getsort', data, config)
// 获取分类详细
export const getSortData = (data, config = {}) => http.get('/sort/getsortdata', data, config)
