<script setup>
    
</script>

<template>
    <div class="flex ">
        <aside class="border-r border-gray-300 bg-slate-100">
            <div class=" h-screen w-60 p-6 text-white flex flex-col">
                <div class="flex items-center gap-1.5 border-b border-gray-300 pb-3">
                    <img src="../assets/Logo/tasks-logo.png" alt="logo" class="w-[32px] h-[32px]"/>
                    <h2 class="text-xl font-bold text-gray-700">Task Manager</h2>
                </div>
                <div class="mt-4">
                    <router-link to="/"  class="text-gray-700 bg-gray-200 text-[16px] font-regular rounded-lg p-2 block">
                        <span class="px-2" :class="{ 'text-blue-600 font-semibold ': $route.path === '/' }">
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