import { Routes, Route, NavLink } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Discover from './pages/Discover'
import Library from './pages/Library'
import Recommendations from './pages/Recommendations'

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand>My Book Library</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end>Discover</Nav.Link>
              <Nav.Link as={NavLink} to="/library">My Library</Nav.Link>
              <Nav.Link as={NavLink} to="/recommendations">Recommendations</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/library" element={<Library />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </Container>
    </>
  )
}

export default App