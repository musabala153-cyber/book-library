import StatsChart from '../components/StatsChart'
import { Tabs, Tab, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { toast } from 'react-toastify'
import BookCard from '../components/BookCard'
import { useLibrary } from '../context/LibraryContext'

const STATUSES = ['Reading', 'Read', 'Unread']

function Library() {
  const { books, updateStatus, removeBook } = useLibrary()

  function handleRemove(book) {
    removeBook(book.key)
    toast.info(`Removed "${book.title}"`)
  }

  return (
    <>
      <h1 className="mb-3">My Library</h1>
      <StatsChart books={books} />
      <Tabs defaultActiveKey="Reading" className="mb-3">
        {STATUSES.map((status) => {
          const list = books.filter((b) => b.status === status)
          return (
            <Tab key={status} eventKey={status} title={`${status} (${list.length})`}>
              {list.length === 0 ? (
                <Alert variant="info">
                  No books here yet. Find some on the Discover page.
                </Alert>
              ) : (
                <Row xs={2} md={3} lg={4} className="g-4">
                  {list.map((book) => (
                    <Col key={book.key}>
                      <BookCard book={book}>
                        <Form.Select
                          size="sm"
                          className="mb-2"
                          aria-label={`Change status of ${book.title}`}
                          value={book.status}
                          onChange={(e) => updateStatus(book.key, e.target.value)}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </Form.Select>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleRemove(book)}
                        >
                          Remove
                        </Button>
                      </BookCard>
                    </Col>
                  ))}
                </Row>
              )}
            </Tab>
          )
        })}
      </Tabs>
    </>
  )
}

export default Library