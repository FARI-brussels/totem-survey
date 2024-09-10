<template>
  <div class="wrapper">
    <div v-if="!formSubmitted" class="scroller" :class="{ active: showFeedback }">
      <div class="main-container">
        <div class="rating-wrapper">
          <FeedbackRating
            v-model="clickedRating"
            :labels="{
              low: ratingLabels.low[locale],
              high: ratingLabels.high[locale]
            }"
          />
        </div>
      </div>

      <div class="main-container">
        <div class="form-wrapper">
          <div class="feedback-options">
            <FeedbackOption
              v-for="(option, index) in feedbackOptions"
              :key="option.value"
              class="feedback-option"
              :value="option.value"
              :label="option.label[locale]"
              v-model="selectedOptions"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="main-container"></div>
    <div class="button-container">
      <FButton
        v-if="!showFeedback"
        class="feedback-button"
        :label="buttonLabels.next[locale]"
        on-dark
        :disabled="!clickedRating"
        @click="selectRating"
      />
      <FButton
        v-if="showFeedback"
        class="feedback-button"
        :label="buttonLabels.previous[locale]"
        on-dark
        type="secondary"
        :disabled="!clickedRating"
        @click="showFeedback = false"
      />
      <FButton
        v-if="showFeedback"
        class="feedback-button"
        :label="buttonLabels.submit[locale]"
        on-dark
        :disabled="!selectedRating"
        @click="submitForm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { FButton } from 'fari-component-library'
import { useRouter } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'
import { storeToRefs } from 'pinia'
import FeedbackOption from '@/components/FeedbackOption.vue'
import FeedbackRating from '@/components/FeedbackRating.vue'
import { demoTourOptionsLow, demoTourOptionsHigh } from '@/assets/feedback'

const router = useRouter()
const { getPageData, setSurveyTitle, setSurveySubTitle } = useSurveyStore()

const { locale } = storeToRefs(useSurveyStore())
onMounted(getPageData)

defineEmits(['exit'])

const clickedRating = ref<number | null>(null)

const selectedRating = ref<number | null>(null)

const selectedOptions = ref<string[]>([])

const formSubmitted = ref(false)

function submitForm() {
  const formValue = {
    rating: selectedRating.value,
    options: [...selectedOptions.value]
  }

  formSubmitted.value = true
  setSurveyTitle({
    en: 'Thank you!',
    'fr-FR': 'Merci!',
    nl: 'Dank je!'
  })

  function getRandomPrayingHandsEmoji() {
    const emojis = ['🙏', '🙏🏻', '🙏🏼', '🙏🏽', '🙏🏾', '🙏🏿']
    return emojis[Math.floor(Math.random() * emojis.length)]
  }
  function displayEmoji() {
    const emoji = getRandomPrayingHandsEmoji()
    const emojiElement = document.createElement('div')
    emojiElement.textContent = emoji
    emojiElement.style.position = 'fixed'
    emojiElement.style.top = '50%'
    emojiElement.style.left = '50%'
    emojiElement.style.transform = 'translate(-50%, -50%)'
    emojiElement.style.fontSize = '10rem' // Adjust size as needed
    emojiElement.style.zIndex = '1000'
    emojiElement.style.opacity = '1'
    emojiElement.style.transition = 'opacity 1s ease'

    document.body.appendChild(emojiElement)

    setTimeout(() => {
      emojiElement.style.opacity = '0'
      setTimeout(() => {
        document.body.removeChild(emojiElement)
        setSurveyTitle({ en: '', nl: '', 'fr-FR': '' })
        router.push({ path: '/' })
      }, 1000)
    }, 2000)
  }

  displayEmoji()
}

const showFeedback = ref(false)
watch(
  [formSubmitted, showFeedback, selectedRating],
  ([formSubmitted, showFeedback, selectedRating]) => {
    if (formSubmitted) {
      setSurveyTitle({
        en: 'Thank you!',
        'fr-FR': 'Merci!',
        nl: 'Dank je!'
      })
    } else if (!showFeedback)
      setSurveyTitle({
        en: 'How likely are you to recommend a Demo Tour?',
        'fr-FR': 'Quelle est la probabilité que vous recommandiez une visite de démonstration?',
        nl: 'Hoe waarschijnlijk is het dat je een demotour zou aanbevelen?'
      })
    else if (selectedRating !== null && selectedRating <= 3)
      setSurveyTitle({
        en: 'What could we do better?',
        'fr-FR': 'Que pourrions-nous améliorer?',
        nl: 'Wat kunnen we beter doen?'
      })
    else if (selectedRating !== null && selectedRating >= 4)
      setSurveyTitle({
        en: 'Please let us know what aspects you appreciated.',
        'fr-FR': 'Faites-nous savoir ce que vous avez apprécié.',
        nl: 'Laat ons weten wat je hebt gewaardeerd.'
      })
    else
      setSurveyTitle({
        en: '',
        'fr-FR': '',
        nl: ''
      })

    if (showFeedback && !formSubmitted)
      setSurveySubTitle({
        en: '(You can select more than one option.)',
        'fr-FR': "(Vous pouvez sélectionner plus d'une option.)",
        nl: '(U kunt meer dan één optie selecteren.)'
      })
    else setSurveySubTitle({ en: '', 'fr-FR': '', nl: '' })
  }
)

function selectRating() {
  selectedRating.value = clickedRating.value
  showFeedback.value = true
}

const ratingLabels = {
  low: {
    en: 'Not likely at all',
    'fr-FR': 'Pas du tout probable',
    nl: 'Helemaal niet waarschijnlijk'
  },
  high: {
    en: 'Very likely',
    'fr-FR': 'Très probable',
    nl: 'Zeer waarschijnlijk'
  }
}

const feedbackOptions = computed(() => {
  if (selectedRating.value !== null && selectedRating.value <= 6) return demoTourOptionsLow
  else if (selectedRating.value !== null && selectedRating.value >= 7) return demoTourOptionsHigh
  return []
})

const buttonLabels = {
  next: {
    en: 'Next',
    'fr-FR': 'Suivant',
    nl: 'Volgende'
  },
  previous: {
    en: 'Previous',
    'fr-FR': 'Précédent',
    nl: 'Vorige'
  },
  submit: {
    en: 'Submit',
    'fr-FR': 'Soumettre',
    nl: 'Indienen'
  }
}
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
  top: -6rem;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 80%;
}

.main-container {
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.scroller {
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  flex-wrap: nowrap;
  transition: all 400ms ease-in-out;
  height: 100%;
}
.active {
  transform: translateX(-64rem);
}

.form-wrapper {
  display: flex;
  gap: 2rem;
  width: 60rem;
  justify-content: center;
  flex-direction: column;
  padding: 0 4rem;
}

.rating-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 6rem;
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

.feedback-button {
  width: fit-content;
  margin-top: 4rem;
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

.feedback-options {
  display: flex;
  flex-direction: column;
  // flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
  gap: 1.4rem;
}
</style>
