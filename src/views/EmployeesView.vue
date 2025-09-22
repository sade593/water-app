<template>
  <div>
    <!-- Card 1: Title and Filters -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <EmployeeHeader @add-employee="openAddModal" />
      <EmployeeFilters 
        :departments="departmentOptions"
        :statuses="statusOptions"
        :employees-to-download="filteredEmployees" 
        @filters-changed="updateFilters" 
      />
    </div>

    <!-- Card 2: Employee List -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <!-- THIS IS THE MAIN FIX: Added the :active-filters prop back -->
      <EmployeeList 
        :employees="filteredEmployees"
        :active-filters="activeFilters" 
        @hide-employee="hideEmployee"
        @edit-employee="openEditModal" 
      />
      <div v-if="hiddenEmployees.length > 0" class="mt-4 text-center">
        <button @click="restoreAll" class="text-sm text-blue-600 hover:underline">
          Restore {{ hiddenEmployees.length }} Hidden Employee(s)
        </button>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-20">
      <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Employee' : 'Add New Employee' }}</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="editableEmployee.name" type="text" class="mt-1 border p-2 rounded-lg w-full">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Position</label>
            <input v-model="editableEmployee.position" type="text" class="mt-1 border p-2 rounded-lg w-full">
          </div>
           <div>
            <label class="block text-sm font-medium text-gray-700">Department</label>
            <input v-model="editableEmployee.department" type="text" class="mt-1 border p-2 rounded-lg w-full">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Service</label>
            <input v-model="editableEmployee.service" type="text" class="mt-1 border p-2 rounded-lg w-full">
          </div>
        </div>
        
        <div class="mt-6 flex justify-end gap-4">
          <button @click="closeModal" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg">Cancel</button>
          <button @click="saveEmployee" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import EmployeeHeader from '@/components/EmployeeHeader.vue';
import EmployeeFilters from '@/components/EmployeeFilters.vue';
import EmployeeList from '@/components/EmployeeList.vue';

// --- DATA MANAGEMENT ---
const employees = ref([]);
const hiddenEmployees = ref([]);

const savedEmployees = localStorage.getItem('employees');
const savedHiddenEmployees = localStorage.getItem('hiddenEmployees');

if (savedEmployees) {
  employees.value = JSON.parse(savedEmployees);
} else {
  employees.value = [
    { id: 1, initials: 'ნი', name: 'ნინო ივანიძე', position: 'პროექტების მენეჯერი', department: 'ტექნიკური', service: 'ინფრასტრუქტურა', status: 'აქტიური' },
    { id: 2, initials: 'და', name: 'დავით ბერძენიძე', position: 'IT სპეციალისტი', department: 'ტექნიკური', service: 'ინფრასტრუქტურა', status: 'აქტიური' },
    { id: 3, initials: 'მა', name: 'მარიამ ჩერქეზია', position: 'ფინანსური ანალიტიკოსი', department: 'ფინანსური', service: 'ანალიტიკა', status: 'შეჩერებული' },
    { id: 4, initials: 'სა', name: 'სალომე კაპანაძე', position: 'QA ინჟინერი', department: 'QA', service: 'QA', status: 'არააქტიური' },
    { id: 5, initials: 'გი', name: 'გიორგი დოლიძე', position: 'test', department: 'სერვისები', service: 'IT სერვისები', status: 'აქტიური' }
  ];
}

if (savedHiddenEmployees) {
  hiddenEmployees.value = JSON.parse(savedHiddenEmployees);
}

watch(employees, (newValue) => {
  localStorage.setItem('employees', JSON.stringify(newValue));
}, { deep: true });

watch(hiddenEmployees, (newValue) => {
  localStorage.setItem('hiddenEmployees', JSON.stringify(newValue));
}, { deep: true });

// --- FILTERING ---
const departmentOptions = ref(['ყველა', 'ტექნიკური', 'ფინანსური', 'სერვისები', 'QA']);
const statusOptions = ref(['ყველა', 'აქტიური', 'შეჩერებული', 'არააქტიური']);

const activeFilters = reactive({
  search: '',
  department: 'ყველა',
  service: 'ყველა',
  status: 'ყველა'
});

function updateFilters(newFilters) {
  activeFilters.search = newFilters.search;
  activeFilters.department = newFilters.department;
  activeFilters.service = newFilters.service;
  activeFilters.status = newFilters.status;
}

const filteredEmployees = computed(() => {
  return employees.value.filter(employee => {
    const searchMatch = employee.name.toLowerCase().includes(activeFilters.search.toLowerCase());
    const departmentMatch = activeFilters.department === 'ყველა' || employee.department === activeFilters.department;
    const serviceMatch = activeFilters.service === 'ყველა' || employee.service === activeFilters.service;
    const statusMatch = activeFilters.status === 'ყველა' || employee.status === activeFilters.status;
    return searchMatch && departmentMatch && serviceMatch && statusMatch;
  });
});

// --- MODAL AND ACTIONS ---
const isModalOpen = ref(false);
const isEditing = ref(false);
const editableEmployee = ref(null);

function openAddModal() {
  isEditing.value = false;
  editableEmployee.value = { name: '', position: '', department: '', service: '', status: 'აქტიური' };
  isModalOpen.value = true;
}

function openEditModal(employee) {
  isEditing.value = true;
  editableEmployee.value = { ...employee };
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  editableEmployee.value = null;
}

function saveEmployee() {
  if (!editableEmployee.value.name) return;
  if (isEditing.value) {
    const index = employees.value.findIndex(emp => emp.id === editableEmployee.value.id);
    if (index !== -1) {
      employees.value[index] = editableEmployee.value;
    }
  } else {
    const nameParts = editableEmployee.value.name.split(' ');
    const initials = (nameParts.length > 1 
      ? nameParts[0][0] + nameParts[nameParts.length - 1][0] 
      : editableEmployee.value.name.substring(0, 2)
    ).toUpperCase();
    
    editableEmployee.value.initials = initials;

    const newId = employees.value.length > 0 ? Math.max(...employees.value.map(e => e.id)) + 1 : 1;
    employees.value.push({ ...editableEmployee.value, id: newId });
  }
  closeModal();
}

function hideEmployee(employeeId) {
  const index = employees.value.findIndex(emp => emp.id === employeeId);
  if (index !== -1) {
    const [hiddenEmp] = employees.value.splice(index, 1);
    hiddenEmployees.value.push(hiddenEmp);
  }
}

function restoreAll() {
  employees.value.push(...hiddenEmployees.value);
  hiddenEmployees.value = [];
}
</script>

