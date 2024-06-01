import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })
  Router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('role')
    let is_admin = false;
    let is_employee = false;
    if (role == 'assembler')
      is_employee = true;
    if (role == 'admin')
      is_admin = true;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log("1st if");
    console.log("no access", localStorage.getItem("token"));

    if (localStorage.getItem("token") == null || localStorage.getItem("token") == "") {
      console.log("no access",);
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
      console.log("============", to);
      // if (to.matched.some(record => record.meta.is_admin)) {
      //   if (is_admin) {
      //     next()
      //   }
      // }
      // if (to.matched.some(record => record.meta.is_employee)) {
      //   if (is_employee) {
      //     next()
      //   }
      // }
    }
    else {
      next();
    }
  }else {
    console.log("Else");
      // if (localStorage.getItem("token") != '' && role == 'admin') {
      //   Router.push({
      //     path: "/adminDashboard"
      //   })
      // }
      // else if (localStorage.getItem("token") != '' && role == 'assembler') {
      //   Router.push({
      //     path: "/employeeDashboard"
      //   })
      // }
      // else {
        next();
      // }
    }
  });
  

  return Router
})
