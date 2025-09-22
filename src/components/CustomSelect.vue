<template>
  <div class="relative" v-click-outside="closeDropdown">
    <label class="text-xs font-semibold text-gray-600">{{ label }}</label>
    
    <button @click="toggleDropdown" class="w-full mt-1 p-2 rounded-xl bg-gray-50 text-left flex items-center justify-between h-10 focus:outline-none">
      <span class="block truncate">{{ modelValue }}</span>
      <span class="pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400">
          <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>

    <!-- MODIFIED THIS LINE: Removed ring classes -->
    <div v-if="isOpen" class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-xl py-1 text-base overflow-auto focus:outline-none sm:text-sm">
      <ul>
        <li
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
          class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-gray-100"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  options: { type: Array, required: true },
  modelValue: { type: String, required: true },
  label: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const selectOption = (option) => {
  emit('update:modelValue', option);
  closeDropdown();
};

const vClickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function(event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
};
</script>

