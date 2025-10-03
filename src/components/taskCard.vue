<script setup>
import Button from './UI/button.vue';
import StatusLamp from './UI/statusLamp.vue';
import { categoriesStore } from '../Stores/categoriesStore';
import { computed } from 'vue';

const store = categoriesStore();


const {categoryId} = defineProps({
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    dueDate: {
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false
    },
    image_url: {
        type: String,
        default: ''
    },
    priority: {
        type: String,
        default: 'Low'
    },
    categoryId: {
        type: Number,
        default: 0,
        required: true
    },

});

const category = computed(() => store.categories.find((cat) => cat.id === categoryId ));

</script>

<template>
    <div>
        <div class="bg-white p-4 rounded-lg shadow-md mb-4">
            <div class="flex gap-4">
                <img :src="image_url" alt="Task Image" class="w-[200px] h-[200px] rounded-sm mb-2" />
                <div class="flex flex-col justify-between flex-1">
                        <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
                        <p class="text-gray-600 mb-2">{{ description }}</p>
                        <StatusLamp :completed="completed" />
                        <div v-if="category" class="flex items-center gap-1.5">
                            <img  :src="`${category.icon_url.split('?')[0]}?color=${encodeURIComponent(category.color)}`" alt="icon">
                            <p class="font-semibold text-sm" :style="`color: ${category.color}`">
                            {{ category.name}}</p>
                        </div>
                        <p class="font-semibold text-sm">Priority: {{ priority }}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-500">{{ dueDate }}</span>
                        <Button>View Details</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>