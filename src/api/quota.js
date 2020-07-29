import request from '@/utils/request'

/** ********************企业受信列表 */
/**
 * 受信企业列表
 */
export function getEnterpriseList(data) {
  return request({
    url: '/api/limitManage/search',
    method: 'post',
    data
  })
}

/**
 * 搜索
 * @param 企业名称
 * @param 企业id
 */
export function searchEnterpriseList(data) {
  return request({
    url: '/api/limitManage/searchCompany',
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
export function editEnterpriseQuota(data) {
  return request({
    url: '/api/limitManage/update',
    method: 'post',
    data
  })
}
