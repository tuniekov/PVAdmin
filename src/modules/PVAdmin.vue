<template>
  <div class="pvadmin-module">
    <UniTreePanel :treetabs="pvadmin"/>
  </div>
</template>

<script setup>
import { UniTreePanel } from 'pvtables/dist/pvtables'
import { ref } from 'vue'

const pvadmin = ref({
  modResourceTree:{
    type:'tree',
    title: 'Ресурсы',
    table: 'modResourceTree',
  },
  fileTree:{
    type: 'filetree',
    title: 'Файлы',
    mediaSources: [],
  },
});
</script>

<style scoped>
.pvadmin-module {
  display: flex;
  flex-direction: column;
  width: auto;
  height: 100vh;
}
</style>
