import { createContext, useContext, useEffect, useState } from 'react'

const LibraryContext = createContext(null)
const STORAGE_KEY = 'book-library-books'

function loadBooks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(loadBooks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
  }, [books])

  function addBook(book, status) {
    if (books.some((b) => b.key === book.key)) return
    const saved = {
      key: book.key,
      title: book.title,
      author_name: book.author_name,
      cover_i: book.cover_i,
      subject: (book.subject || []).slice(0, 10),
      status,
    }
    setBooks([...books, saved])
  }

  function updateStatus(key, status) {
    setBooks(books.map((b) => (b.key === key ? { ...b, status } : b)))
  }

  function removeBook(key) {
    setBooks(books.filter((b) => b.key !== key))
  }

  function getBook(key) {
    return books.find((b) => b.key === key)
  }

  return (
    <LibraryContext.Provider
      value={{ books, addBook, updateStatus, removeBook, getBook }}
    >
      {children}
    </LibraryContext.Provider>
  )
}

export function useLibrary() {
  return useContext(LibraryContext)
}