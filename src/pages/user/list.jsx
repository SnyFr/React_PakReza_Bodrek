import { Card, Form, Button, Table, Modal } from "react-bootstrap";
import { useState } from "react";


const dataUsers = [
  {
    name: "Gibran",
    email: "gibran@gmail.com",
    password: "NEGARAgaji",
  },
  {
    name: "Rocky",
    email: "rocky@gmail.com",
    password: "NEGARAgaji",
  },
  {
    name: "Joko",
    email: "gibran@gmail.com",
    password: "NEGARAgaji",
  },
]

export default function ListUser() {
  const _initForm = {
    id: null,
    name: "",
    email: "",
    password: "",
    status: "Active",
  }
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState(dataUsers);
  const [formData, setFormData] = useState(_initForm);
  
  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
        id: Date.now(),
        ...formData,
    }
    setUsers([...users, newUser]);
    setFormData(_initForm);
    handleCloseModal();
  }

  return (
  <>
    <Card className="shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="mb-0 fw-bold">Data User</h4>
          </div>
          <Button variant="primary" onClick={handleOpenModal}>
            Create New User
          </Button>
        </div>
        <Table responsive hover className="align-middle mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) =>(
            <tr>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>Active</td>
              <td>
                <Button variant="warning" size="sm" className="me-2">Edit</Button>
                <Button variant="danger" size="sm" className="me-2">Delete</Button>
              </td>
            </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>

    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Data User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text"
                placeholder="Enter full name"
                name="name" required value={formData.name} onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email"
                placeholder="Enter email address"
                name="email" required value={formData.email} onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
                placeholder="Enter password"
                name="password" required value={formData.password} onChange={handleChange}></Form.Control>
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

  </>
  )
}