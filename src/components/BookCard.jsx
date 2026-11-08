import { Card } from 'react-bootstrap'

function BookCard({ book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null

  return (
    <Card className="h-100">
      {coverUrl ? (
        <Card.Img variant="top" src={coverUrl} alt={`Cover of ${book.title}`} />
      ) : (
        <div
          className="bg-secondary text-white d-flex align-items-center justify-content-center"
          style={{ height: 250 }}
        >
          No cover
        </div>
      )}
      <Card.Body>
        <Card.Title className="fs-6">{book.title}</Card.Title>
        <Card.Text className="text-muted">
          {book.author_name ? book.author_name[0] : 'Unknown author'}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default BookCard