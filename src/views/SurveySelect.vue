<template>
  <div class="wrapper">
    <div class="survey-items-container">
      <FContainer v-for="{ title, slug } in pageData.surveys" :key="title" class="survey-item">
        <h2 class="color-primary font-weight-extrabold font-size-subtitle">
          {{ title[locale] }}
        </h2>

        <FCardActions class="action">
          <template #actions>
            <RouterLink :to="slug" v-slot="{ navigate }" class="router-link">
              <FButton :label="buttonLabel[locale]" @click="navigate" />
            </RouterLink>
          </template>
        </FCardActions>
      </FContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FContainer, FCardActions, FButton, FTitle } from 'fari-component-library'
import { useSurveyStore } from '@/stores/survey'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const { pageData, locale } = storeToRefs(useSurveyStore())
const { getPageData } = useSurveyStore()

onMounted(getPageData)
defineEmits(['exit'])

const buttonLabel = {
  en: 'Go to survey',
  'fr-FR': "Accéder à l'enquête",
  nl: 'Ga naar enquête'
}
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-bottom: 10rem;
}

.survey-items-container {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.survey-item {
  width: 30rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
}

.action {
  margin-top: auto;
  a {
    text-decoration: none;
  }
}
</style>
