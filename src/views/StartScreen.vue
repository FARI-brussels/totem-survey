<template>
  <div class="wrapper">
    <div class="heading">
      <FTitle v-if="pageData?.title[locale]"> {{ pageData.title[locale] }} </FTitle>
      <h2 v-if="pageData?.subtitle[locale]" class="subtitle color-white">
        {{ pageData.subtitle[locale] }}
      </h2>
    </div>
    <RouterLink :to="'select-survey'" v-slot="{ navigate }" class="router-link">
      <FButton :label="buttonLabel[locale]" type="primary" on-dark @click="navigate" />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { FButton, FTitle } from 'fari-component-library'
import { useSurveyStore } from '@/stores/survey'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

defineEmits(['start'])

const { pageData, locale } = storeToRefs(useSurveyStore())
const { getPageData } = useSurveyStore()

const buttonLabel = {
  en: 'Start',
  nl: 'Beginnen',
  'fr-FR': 'Commencer'
}

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
</style>
