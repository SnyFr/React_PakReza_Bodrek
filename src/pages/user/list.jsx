// import { Card, Form, Button, Table, Modal } from "react-bootstrap";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import AppModal from "../../components/AppModal";

import api from "@/services/api";


// const dataUsers = [
//   {
//     id: 1,
//     name: "Gibran",
//     email: "gibran@gmail.com",
//     password: "NEGARAgaji",
//   },
//   {
//     id: 2,
//     name: "Rocky",
//     email: "rocky@gmail.com",
//     password: "NEGARAgaji",
//   },
//   {
//     id: 3,
//     name: "Joko",
//     email: "gibran@gmail.com",
//     password: "NEGARAgaji",
//   },
// ]

export default function ListUser() {
  const _initForm = {
    id: null,
    name: "",
    email: "",
    password: "",
    is_active: 1,
  }
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);
  const fetchUser = async() => {
    try {
      const response = await api.get("/user")
      setUsers(response.data.data)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);
  
  function handleOpenModal() {
    setShowModal(true);
    setFormData(_initForm);
    setIsEdit(false);
  }

  function handleEditModal(user) {
    setShowModal(true);
    setIsEdit(true);
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      password: "",
      is_active: user.is_active
    });
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
    ...prev,
    [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        is_active: parseInt(formData.is_active),
      }
      if (isEdit) {
        console.log("Data yang dikirim ke backend:", formData);
        await api.put(`/user/${formData.id}`, payload);
        // setUsers(users.map((user) => (user.id === formData.id ? formData: user)));
      }else {
        await api.post("/user", payload);
        // const newUser = {
        //     id: Date.now(),
        //     ...formData,
        // }
        // setUsers([...users, newUser]);
      }
      fetchUser();
      setFormData(_initForm);
    } catch (error) {
      const errMsg = error.message
      console.log("Error submit form:", errMsg);
    } finally {
      handleCloseModal();
    }
  }

  async function handleDelete (id) {
    const confirm = window.confirm(`Are you sure want to delete this data?`);
    //filter: users
    if (confirm) {
      await api.delete(`/user/${id}`);
      fetchUser();
      // setUsers(users.filter((u) => u.id !== id));
      // console.log(confirm)
    }
  }

  return (
    <>
      <Card className="shadow-sm border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6">
          <div>
            <CardTitle className="text-xl font-bold">Data User</CardTitle>
          </div>
            <Button onClick={handleOpenModal}>
              Create New User
            </Button>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3 me font-medium">#</th>
                <th className="px-6 py-3 me font-medium">Name</th>
                <th className="px-6 py-3 me font-medium">Email</th>
                <th className="px-6 py-3 me font-medium">Status</th>
                <th className="px-6 py-3 me font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-6 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6">{user.name}</td>
                  <td>{user.email}</td>
                  <td className="px-6">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-xl border ${
                      user.is_active === 1 ? "border-emerald-500 text-emerald-600" : "border-rose-500 text-rose-600"}`}>
                      {user.is_active === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <Button
                      onClick={() => handleEditModal(user)}
                      variant="secondary"
                      size="sm"
                      className="me-2 rounded-lg"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(user.id)}
                      variant="destructive"
                      size="sm"
                      className="me-2 rounded-lg"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Data User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group> */}
          {/* </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */} 
      <AppModal
        show={showModal}
        onClose={handleCloseModal}
        title={isEdit ? "Edit User" : "Create New User"}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Save Changes" : "Save"}
      >
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="nameexample" />
            </div>
            <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@example.com" />
            </div>
            <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange}  required={isEdit ? false : true} placeholder="Enter your password" />
            </div>

            {isEdit ? (
            <div className="space-y-2">
              <Label htmlFor="is_active">Status</Label>
              <select
                id="is_active"
                name="is_active"
                value={formData.is_active ?? 1}
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
            ) : ("")}
            {/* <div className="space-y-2">
              <Button>Save</Button>
            </div> */}
        </div>
        {/* <form>
          <div className="mb-3">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            ></input>
          </div>

          <div className="mb-3">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter email address"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            ></input>
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            ></input>
          </div>
        </form> */}
      </AppModal>
    </>
  );
}