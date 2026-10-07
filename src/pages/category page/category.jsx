// CategoryPage.jsx
import { useState } from "react";
import { Card, Table, Button, Badge, Form } from "react-bootstrap";
import AppModal from "../../components/AppModal";

const _initCategories = [
  { id: 1, name: "Coffee", status: "Active" },
  { id: 2, name: "Non-Coffee", status: "Active" },
  { id: 3, name: "Snacks", status: "Inactive" },
];

export default function CategoryPage() {
  const _initForm = { id: null, name: "", status: "Active" };

  const [categories, setCategories] = useState(_initCategories);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);

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

  function handleSubmit(e) {
    e.preventDefault();
    if (isEdit) {
      setCategories(
        categories.map((c) => (c.id === formData.id ? formData : c))
      );
    } else {
      const newCategory = { ...formData, id: Date.now() };
      setCategories([...categories, newCategory]);
    }
    handleCloseModal();
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  }

  return (
    <Card className="shadow-sm border-0 m-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Categories</h4>
          <Button variant="primary" onClick={handleOpenCreate}>
            Create Category
          </Button>
        </div>

        <Table responsive hover className="align-middle mb-0">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Status</th>
              <th className="text-center" style={{ width: "160px" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((ctgr) => (
              <tr key={ctgr.id}>
                <td>{ctgr.id}</td>
                <td className="fw-bold">{ctgr.name}</td>
                <td>
                  <Badge bg={ctgr.status === "Active" ? "success" : "dark"}>
                    {ctgr.status}
                  </Badge>
                </td>
                <td className="text-center">
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleOpenEdit(ctgr)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(ctgr.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>

      <AppModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title={isEdit ? "Edit Category" : "Create Category"}
        submitLabel={isEdit ? "Update" : "Save"}
      >
        <Form.Group className="mb-3">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter category name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Form.Select>
        </Form.Group>
      </AppModal>
    </Card>
  );
}