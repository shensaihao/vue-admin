import request from '@/utils/request'

/** ********************我的消息 */
/**
 * 我的消息列表
 * @param 企业名称
 * @param 企业id
 */
export function getMessageList(data) {
  return request({
    url: '/notice/list',
    method: 'post',
    data
  })
}

/**
 * 设为已读
 */
export function setMessageReaded(data) {
  return request({
    url: `/notice/noticed?id=${data}`,
    method: 'get'
  })
}

/**
 * 全部设为已读
 *
 */
export function setAllMessageReaded(data) {
  return request({
    url: '/notice/noticedAll',
    method: 'get',
    data
  })
}

/**
 * 删除消息
 */
export function deleteMessage(data) {
  return request({
    url: `/notice/delete?id=${data}`,
    method: 'post'
  })
}
