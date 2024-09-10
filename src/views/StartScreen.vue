<template>
  <div class="wrapper">
    <RouterLink :to="'select-language'" v-slot="{ navigate }" class="router-link">
      <transition name="fade" mode="out-in">
        <FButton :label="buttonLabel[locale]" type="primary" on-dark @click="navigate" />
      </transition>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { FButton, FTitle } from 'fari-component-library'
import { useSurveyStore } from '@/stores/survey'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

defineEmits(['start'])

const { pageData } = storeToRefs(useSurveyStore())
const { getPageData } = useSurveyStore()

const buttonLabel = {
  en: 'Start',
  nl: 'Beginnen',
  'fr-FR': 'Commencer'
}

const locales = ['en', 'nl', 'fr-FR']

// Locale ref to store current locale
const locale = ref(locales[0])

// Function to cycle locales every 10 seconds
const cycleLocale = () => {
  let index = 0
  return setInterval(() => {
    index = (index + 1) % locales.length
    locale.value = locales[index]
  }, 10000) // Change every 10 seconds
}

let intervalId: number | undefined

onMounted(() => {
  getPageData()
  intervalId = cycleLocale() // Start cycling locales
})

onUnmounted(() => {
  clearInterval(intervalId) // Clear interval when component is unmounted
})

onMounted(getPageData)
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  padding: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.heading {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rem;
  text-align: center;
  gap: 2rem;

  .subtitle {
    font-size: 2rem;
  }
}

.router-link {
  position: absolute;
  top: 50%;
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
