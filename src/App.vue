<template>
  <TotemLayout @update:locale="setLocale">
    <template #content>
      <RouterView v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </RouterView>
    </template>
  </TotemLayout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TotemLayout from './layouts/TotemLayout.vue'
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
