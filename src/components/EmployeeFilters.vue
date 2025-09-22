<template>
  <div class="grid grid-cols-1 md:grid-cols-8 gap-4 items-end">
    
    <div class="md:col-span-1">
      <CustomSelect
        label="დეპარტამენტი"
        :options="props.departments"
        v-model="filters.department"
        @update:modelValue="emitFilters"
      />
    </div>
    
    <div class="md:col-span-1">
      <CustomSelect
        label="სამსახური"
        :options="['ყველა']"
        v-model="filters.service"
        @update:modelValue="emitFilters"
      />
    </div>
    
    <div class="md:col-span-1">
      <CustomSelect
        label="სტატუსი"
        :options="props.statuses"
        v-model="filters.status"
        @update:modelValue="emitFilters"
      />
    </div>
    
    <div class="md:col-span-3">
      <label class="text-xs font-semibold text-gray-600">ძებნა</label>
      <!-- MODIFIED THIS LINE: Removed 'border' class -->
      <input v-model="filters.search" @input="emitFilters" type="text" placeholder="სახელი, გვარი..." class="w-full mt-1 p-2 rounded-xl bg-gray-50 h-10 focus:outline-none">
    </div>

    <div class="md:col-span-2 flex gap-2">
      <!-- MODIFIED THIS LINE: Removed 'border' class -->
      <button class="w-full bg-gray-50 text-gray-500 font-semibold py-2 px-4 rounded-xl flex items-center justify-center h-10 hover:bg-gray-100">
        <span>გასუფთავება</span>
      </button>
      <button @click="downloadExcel" class="flex-shrink-0 bg-green-500 hover:bg-green-600 text-white font-semibold p-2 rounded-xl flex items-center justify-center h-10 w-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.23a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.134V2.75Z" /><path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" /></svg>
      </button>
    </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue';
import * as XLSX from 'xlsx';
import CustomSelect from '@/components/CustomSelect.vue';

const props = defineProps({
  departments: { type: Array, required: true },
  statuses: { type: Array, required: true },
  employeesToDownload: { type: Array, required: true }
});

const emit = defineEmits(['filters-changed']);

const filters = reactive({
  search: '',
  department: 'ყველა',
  service: 'ყველა',
  status: 'ყველა'
});

function emitFilters() {
  emit('filters-changed', filters);
}

function downloadExcel() {
  const worksheet = XLSX.utils.json_to_sheet(props.employeesToDownload);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
  XLSX.writeFile(workbook, "EmployeeList.xlsx");
}
</script>