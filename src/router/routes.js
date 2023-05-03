//import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
//import Home from '../views/Home.vue';
//import Profile from '../views/Profile.vue';
//import ProfileNoGuard from '../views/ProfileNoGuard.vue';
//import Failed from "../views/Failed.vue";
//import { registerGuard } from "./Guard";

const routes = [
  /*{
    path: '',
    component: () => import('layouts/Public.vue'),
    redirect: { name: 'Login' },
    meta: { public: true },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/public/Login.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/public/Register.vue'),
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('pages/public/ForgotPassword.vue'),
      },
    ],
  },*/
  {
    path: '',
    component: () => import('layouts/Main.vue'),
    redirect: { name: 'Home' },
    meta: { public: false },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('pages/Home.vue'),
		meta: {
			requiresAuth: true
		}
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/Main.vue'),
    children: [{ path: '', name: 'Error', component: () => import('pages/Error.vue') },
    ],
  },
];





export default routes;
