# My Book Library

A web app for keeping track of your reading. Search for books, sort them into
Unread, Reading and Read shelves, see simple reading stats, and get
recommendations based on the genres you read most.

**Live site: https:**//musabala153-cyber.github.io/book-library/
**Repository:** https://github.com/musabala153-cyber/book-library

Final project for the web development course.

## Features

- **Discover:** search books by title or author (Open Library API) and add them to a shelf
- **My Library:** books grouped in tabs by status, with counts, a bar chart of reading stats, and options to move or remove books
- **Recommendations:** suggestions from your most common genre, or a genre you pick, excluding books you already saved

Saved books are stored in the browser's localStorage, so they stay after a refresh.

## Tech stack

- React (built with Vite)
- react-router-dom for navigation between the three screens
- Bootstrap and React-Bootstrap for styling and responsive layout
- react-toastify for notifications
- recharts for the stats chart
- Open Library API (https://openlibrary.org/developers/api), no API key needed

## How to run the project

Requires [Node.js](https://nodejs.org) (LTS version).

1. Install dependencies:
2. Start the development server:
3. Open the address shown in the terminal. Because the app is configured for
   GitHub Pages, it is usually http://localhost:5173/book-library/

## Other commands

- `npm run build` creates a production build in `dist`
- `npm run lint` checks the code for problems
- `npm run deploy` builds the app and publishes it to GitHub Pages
