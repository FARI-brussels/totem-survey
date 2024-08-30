<template>
  <div class="layout">
    <FLanguageSelector @update:locale="setLocale" />

    <div class="content">
      <slot name="content"></slot>
    </div>

    <FFooter class="footer" />
  </div>
</template>

<script setup lang="ts">
import { FFooter, FLanguageSelector } from 'fari-component-library'
import { useSurveyStore } from '@/stores/survey'

const { setLocale } = useSurveyStore()
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

.content {
  width: 100%;
  height: 100%;
}

:deep(.language-selector) {
  color: white;
}

:deep(.selected) {
  color: #4393de;
}

.footer {
  position: absolute;
  bottom: 2rem;
}
</style>
