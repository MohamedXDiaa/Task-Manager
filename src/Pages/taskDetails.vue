<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import { computed, onMounted, ref, watch } from "vue";
import Button from "../components/UI/button.vue";
import { taskStore } from "../Stores/taskStore";
import { useRoute } from "vue-router";
import StatusLamp from "../components/UI/statusLamp.vue";
import Toggle from "../components/UI/toggle.vue";
import { categoriesStore } from "../Stores/categoriesStore";
import Overlay from "../components/UI/overlay.vue";
import Input from "../components/UI/input.vue";
import Select from "../components/UI/select.vue";
import SkeletonTaskDetails from "../components/skeletonTaskDetails.vue";

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
const isOpenOverlay = ref(false);
const openEditOverlay = () => {
    if (!task.value) return;
     titleInput.value = task.value.title;
     categoryInput.value = task.value.category_id;
     descriptionInput.value = task.value.description;
     priorityInput.value = task.value.priority?.toLowerCase() || 'low';
     dueDateInput.value = task.value.due_date;
    isOpenOverlay.value = true;
};
const closeEditOverlay = () => {
    isOpenOverlay.value = false;
};

const isOpenDeleteOverlay = ref(false);
const openDeleteOverlay = () => {
    isOpenDeleteOverlay.value = true;
};
const closeDeleteOverlay = () => {
    isOpenDeleteOverlay.value = false;
};

const titleInput = ref('');
const categoryInput = ref('');
const descriptionInput = ref('');
const priorityInput = ref('');
const dueDateInput = ref('');
const today = new Date().toISOString().split('T')[0];

const titleTouched = ref(false);
const categoryTouched = ref(false);


const categoryOptions = computed(() =>
  category.categories.map(cat => ({
    label: cat.name,
    value: cat.id
  }))
);
const priorityOptions = computed(() => [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" }
]);

const updateTask = async () => {
    if (!task.value) return;
    if (!titleInput.value || !categoryInput.value) {
        titleTouched.value = true;
        categoryTouched.value = true;
        return;
    }
    await store.updateTask(task.value.id, {
        title: titleInput.value,
        category_id: categoryInput.value,
        description: descriptionInput.value,
        priority: priorityInput.value?.toLowerCase() || 'low',
        due_date: dueDateInput.value
    });
    task.value = await store.fetchTaskById(task.value.id);
    closeEditOverlay();
}

watch(
    () => task.value?.completed, (newVal) => {
    if (task.value) {
        store.updateTask(task.value.id, { completed: newVal });
    }
});
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
            <SkeletonTaskDetails v-for="n in 1" :key="n" />
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
                                <div class="gap md:flex md:justify-end md:gap-3">
                                    <Button color="yellow" class="mt-4 w-full lg:w-fit" @click="openEditOverlay">Edit Task</Button>
                                    <Button color="red" class="mt-2 md:mt-4 w-full lg:w-fit" @click="openDeleteOverlay">Delete</Button>
                                </div>
                                <div>
                                <Overlay title="Edit Task"
                                :isOpen="isOpenOverlay"
                                :closeModal="closeEditOverlay"
                                >
                                <form @submit.prevent="updateTask" novalidate class="flex flex-col gap-3">
                                    <div class="flex flex-col gap-1.5">
                                        <label class="text-sm" for="title">Task Title</label>
                                        <Input v-model="titleInput" placeholder="Enter task title" required :class="{'border-red-500': titleTouched && !titleInput}" @blur="titleTouched = true" />
                                        <span class="text-red-500 text-[11px]" v-if="titleTouched && !titleInput">Title is required</span>
                                    </div>
                                    <div class="flex flex-col gap-1.5">
                                        <label class="text-sm" for="category">Category</label>
                                        <Select v-model="categoryInput" :options="categoryOptions" placeholder="Enter task category" required :class="{'border-red-500': categoryTouched && !categoryInput}" @change="categoryTouched = true" />
                                        <span class="text-red-500 text-[11px]" v-if="categoryTouched && !categoryInput">Category is required</span>
                                    </div>
                                    <div class="flex flex-col gap-1.5">
                                        <label class="text-sm" for="description">Description</label>
                                        <textarea v-model="descriptionInput" maxlength="255" placeholder="Enter task description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="description" id="description"></textarea>
                                    </div>
                                    <div class="flex flex-col gap-1.5">
                                        <label class="text-sm" for="priority">Priority</label>
                                        <Select v-model="priorityInput" :options="priorityOptions" placeholder="Enter task priority" />
                                    </div>
                                    <div class="flex flex-col gap-1.5">
                                        <label class="text-sm" for="dueDate">Date</label>
                                        <Input v-model="dueDateInput" type="date" :min="today" placeholder="Enter date" />
                                    </div>
                                    <Button class="mt-4" type="submit">
                                        {{store.loading ? 'Updating...' : 'Update'}}
                                    </Button>
                                </form>
                                    
                                </Overlay>
                                <Overlay title="Delete Task"
                                :isOpen="isOpenDeleteOverlay"
                                :closeModal="closeDeleteOverlay"
                                >
                                <div class="flex flex-col gap-4">
                                    <p>Are you sure you want to delete this task? This action cannot be undone.</p>
                                    <div class="flex gap-4 justify-end">
                                        <Button color="gray" @click="closeDeleteOverlay">Cancel</Button>
                                        <Button color="red"  @click="store.deleteTask(task.id).then(() => $router.push({ name: 'TaskList' }))">Delete</Button>
                                    </div>
                                </div>
                                </Overlay>
                                </div>
                        </div>
                </div>
            </div>
        </div>
</template>
