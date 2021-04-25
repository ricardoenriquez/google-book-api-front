import { SET_BOOKS } from './types'
import { getSearchBooks } from '../util/APIUtils'

export const searchBooks = txt => {
  return async dispatch => {
    const res = await getSearchBooks(txt)
    if (res) {
      dispatch(addTodoSuccess(res))
    }
  }
}

const addTodoSuccess = books => ({
  type: SET_BOOKS,
  payload: {
    ...books
  }
})
