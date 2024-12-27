"use client";

import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const getEmail = useRef<HTMLInputElement>(null);
  const getPassword = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const validateInputs = () => {
    const email = getEmail.current?.value.trim();
    const password = getPassword.current?.value.trim();

    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
    if (!password) return "Password is required";
    return null;
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateInputs();
    if (validationError) return toast.error(validationError);

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
        body: JSON.stringify({
          email: getEmail.current?.value.trim(),
          password: getPassword.current?.value.trim(),
        }),
      });

      if (response.ok) {
        const { accessToken } = await response.json();
        
        setCookie('accessToken', accessToken, {
          path: '/',
          secure: true,
          sameSite: 'strict',
        });

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold text-violet-700">
          Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
            ref={getEmail}
          />
          <Input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
            ref={getPassword}
          />
          <Button
            type="submit"
            className={`w-full bg-violet-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-transparent hover:text-purple-700 border border-purple-700 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Logging In..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-center text-gray-600 w-full">
          Don't have an account?{" "}
          <Link href="/Register" className="text-violet-600 hover:underline">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  </div>
  );
};

export default Login;
