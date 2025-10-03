<script setup>
    defineProps({
        color : {
            type: String,
            default: 'blue'
        }
    })

    const colors = {
        blue: "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300",
        red: "bg-red-700 hover:bg-red-800 focus:ring-red-300",
        green: "bg-green-700 hover:bg-green-800 focus:ring-green-300",
        yellow: "bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300"
    }
    const emit = defineEmits(['click'])
</script>

<template>
  <button
    @click="emit('click')"
    type="button"
    :class="`text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 focus:outline-none cursor-pointer ${colors[color]}`"
  >
    <slot/>
  </button>
</template>
