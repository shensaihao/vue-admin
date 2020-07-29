import request from '@/utils/request'

/** ********************员工管理 */
/**
 * 新增员工
 * @param 账号 accountNumber
 * @param 姓名 realName
 * @param 身份 role
 * @param 权限
 */
export function addNewUser(data) {
  return request({
    url: 'api/employeeManage/create',
    method: 'post',
    data
  })
}

/**
 * 修改员工
 * @param 账号
 * @param 姓名
 * @param 身份
 * @param 权限
 */
export function editUser(data) {
  return request({
    url: '/api/employeeManage/edit',
    method: 'post',
    data
  })
}

/**
 *
 *
 */

/**
 * 新增权限
 */
export function addNewRole(data) {
  return request({
    url: 'api/employeeManage/role/create',
    method: 'post',
    data
  })
}

/**
 * 修改权限
 */
export function editRole(data) {
  return request({
    url: '/api/employeeManage/role/edit',
    method: 'post',
    data
  })
}

/**
 * 删除员工
 * @param id
 */
export function deleteRole(data) {
  return request({
    url: `/api/employeeManage/delete?employeeId=${data}`,
    method: 'get'
  })
}

/**
 * 员工列表
 */
export function getRoleList(data) {
  return request({
    url: '/api/employeeManage/list',
    method: 'post',
    data
  })
}

/** ********************收款账户管理 */

/**
 * 历史账号列表
 */
export function getHistoryAcount(data) {
  return request({
    url: `/api/bank/list?page=${data}`,
    method: 'get'
  })
}

/**
 * 新增账号
 * @param  accountName
 * @param accountNumber
 * @param bankAddress
 * @param bankName
 * @param companyId
 * @param isDefault
 */
export function addNewAcount(data) {
  return request({
    url: '/api/bank/create',
    method: 'post',
    data
  })
}

/**
 * 查看对应开票记录
 * @param id
 */
export function billRecord(data) {
  return request({
    url: '/api/bank/record',
    method: 'get',
    data
  })
}

/**
 * 删除账户
 * @param id
 */
export function deleteAcount(data) {
  return request({
    url: '/api/bank/delete',
    method: 'get',
    data
  })
}

/**
 * 设为默认账户
 * @param id
 */
export function setPrimaryAcount(data) {
  return request({
    url: `/api/bank/default?bankAccountId=${data}`,
    method: 'get'
  })
}
