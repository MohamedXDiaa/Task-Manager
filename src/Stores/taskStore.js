import { ref } from "vue";
import api from "../Api/axios";
import { defineStore } from "pinia";

export const taskStore = defineStore("taskStore", () => {
    const tasks = ref([]);
    const loading = ref(false);
    const error = ref(null);

    async function fetchTasks(params = {}) {
        loading.value = true;
        error.value = null;
        try {
            let query = "/tasks?";
            if (params.category_id) query += `category_id=eq.${params.category_id}&`;
            if (params.completed !== undefined) query += `completed=eq.${params.completed}&`;
            if (params.priority) query += `priority=eq.${params.priority}&`;

            const limit = 20;
            const offset = params.offset || 0;

            query += `limit=${limit}&offset=${offset}&order=created_at.desc`
            const { data } = await axios.get(query)
            tasks.value = data;
        } catch (e) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }
    async function fetchTaskById(id) {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.get(`/tasks?id=eq.${id}`);
            return data[0];
        } catch (e) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }
    async function createTask(newTask) {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.post("/tasks", newTask);
            tasks.value.unshift(data[0]);
        } catch (e) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }
    async function updateTask(id, updatedTask) {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.patch(`/tasks?id=eq.${id}`, updatedTask);
            const index = tasks.value.findIndex((task) => task.id === id);
            if (index !== -1) {
                tasks.value[index] = data[0];
            }
        } catch (e) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }
    async function deleteTask(id) {
        loading.value = true;
        error.value = null;
        try {
            await api.delete(`/tasks?id=eq.${id}`);
            tasks.value = tasks.value.filter((task) => task.id !== id);
        } catch (e) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    return { tasks, loading, error, fetchTasks, fetchTaskById , createTask, updateTask, deleteTask};
});