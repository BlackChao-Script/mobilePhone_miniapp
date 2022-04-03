const http = uni.$u.http

// 登录
export const login = (params, config = {}) => http.post('/user/login', params, config)
// 注册
export const register = (params, config = {}) => http.post('/user/register', params, config)

//获取商品列表
export const getGoods = (data) => http.get('/goods', data)
