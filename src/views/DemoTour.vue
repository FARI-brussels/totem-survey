<template>
  <div class="wrapper">
    <h1
      class="title font-size-subtitle font-weight-extrabold"
      :class="{ 'font-size-title': formSubmitted }"
    >
      {{ title[locale] }}
      <small v-if="showFeedback && !formSubmitted">{{ feedbackSubtitle[locale] }} </small>
    </h1>
    <div v-if="!formSubmitted" class="scroller" :class="{ active: showFeedback }">
      <div class="main-container">
        <div class="form-wrapper-ratings">
          <div
            v-for="n in 10"
            :key="n"
            class="rating-item"
            :class="{ selected: selectedRating === n }"
            @click="selectRating(n)"
          >
            <div class="circle"></div>
          </div>
        </div>
        <div class="rating-labels font-size-body">
          <span class="font-weight-extrabold">{{ ratingLabels.low[locale] }}</span>
          <span class="font-weight-extrabold">{{ ratingLabels.high[locale] }}</span>
        </div>
      </div>

      <div class="main-container">
        <div class="form-wrapper">
          <div class="feedback-options">
            <div
              v-for="(option, index) in feedbackOptions"
              :key="option.value"
              @click="toggleOption(option.value)"
              class="feedback-option"
            >
              <div
                class="circle feedback-item mr-sm"
                :class="{ selected: isSelected(option.value) }"
              ></div>
              <span class="feedback-label font-size-body font-weight-bold">{{
                option.label[locale]
              }}</span>
            </div>
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
        :disabled="!selectedRating"
        @click="showFeedback = true"
      />
      <FButton
        v-if="showFeedback"
        class="feedback-button"
        :label="buttonLabels.previous[locale]"
        on-dark
        type="secondary"
        :disabled="!selectedRating"
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
import { ref, computed, watch } from 'vue'
import { FButton } from 'fari-component-library'
import { useRouter, useRoute } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'
import { storeToRefs } from 'pinia'

const router = useRouter()

const { locale } = storeToRefs(useSurveyStore())

defineEmits(['exit'])

const selectedRating = ref<number | null>(null)
const selectRating = (rating: number) => {
  selectedRating.value = rating
}
const selectedOptions = ref<string[]>([])

const toggleOption = (option: string) => {
  if (selectedOptions.value.includes(option)) {
    selectedOptions.value = selectedOptions.value.filter((item) => item !== option)
  } else {
    selectedOptions.value.push(option)
  }
}

const isSelected = (option: string) => selectedOptions.value.includes(option)

const formSubmitted = ref(false)

function submitForm() {
  const formValue = {
    rating: selectedRating.value,
    options: [...selectedOptions.value]
  }

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
      }, 1000)
    }, 2000)
  }

  displayEmoji()
  formSubmitted.value = true
}

watch(formSubmitted, () => setTimeout(() => router.push({ path: '/' }), 2000))

const showFeedback = ref(false)

const title = computed(() => {
  if (formSubmitted.value)
    return {
      en: 'Thank you!',
      'fr-FR': 'Merci!',
      nl: 'Dank je!'
    }
  if (!showFeedback.value)
    return {
      en: 'How likely are you to recommend a Demo Tour?',
      'fr-FR': 'Quelle est la probabilité que vous recommandiez une visite de démonstration?',
      nl: 'Hoe waarschijnlijk is het dat je een demotour zou aanbevelen?'
    }
  if (selectedRating.value !== null && selectedRating.value <= 6)
    return {
      en: 'We are sorry to hear that your experience wasn’t great. What could we do better?',
      'fr-FR':
        "Nous sommes désolés d'apprendre que votre expérience n'a pas été bonne. Que pourrions-nous améliorer?",
      nl: 'Het spijt ons te horen dat uw ervaring niet geweldig was. Wat kunnen we beter doen?'
    }
  else if (selectedRating.value !== null && selectedRating.value >= 7)
    return {
      en: 'We’re delighted to hear that you had a great experience. Please let us know what aspects you appreciated.',
      'fr-FR':
        "Nous sommes ravis d'apprendre que vous avez passé un bon moment. Faites-nous savoir ce que vous avez apprécié.",
      nl: 'We zijn verheugd te horen dat je een geweldige ervaring hebt gehad. Laat ons weten wat je hebt gewaardeerd.'
    }

  return {
    en: '',
    'fr-FR': '',
    nl: ''
  }
})

