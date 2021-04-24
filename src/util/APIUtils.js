import { API_BASE_URL, ACCESS_TOKEN } from '../constants'

const request = options => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    )
  }

  const defaults = { headers: headers }
  options = Object.assign({}, defaults, options)

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
    })
  )
}

export function getCurrentUser () {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.')
  }

  return request({
    url: API_BASE_URL + '/user/me',
    method: 'GET'
  })
}

export function getSearchBooks (txt) {
  const userId = 1
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.')
  }

  return request({
    url: API_BASE_URL + '/api/book/findBooks/' + userId+'/'+ txt,
    method: 'GET'
  })
}

export function addFavoriteApi (book) {
  const userId = 1
  const favorite = { userId: userId, bookId: book.bookId }
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.')
  }

  return request({
    url: API_BASE_URL + '/api/book/markFavorite',
    method: 'PUT',
    body: JSON.stringify(favorite)
  })
}

export function removeFavoriteApi (book) {
  const userId = 1
  const favorite = { userId: userId, bookId: book.bookId }
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.')
  }

  return request({
    url: API_BASE_URL + '/api/book/removeFavorite',
    method: 'PUT',
    body: JSON.stringify(favorite)
  })
}
