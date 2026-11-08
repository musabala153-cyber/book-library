import { Dropdown, Badge } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useLibrary } from '../context/LibraryContext'

function AddToLibrary({ book }) {
  const { addBook, getBook } = useLibrary()
  const saved = getBook(book.key)

  if (saved) {
    return <Badge bg="success">In library: {saved.status}</Badge>
  }

  function handleAdd(status) {
    addBook(book, status)
    toast.success(`Added "${book.title}" to ${status}`)
  }

  return (
    <Dropdown>
      <Dropdown.Toggle size="sm" variant="outline-primary">
        Add to library
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleAdd('Unread')}>Unread</Dropdown.Item>
        <Dropdown.Item onClick={() => handleAdd('Reading')}>Reading</Dropdown.Item>
        <Dropdown.Item onClick={() => handleAdd('Read')}>Read</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default AddToLibrary