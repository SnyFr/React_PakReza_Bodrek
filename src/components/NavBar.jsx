import { Container, Navbar, Nav, NavDropdown, Button  } from "react-bootstrap";


export default function AppNavbar() {
  return (
    <Navbar expand="lg" variant="dark" className="shadow-lg mb-4">
      <Container>
        <Navbar.Brand href="/login">Point of Sales | PPKD </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
            <Nav.Link href="/categories">Categories</Nav.Link>
            <Nav.Link href="/product">Product</Nav.Link>
          </Nav>
          <Nav className="align-items-center  gap-2">
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Navbar.Text className="text-secondary me-2">Admin</Navbar.Text>
            <Button variant="outline-danger" size="sm">Log Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}