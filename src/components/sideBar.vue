<script setup>

</script>

<template>
    <div class="flex">
    <input type="checkbox" id="menu-toggle" class="hidden peer" />

    <label 
      for="menu-toggle"
      class="p-3 lg:hidden fixed top-4 left-4 z-50 bg-gray-200 rounded-lg cursor-pointer"
    >
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </label>

    <div class="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-30 hidden peer-checked:block lg:hidden"></div>

    <aside class="fixed top-0 left-0  w-60 bg-gradient-to-b from-slate-50 to-slate-100 border-r border-gray-300 z-40
                  -translate-x-full transition-transform duration-300
                  peer-checked:translate-x-0 lg:translate-x-0 lg:static lg:block">
      <div class="h-screen w-60 p-6 flex flex-col">
        <div class="flex items-center gap-1.5 border-b mt-12 lg:mt-0 border-gray-300 pb-3">
          <img src="../assets/Logo/tasks-logo.png" alt="logo" class="w-8 h-8"/>
          <h2 class="text-xl font-bold text-gray-700">Task Manager</h2>
        </div>
        <div class="mt-4">
          <router-link 
            to="/"  
            class="text-gray-700 bg-gray-200 text-[16px] rounded-lg p-2 block"
          >
            <span class="px-2" :class="{ 'text-blue-600 font-semibold': $route.path === '/' }">
              Task List
            </span>
          </router-link>
        </div>
      </div>
    </aside>

        <main class="flex-1 p-6">
            <router-view />
        </main>
    </div>
</template>