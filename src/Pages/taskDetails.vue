<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import { computed, onMounted, ref } from "vue";
import Button from "../components/UI/button.vue";
import { taskStore } from "../Stores/taskStore";
import { useRoute } from "vue-router";
import StatusLamp from "../components/UI/statusLamp.vue";
import Toggle from "../components/UI/toggle.vue";
import SkeletonTaskCard from "../components/skeletonTaskCard.vue";
import { categoriesStore } from "../Stores/categoriesStore";

const store = taskStore();
store.fetchTasks();
const category = categoriesStore();
category.fetchCategories();

const route = useRoute();
const task = ref(null);

const categories = computed(() => category.categories.find((cat) => cat.id === task.value?.category_id));

onMounted(async () => {
    task.value = store.tasks.find((t) => t.id === Number(route.params.id));
    if (!task.value){
        task.value = await store.fetchTaskById(route.params.id);
    }
});

const loadingImage = ref(true);
const imageError = ref(false);

const handleImageError = () => {
    loadingImage.value = false;
    imageError.value = true;
};

</script>

<template>
  <div
    class="flex mt-16 lg:mt-0 justify-start items-center gap-3 border-b border-gray-200 pb-4 mb-6"
  >
    <Button @click="$router.go(-1)">
      <ArrowLeftIcon class="w-3.5 h-3.5 text-gray-50" />
    </Button>
    <h1 class="text-xl font-semibold">Task Details</h1>
  </div>
        <div v-if="store.loading">
            <SkeletonTaskCard v-for="n in 1" :key="n" />
        </div>
        <div v-else>
            <div v-if="task" class="bg-white p-6 rounded-lg shadow-md">
                <div class="flex flex-wrap gap-4">
                <div class="relative lg:w-[200px] lg:h-[200px] w-full h-full">
                    <div v-if="loadingImage" class="w-full h-full bg-gray-200 animate-pulse rounded-sm"></div>
                        <img v-show="!loadingImage && !imageError" :src="task.image_url" @load="loadingImage = false" @error="handleImageError" alt="Task Image" class="lg:w-[200px] lg:h-[200px] w-full h-full rounded-sm mb-2" />
                         <div
                            v-if="imageError"
                            class="lg:w-[200px] lg:h-[200px] w-full h-full flex items-center justify-center bg-gray-100 overflow-hidden rounded-sm"
                        >
                            <img src="/src/assets/image-error.png" alt="No Image" class="w-full h-full object-cover opacity-70"/>
                        </div>
                </div>
                        <div class="flex flex-col flex-1 justify-around ">
                            <div class="flex items-center justify-between ">
                                <h2 class="text-2xl font-bold ">{{ task.title }}</h2>
                                <p class="text-sm text-gray-500 ">{{ task.due_date }}</p>
                            </div>
                            <p class="text-gray-600">{{ task.description }}</p>
                            <div class="flex items-center gap-1.5">
                                <img :src="`${categories.icon_url.split('?')[0]}?color=${encodeURIComponent(categories.color)}`" alt="icon" class="w-4 h-4 rounded-full" />
                                <p :style="`color: ${categories.color}`" class="text-sm font-semibold ">{{ categories.name }}</p>
                            </div>
                            <p class="text-sm font-semibold ">Priority: {{ task.priority }}</p>
                                <div class="flex items-center justify-between gap-4 ">
                                    <StatusLamp :completed="task.completed" />
                                    <Toggle v-model="task.completed" />                           
                                </div>
                                <div class="flex justify-end gap-3">
                                    <Button color="red" class="mt-4" @click="store.deleteTask(task.id).then(() => $router.push({ name: 'TaskList' }))">Delete</Button>
                                    <Button class="mt-4" @click="store.updateTask(task.id, { completed: task.completed })">Save Changes</Button>
                                </div>
                        </div>
                </div>
            </div>
        </div>
</template>
