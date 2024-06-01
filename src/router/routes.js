const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/IndexPage.vue') }
  //   ]
  // },
  {
    path: '/',
    component: () => import('pages/IndexPage.vue')
  },
  {
    path: '/adminDashboard',
    component: () => import('pages/AdminDashboard.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: '/employeeDashboard',
    component: () => import('pages/EmployeeDashboard.vue'),
    meta: { requiresAuth: true }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
