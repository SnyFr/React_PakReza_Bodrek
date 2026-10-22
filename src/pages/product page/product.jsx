import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader,CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppModal from "../../components/AppModal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/services/api";

export default function ProductsPage() {

  const STATUS_MAP = {
    1: {
      label: "Active",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    }, 
    0: {
      label: "In-Active",
      badge: "bg-rose-50 text-rose-700 border-rose-200",
      dot: "bg-rose-500",
    }
  }
  const _initForm = {
    id: null,
    category_id: "",
    name: "",
    price: "",
    stock: "",
    description: "",
    is_active: 1,
  };
  
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/product");
      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/category");
      setCategories(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  function handleOpenCreate() {
    setShowModal(true);
    setFormData(_initForm);
    setIsEdit(false);
  }

  function handleOpenEdit(user) {
    setFormData(user);
    setIsEdit(true);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleChange(e) {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        category_id: Number(formData.category_id),
        price: Number(formData.price),
        description: formData.description,
        stock: Number(formData.stock),
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
      <Card className="border border-border/80 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 py-5 border-b">
          <div>
            <CardTitle className="text-lg font-semibold tracking-tight"> Products</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">Manage your store inventory, categories, and stock status.</CardDescription>
          </div>
          {/* <Button onClick={handleOpenCreate}>Create New Product</Button> */}
          <Button onClick={handleOpenCreate} size="sm" className="font-medium">
            + Add Product
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3 w-12 text-center">#</th>
                <th className="px-5 py-3">Product Name</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3 text-right">Price</th>
                <th className="px-5 py-3 text-center">Stock</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
                {products.length > 0 ? (
                  products.map((row, index) => {
                    const status = STATUS_MAP[row.is_active] ?? STATUS_MAP[0];

                    return (
                      <tr key={row.id ?? index} className="hover:bg-muted/40 transition-colors">
                        <td className="px-5 py-3.5 text-center text-xs text-muted-foreground font-mono">{index + 1}</td>
                        <td className="px-5 py-3.5 font-medium text-foreground">{row.name}</td>
                        <td className="px-5 py-3.5 text-muted-foreground">{row.category_name || "-"}</td>
                        <td className="px-5 py-3.5 text-right font-medium">
                          {Number(row.price).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                          })}
                        </td>
                        <td className="px-5 py-3.5 text-center text-muted-foreground">{row.stock}</td>
                        <td className="px-5 py-3.5 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <Button onClick={() => handleOpenEdit(row)} variant="outline" size="sm" className="h-8 px-2.5 text-xs text-foreground hover:bg-accent rounded-lg">
                              Edit
                            </Button>
                            <Button onClick={() => handleDelete(row.id)} variant="ghost" size="sm" className="h-8 px-2.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg">
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-muted-foreground text-sm">
                      No products found. Click "+ Add Product" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
          </table>
          </div>
        </CardContent>
      </Card>

      <AppModal
        show={showModal}
        onClose={handleCloseModal}
        title={isEdit ? "Edit Product" : "Create New Product"}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Save Changes" : "Create"}
      >
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category_id ? String(formData.category_id) : ""} onValueChange={(val) => setFormData((prev) => ({ ...prev, category_id: val }))} required>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select a category" />
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
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Wireless Mouse"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required placeholder="0" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="stock">Stock</Label>
              <Input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} placeholder="0" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </div>

          {isEdit && (
            <div className="space-y-2 pt-2 border-t">
              <Label>Status</Label>
              <RadioGroup 
                value={String(formData.is_active)} 
                onValueChange={(val) => setFormData((prev) => ({ ...prev, is_active: parseInt(val, 10) }))} 
                className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="active" />
                <Label htmlFor="active" className="cursor-pointer font-normal">
                  Active
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="inactive" />
                  <Label htmlFor="inactive" className="cursor-pointer font-normal">
                    In-Active
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      </AppModal>
    </>
  );
}