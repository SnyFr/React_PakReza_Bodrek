// CategoryPage.jsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import AppModal from "../../components/AppModal";
import api from "@/services/api";

// const _initCategories = [
//   { id: 1, name: "Coffee", status: "Active" },
//   { id: 2, name: "Non-Coffee", status: "Active" },
//   { id: 3, name: "Snacks", status: "Inactive" },
// ];

export default function CategoryPage() {
  const _initForm = { 
    id: null, 
    name: "", 
    status: "Active" 
  };

  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);

  const fetchCategories = async() => {
    try {
      const response = await api.get("/category")
      setCategories(response.data)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    console.log("render ini");
    fetchCategories();
  }, [])

  function handleOpenCreate() {
    setFormData(_initForm);
    setIsEdit(false);
    setShowModal(true);
  }

  function handleOpenEdit(category) {
    setFormData(category);
    setIsEdit(true);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);

  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        is_active: parseInt(formData.is_active),
      };
      if (isEdit) {
        // update data
        await api.put(`/category/${formData.id}`, payload);
        // setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
      } else {
        // insert data
        await api.post("/category", payload);
        // const newUser = {
        //   ...formData,
        //   id: Date.now(),
        // };

        // setUsers([...users, newUser]);
      }
      setFormData(_initForm);
    } catch (error) {
      const errMsg = error.message;
      console.log(errMsg);
    } finally {
      fetchCategories();
      setShowModal(false);
    }
  }

  async function handleDelete(id) {
    const confirmation = window.confirm("Are you sure want to delete this data?");
    if (confirmation) {
      // delete
      await api.delete(`/category/${id}`);
      fetchCategories();
    }
  }

  return (
    <>
      <Card className="shadow-sm border-border p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-bold">Data Category</CardTitle>
          </div>
          <Button onClick={handleOpenCreate}>Create New Category</Button>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={index} className="hover:bg-emerald/50 transition-colors">
                    <td className="px-4 py-6 whitespace-nowrap">{index + 1}</td>
                    <td>{category.name}</td>
                    <td className="px-4 py-6 whitespace-nowrap">
                      <Button onClick={() => handleOpenEdit(category)} size="sm" className="me-2 rounded-xl bg-emerald-600">
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(category.id)} variant="destructive" size="sm" className="me-2 rounded-xl">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-muted">
                    Belum ada data Kategori
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter your name" required value={formData.name} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control value={formData.email} onChange={handleChange} type="email" name="email" placeholder="Enter your email" required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control value={formData.password} onChange={handleChange} type="password" name="password" placeholder="Enter your passwod" required></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}

      <AppModal show={showModal} onClose={handleCloseModal} title={isEdit ? "Edit Category" : "Create New Category"} onSubmit={handleSubmit} submitLabel={isEdit ? "Save Change" : "Save"}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" />
          </div>
          {/* <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} required={isEdit ? false : true} placeholder="Enter your password" />
          </div> */}
          {isEdit ? (
            <div className="space-y-2">
              <Label>Activation</Label>
              <RadioGroup value={String(formData.is_active)} onValueChange={(val) => setFormData({ ...formData, is_active: parseInt(val) })} className="w-fit flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="active" />
                  <Label htmlFor="active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="inactive" />
                  <Label htmlFor="inactive">In-Active</Label>
                </div>
              </RadioGroup>
            </div>
          ) : (
            ""
          )}
        </div>
        
      </AppModal>
    </>
  );
}