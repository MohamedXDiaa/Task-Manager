import { createRouter ,createWebHistory } from 'vue-router'
import MainLayout from '../Layout/mainLayout.vue'
import TaskList from '../Pages/taskList.vue'
import TaskForm from '../Pages/taskForm.vue'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '/',
                name: 'TaskList',
                component: TaskList
            },
            {
                path: '/task-form',
                name: 'TaskForm',
                component: TaskForm
            },
            
        ]
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router