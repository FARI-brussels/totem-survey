<template>
  <div class="wrapper">
    <div class="language-selector mb-xl">
      <div class="highlight bg-color-blue-light" :style="highlightStyle"></div>
      <div
        class="language-item"
        :class="{ selected: locale === 'en' }"
        @click.stop.prevent="() => setLocale('en')"
        ref="en"
      >
        <img src="@/assets/english_flag.png" />
        <span> English </span>
      </div>
      <div
        class="language-item"
        :class="{ selected: locale === 'nl' }"
        @click.stop.prevent="() => setLocale('nl')"
        ref="nl"
      >
        <img src="@/assets/dutch_flag.png" />
        <span> Nederlands </span>
      </div>
      <div
        class="language-item"
        :class="{ selected: locale === 'fr-FR' }"
        @click.stop.prevent="() => setLocale('fr-FR')"
        ref="fr"
      >
        <img src="@/assets/french_flag.png" />
        <span> Francais </span>
      </div>
    </div>
    <div class="button-container">
      <transition name="fade" mode="out-in">
        <FButton :label="buttonLabel[locale]" type="primary" on-dark @click="goTo" class="mt-xl" />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FButton } from 'fari-component-library'
import { useSurveyStore } from '@/stores/survey'
import { storeToRefs } from 'pinia'
import { onMounted, ref, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'

defineEmits(['start'])

const { locale } = storeToRefs(useSurveyStore())
const { getPageData, userSelectedLocale } = useSurveyStore()
const { setLocale } = useSurveyStore()

const router = useRouter()

const buttonLabel: { [k: string]: string } = {
  en: 'Continue',
  nl: 'Doorgaan',
  'fr-FR': 'Continuer'
}

const nl = ref()
const en = ref()
const fr = ref()

const highlightStyle = ref({
  top: '-12px',
  left: '3.8rem'
})

const moveHighlight = () => {
  const selectedLanguage =
    locale.value === 'en' ? en.value : locale.value === 'fr-FR' ? fr.value : nl.value

  const rect = selectedLanguage.getBoundingClientRect()
  const left = rect.left - 35 + 'px'
  highlightStyle.value.left = left
}

onMounted(() => {
  getPageData()
  nextTick(moveHighlight)
})

watch(locale, moveHighlight)

function goTo() {
  if (!userSelectedLocale) setLocale(locale.value)
  router.push({ path: '/select-survey' })
}
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
  justify-content: center;
}

.heading {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rem;
  text-align: center;
  gap: 2rem;
}

.language-selector {
  width: 100%;
  display: flex;
  gap: 4rem;
  padding: 0 4rem;
  justify-content: space-evenly;
  position: relative;

  .language-item {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 16rem;
    height: 16rem;
    gap: 1rem;
    cursor: pointer;

    img {
      width: 10rem;
    }

    .selected {
      font-weight: bold;
    }
  }

  .highlight {
    position: absolute;
    z-index: 0;
    width: 16rem;
    height: 16rem;
    border-radius: 1rem;
    transition: all 0.3s ease;
  }
}

.button-container {
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  bottom: -10rem;
  // bottom: 20rem;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  gap: 2rem;
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

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
