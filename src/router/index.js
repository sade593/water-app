import { createRouter, createWebHistory } from 'vue-router'
import EmployeesView from '../views/EmployeesView.vue'
import AddEmployeeView from '../views/AddEmployeeview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/employees'
    },
    {
      path: '/employees',
      name: 'employees',
      component: EmployeesView
    },
    {
      path: '/employees/add',
      name: 'add-employee',
      component: AddEmployeeView
    }
  ]
})

// THIS LINE IS THE FIX
export default router