'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Mail, ShieldCheck, ArrowRight, UserCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, signInWithEmail, signInAsDemo } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const res = await signInWithEmail(email);
    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMessage(res.error || 'Unable to send authentication link.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white p-6 md:p-8 shadow-2xl border border-zinc-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 transition-colors"
          aria-label="Close authentication modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-[11px] font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-800" />
            <span>Artixain Patron Access</span>
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-950">
            Sign In to Atelier
          </h2>
          <p className="mt-1.5 text-xs text-zinc-500 font-light">
            Access your saved custom strands, millimeter calibrations, and order tracking.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-serif font-bold text-zinc-900">
              Check Your Inbox
            </h3>
            <p className="text-xs text-zinc-500 font-light max-w-xs mx-auto leading-relaxed">
              We dispatched a secure authentication magic link to <strong className="text-zinc-800">{email}</strong>. Click the link to access your atelier profile.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={closeAuthModal}
                className="w-full py-3 rounded-full bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-all active:scale-[0.97]"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Direct Email Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@artixain.com"
                    className="w-full rounded-full border border-zinc-200 bg-zinc-50 pl-10 pr-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="text-[11px] text-rose-600 font-medium">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 py-3 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 disabled:opacity-50 transition-all active:scale-[0.97]"
              >
                <span>{isSubmitting ? 'Authenticating...' : 'Send Magic Sign-In Link'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200/80" />
              </div>
              <span className="relative bg-white px-3 text-[10px] uppercase font-bold text-zinc-400">
                Or Instant Preview
              </span>
            </div>

            {/* Instant Demo Sign-In Button */}
            <button
              type="button"
              onClick={() => signInAsDemo('Elena Rostova')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white py-2.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300 transition-all active:scale-[0.97]"
            >
              <UserCheck className="w-4 h-4 text-amber-700" />
              <span>Continue as Elena Rostova (Patron Demo)</span>
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-zinc-100 text-center">
          <p className="text-[11px] text-zinc-400 font-light">
            Protected by Supabase Zero-Trust Security &bull; No passwords stored
          </p>
        </div>
      </div>
    </div>
  );
}
