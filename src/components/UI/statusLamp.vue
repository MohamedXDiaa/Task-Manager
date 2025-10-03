<script setup>
defineProps({
  completed: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="relative flex items-center justify-center w-4 h-4">
      <span
        class="absolute rounded-full w-4 h-4 animate-ripple"
        :class="completed ? 'bg-green-400' : 'bg-red-400'"
      ></span>
      <div
        class="w-4 h-4 rounded-full relative z-10"
        :class="completed ? 'bg-green-500' : 'bg-red-500'"
      ></div>
    </div>
    <span class="text-sm" :class="completed ? 'text-green-600' : 'text-red-600'">
      {{ completed ? 'Completed' : 'Pending' }}
    </span>
  </div>
</template>

<style scoped>
@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 0.75;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ripple {
  animation: ripple 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>