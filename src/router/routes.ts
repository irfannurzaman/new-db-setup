import { RouteConfig } from 'vue-router';
import { PAGE_ROUTES } from './pageList';


console.log('sukses', PAGE_ROUTES);


const MODULE_ROUTES: RouteConfig[] = Object.values(PAGE_ROUTES)
  .flat()
  .map(({ path, name, componentName, meta }) => ({
    path,
    name,
    component: () => import(`../app/modules/${componentName}`),
    meta,
  }));

const routes: RouteConfig[] = [
  {
    path: '/dbsetup',
    component: () => import('~/layouts/MainLayout.vue'),
    children: [
      ...MODULE_ROUTES,
    ],
  },
  {
    path: '/tutorial_room',
    component: () => import('~/layouts/Tutorial/FloorPlan/TutorialRoom.vue'),
  },
  {
    path: '/table_room',
    component: () => import('~/layouts/Tutorial/TablePlan/TutorialRoom.vue'),
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('~/app/auth/PageAuthLogin1.vue'),
  },
];


// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
