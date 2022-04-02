const http = uni.$u.http 
 
// 登录
export const login = (params, config = {}) => http.post('/user/login', params, config)
  