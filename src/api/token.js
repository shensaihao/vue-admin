import request from '@/utils/request'

/**
 * 验证 token
 * @param
 */
export function checkToken(data) {
  return request({
    url: '/token/checkToken',
    method: 'post',
    data
  })
}

/**
 * 销毁 token
 * @param
 */
export function deleteToken(data) {
  return request({
    url: '/token/delete',
    method: 'post',
    data
  })
}

/**
 * 分离 token
 * @param
 */
export function splitToken(data) {
  return request({
    url: '/token/splitToken',
    method: 'post',
    data
  })
}

/**
 * 划转 token
 * @param
 */
export function transToken(data) {
  return request({
    url: '/token/transToken',
    method: 'post',
    data
  })
}
