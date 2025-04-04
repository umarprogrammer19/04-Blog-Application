// "use client";
// import { Button } from "@/Components/ui/Button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
// import { Input } from "@/Components/ui/input";
// import { setCookie } from "cookies-next";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useRef, useState } from "react";
// import { toast } from "sonner";

// function LoginForm() {
//   const [isLoading, setIsLoading] = useState(false);
//   const getEmail = useRef<HTMLInputElement>(null);
//   const getPassword = useRef<HTMLInputElement>(null);

//   const router = useRouter();

//   const validateInputs = () => {
//     const email = getEmail.current?.value.trim();
//     const password = getPassword.current?.value.trim();

//     if (!email) return "Email is required";
//     if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
//     if (!password) return "Password is required";
//     return null;
//   };

//   const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const validationError = validateInputs();
//     if (validationError) return toast.error(validationError);

//     const loadingToast = toast("Logging in...", {
//       description: "Please wait...",
//       duration: Infinity,
//     });
//     setIsLoading(true);

//     try {
//       const response = await fetch("http://localhost:8000/user/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           email: getEmail.current?.value.trim(),
//           password: getPassword.current?.value.trim(),
//         }),
//       });


//       if (response.ok) {
//         const { accessToken, user } = await response.json();

//         setCookie('accessToken', accessToken, {
//           path: '/',
//           secure: true,
//           sameSite: 'strict',
//         });
//         localStorage.setItem('accessToken', accessToken);
//         localStorage.setItem('current_user_id', user._id);

//         toast.success("Login successful!");
//         router.push("/");
//       } else {
//         const { message } = await response.json();
//         toast.error(message);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("An error occurred during login");
//     } finally {
//       setIsLoading(false);
//       toast.dismiss(loadingToast);
//     }
//   };

//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader>
//         <CardTitle className="text-center text-3xl font-bold text-violet-700">
//           Login
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleLogin} className="space-y-6">
//           <Input
//             type="email"
//             placeholder="Email"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
//             ref={getEmail}
//           />
//           <Input
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
//             ref={getPassword}
//           />
//           <Button
//             type="submit"
//             className={`w-full bg-violet-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-transparent hover:text-purple-700 border border-purple-700 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//             disabled={isLoading}
//           >
//             {isLoading ? "Logging In..." : "Login"}
//           </Button>
//         </form>
//       </CardContent>
//       <CardFooter>
//         <p className="text-center text-gray-600 w-full">
//           Don't have an account?{" "}
//           <Link href="/Register" className="text-violet-600 hover:underline">
//             Register
//           </Link>
//         </p>
//       </CardFooter>
//     </Card>
//   )
// }

// export default LoginForm

"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { toast } from "sonner";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Checkbox } from "@/Components/ui/checkbox";
import { Separator } from "@/Components/ui/separator";
import { Github, Mail } from "lucide-react";
import { FadeIn } from "@/Components/Home/animation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }

    const loadingToast = toast("Logging in...", {
      description: "Please wait...",
      duration: Infinity,
    });
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { accessToken, user } = await response.json();

        setCookie("accessToken", accessToken, {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("current_user_id", user._id);

        toast.success("Login successful!");
        router.push("/");
      } else {
        const { message } = await response.json();
        toast.error(message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center w-full max-w-md p-8 mx-auto lg:w-1/2">
        <FadeIn>
          <div className="flex flex-col space-y-2 text-center mb-8">
            <Link href="/" className="mx-auto">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Insight
              </span>
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    disabled={isLoading}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </Label>
                </div>
                <Button disabled={isLoading} className="mt-2">
                  {isLoading ? "Logging In..." : "Sign In"}
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" disabled={isLoading}>
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" disabled={isLoading}>
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20" />
        <Image
          src="/placeholder.svg?height=1080&width=1920&text=Welcome+Back"
          alt="Login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
