<script setup>
import Button from './UI/button.vue';
import StatusLamp from './UI/statusLamp.vue';
import { categoriesStore } from '../Stores/categoriesStore';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = categoriesStore();
const router = useRouter();

const props = defineProps({
  id: { type: Number, required: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  dueDate: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  image_url: { type: String, default: '' },
  priority: { type: String, default: 'Low' },
  categoryId: { type: Number, default: 0, required: true }
})

const category = computed(() => store.categories.find((cat) => cat.id === props.categoryId))

const openTaskDetails = () => {
    router.push({ name: 'TaskDetails', params: { id: props.id } })
}

const loadingImage = ref(true);
const imageError = ref(false);

const handleImageError = () => {
    loadingImage.value = false;
    imageError.value = true;
};

</script>

<template>
        <div class="bg-white p-4 rounded-lg shadow-md mb-4">
            <div class="flex flex-wrap gap-4">
                <div class="relative lg:w-[200px] lg:h-[200px] w-full h-full">
                    <div v-if="loadingImage" class="w-full h-full bg-gray-200 animate-pulse rounded-sm"></div>
                        <img v-show="!loadingImage && !imageError" :src="image_url" @load="loadingImage = false" @error="handleImageError" alt="Task Image" class="lg:w-[200px] lg:h-[200px] w-full h-full rounded-sm mb-2" />
                         <div
                            v-if="imageError"
                            class="lg:w-[200px] lg:h-[200px] w-full h-full flex items-center justify-center bg-gray-100 overflow-hidden rounded-sm"
                        >
                            <img src="/src/assets/image-error.png" alt="No Image" class="w-full h-full object-cover opacity-70"/>
                        </div>
                </div>
                <div class="flex flex-col flex-1">
                        <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
                        <p class="text-gray-600 mb-2">{{ description }}</p>
                    <div class="mt-auto flex flex-wrap flex-col justify-between">
                        <div class="flex flex-wrap items-center gap-4">
                            <StatusLamp :completed="completed" />
                            <div v-if="category" class="flex items-center gap-1.5">
                                <img  :src="`${category.icon_url.split('?')[0]}?color=${encodeURIComponent(category.color)}`" alt="icon">
                                <p class="font-semibold text-sm" :style="`color: ${category.color}`">
                                {{ category.name}}</p>
                            </div>
                            <p class="font-semibold text-sm">Priority: {{ priority }}</p>
                        </div>
                    <div class="flex gap-4 mt-4 justify-between items-center">
                        <span class="text-sm text-gray-500">{{ dueDate }}</span>
                        <Button @click="openTaskDetails">View Details</Button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
</template>