// get language
export function getLang() {
  return localStorage.getItem('lang') || 'en'
}

// set language
export function setLang(lang: string) {
  localStorage.setItem('lang', lang || 'en')
}
