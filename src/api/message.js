import request from '@/utils/request'

/** ********************我的消息 */
/**
 * 我的消息列表
 * @param 企业名称
 * @param 企业id
 */
export function getMessageList(data) {
  return request({
    url: '/api/notice/list',
    method: 'post',
    data
  })
}

/**
 * 设为已读
 */
export function setMessageReaded(data) {
  return request({
    url: '/api/notice/noticed',
    method: 'get',
    data
  })
}

/**
 * 删除消息
 */
export function deleteMessage(data) {
  return request({
    url: '/api/notice/delete',
    method: 'post',
    data
  })
}
