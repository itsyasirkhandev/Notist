
import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background font-body selection:bg-primary/20 p-4">
            <div className="w-full max-w-md">
                 <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">Notist</h1>
                    <p className="text-muted-foreground">Welcome back! Please sign in to your account.</p>
                </div>
                <LoginForm />
                <p className="mt-4 text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/signup" className="font-semibold text-primary hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
