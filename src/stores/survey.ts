import { defineStore } from 'pinia'
import type { Locale } from '@/types/Locale'
import { useRoute } from 'vue-router'

export const useSurveyStore = defineStore('survey', {
  state: () => ({
    error: null as any,
    loading: false,
    locale: 'en',
    userSelectedLocale: false,
    surveyTitle: {
      nl: '',
      'fr-FR': '',
      en: ''
    },
    surveySubTitle: {
      nl: '',
      'fr-FR': '',
      en: ''
    },
    pageData: {
      title: {},
      subtitle: {},
      surveys: []
    }
  }),
  actions: {
    async getPageData() {
      this.loading = true
      this.error = null

      const route = useRoute()
      try {
        const response = await fetch(`http://localhost:3000/api/${route.name}`)
        const data = await response.json()

        this.pageData.title = data.title
        this.pageData.subtitle = data.subtitle
        this.pageData.surveys = data.surveys
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
      } catch (error) {
        this.error = 'Error fetching data'
      } finally {
        this.loading = false
      }
    },
    setLocale(locale: Locale): any {
      this.locale = locale
      this.userSelectedLocale = true
    },
    setSurveyTitle(value: { [K in Locale]: string }) {
      this.surveyTitle = value
    },
    setSurveySubTitle(value: { [K in Locale]: string }) {
      this.surveySubTitle = value
    }
  }
})
