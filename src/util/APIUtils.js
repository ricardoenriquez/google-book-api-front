import { API_BASE_URL, ACCESS_TOKEN } from '../constants'
import jwt_decode from 'jwt-decode'

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
  const userId = getUserId()
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.')
  }

  return request({
    url: API_BASE_URL + '/api/book/findBooks/' + userId + '/' + txt,
    method: 'GET'
  })
}

export function addFavoriteApi (book) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.')
  }
  const userId = getUserId()
  const favorite = { userId: userId, bookId: book.bookId }

  return request({
    url: API_BASE_URL + '/api/book/markFavorite',
    method: 'PUT',
    body: JSON.stringify(favorite)
  })
}

const getUserId = () => {
  var decoded = jwt_decode(localStorage.getItem(ACCESS_TOKEN))
  return decoded.sub
}

export function removeFavoriteApi (book) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.')
  }
  const userId = getUserId()
  const favorite = { userId: userId, bookId: book.bookId }

  return request({
    url: API_BASE_URL + '/api/book/removeFavorite',
    method: 'PUT',
    body: JSON.stringify(favorite)
  })
}
