import { useState } from "react";
import { Card, Table, Button, Badge, Form } from "react-bootstrap";
import AppModal from "../../components/AppModal";

// Data produk awal
const _initProducts = [
  { 
    id: 1, 
    name: "Espresso", 
    categoryId: 1, 
    categoryName: "Coffee", 
    qty: 10, 
    price: 20000, 
    status: "Active" 
  },
  { 
    id: 2, 
    name: "Matcha Latte", 
    categoryId: 2, 
    categoryName: "Non-Coffee", 
    qty: 5, 
    price: 30000, 
    status: "Active" 
  },
  { 
    id: 3, 
    name: "French Fries", 
    categoryId: 3, 
    categoryName: "Snacks", 
    qty: 20, 
    price: 23000, 
    status: "Inactive" 
  },
];


const optionCategory = [
  { id: 1, name: "Coffee", status: "Active" },
  { id: 2, name: "Non-Coffee", status: "Active" },
  { id: 3, name: "Snacks", status: "Inactive" },
];

export default function ProductsPage() {
  const _initForm = {
    id: null,
    name: "",
    categoryId: optionCategory[0] ?.id || "",
    qty: 0,
    price: "",
    status: "Active",
  };

  const [products, setProducts] = useState(_initProducts
  
  );
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);

  function handleOpenCreate() {
    setFormData(_initForm);
    setIsEdit(false);
    setShowModal(true);
  }

  function handleOpenEdit(product) {
    setFormData(product);
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

    const selectedCategory = optionCategory.find(
      (c) => c.id === Number(formData.categoryId)
    );

    const loadCat = {
      ...formData,
      categoryId: Number(formData.categoryId),
      categoryName: selectedCategory ? selectedCategory.name : "-",
      qty: parseInt(formData.qty, 0),
    };

    if (isEdit) {
      setProducts(products.map((p) => (p.id === formData.id ? loadCat : p)));
    } else {
      const newProduct = { ...loadCat, id: Date.now() };
      setProducts([...products, newProduct]);
    }

    handleCloseModal();
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure want to delete this?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  }

  return (
    <Card className="shadow-sm border-0 m-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Products</h4>
          <Button variant="primary" onClick={handleOpenCreate}>
            Create Product
          </Button>
        </div>

        <Table responsive hover className="align-middle mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-center" style={{ width: "160px" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td className="fw-bold">{product.name}</td>
                <td>
                  <Badge bg="info" className="text-dark">
                    {product.categoryName}
                  </Badge>
                </td>
                <td>{product.qty}</td>
                <td>Rp. {Number(product.price).toLocaleString("id-ID")}</td>
                <td>
                  <Badge bg={product.status === "Active" ? "success" : "dark"}>
                    {product.status}
                  </Badge>
                </td>
                <td className="text-center">
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleOpenEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
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
        title={isEdit ? "Edit Product" : "Create Product"}
        submitLabel={isEdit ? "Update" : "Save"}
      >
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            {optionCategory.map((ctgr) => (
              <option key={ctgr.id} value={ctgr.id}>
              {ctgr.name} {ctgr.status === ""}
              </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            step="1"
            min="0"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price (Rp)</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Enter your price"
            value={formData.price}
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