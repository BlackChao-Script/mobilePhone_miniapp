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
// 查找商品(id)
export const findgoods = (data, config = {}) => http.get('/goods/findgoods', data, config)

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

// 获取地址列表
export const getAddress = (data, config = {}) => http.get('/address', data, config)
// 添加地址
export const addAddress = (params, config = {}) => http.post('/address/addtoaddress', params, config)
// 删除地址
export const remAddress = (id, params, config = {}) => http.delete(`/address/${id}`, params, config)
// 设置默认地址
export const defaultAddress = (id, params, config = {}) => http.put(`/address/def/${id}`, params, config)
// 修改地址
export const updateAddress = (id, params, config = {}) => http.put(`/address/${id}`, params, config)

// 获取订单列表
export const getOrder = (data, config = {}) => http.get('/order/user', data, config)
// 创建订单
export const createOrder = (params, config = {}) => http.post('/order', params, config)
// 更新订单
export const updataOrder = (id, params, config = {}) => http.put(`/order${id}`, params, config)
