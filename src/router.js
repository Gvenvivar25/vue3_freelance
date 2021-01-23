import {createRouter, createWebHistory} from 'vue-router'
import Tasks from '@/views/Tasks';
import New from '@/views/New';
import Task from '@/views/Task';
import NotFound from '@/views/NotFound';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/tasks', component: Tasks, alias: '/'},
    {path: '/new', component: New},
    {path: '/task/:id', component: Task, props: true, name: 'task'},
    { path: '/:notFound(.*)', component: NotFound }

  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router