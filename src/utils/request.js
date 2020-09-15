const BASE_URL = 'http://localhost:8080'

export function get(url, param) {
  if (!param) {
    param = {}
  }
  const paramsArray = []
  Object.keys(param).forEach(key => {
    paramsArray.push(key + '=' + param[key])
  })
  if (url.search(/\?/) === -1) {
    url += '?' + paramsArray.join('&')
  } else {
    url += '&' + paramsArray.join('&')
  }
  const get = fetch(BASE_URL + url, { headers: {} })
    .then(function(response) {
      return response.json()
    })
    .then(function(json) {
      return json
    })
  return get
}
