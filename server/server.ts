import express from 'express'
import type { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

const app = express()
const PORT = 3000
dotenv.config()

const strapiURL = process.env.API_URL

interface Attributes {
  locale: string
  logo: string
  research_head: string
  research_lead: string
  explanation_short: {
    en: string
    nl: string
    'fr-FR': string
  }
}

app.use(cors())
app.use(bodyParser.json())

function organizeLocalizationData(localizations) {
  const organizedData = {
    title: {},
    subtitle: {},
    surveys: []
  }

  localizations.forEach((localeItem) => {
    const locale = localeItem.attributes.locale

    // Organize the title and subtitle at the main level
    organizedData.title[locale] = localeItem.attributes.title
    organizedData.subtitle[locale] = localeItem.attributes.subtitle

    // Organize the surveys
    localeItem.attributes.totem_surveys.data.forEach((survey, index) => {
      if (!organizedData.surveys[index]) {
        organizedData.surveys[index] = {
          title: {},
          subtitle: {}
        }
      }

      organizedData.surveys[index].title[locale] = survey.attributes.title
      organizedData.surveys[index].subtitle[locale] = survey.attributes.subtitle
      organizedData.surveys[index].slug = survey.attributes.slug
    })
  })

  return organizedData
}

app.get('/api/:slug', async (req: Request, res: Response) => {
  const { slug } = req.params
  console.dir(slug, { depth: null })
  try {
    const response = await fetch(
      `${strapiURL}/api/totem-surveys?filters[slug][$eq]=${slug}&populate[1]=totem_surveys&populate=*&locale=all`
    )
    const { data } = await response.json()
    console.dir(data, { depth: null })
    res.send(organizeLocalizationData(data))
  } catch (error) {
    console.error({ error })
    res.status(500).send('Error fetching data from Strapi')
  }
})

app.listen(PORT, () => console.info(`Server is running on http://localhost:${PORT}`))
