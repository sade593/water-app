<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead class="bg-gray-100 border-b-2 border-gray-300">
        <tr>
          <th class="py-3 px-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">თანამშრომელი</th>
          <th class="py-3 px-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">პოზიცია</th>
          <th class="py-3 px-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">დეპარტამენტი</th>
          <th class="py-3 px-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">სამსახური</th>
          <th class="py-3 px-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">სტატუსი</th>
          <th class="py-3 px-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">მოქმედებები</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="employee in props.employees" :key="employee.id">
          <td class="py-4 px-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-200 text-blue-800 rounded-full font-bold">
                {{ employee.initials }}
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">{{ employee.name }}</div>
              </div>
            </div>
          </td>
          <td class="py-4 px-4 whitespace-nowrap text-sm text-gray-500">{{ employee.position }}</td>
          <td class="py-4 px-4 whitespace-nowrap text-sm text-gray-500">{{ employee.department }}</td>
          <td class="py-4 px-4 whitespace-nowrap text-sm text-gray-500">{{ employee.service }}</td>
          <td class="py-4 px-4 whitespace-nowrap">
            <span 
              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              :class="{
                  'bg-green-100 text-green-800': employee.status === 'აქტიური',
                  'bg-yellow-100 text-yellow-800': employee.status === 'შეჩერებული',
                  'bg-red-100 text-red-800': employee.status === 'არააქტიური'
              }">
              {{ employee.status }}
            </span>
          </td>
          <td class="py-4 px-4 whitespace-nowrap text-sm font-medium">
            <div class="flex items-center justify-end gap-3">
              <button @click="emit('hide-employee', employee.id)" class="text-blue-500 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0-7.893-2.66-9.336-6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
                </svg>
              </button>
              <button @click="emit('edit-employee', employee)" class="text-green-500 hover:text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.885L17.5 5.5a2.121 2.121 0 0 0-3-3L3.58 13.42a4 4 0 0 0-.885 1.343Z" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  employees: { type: Array, required: true }
});

const emit = defineEmits(['hide-employee', 'edit-employee']);
</script>
