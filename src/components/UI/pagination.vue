<script setup>
  import { nextTick } from 'vue';
    defineProps({
        pagination: {
            type: Object,
            required: true
        }
    })
    const changePage = async (page) => {
      emit('change-page', page);
      await nextTick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const emit = defineEmits(['change-page']);
</script>

<template>
<nav aria-label="Page navigation example">
  <ul class="inline-flex -space-x-px text-sm">
    <li>
      <button @click="changePage(pagination.currentPage - 1)" class="flex items-center justify-center cursor-pointer px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ">Previous</button>
    </li>
    <li v-for="page in pagination.totalPages" :key="page">
      <button @click="changePage(page)" aria-current="page" class="flex items-center cursor-pointer justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 ">{{ pagination.currentPage }}</button>
    </li>

    <li>
      <button @click="changePage(pagination.currentPage + 1)" class="flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ">Next</button>
    </li>
  </ul>
</nav>
</template>