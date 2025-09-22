<template>
  <!-- Main container that prevents the whole page from scrolling -->
  <div class="h-screen bg-gray-50 flex flex-col overflow-hidden">
    <!-- Header (fixed height) -->
    <header class="bg-white border-b border-gray-200">
      <div class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
          <div class="flex items-center gap-8">
            <div class="flex-shrink-0">
              <img class="h-16" src="@/assets/logo.jpg" alt="United Water Supply Company">
            </div>
            <div class="flex items-center space-x-6">
              <a href="#" class="text-sm font-medium text-gray-700 hover:text-gray-900">მთავარი</a>
              <a href="#" class="text-sm font-medium text-gray-700 hover:text-gray-900">დახმარების ცენტრი</a>
            </div>
          </div>
          <div class="flex items-center">
            <button type="button" class="relative flex max-w-xs items-center rounded-full bg-white text-sm">
              <span class="text-gray-700 font-semibold mr-2">გიორგი გიორგაძე</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area that will scroll if needed -->
    <main class="flex-grow overflow-y-auto">
      <!-- Inner container for padding -->
      <div class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-10">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<!-- START: NEW CSS TO HIDE THE SCROLLBAR -->
<style>
/* Target the main scrolling area and hide its scrollbar track */
main::-webkit-scrollbar {
  display: none;
}

main {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
<!-- END: NEW CSS -->

