import React from 'react'
import './Card.css'
import { FaRegStar } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa'
import { addFavoriteApi, removeFavoriteApi } from '../../../util/APIUtils'
import imgNotFound from '../../../img/imgNotFound.png'
import { connect } from 'react-redux'

const CardBook = ({ book, setResponseBooks }) => {
  const addFavorite = async book => {
    console.log('agregar a favoritos ' + book.title)
    const response = await addFavoriteApi(book)
    toggleFavorite(book.bookId, true)
  }
  const removeFavorite = async book => {
    console.log('eliminar de favoritos ' + book.title)
    const response = await removeFavoriteApi(book)
    toggleFavorite(book.bookId, false)
  }

  const toggleFavorite = (bookId, favorite) => {
    setResponseBooks(responseBooks => {
      responseBooks.map(book =>
        book.bookId === bookId ? { ...book, favorite } : book
      )
    })
  }

  return (
    <div className='card-book' key={book.bookId}>
      <div className='avatar'>
        {book.thumbnail ? (
          <img src={book.thumbnail} />
        ) : (
          <img width={140} src={imgNotFound} />
        )}
      </div>
      <div className='description'>
        <h3>{book.title}</h3>
        <h5>{book.subtitle}</h5>
        <a className='show-more' target='_blank' href={book.infoLink}>
          Mas Información
        </a>
        {book.favorite ? (
          <FaStar
            alt={'remove favorite'}
            className='icon-start'
            size={50}
            onClick={() => removeFavorite(book)}
          />
        ) : (
          <FaRegStar
            alt={'add favorite'}
            className='icon-start'
            size={50}
            onClick={() => addFavorite(book)}
          />
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  generalReducer: state.generalReducer
})

export default connect(mapStateToProps, {})(CardBook)
