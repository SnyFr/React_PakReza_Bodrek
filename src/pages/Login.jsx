import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"
import { Coffee, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const _initialForm = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(_initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")

  const handleChange = (e) => {
    //debugging pake console.log()
    // console.log(`Input Change ${e.target.name} = ${e.target.value}`)
    //prev : ngambil data sebelumnya, bentuknya params
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); //loading
    setSuccessMsg("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Please check your email and password");
      }
      setSuccessMsg(result.message);
      localStorage.setItem("token", result.data.token);
      setTimeout(() => {
        // alert("Duarrr Nmek");
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setErrorMsg(error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4 sm:p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="mb-6 flex flex-col items-center text-center space-y-2">
          <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 ring-4 ring-primary/10">
            <Coffee className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Point of Sales | Warkop Akung
          </h1>
          <p className="text-sm text-muted-foreground">Point of Sales System</p>
        </div>

        <Card className="shadow-xl border-border/60 p-5">
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-xl font-bold">
              Sign In Your Account
            </CardTitle>
            <CardDescription>Enter Your credential</CardDescription>
            {errorMsg &&
            <Alert className="max-w-md text-center border-red-500 bg-red-200 text-amber-900 shadow-lg">
              <div className="flex items-center justify-center">
              <AlertCircleIcon className="justify-center mr-2"/>
              <AlertTitle>Login Failed</AlertTitle>
              </div>
              <AlertDescription className="text-amber-900">
                {errorMsg}
              </AlertDescription>
            </Alert>
            }

            {successMsg && (
              <Alert 
                className="max-w-md text-center border-emerald-200 bg-emerald-200 text-emerald-900 shadow-lg">
                <div className="flex items-center justify-center">
                  <AlertCircleIcon className="justify-center mr-2"/>
                  <AlertTitle>Login Success</AlertTitle>
                </div>
                <AlertDescription className="text-emerald-900">
                  {successMsg}
                </AlertDescription>
              </Alert>
            )}
          
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@warkopakung.com"
                    className="pl-9 rounded-xl"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-9 pr-10 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-2">
              <Button
                type="submit"
                className="w-full font-semibold shadow-sm rounded-xl bg-green-600 hover:bg-emerald-700 text-white"
              >
                Sign In
              </Button>
            </CardFooter>
          </form>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Warkop Akung POS. All rights
          reserved.
        </p>
      </div>
    </div>
    // <Container className="d-flex align-items-center
    // justify-content-center min-vh-100">
    //   {/* tes email dan password */}
    //   {/* <p>Email : {email}</p>
    //   <p>Password : {password}</p> */}

    //   <div className="w-100 d-flex align-items-center
    // justify-content-center">
    //     <Card className="shadow" style={{ width: "400px" }}>
    //       <Card.Body className="p-4">
    //         <h2 className="font-weight-bold text-center mb-4">
    //           Login Form
    //         </h2>

    //         <form>
    //           <Form.Group className="mb-3">
    //               <Form.Label>Email</Form.Label>
    //               <Form.Control onChange={handleChange} type="email"
    //               name="email"
    //               value={formData.email} required></Form.Control>
    //           </Form.Group>
    //           <Form.Group className="mb-3">
    //               <Form.Label>Password</Form.Label>
    //               <Form.Control onChange={handleChange} type="password"
    //               name="password"
    //               value={formData.password} required></Form.Control>
    //           </Form.Group>
    //           <Form.Group>
    //             <Button variant="primary" type="submit" className="w-100" onClick={handleLogin}>
    //               {isLoading ? "Loading..." : "Sign In"}
    //               </Button>
    //           </Form.Group>
    //         </form>

    //       </Card.Body>
    //     </Card>
    //   </div>
    // </Container>
  );
}

// const Login = () => {

// }
