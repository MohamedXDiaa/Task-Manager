<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  options: {
    type: Array ,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="relative">
    <select 
      :value="modelValue" 
      @change="$emit('update:modelValue', $event.target.value)"
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 
             text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 
             appearance-none"
    >
      <option value="" disabled hidden>{{ placeholder }}</option>
      <option 
        v-for="(opt, index) in options" 
        :key="index" 
        :value="typeof opt === 'object' ? opt.value : opt"
      >
        {{ typeof opt === 'object' ? opt.label : opt }}
      </option>
    </select>

    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </div>
</template>

