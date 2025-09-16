// Автоматический экспорт всех модулей
import PVAdmin from './PVAdmin.vue'
import UserManagement from './UserManagement.vue'

export const modules = {
    PVAdmin,
    UserManagement
}

// Список доступных модулей для селекта
export const modulesList = Object.keys(modules).map(name => ({ module: name }))
