import { Form, Button, Container, Card } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const _initialForm = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(_initialForm);
  const [isLoading, setIsLoading] = useState(false);
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")

  const handleChange = (e) => {
    //debugging pake console.log()
    // console.log(`Input Change ${e.target.name} = ${e.target.value}`)
    //prev : ngambil data sebelumnya, bentuknya params
    setFormData((prev) => ( {
      ...prev, 
      [e.target.name]: e.target.value,

    }));
    
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true); //loading
    setTimeout(() => {
      setIsLoading(false);
      // alert("Duarrr Nmek");
      navigate("/Dashboard");
    }, 1000)
  }

  return (
    <Container className="d-flex align-items-center 
    justify-content-center min-vh-100">
      {/* tes email dan password */}
      {/* <p>Email : {email}</p>
      <p>Password : {password}</p> */}

      <div className="w-100 d-flex align-items-center 
    justify-content-center">
        <Card className="shadow" style={{ width: "400px" }}>
          <Card.Body className="p-4">
            <h2 className="font-weight-bold text-center mb-4">
              Login Form
            </h2>

            <form>
              <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control onChange={handleChange} type="email" 
                  name="email"
                  value={formData.email} required></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={handleChange} type="password" 
                  name="password"
                  value={formData.password} required></Form.Control>
              </Form.Group>
              <Form.Group>
                <Button variant="primary" type="submit" className="w-100" onClick={handleLogin}>
                  {isLoading ? "Loading..." : "Sign In"}
                  </Button>
              </Form.Group>
            </form>

          </Card.Body>
        </Card>
      </div>
    </Container>
  )
  
}

// const Login = () => {

// }