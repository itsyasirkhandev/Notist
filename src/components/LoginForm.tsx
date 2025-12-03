
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFirebase } from "@/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Separator } from "./ui/separator";
import { GoogleIcon } from "./GoogleIcon";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

interface LoginFormProps {
  setView: (view: 'login' | 'signup' | 'forgot-password') => void;
}

export function LoginForm({ setView }: LoginFormProps) {
  const router = useRouter();
  const { auth } = useFirebase();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Signed in successfully!",
        description: "Welcome back.",
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Sign in error", error);
      let description = "Could not sign in. Please check your credentials.";
      switch (error.code) {
        case "auth/invalid-email":
          description = "Invalid email address. Please check the format.";
          break;
        case "auth/user-disabled":
          description = "Your account has been disabled. Please contact support.";
          break;
        case "auth/user-not-found":
          description = "No account found with this email. Please sign up or check your email.";
          break;
        case "auth/wrong-password":
          description = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-credential":
          description = "Invalid credentials. Please check your email and password.";
          break;
        default:
          description = error.message || description;
      }
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: description,
      });
    } finally {
        setIsSubmitting(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        toast({
            title: "Signed in with Google!",
            description: "Welcome to your dashboard.",
        });
        router.push('/dashboard');
    } catch (error: any) {
        console.error("Google sign in error", error);
        let description = "An unexpected error occurred during Google sign-in.";
        switch (error.code) {
            case "auth/popup-closed-by-user":
                description = "Google sign-in was cancelled.";
                break;
            case "auth/cancelled-popup-request":
                description = "Multiple sign-in attempts. Please try again.";
                break;
            case "auth/account-exists-with-different-credential":
                description = "An account with this email already exists. Please sign in with your original method (e.g., email and password).";
                break;
            case "auth/auth-domain-config-error":
                description = "There is an issue with the authentication domain configuration. Please contact support.";
                break;
            case "auth/operation-not-allowed":
                description = "Google sign-in is not enabled. Please contact support.";
                break;
            case "auth/unauthorized-domain":
                description = "This domain is not authorized for Google sign-in. Please contact support.";
                break;
            default:
                description = error.message || description;
        }
        toast({
            variant: "destructive",
            title: "Google Sign-In Failed",
            description: description,
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-none">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="name@example.com" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <div className="flex justify-between items-center">
                        <FormLabel>Password</FormLabel>
                        <Button variant="link" className="px-0 h-auto text-sm" onClick={() => setView('forgot-password')}>Forgot password?</Button>
                    </div>
                    <div className="relative">
                        <FormControl>
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <Button 
                        type="button"
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:bg-transparent"
                        onClick={() => setShowPassword(prev => !prev)}
                        >
                        {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                        <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                        </Button>
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </Form>
        <div className="relative my-4">
            <Separator />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
        </div>
        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isSubmitting}>
            <GoogleIcon className="mr-2 h-5 w-5" />
            Continue with Google
        </Button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button variant="link" className="px-0" onClick={() => setView('signup')}>
                Sign up
            </Button>
        </p>
      </CardContent>
    </Card>
  );
}
