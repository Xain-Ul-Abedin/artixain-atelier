'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  Gem,
  CheckCircle2
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, signInAsDemo } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    const result = await signInWithEmail(email);
    setIsLoading(false);

    if (result.success) {
      setSuccessMessage('Secure sign-in link dispatched. Please check your inbox.');
    } else {
      setErrorMessage(result.error || 'Authentication attempt failed. Please verify credentials.');
    }
  };

  const handleDemoSignIn = (roleName: string) => {
    signInAsDemo(roleName);
    router.push('/profile');
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Top Back Navigation Pill */}
      <div className="w-full max-w-md mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 hover:text-zinc-950 transition-all active:scale-[0.98]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Atelier Home</span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md mx-auto bg-white rounded-3xl border border-zinc-200/90 shadow-xl p-8 sm:p-10">
        {/* Brand Header with Authentic Favicon Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-4">
            <img
              src="/logo.jpeg"
              alt="Artixain Logo"
              className="w-16 h-16 rounded-full object-cover shadow-md ring-2 ring-zinc-200"
            />
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-white shadow-sm ring-2 ring-white">
              <Sparkles className="w-3 h-3 text-amber-300" />
            </span>
          </div>

          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-400 mb-1">
            Artixain Atelier
          </span>
          <h1 className="font-serif text-3xl font-medium text-zinc-950 tracking-tight">
            Patron Sign In
          </h1>
          <p className="mt-2 text-xs text-zinc-500 font-light leading-relaxed max-w-xs">
            Access your calibrated gemstone strands, customizer orders, and patron tier rewards.
          </p>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="mb-6 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-700 leading-relaxed">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800 leading-relaxed flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5 ml-1">
              Patron Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patron@artixain.com"
                required
                className="w-full rounded-full border border-zinc-200 bg-zinc-50/70 py-3 pl-11 pr-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5 ml-1">
              <label className="block text-xs font-semibold text-zinc-700">
                Security Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-full border border-zinc-200 bg-zinc-50/70 py-3 pl-11 pr-11 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 hover:text-zinc-700 transition-colors"
                aria-label="Toggle password view"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Primary Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 rounded-full bg-zinc-900 py-3.5 px-6 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Sign In to Artixain</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-wider font-semibold">
            <span className="bg-white px-3 text-zinc-400">Instant Patron Profiles</span>
          </div>
        </div>

        {/* Quick Demo Logins for Fast Review & Evaluation */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleDemoSignIn('Elena Rostova')}
            className="w-full rounded-full border border-zinc-200 bg-white py-2.5 px-4 text-xs font-semibold text-zinc-800 shadow-2xs hover:bg-zinc-50 hover:border-zinc-300 transition-all flex items-center justify-between active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center">
                E
              </div>
              <span className="text-zinc-700">Elena Rostova</span>
            </div>
            <span className="text-[10px] uppercase font-mono text-zinc-400">Master Atelier Tier</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoSignIn('Marcus Vance')}
            className="w-full rounded-full border border-zinc-200 bg-white py-2.5 px-4 text-xs font-semibold text-zinc-800 shadow-2xs hover:bg-zinc-50 hover:border-zinc-300 transition-all flex items-center justify-between active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-800 text-[10px] font-bold flex items-center justify-center">
                M
              </div>
              <span className="text-zinc-700">Marcus Vance</span>
            </div>
            <span className="text-[10px] uppercase font-mono text-zinc-400">Connoisseur Tier</span>
          </button>
        </div>

        {/* Footer Registration Link */}
        <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
          <p className="text-xs text-zinc-500 font-light">
            New to Artixain Atelier?{' '}
            <Link
              href="/register"
              className="font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900 transition-colors"
            >
              Create Patron Account
            </Link>
          </p>
        </div>
      </div>

      {/* Trust & Zero-Cost Privacy Note */}
      <div className="mt-8 text-center text-[11px] text-zinc-400 flex items-center justify-center gap-2 font-light">
        <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
        <span>End-to-end encrypted session &bull; Zero-cost verified identity architecture</span>
      </div>
    </div>
  );
}
