import request from '@/utils/request'

/** ********************企业受信列表 */
/**
 * 机构数据总览
 */
export function getEnterpriseInfo(data) {
  return request({
    url: '/index',
    method: 'get',
    data
  })
}

