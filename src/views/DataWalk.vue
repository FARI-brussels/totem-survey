<template>
  <div class="wrapper">
    <h1 class="title font-size-title font-weight-extrabold">Rate one of our services.</h1>
    <div class="survey-items-container">
      <FContainer v-for="{ label, value } in surveyItems" :key="value" class="survey-item">
        <h2 class="color-primary font-weight-extrabold font-size-subtitle">
          {{ label }}
        </h2>

        <FCardActions>
          <template #actions>
            <FButton label="go to survey" />
          </template>
        </FCardActions>
      </FContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FContainer, FCardActions, FButton } from 'fari-component-library'

defineEmits(['exit'])

const surveyItems = [
  {
    label: 'Guided Demo Tour at the Test & Experience Centre',
    value: ''
  },
  {
    label: 'Guided Datawalk in Brussels',
    value: ''
  },
  {
    label: 'AI Initiation Workshop',
    value: ''
  },
  {
    label: 'AI Blindspots Workshop',
    value: ''
  }
]
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.title {
  position: absolute;
  top: 16rem;
  left: 8%;
}

.survey-items-container {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto 0;
}

.survey-item {
  width: 30rem;
}
</style>
