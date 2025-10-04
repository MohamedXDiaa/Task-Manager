<script setup>
import { PlusIcon } from '@heroicons/vue/16/solid';
import Button from '../components/UI/button.vue';
import TaskCard from '../components/taskCard.vue';
import { taskStore  } from '../Stores/taskStore';
import { categoriesStore } from '../Stores/categoriesStore';
import { computed, onMounted, ref } from 'vue';
import Pagination from '../components/UI/pagination.vue';
import Overlay from '../components/UI/overlay.vue';
import Input from '../components/UI/input.vue';
import Select from '../components/UI/select.vue';
import SkeletonTaskCard from '../components/skeletonTaskCard.vue';

const store = taskStore();
const category = categoriesStore();

onMounted(() => {
    store.fetchTasks();
    category.fetchCategories();
});

const isOpenOverlay = ref(false);
const openOverlay = () => {
    isOpenOverlay.value = true;
};
const closeOverlay = () => {
    isOpenOverlay.value = false;
    titleTouched.value = false;
    categoryTouched.value = false;
    titleInput.value = '';
    categoryInput.value = '';
    descriptionInput.value = '';
    priorityInput.value = '';
    dueDateInput.value = '';
};

const titleInput = ref('')
const categoryInput = ref('')
const descriptionInput = ref('')
const priorityInput = ref('')
const dueDateInput = ref('')

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

const addTask = () => {
    if (!titleInput.value || !categoryInput.value) {
        titleTouched.value = true;
        categoryTouched.value = true;
        return;
    }
    const newTask = {
        title: titleInput.value,
        category_id: categoryInput.value,
        description: descriptionInput.value || '',
        priority: priorityInput.value.toLowerCase() || 'low',
        due_date: dueDateInput.value || 'today',
    };

    store.createTask(newTask);
    titleTouched.value = false;
    categoryTouched.value = false;
    titleInput.value = '';
    categoryInput.value = '';
    descriptionInput.value = '';
    priorityInput.value = '';
    dueDateInput.value = '';
    closeOverlay();
    
};

</script>

<template>
    <div class="flex justify-between mt-16 lg:mt-0 items-center border-b border-gray-200 pb-4 mb-6">
        <h1 class="text-3xl ">Tasks</h1>
        <Button class="flex items-center" @click="openOverlay">
            <PlusIcon class="h-[18px] w-[16px] me-1 inline" />
            Create Task
        </Button>
    </div>
    <div v-if="store.loading">
        <SkeletonTaskCard v-for="n in 3" :key="n"/>
    </div>
    <div v-else class="bg-gray-100 p-6 rounded-lg">
        <p v-if="store.tasks.length === 0">No tasks available</p>
        <TaskCard 
        v-for="task in store.tasks" :key="task.id" :id="task.id" :title="task.title" :description="task.description" :dueDate="task.due_date" :completed="task.completed" :image_url="task.image_url" :priority="task.priority" :categoryId="task.category_id"/>
    <div class="flex justify-center">
        <Pagination class="mt-2" :pagination="store.pagination" @change-page="store.fetchTasks({ page: $event })"/>
    </div>
    </div>
        <Overlay title="Add New Task"
        :isOpen="isOpenOverlay"
        :closeModal="closeOverlay"
        >
        <form @submit.prevent="addTask" novalidate class="flex flex-col gap-3">
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
                {{store.loading ? 'Creating...' : 'Create'}}
            </Button>
        </form>
            
        </Overlay>
</template>