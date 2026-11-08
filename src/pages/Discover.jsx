import AddToLibrary from '../components/AddToLibrary'
import { useState } from 'react'
import { Form, Button, InputGroup, Row, Col, Spinner, Alert } from 'react-bootstrap'
import BookCard from '../components/BookCard'

function Discover() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError('')
    setSearched(true)

    try {
      const url =
        'https://openlibrary.org/search.json?q=' +
        encodeURIComponent(query) +
        '&limit=12&fields=key,title,author_name,cover_i,subject'
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Request failed')
      }
      const data = await response.json()
      setBooks(data.docs)
    } catch (err) {
      setError('Could not load books. Please check your connection and try again.')
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1 className="mb-3">Discover</h1>

      <Form onSubmit={handleSearch} className="mb-4">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search by title or author"
            aria-label="Search books"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" variant="primary">Search</Button>
        </InputGroup>
      </Form>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && searched && books.length === 0 && (
        <Alert variant="info">No books found. Try a different search.</Alert>
      )}

      <Row xs={2} md={3} lg={4} className="g-4">
        {books.map((book) => (
          <Col key={book.key}>
            <BookCard book={book}>
              <AddToLibrary book={book} />
            </BookCard>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Discover