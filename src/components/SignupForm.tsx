
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
import { createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Separator } from "./ui/separator";
import { GoogleIcon } from "./GoogleIcon";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

interface SignupFormProps {
  setView: (view: 'login' | 'signup' | 'forgot-password') => void;
}

export function SignupForm({ setView }: SignupFormProps) {
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
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await sendEmailVerification(userCredential.user);
      toast({
        title: "Account created!",
        description: "A verification email has been sent. Please check your inbox.",
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Sign up error", error);
      let description = "Could not create account. Please try again.";
      switch (error.code) {
        case "auth/email-already-in-use":
          description = "This email address is already in use. Please log in or use a different email.";
          break;
        case "auth/invalid-email":
          description = "Invalid email address. Please check the format.";
          break;
        case "auth/operation-not-allowed":
          description = "Email/password accounts are not enabled. Please contact support.";
          break;
        case "auth/weak-password":
          description = "The password is too weak. Please choose a stronger password.";
          break;
        default:
          description = error.message || description;
      }
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
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
        if (error.code === 'auth/account-exists-with-different-credential') {
            description = "An account with this email already exists. Please sign in with the original method (e.g., email and password).";
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
        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} disabled={isSubmitting}/>
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
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} disabled={isSubmitting}/>
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
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
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
            Already have an account?{" "}
            <Button variant="link" className="px-0" onClick={() => setView('login')}>
                Log in
            </Button>
        </p>
      </CardContent>
    </Card>
  );
}
