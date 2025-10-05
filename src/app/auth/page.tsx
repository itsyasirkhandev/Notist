
'use client';

import { useState } from 'react';
import { LoginForm } from '@/components/LoginForm';
import { SignupForm } from '@/components/SignupForm';
import { ForgotPasswordForm } from '@/components/ForgotPasswordForm';

type AuthView = 'login' | 'signup' | 'forgot-password';

export default function AuthPage() {
  const [view, setView] = useState<AuthView>('login');

  const renderView = () => {
    switch (view) {
      case 'signup':
        return <SignupForm setView={setView} />;
      case 'forgot-password':
        return <ForgotPasswordForm setView={setView} />;
      case 'login':
      default:
        return <LoginForm setView={setView} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background font-body selection:bg-primary/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-primary font-sans">Notist</h1>
          <p className="text-muted-foreground">
            {view === 'login' && 'Welcome back! Please sign in to your account.'}
            {view === 'signup' && 'Create an account to start organizing your life.'}
            {view === 'forgot-password' && 'Reset your password.'}
          </p>
        </div>
        {renderView()}
      </div>
    </div>
  );
}
