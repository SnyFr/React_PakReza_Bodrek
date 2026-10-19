import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppModal from "../../components/AppModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/services/api";

export default function ProductsPage() {
  const _initForm = {
    id: null,
    name: "",
    categoryId: "",
    stock: "",
    price: "",
    description: "",
    is_active: 1,
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/product");
      const data = Array.isArray(response) ? response : (response?.data || []);
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/category");
      const data = Array.isArray(response) ? response : (response?.data || []);
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  function handleOpenCreate() {
    setFormData(_initForm);
    setIsEdit(false);
    setShowModal(true);
  }

  function handleOpenEdit(product) {
    setFormData({
      id: product.id,
      name: product.name || "",
      categoryId: String(product.category_id || ""),
      stock: product.stock ?? "",
      price: product.price || "",
      description: product.description || "",
      is_active: product.is_active !== undefined ? product.is_active : (product.status === "Active" ? 1 : 0),
    });
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
        category_id: Number(formData.categoryId),
        price: Number(formData.price),
        stock: Number(formData.stock),
        description: formData.description,
        is_active: parseInt(formData.is_active),
      };

      if (isEdit) {
        await api.put(`/product/${formData.id}`, payload);
      } else {
        await api.post("/product", payload);
      }
      setFormData(_initForm);
      await fetchProducts();
    } catch (error) {
      console.log(error.message);
    } finally {
      setShowModal(false);
    }
  }

  async function handleDelete(id) {
    const confirmation = window.confirm("Are you sure want to delete this data?");
    if (confirmation) {
      try {
        await api.delete(`/product/${id}`);
        fetchProducts();
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <>
      <Card className="shadow-sm border-border p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-bold">Data Products</CardTitle>
          </div>
          <Button onClick={handleOpenCreate}>Create New Product</Button>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.length > 0 ? (
                products.map((row, index) => (
                  <tr key={row.id || index} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">{row.name}</td>
                    <td className="px-6 py-4">
                      {row.cat_name || categories.find((c) => c.id === row.category_id)?.name || "-"}
                    </td>
                    <td className="px-6 py-4">{row.stock ?? 0}</td>
                    <td className="px-6 py-4">Rp {Number(row.price || 0).toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-xl border ${
                          row.is_active === 1 || row.status === "Active"
                            ? "border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20"
                            : "border-rose-500 text-rose-600 bg-rose-50 dark:bg-rose-950/20"
                        }`}
                      >
                        {row.is_active === 1 || row.status === "Active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <Button
                        onClick={() => handleOpenEdit(row)}
                        size="sm"
                        className="me-2 rounded-xl bg-emerald-600 hover:bg-emerald-700"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(row.id)}
                        variant="destructive"
                        size="sm"
                        className="rounded-xl"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-muted-foreground">
                    Belum ada data Produk
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <AppModal
        show={showModal}
        onClose={handleCloseModal}
        title={isEdit ? "Edit Product" : "Create New Product"}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Save Change" : "Save"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={String(formData.categoryId || "")}
              onValueChange={(val) => setFormData({ ...formData, categoryId: val })}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category...">
                  {(val) => {
                    const selected = categories.find((c) => String(c.id) === String(val));
                    return selected ? selected.name : "Select Category...";
                  }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>

          <div className="space-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Enter price"
            />
          </div>

          <div className="space-y-2">
            <Label>Stock</Label>
            <Input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              placeholder="Enter stock"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </div>

          {isEdit && (
            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, is_active: 1 })}
                  className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl border transition-all cursor-pointer ${
                    Number(formData.is_active) === 1
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-background text-muted-foreground border-input hover:bg-muted/50"
                  }`}
                >
                  Active
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, is_active: 0 })}
                  className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl border transition-all cursor-pointer ${
                    Number(formData.is_active) === 0
                      ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                      : "bg-background text-muted-foreground border-input hover:bg-muted/50"
                  }`}
                >
                  Inactive
                </button>
              </div>
            </div>
          )}
        </div>
      </AppModal>
    </>
  );
}