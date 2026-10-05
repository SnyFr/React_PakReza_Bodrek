import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import AppNavbar from "../components/NavBar";


export default function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark">
      <AppNavbar/>
      <main className="flex-grow-1 pb-4">
        <Container>
          <Outlet/>
        </Container>
      </main>
      <footer className="bg-white border-top py-3 text-center text-muted mt-auto">
        <Container>
          <small> &copy; {new Date().getFullYear} Made in China</small>
        </Container>
      </footer>
    </div>
  )
}