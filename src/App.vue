<template>
    <!-- Селектор модуля (показывается если модуль не задан) -->
    <div v-if="ModuleNotSeted" class="card flex justify-center">
        <Select 
            v-model="Module" 
            :options="Modules" 
            optionLabel="module" 
            placeholder="Выберите модуль" 
            class="w-full md:w-56" 
        />
    </div>
    
    <!-- Динамический компонент выбранного модуля -->
    <component 
        v-if="Module && Module.module && modules[Module.module]" 
        :is="modules[Module.module]"
    />
</template>

<script setup>
    import { Select } from 'pvtables/dist/pvtables'
    import { ref } from 'vue'
    import { modules, modulesList } from './modules/index.js'
    
    // Реактивные переменные
    const Module = ref({module:'PVAdmin'})  // Модуль по умолчанию
    const Modules = ref(modulesList)       // Список доступных модулей
    const ModuleNotSeted = ref(true)       // Флаг отображения селектора
    
    // Автоматическая конфигурация модуля
    if(typeof pvadminConfigs !== 'undefined' && pvadminConfigs && pvadminConfigs.module){
        if(modules[pvadminConfigs.module]) {
            Module.value = pvadminConfigs
            ModuleNotSeted.value = false
        }
    }
</script>

<style>
 #pvadmin{
  /* display: flex;
  width: auto;
  height: 100vh; */
 }
</style>
