'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  KeyRound
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your registered patron email address.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    // Simulate recovery email dispatch
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Top Back Navigation Pill */}
      <div className="w-full max-w-md mx-auto mb-6">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 hover:text-zinc-950 transition-all active:scale-[0.98]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>

      {/* Main Recovery Card */}
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
              <KeyRound className="w-3 h-3 text-amber-300" />
            </span>
          </div>

          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-400 mb-1">
            Artixain Atelier
          </span>
          <h1 className="font-serif text-3xl font-medium text-zinc-950 tracking-tight">
            Reset Password
          </h1>
          <p className="mt-2 text-xs text-zinc-500 font-light leading-relaxed max-w-xs">
            Enter your email to receive a secure recovery code and reset instructions for your account.
          </p>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="mb-6 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-700 leading-relaxed">
            {errorMessage}
          </div>
        )}

        {isSubmitted ? (
          <div className="text-center py-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-emerald-700">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-xl font-medium text-zinc-900 mb-2">
              Recovery Link Sent
            </h2>
            <p className="text-xs text-zinc-500 leading-relaxed font-light mb-6">
              We have dispatched a secure password reset token to{' '}
              <span className="font-semibold text-zinc-800">{email}</span>. Please review your inbox and follow the link within 15 minutes.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-zinc-900 py-3 px-6 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 transition-all active:scale-[0.98]"
            >
              <span>Return to Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 rounded-full bg-zinc-900 py-3.5 px-6 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Dispatching Reset Link...</span>
              ) : (
                <>
                  <span>Send Recovery Email</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Return to Login link */}
        <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
          <p className="text-xs text-zinc-500 font-light">
            Remembered your credentials?{' '}
            <Link
              href="/login"
              className="font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900 transition-colors"
            >
              Sign In Instead
            </Link>
          </p>
        </div>
      </div>

      {/* Security note */}
      <div className="mt-8 text-center text-[11px] text-zinc-400 flex items-center justify-center gap-2 font-light">
        <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
        <span>Cryptographic time-limited tokens &bull; Zero-cost secure authentication</span>
      </div>
    </div>
  );
}
