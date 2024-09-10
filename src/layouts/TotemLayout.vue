<template>
  <div class="layout">
    <!-- <FFooter class="footer" /> -->
    <div class="heading">
      <slot name="title" />
    </div>

    <div class="content">
      <slot name="content" />
    </div>
    <div class="actions">
      <slot name="actions" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { FFooter } from 'fari-component-library'
</script>
<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  align-items: center;
  background-image: radial-gradient(circle, rgb(75 118 212) 0%, rgb(24, 62, 145) 70%);
}

.heading {
  position: absolute;
  top: 8rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rem;
  text-align: center;
  gap: 2rem;
}

.content {
  position: absolute;
  top: 40rem;
  width: 100%;
  height: 60rem;
}

.footer {
  position: absolute;
  top: 2rem;
  // bottom: 2rem;
}
</style>