const feedbackSubtitle = {
  en: '(You can select more than one option.)',
  'fr-FR': "(Vous pouvez sélectionner plus d'une option.)",
  nl: '(U kunt meer dan één optie selecteren.)'
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
  if (selectedRating.value !== null && selectedRating.value <= 6) {
    return [
      {
        value: 'technicalIssues',
        label: {
          en: 'Some demos were not working because of technical issues.',
          'fr-FR':
            'Certaines démonstrations ne fonctionnaient pas en raison de problèmes techniques.',
          nl: "Sommige demo's werkten niet vanwege technische problemen."
        }
      },
      {
        value: 'tooComplex',
        label: {
          en: 'I found the demos too complex and not self-explanatory.',
          'fr-FR': "J'ai trouvé les démonstrations trop complexes et pas assez explicites.",
          nl: "Ik vond de demo's te complex en niet vanzelfsprekend."
        }
      },
      {
        value: 'boring',
        label: {
          en: 'I found the demos boring, uninteresting, and not engaging.',
          'fr-FR': "J'ai trouvé les démonstrations ennuyeuses, inintéressantes et peu engageantes.",
          nl: "Ik vond de demo's saai, oninteressant en niet boeiend."
        }
      },
      {
        value: 'notUserFriendly',
        label: {
          en: 'I found the demos difficult to use and not user-friendly.',
          'fr-FR': "J'ai trouvé les démonstrations difficiles à utiliser et peu conviviales.",
          nl: "Ik vond de demo's moeilijk te gebruiken en niet gebruiksvriendelijk."
        }
      },
      {
        value: 'irrelevant',
        label: {
          en: 'The presented topics were not relevant to me, I didn’t learn anything new.',
          'fr-FR':
            "Les sujets présentés n'étaient pas pertinents pour moi, je n'ai rien appris de nouveau.",
          nl: 'De gepresenteerde onderwerpen waren niet relevant voor mij, ik heb niets nieuws geleerd.'
        }
      },
      {
        value: 'guideIssues',
        label: {
          en: 'The demo tour guide lacked knowledge and/or communication skills.',
          'fr-FR':
            'Le guide de la visite de démonstration manquait de connaissances et/ou de compétences en communication.',
          nl: 'De demotourgids had onvoldoende kennis en/of communicatievaardigheden.'
        }
      },
      {
        value: 'acoustics',
        label: {
          en: 'The acoustics made it hard to understand the guide clearly.',
          'fr-FR': "L'acoustique rendait difficile la compréhension du guide.",
          nl: 'De akoestiek maakte het moeilijk om de gids duidelijk te verstaan.'
        }
      },
      {
        value: 'visibility',
        label: {
          en: 'The demos or presentations were hard to see, not clearly visible.',
          'fr-FR':
            'Les démonstrations ou présentations étaient difficiles à voir, pas clairement visibles.',
          nl: "De demo's of presentaties waren moeilijk te zien, niet duidelijk zichtbaar."
        }
      },
      {
        value: 'otherConcerns',
        label: {
          en: 'Any other concerns or problems not listed above.',
          'fr-FR': 'Tout autre souci ou problème non mentionné ci-dessus.',
          nl: 'Andere zorgen of problemen die niet hierboven staan vermeld.'
        }
      }
    ]
  } else if (selectedRating.value !== null && selectedRating.value >= 7) {
    return [
      {
        value: 'flawless',
        label: {
          en: 'The demos worked flawlessly and without technical issues.',
          'fr-FR': 'Les démonstrations ont fonctionné sans faille et sans problèmes techniques.',
          nl: "De demo's werkten vlekkeloos en zonder technische problemen."
        }
      },
      {
        value: 'easyToUnderstand',
        label: {
          en: 'The demos were clear, easy to understand, and self-explanatory.',
          'fr-FR': 'Les démonstrations étaient claires, faciles à comprendre et explicites.',
          nl: "De demo's waren duidelijk, gemakkelijk te begrijpen en vanzelfsprekend."
        }
      },
      {
        value: 'engaging',
        label: {
          en: 'The demos were interesting, engaging, and captivating.',
          'fr-FR': 'Les démonstrations étaient intéressantes, engageantes et captivantes.',
          nl: "De demo's waren interessant, boeiend en meeslepend."
        }
      },
      {
        value: 'userFriendly',
        label: {
          en: 'The demos were user-friendly and easy to use.',
          'fr-FR': 'Les démonstrations étaient conviviales et faciles à utiliser.',
          nl: "De demo's waren gebruiksvriendelijk en eenvoudig te gebruiken."
        }
      },
      {
        value: 'relevant',
        label: {
          en: 'The topics were relevant and provided new information.',
          'fr-FR': 'Les sujets étaient pertinents et ont apporté de nouvelles informations.',
          nl: 'De onderwerpen waren relevant en boden nieuwe informatie.'
        }
      },
      {
        value: 'knowledgeableGuide',
        label: {
          en: 'The demo tour guide was knowledgeable and communicated effectively.',
          'fr-FR':
            'Le guide de la visite de démonstration était bien informé et communiquait efficacement.',
          nl: 'De demotourgids was goed geïnformeerd en communiceerde effectief.'
        }
      },
      {
        value: 'attentionToDetail',
        label: {
          en: 'The demos are thoughtfully designed with attention to detail.',
          'fr-FR': 'Les démonstrations sont conçues avec soin et souci du détail.',
          nl: "De demo's zijn zorgvuldig ontworpen met oog voor detail."
        }
      },
      {
        value: 'otherHighlights',
        label: {
          en: 'Any other highlights or positive aspects not listed above.',
          'fr-FR': 'Tout autre point fort ou aspect positif non mentionné ci-dessus.',
          nl: 'Andere hoogtepunten of positieve aspecten die niet hierboven staan vermeld.'
        }
      }
    ]
  }
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
  top: 6rem;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.main-container {
  margin-top: 2rem;
  width: fit-content;
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
  transform: translateX(-62rem);
}

.form-wrapper {
  display: flex;
  gap: 2rem;
  width: 60rem;
  justify-content: center;
  margin: auto 0;
  padding: 0 7rem;
  height: 100%;
}

.form-wrapper-ratings {
  display: flex;
  gap: 2rem;
  width: 60rem;
  justify-content: center;
  margin: auto 0;
  padding: 0 7rem;
  height: 100%;
}

.rating-item {
  margin-top: auto;
  margin-bottom: auto;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid white;
  background-color: transparent;
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

.rating-item.selected {
  .circle {
    background-color: white;
    border-color: white;
    box-shadow:
      0px 0px 0px 6px rgba(255, 255, 255, 0.3),
      0px 0px 0px 12px rgba(255, 255, 255, 0.3);
  }
}

.rating-labels {
  display: flex;
  justify-content: space-between;
  width: 40%;
  margin-top: 1rem;
  left: 0;
  right: 0;
  position: absolute;
  bottom: 50rem;
  left: 6rem;
}

.label {
  font-size: 1.2rem;
  color: white;
}

.button-container {
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  bottom: 20rem;
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
  justify-content: center;
  gap: 0.6rem;
  margin-top: 0.5rem;
  .feedback-option {
    display: flex;
    align-items: center;
    margin-bottom: 2.2rem;
    .feedback-item {
      display: flex;
      align-items: center;
      min-width: 3rem;
      width: 3rem;
      min-height: 3rem;
      height: 3rem;
      cursor: pointer;
    }
  }
}

.feedback-item.selected {
  background-color: white;
  border-color: white;
  box-shadow:
    0px 0px 0px 6px rgba(255, 255, 255, 0.3),
    0px 0px 0px 12px rgba(255, 255, 255, 0.3);
}

.feedback-label {
  margin-left: 1rem;
  color: white;
}
</style>
