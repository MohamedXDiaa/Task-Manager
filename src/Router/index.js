import { createRouter ,createWebHistory } from 'vue-router'
import MainLayout from '../Layout/mainLayout.vue'
import TaskList from '../Pages/taskList.vue'
import TaskDetails from '../Pages/taskDetails.vue'

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
                path: '/task-details/:id',
                name: 'TaskDetails',
                component: TaskDetails
            }
            
        ]
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router