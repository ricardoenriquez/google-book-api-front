import React, { useState } from 'react'
import {
  getSearchBooks,
  addFavoriteApi,
  removeFavoriteApi
} from '../../util/APIUtils'
import { FaRegStar } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa'

const SearchGoogleApi = () => {
  const [txt, setTxt] = useState('')
  const [responseBooks, setResponseBooks] = useState([])

  const search = async () => {
    const response = await getSearchBooks(txt)
    setResponseBooks(response)
  }

  const addFavorite = async book => {
    const response = await addFavoriteApi(book)
    toggleFavorite(book.bookId, true)
    console.log('agregar a favoritos ' + book.title)
  }
  const removeFavorite = async book => {
    const response = await removeFavoriteApi(book)
    toggleFavorite(book.bookId, true)
    console.log('eliminar de favoritos ' + book.title)
  }

  const toggleFavorite = (bookId, favorite) => {
    setResponseBooks(
      responseBooks.map(book =>
        book.bookId === bookId ? { ...book, favorite } : book
      )
    )
  }

  return (
    <div>
      <div className='container'>
        <input
          className='form-control'
          type='search'
          value={txt}
          onChange={e => setTxt(e.target.value)}
        />
        <button className='btn btn-primary' onClick={() => search()}>
          Search{' '}
        </button>

        <div>
          {responseBooks &&
            responseBooks.map(book => {
              return (
                <div className='container' key={book.bookId}>
                  <h5>{book.title}</h5>
                  {book.thumbnail ? (
                    <img src={book.thumbnail} />
                  ) : (
                    'Imagen not found'
                  )}
                  {book.favorite ? (
                    <FaStar
                      className='icon-start'
                      size={50}
                      onClick={() => removeFavorite(book)}
                    />
                  ) : (
                    <FaRegStar
                      className='icon-start'
                      size={50}
                      onClick={() => addFavorite(book)}
                    />
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default SearchGoogleApi
