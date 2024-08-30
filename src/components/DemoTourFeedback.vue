<template>
  <div class="wrapper">
    <div class="feedback-container">
      <h2>{{ feedbackTitle }}</h2>
      <p>{{ feedbackSubtitle }}</p>
      <div class="feedback-options">
        <div v-for="(option, index) in feedbackOptions" :key="index" class="feedback-item">
          <input
            type="checkbox"
            :id="'option-' + index"
            v-model="selectedOptions"
            :value="option"
          />
          <label :for="'option-' + index" class="feedback-label">
            <div class="circle-checkbox"></div>
            <span>{{ option }}</span>
          </label>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const selectedRating = ref<number | null>(null)
const selectedOptions = ref<string[]>([])


const feedbackTitle = computed(() => {
  if (selectedRating.value !== null && selectedRating.value <= 6) {
    return 'We are sorry to hear that your experience wasn’t great. What could we do better?'
  } else if (selectedRating.value !== null && selectedRating.value >= 7) {
    return 'We’re delighted to hear that you had a great experience. Please let us know what aspects you appreciated.'
  }
  return ''
})

const feedbackSubtitle = computed(() => {
  return '(You can select more than one option.)'
})

const feedbackOptions = computed(() => {
  if (selectedRating.value !== null && selectedRating.value <= 6) {
    return [
      'Some demos were not working because of technical issues.',
      'I found the demos too complex and not self-explanatory.',
      'I found the demos boring, uninteresting and not engaging.',
      'I found the demos difficult to use and not user-friendly.',
      "The presented topics were not relevant to me, I didn't learn anything new.",
      'The demo tour guide lacked knowledge and/or communication skills.',
      'The acoustics made it hard to understand the guide clearly.',
      'The demos or presentations were hard to see, not clearly visible.',
      'Any other concerns or problems not listed above.'
    ]
  } else if (selectedRating.value !== null && selectedRating.value >= 7) {
    return [
      'The demos worked flawlessly and without technical issues.',
      'The demos were clear, easy to understand, and self-explanatory.',
      'The demos were interesting, engaging, and captivating.',
      'The demos were user-friendly and easy to use.',
      'The topics were relevant and provided new information.',
      'The demo tour guide was knowledgeable and communicated effectively.',
      'The demos are thoughtfully designed with attention to detail.',
      'Any other highlights or positive aspects not listed above.'
    ]
  }
  return []
})
</script>

<style scoped lang="scss">
.circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid white;
  background-color: transparent;
  transition:
    background-color 0.3s,
    border-color 0.3s;
  box-shadow:
    2px 2px 5px rgba(0, 0, 0, 0.3),
    0 0 10px rgba(255, 255, 255, 0.5);
}

.survey-item.selected .circle {
  background-color: white;
  border-color: white;
  box-shadow:
    2px 2px 5px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(255, 255, 255, 0.8);
}

.rating-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  padding: 0 14%;
}

.label {
  font-size: 1.2rem;
  color: white;
}

/* Feedback section */
.feedback-container {
  margin-top: 2rem;
  padding: 0 14%;
}

.feedback-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.feedback-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.feedback-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.circle-checkbox {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 2px solid white;
  background-color: transparent;
  margin-right: 1rem;
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

input[type='checkbox']:checked + .feedback-label .circle-checkbox {
  background-color: white;
  border-color: white;
}
</style>
