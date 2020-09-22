import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },

  {
    path: '/bill',
    component: Layout,
    redirect: '/bill/examine',
    name: 'Bill',
    meta: {
      title: '票据管理',
      icon: 'draft'
    },
    children: [
      {
        path: '/bill/examine',
        component: () => import('@/views/bill/examine/index'), // Parent router-view
        name: 'BillExamine',
        meta: { title: '票据审核' }
      },
      {
        path: '/bill/examine/detail',
        component: () => import('@/views/bill/examine/detail.vue'),
        name: 'BillExamineDetail',
        meta: { title: '票据审核详情' },
        hidden: true
      },
      {
        path: '/bill/acceptance',
        component: () => import('@/views/bill/acceptance/index'),
        name: 'BillAcceptance',
        meta: { title: '票据承兑' }
      },
      {
        path: '/bill/acceptance/detail',
        component: () => import('@/views/bill/acceptance/detail.vue'),
        name: 'BillAcceptanceDetail',
        meta: { title: '票据承兑详情' },
        hidden: true
      }
    ]
  },

  {
    path: '/discount',
    component: Layout,
    redirect: '/discount/apply',
    name: 'Discount',
    meta: {
      title: '贴现管理',
      icon: 'discount'
    },
    children: [
      {
        path: '/discount/apply',
        component: () => import('@/views/discount/apply/index'), // Parent router-view
        name: 'DiscountApply',
        meta: { title: '贴现申请审核' }
      },
      {
        path: '/discount/apply/detail',
        component: () => import('@/views/discount/apply/detail.vue'),
        name: 'DiscountApplyDetail',
        meta: { title: '票据审核详情' },
        hidden: true
      },
      {
        path: '/discount/record',
        component: () => import('@/views/discount/record/index'),
        name: 'DiscountRecord',
        meta: { title: '贴现记录' }
      },
      {
        path: '/discount/record/detail',
        component: () => import('@/views/discount/record/detail.vue'),
        name: 'DiscountRecordDetail',
        meta: { title: '贴现详情' },
        hidden: true
      }
    ]
  },

  {
    path: '/quota',
    component: Layout,
    redirect: '/enterprise/list',
    name: 'Quota',
    meta: {
      title: '额度管理',
      icon: 'quota'
    },
    children: [
      {
        path: '/enterprise/list',
        name: 'Enterprise',
        component: () => import('@/views/quota/index'),
        meta: { title: '受信企业列表' }
      },
      /* 不添加meta，只为渲染菜单，不展示页面及路由 */
      {
        path: '/undefined',
        name: 'undefined',
        component: () => {}
      }
    ]
  },

  {
    path: '/account',
    component: Layout,
    redirect: '/staff/management',
    name: 'Account',
    meta: {
      title: '账号管理',
      icon: 'system'
    },
    children: [
      {
        path: '/staff/management',
        component: () => import('@/views/acount/role/index'), // Parent router-view
        name: 'StaffManagement',
        meta: { title: '员工管理' }
      },
      {
        path: '/collection/management',
        component: () => import('@/views/acount/collection/index'),
        name: 'CollectionManagement',
        meta: { title: '收款账户管理' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
