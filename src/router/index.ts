import { createMemoryHistory, createRouter } from 'vue-router'
import { StartScreen, SurveySelect, DemoTour, LanguageSelect } from '@/views'

const routes = [
  {
    path: '/start-page',
    component: StartScreen,
    alias: '/',
    name: 'start-page',
    meta: { transition: 'slide-right' }
  },
  {
    path: '/select-language',
    component: LanguageSelect,
    alias: '/',
    name: 'select-language',
    meta: { transition: 'slide-right' }
  },
  { path: '/select-survey', component: SurveySelect, name: 'select-survey' },
  { path: '/demo-tour', component: DemoTour, name: 'demo-tour' }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
