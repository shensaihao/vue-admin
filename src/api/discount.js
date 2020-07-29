import request from '@/utils/request'

/** ********************贴现申请审核 */

/**
 * 贴现申请审核列表
 * @param 状态
 * @param 申请编号
 * @param 企业名称
 * @param 合同名称
 * @param 申请时间
 * @param 承兑金额
 */
// export function getDiscountList(data) {
//   return request({
//     url: '/discount/applies',
//     method: 'get',
//     data
//   })
// }

/**
 * 贴现申请查询列表
 * @param 状态
 * @param 申请编号
 * @param 企业名称
 * @param 合同名称
 * @param 申请时间
 * @param 承兑金额
 */
export function searchDiscountApplyList(data) {
  return request({
    url: '/discount/applies/search',
    method: 'post',
    data
  })
}

/**
 * 确认转账
 */
export function confrimTransfer(data) {
  return request({
    url: '/discount/applies/check',
    method: 'post',
    data
  })
}

/** ********************贴现记录 */

/**
 * 贴现记录列表
 */
export function discountList(data) {
  return request({
    url: '/discount/records',
    method: 'get',
    data
  })
}

/**
 * 贴现列表
 */
export function getDiscountList(data) {
  return request({
    url: '/api/discount/search',
    method: 'POST',
    data
  })
}

/**
 * 通过贴现申请
 */
export function passDiscountApply(data) {
  return request({
    url: `/api/discount/applies/pass?id=${data}`,
    method: 'get'
  })
}

/**
 * 确认已转账
 */
export function confirmTransferAcount(data) {
  return request({
    url: '/api/discount/applies/confirm',
    method: 'post',
    data
  })
}

/**
 * 贴现详情
 */
export function discountDetail(data) {
  return request({
    url: `/api/discount/detail?id=${data}`,
    method: 'get'
  })
}
/**
 * 不通过
 */
export function discountAppliesFailed(data) {
  return request({
    url: '/api/discount/applies/failed',
    method: 'post',
    data
  })
}

/**
 * 转账截图
 */
export function discountAppliesUpload(data) {
  return request({
    url: '/api/discount/applies/upload',
    method: 'post',
    data
  })
}
