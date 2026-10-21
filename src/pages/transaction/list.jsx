
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppModal from "../../components/AppModal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import api from "@/services/api";


export default function ListTransaction() {
  const navigate = useNavigate()
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
  const [transactions, setTransactions] = useState([])
  const fetchTransaction = async() => {
    try {
      const response = await api.get("/transactions")
      setTransactions(response.data || [])
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchTransaction();
  }, []);
  console.log(transactions)
  function handleOpenModal() {
    setShowModal(true);
    setFormData(_initForm);
    setIsEdit(false);
  }

  function handleEditModal(transaction) {
    setShowModal(true);
    setIsEdit(true);
    setFormData(transaction);
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
      setFormData(_initForm);
    } catch (error) {
      const errMsg = error.message
      console.log("Error submit form:", errMsg);
    } finally {
      fetchTransaction();
      handleCloseModal();
    }
  }

  async function handleDelete (id) {
    const confirm = window.confirm(`Are you sure want to delete this data?`);
    //filter: users
    if (confirm) {
      await api.delete(`/user/${id}`);
      fetchTransaction();
      // setUsers(users.filter((u) => u.id !== id));
      // console.log(confirm)
    }
  }

  return (
    <>
      <Card className="shadow-sm border-border p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-bold">Data Transaction</CardTitle>
          </div>
            <Button onClick={() => navigate("/transactions/create")}>Create New Transaction</Button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0 fw-bold">Data Transaction</h4>
            </div>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3 me font-medium">#</th>
                <th className="px-6 py-3 me font-medium">Order Number</th>
                <th className="px-6 py-3 me font-medium">Payment Method</th>
                <th className="px-6 py-3 me font-medium">Products</th>
                <th className="px-6 py-3 me font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-6 whitespace-nowrap">{index + 1}</td>
                    <td>{transaction.order_number}</td>
                    <td>{transaction.payment_method === 1 ? "Gopay" : "Cash"}</td>
                    <td>
                      {transaction.items.map((item) => (
                        <ul>
                          <li>{item.name}</li>
                        </ul>
                      ))}
                    </td>
                    {/* <td>
                      <span className={`border rounded-sm p-2 ${user.is_active === 1 ? "bg-green-600" : "bg-red-600"}   text-white`}>{user.is_active === 1 ? "Active" : "In-Active"}</span>
                    </td> */}
                    <td className="px-4 py-6 whitespace-nowrap">
                      <Button onClick={() => handleEditModal(transaction)} size="sm" className="me-2 bg-green-600">
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(transaction.id)} variant="destructive" size="sm" className="me-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-muted">
                    Belum ada data user
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
        </div>
      </AppModal>
    </>
  );
}