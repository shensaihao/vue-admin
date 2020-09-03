import request from '@/utils/request'

/** ********************企业受信列表 */
/**
 * 受信企业列表
 */
export function getEnterpriseList(data) {
  return request({
    url: '/limitManage/search',
    method: 'post',
    data
  })
}

/**
 * 修改受信额度
 * @param 额度 limit
 * @param 企业id companyId
 * @param 企业名称 companyName
 */
export function editEnterpriseQuota(id, limit) {
  return request({
    url: `/limitManage/update?id=${id}&limit=${limit}`,
    method: 'get'
  })
}

/**
 * 查询授信企业
 */

export function searchLimitManageList(data) {
  return request({
    url: `/limitManage/list`,
    method: 'post',
    data
  })
}

/**
 * 新增授信企业
 */

export function addLimitManage(data) {
  return request({
    url: `/limitManage/create`,
    method: 'post',
    data
  })
}
