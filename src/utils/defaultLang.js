import languages from '@/locales/languages'

export default function getDefaultLanguage () {
  if (localStorage.getItem('lang')) {
    return localStorage.getItem('lang')
  }
  const browserLang = navigator.language || navigator.userLanguage
  for (const key in languages) {
    if (languages[key].code === browserLang) {
      return key
    }
  }
  return 'ru'
}
