<script setup></script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md animate-pulse">
    <div class="flex flex-wrap gap-4">
      <div
        class="relative lg:w-[200px] lg:h-[200px] w-full h-full rounded-sm bg-gray-200 mb-2"
      ></div>

      <div class="flex flex-col flex-1 justify-around">
        <div class="flex items-center justify-between mb-2">
          <div class="h-6 bg-gray-300 rounded w-2/5"></div>
          <div class="h-4 bg-gray-200 rounded w-20"></div>
        </div>

        <div class="h-4 bg-gray-200 rounded w-full mb-1.5"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6 mb-1.5"></div>

        <div class="h-4 bg-gray-200 rounded w-28 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-28 mb-2"></div>

        <div class="flex items-center gap-1.5 mb-2">
          <div class="w-4 h-4 rounded-full bg-gray-300"></div>
          <div class="h-4 bg-gray-200 rounded w-24"></div>
        </div>

        <div class="flex items-center justify-end gap-4 mb-4">
          <div class="w-12 h-6 bg-gray-300 rounded-2xl"></div>
        </div>

        <div class="flex flex-col md:flex-row md:justify-end gap-2 md:gap-3">
          <div class="h-10 bg-gray-300 rounded w-full lg:w-24"></div>
          <div class="h-10 bg-gray-300 rounded w-full lg:w-20"></div>
        </div>
      </div>
    </div>
  </div>
</template>
