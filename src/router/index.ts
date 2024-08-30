import { createMemoryHistory, createRouter } from 'vue-router'
import {
  StartScreen,
  SurveySelect,
  DemoTour
  // DataWalk,
  // InitiationWorkshop,
  // BlindspotsWorkshop
} from '@/views'

const routes = [
  { path: '/start-page', component: StartScreen, alias: '/', name: 'start-page' },
  { path: '/select-survey', component: SurveySelect, name: 'select-survey' },
  { path: '/demo-tour', component: DemoTour, name: 'demo-tour' }
  // { path: '/data-walk', component: DataWalk, name: 'data-walk' },
  // { path: '/initiation-workshop', component: InitiationWorkshop },
  // { path: '/blindspots-workshop', component: BlindspotsWorkshop }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
