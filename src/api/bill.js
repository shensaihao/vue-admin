import request from '@/utils/request'

/** ********************票据审核 */

/**
 * 票据审核列表
 */
export function getExamineList(data) {
  return request({
    url: '/api/draft/examine/search',
    method: 'post',
    data
  })
}

/**
 * 商票图片
 */
export function examineImage(data) {
  return request({
    url: '/api/draft/examine/getDraftPic',
    method: 'post',
    data
  })
}

/**
 * 审核信息
 */
export function examineCheckInfo(data) {
  return request({
    url: '/api/draft/examine/checkInfo',
    method: 'post',
    data
  })
}

/**
 * 票据详情
 */
export function examineDetailInfo(data) {
  return request({
    url: `/api/draft/examine/detail?id=${data}`,
    method: 'get'
  })
}

/**
 * 票据审核
 * /draft/examine/confirm
 */
export function draftExamineConfirm(data) {
  return request({
    url: `/api/draft/examine/confirm`,
    method: 'post',
    data
  })
}

/**
 * 不通过 /draft/examine/failed
 *
 */
export function draftExamineFailed(data) {
  return request({
    url: `/api/draft/examine/failed`,
    method: 'post',
    data
  })
}

/**
 * 合同确认
 * /draft/examine/contract
 */
export function draftExamineContract(data) {
  return request({
    url: `/api/draft/examine/contract`,
    method: 'post',
    data
  })
}

/**
 * 审核开票
 */
export function draftExamineDraftAcceptt(data) {
  return request({
    url: `/api/draft/examine/draftAccept`,
    method: 'post',
    data
  })
}

/**
 * 商票确认
 */
export function draftExamineDraftDraftInfo(data) {
  return request({
    url: `/api/draft/examine/draftInfo`,
    method: 'post',
    data
  })
}
/** ********************票据承兑 */

/**
 * 票据承兑列表
 */
export function acceptanceList(data) {
  return request({
    url: '/api/draft/acceptance/search',
    method: 'post',
    data
  })
}

/**
 * 搜索-票据承兑列表
 */
export function searchAcceptanceList(data) {
  return request({
    url: '/api/draft/acceptance/searchDraft',
    method: 'post',
    data
  })
}

/**
 * 汇款信息
 */
export function remittanceInfo(data) {
  return request({
    url: '/api/draft/acceptance/remittanceInfo',
    method: 'post',
    data
  })
}

/**
 * 催办
 */
export function urgeOneAcceptance(data) {
  return request({
    url: `/api/draft/acceptance/notice?id=${data}`,
    method: 'get'
  })
}

/**
 * 一键催办
 */
export function urgeAllAcceptance(data) {
  return request({
    url: '/api/draft/acceptance/noticeAll',
    method: 'get',
    data
  })
}

/**
 * 确认汇款
 */
export function confirmTransfer(data) {
  return request({
    url: `/api/draft/acceptance/confirm?id=${data}`,
    method: 'get'
  })
}

/**
 * 承兑票据详情
 */
export function acceptanceDetailInfo(data) {
  return request({
    url: `/api/draft/acceptance/detail?id=${data}`,
    method: 'get'
  })
}
