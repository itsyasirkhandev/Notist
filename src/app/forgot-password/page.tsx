
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background font-body selection:bg-primary/20 p-4">
            <div className="w-full max-w-md">
                 <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">Notist</h1>
                    <p className="text-muted-foreground">Reset your password</p>
                </div>
                <ForgotPasswordForm />
                 <p className="mt-4 text-center text-sm text-muted-foreground">
                    Remember your password?{" "}
                    <Link href="/login" className="font-semibold text-primary hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
