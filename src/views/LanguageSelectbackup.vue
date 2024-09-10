<template>
  <div class="wrapper">
    <div class="heading">
      <transition name="fade" mode="out-in">
        <FTitle v-if="pageData?.title[titleLocale]" :key="titleLocale">
          {{ pageData.title[titleLocale] }}
        </FTitle>
      </transition>
    </div>
    <div class="language-selector">
      <div
        class="language-item"
        :class="{ 'bg-color-blue-light rounded-s': locale === 'nl' }"
        @click="() => setLocale('nl')"
      >
        <img src="@/assets/dutch_flag.png" />
        <span> Nederlands </span>
      </div>
      <div
        class="language-item"
        :class="{ 'bg-color-blue-light rounded-s': locale === 'fr-FR' }"
        @click="() => setLocale('fr-FR')"
      >
        <img src="@/assets/french_flag.png" />
        <span> Francais </span>
      </div>
      <div
        class="language-item p-l"
        :class="{ 'bg-color-blue-light rounded-s': locale === 'en' }"
        @click="() => setLocale('en')"
      >
        <img src="@/assets/english_flag.png" />
        <span> English </span>
      </div>
    </div>
    <RouterLink :to="'select-survey'" v-slot="{ navigate }" class="router-link">
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

const { pageData, locale } = storeToRefs(useSurveyStore())
const { getPageData } = useSurveyStore()
const { setLocale } = useSurveyStore()

const buttonLabel: { [k: string]: string } = {
  en: 'Continue',
  nl: 'Doorgaan',
  'fr-FR': 'Continuer'
}

const titleLocales = ['en', 'nl', 'fr-FR']

// Locale ref to store current locale
const titleLocale = ref(titleLocales[0])

// Function to cycle locales every 10 seconds
const cycleLocale = () => {
  let index = 0
  return setInterval(() => {
    index = (index + 1) % titleLocales.length
    titleLocale.value = titleLocales[index]
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

.language-selector {
  width: 100%;
  // height: 14rem;
  display: flex;
  gap: 4rem;
  justify-content: space-evenly;

  .language-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 16rem;
    height: 16rem;
    gap: 1rem;
    transition: all 100ms ease-in-out;
    img {
      width: 10rem;
    }
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
