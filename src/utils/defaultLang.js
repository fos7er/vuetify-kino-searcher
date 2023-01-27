import languages from '@/locales/languages'
import { LocalStorage } from '@/utils/WebStorage'

export default function getDefaultLanguage () {
  if (LocalStorage.settings.lang) {
    return LocalStorage.settings.lang
  }
  const browserLang = navigator.language || navigator.userLanguage
  for (const key in languages) {
    if (languages[key].code === browserLang) {
      return key
    }
  }
}
