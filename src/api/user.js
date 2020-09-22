import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }

/**
 * 登录
 * @param code
 * @param password
 * @param username
 * @param uuid
 */
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

/**
 * 用户信息
 * @param token
 */
// export function getInfo() {
//   return request({
//     url: '/user',
//     method: 'get'
//   })
// }

/**
 * 验证码
 *
 */
export function getCodeImg() {
  return request({
    url: '/getCode',
    method: 'get'
  })
}

/**
 * 退出
 *
 */
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
