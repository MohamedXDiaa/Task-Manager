import { ref } from "vue";
import api from "../Api/axios"
import { defineStore } from "pinia";

export const categoriesStore = defineStore('categoriesStore', ()=> {
    const categories = ref([])
    const loading = ref(false)
    const error = ref(null)

    async function fetchCategories() {
        loading.value = true
        error.value = null

        try{
            const { data } = await api.get('/categories')
            categories.value = data;
        }
        catch(e) {
            error.value = e.message
        }
        finally{
            loading.value = false
        }
    }

    return {categories, loading, error, fetchCategories}
})