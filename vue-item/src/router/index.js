import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // 主路径
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    children: [
      // 个人信息平台
      {
        path: '',
        name: 'self',
        component: () => import('../views/Self.vue'),
        meta: {
          auth: true
        },
        children: [
          {
            path: 'work',
            name: 'work',
            component: () => import('../views/Work.vue'),
            meta: {
              auth: true
            }
          },
          {
            path: 'selfmsg',
            name: 'selfmsg',
            component: () => import('../views/Selfmsg.vue'),
            meta: {
              auth: true
            }
          },
        ]
      },
      // 管理系统
      {
        path: 'system',
        name: 'system',
        component: () => import('../views/System.vue'),
        meta: {
          auth: true
        },
        children: [
          {
            path: 'role',
            name: 'role',
            component: () => import('../views/Role.vue'),
            meta: {
              auth: true
            }
          },
          {
            path: 'users',
            name: 'user',
            component: () => import('../views/Users.vue'),
            meta: {
              auth: true
            }
          },
          {
            path: 'power',
            name: 'power',
            component: () => import('../views/Power.vue'),
            meta: {
              auth: true
            }
          }
        ]
      },
      // 杆塔管理
      {
        path: 'towar',
        name: 'towar',
        component: () => import('../views/Towar.vue'),
        meta: {
          auth: true
        }
      },
      // 线路管理
      {
        path: 'line',
        name: 'line',
        component: () => import('../views/Line.vue'),
        meta: {
          auth: true
        }
      },
      // 缺陷管理
      {
        path: 'defect',
        name: 'defect',
        component: () => import('../views/Defect.vue'),
        meta: {
          auth: true
        },
        children: [
          {
            path: '/',
            component: () => import('../views/DefectType.vue'),
            meta: {
              auth: true
            }
          },
          {
            path: '/DefectType',
            name: 'defectType',
            component: () => import('../views/DefectType.vue'),
            meta: {
              auth: true
            }
          },
          {
            path: '/defectLevel',
            name: 'defectLevel',
            component: () => import('../views/DefectLevel.vue'),
            meta: {
              auth: true
            }
          },
        ]
      },
      // 巡检管理
      {
        path: 'inspect',
        name: 'inspect',
        component: () => import('../views/Inspect.vue'),
        meta: {
          auth: true
        }
      },
      // 消缺管理
      {
        path: 'repair',
        name: 'repair',
        component: () => import('../views/Repair.vue'),
        meta: {
          auth: true
        }
      },
      // 信息统计
      {
        path: 'total',
        name: 'total',
        component: () => import('../views/Total.vue'),
        meta: {
          auth: true
        }
      }
    ]
  },
  {
    // 登录窗口
    path: '/login',
    name: 'name',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process. env.BASE_URL, 
  routes
})

export default router
