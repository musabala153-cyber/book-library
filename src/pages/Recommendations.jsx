import { useEffect, useState } from 'react'
import { Button, Row, Col, Spinner, Alert } from 'react-bootstrap'
import BookCard from '../components/BookCard'
import AddToLibrary from '../components/AddToLibrary'
import { useLibrary } from '../context/LibraryContext'

const GENRES = [
  { label: 'Fantasy', slug: 'fantasy' },
  { label: 'Science fiction', slug: 'science_fiction' },
  { label: 'Mystery', slug: 'mystery' },
  { label: 'Romance', slug: 'romance' },
  { label: 'Horror', slug: 'horror' },
  { label: 'History', slug: 'history' },
  { label: 'Biography', slug: 'biography' },
  { label: 'Thriller', slug: 'thriller' },
]

// Finds the genre that appears most often in the user's saved books.
// Books marked "Read" are used first; if there are none, all saved books are used.
function findTopGenre(books) {
  const readBooks = books.filter((b) => b.status === 'Read')
  const source = readBooks.length > 0 ? readBooks : books

  let best = null
  let bestCount = 0

  GENRES.forEach((genre) => {
    const count = source.filter((book) =>
      (book.subject || []).some((s) => s.toLowerCase().includes(genre.label.toLowerCase()))
    ).length
    if (count > bestCount) {
      best = genre.slug
      bestCount = count
    }
  })

  return best
}

function Recommendations() {
  const { books: savedBooks } = useLibrary()
  const topGenre = findTopGenre(savedBooks)

  const [genre, setGenre] = useState(topGenre || 'fantasy')
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadGenre() {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(
          `https://openlibrary.org/subjects/${genre}.json?limit=24`
        )
        if (!response.ok) {
          throw new Error('Request failed')
        }
        const data = await response.json()
        const results = data.works.map((w) => ({
          key: w.key,
          title: w.title,
          author_name: w.authors ? w.authors.map((a) => a.name) : undefined,
          cover_i: w.cover_id,
          subject: w.subject,
        }))
        if (!cancelled) setWorks(results)
      } catch (err) {
        if (!cancelled) {
          setError('Could not load recommendations. Please try again.')
          setWorks([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadGenre()
    return () => {
      cancelled = true
    }
  }, [genre])

  const savedKeys = savedBooks.map((b) => b.key)
  const suggestions = works.filter((w) => !savedKeys.includes(w.key)).slice(0, 12)
  const genreLabel = GENRES.find((g) => g.slug === genre)?.label

  return (
    <>
      <h1 className="mb-2">Recommendations</h1>
      <p className="text-muted">
        {topGenre
          ? `Your library leans towards ${GENRES.find((g) => g.slug === topGenre).label}. Pick another genre any time.`
          : 'Add some books to your library to get personal suggestions. For now, pick a genre.'}
      </p>

      <div className="d-flex flex-wrap gap-2 mb-4">
        {GENRES.map((g) => (
          <Button
            key={g.slug}
            size="sm"
            variant={g.slug === genre ? 'primary' : 'outline-primary'}
            onClick={() => setGenre(g.slug)}
          >
            {g.label}
          </Button>
        ))}
      </div>

      <h2 className="fs-4 mb-3">Popular in {genreLabel}</h2>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && suggestions.length === 0 && (
        <Alert variant="info">No new suggestions in this genre. Try another one.</Alert>
      )}

      <Row xs={2} md={3} lg={4} className="g-4">
        {suggestions.map((book) => (
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

export default Recommendations