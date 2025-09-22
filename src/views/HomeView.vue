<template>
  <div class="bg-white p-10 rounded-lg shadow-md">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Welcome</h1>
      <p class="text-gray-600 mb-6">
        You are on the home page. Click the button below to see the employee list.
      </p>
      <RouterLink 
        to="/employees" 
        class="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
      >
        View Employees
      </RouterLink>
    </div>

    <div class="mt-10 pt-10 border-t border-gray-200">
      <h2 class="text-xl font-semibold text-gray-700 mb-4 text-center">Application Screenshot</h2>
      <img 
        src="@/assets/logo.jpg" 
        alt="Application screenshot" 
        class="w-full rounded-lg shadow-md border border-gray-200"
      >
    </div>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>