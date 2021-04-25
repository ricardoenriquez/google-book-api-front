import React, { useState, useEffect } from 'react'
import { getSearchBooks } from '../../util/APIUtils'
import './Search.css'
import CardBook from '../../common/components/cardBook/CardBook'
import { connect } from 'react-redux'
import { searchBooks } from '../../actions/bookApiAction'

const SearchGoogleApi = ({ searchBooks, books }) => {
  const [txt, setTxt] = useState('')
  const [responseBooks, setResponseBooks] = useState([])
  //const [responseBooks, setResponseBooks] = useState([{bookId:'sdfsdf23',title:'Java in Action',selfLink:'http:\\localhost:3000',subtitle:'subtitulo',thumbnail:'https://books.google.com/books/content?id=y361soCvNvsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',favorite:true}])

  const search = async () => {
    //wait searchBooks(txt)
    const response = await getSearchBooks(txt)
    setResponseBooks(response)
  }
  /*
  useEffect(() => {
    console.log('Actualizando libros')
  }, [books])
*/
  return (
    <div>
      <div className='container'>
        <div>
          <div className='searcher'>
            <input
              className='form-control input-search'
              type='search'
              value={txt}
              onChange={e => setTxt(e.target.value)}
            />
            <button
              className='btn btn-primary btn-search'
              onClick={() => search()}
            >
              Search{' '}
            </button>
          </div>
        </div>
        <div className='cards'>
          {responseBooks &&
            responseBooks.map(book => {
              return (
                <CardBook book={book} setResponseBooks={setResponseBooks} />
              )
            })}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  books: state.bookApiReducer
})

export default connect(mapStateToProps, { searchBooks })(SearchGoogleApi)
