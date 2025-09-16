<template>
  <div class="user-management">
    <h2 class="mb-4">Управление пользователями</h2>
    <PVTables table="modUser" />
  </div>
</template>

<script setup>
    import { PVTables } from 'pvtables/dist/pvtables'
</script>

<style scoped>
.user-management {
  padding: 20px;
}
</style>
