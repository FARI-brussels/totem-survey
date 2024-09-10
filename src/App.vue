<template>
  <TotemLayout>
    <template #title>
      <transition name="fade" mode="out-in">
        <FTitle
          v-if="surveyTitle[currentLocale] || pageData.title[currentLocale]"
          :key="currentLocale"
        >
          {{ surveyTitle[currentLocale] || pageData.title[currentLocale] }}
        </FTitle>
      </transition>
      <transition name="fade" mode="out-in">
        <h2
          v-if="surveySubTitle[currentLocale] || pageData?.subtitle[currentLocale]"
          :key="currentLocale"
          class="subtitle color-white"
        >
          {{ surveySubTitle[currentLocale] || pageData.subtitle[currentLocale] }}
        </h2>
      </transition>
    </template>

    <template #content>
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </template>
    <template #actions> </template>
  </TotemLayout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TotemLayout from './layouts/TotemLayout.vue'
import { FTitle } from 'fari-component-library'
import { useSurveyStore } from '@/stores/survey'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'

const { pageData, locale, userSelectedLocale, surveyTitle, surveySubTitle } =
  storeToRefs(useSurveyStore())

const titleLocales = ['en', 'nl', 'fr-FR']
const titleLocale = ref(titleLocales[0])

const currentLocale = computed(() => (userSelectedLocale.value ? locale.value : titleLocale.value))

const cycleLocale = () => {
  let index = 0
  return setInterval(() => {
    index = (index + 1) % titleLocales.length
    titleLocale.value = titleLocales[index]
  }, 2000)
}

let intervalId: number | undefined

onMounted(() => {
  if (!userSelectedLocale.value) intervalId = cycleLocale()
})

onUnmounted(() => clearInterval(intervalId))

watch(userSelectedLocale, (newValue) => {
  clearInterval(intervalId)
  if (newValue) titleLocale.value = locale.value
  else intervalId = cycleLocale()
})
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
