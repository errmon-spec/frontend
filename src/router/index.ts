import { nextTick } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProjectsView from '../views/ProjectsView.vue';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
  }
}

const defaultTitle = 'Errmon';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: defaultTitle,
      },
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: {
        title: `Projetos | ${defaultTitle}`,
      },
    },
  ],
});

router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title || defaultTitle;
  });
});

export default router;
