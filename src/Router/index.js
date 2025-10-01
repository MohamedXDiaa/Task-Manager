import { createRouter ,createWebHistory } from 'vue-router'
import MainLayout from '../Layout/mainLayout.vue'
import TaskList from '../Pages/taskList.vue'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '/',
                name: 'TaskList',
                component: TaskList
            }
        ]
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router