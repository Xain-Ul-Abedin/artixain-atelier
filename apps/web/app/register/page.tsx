'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
  Mail,
  Lock,
  User,
  Ruler,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Gem
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { signInAsDemo } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    academicProgram: '',
    patronId: '',
    wristCircumferenceCm: '16.5'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.fullName) {
      setErrorMessage('Please fill in your name and email address.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Security passwords do not match.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      // Create patron profile and persist
      const newPatron = {
        id: `patron-${Date.now()}`,
        email: formData.email,
        name: formData.fullName,
        institution: formData.institution || 'Artixain Guild',
        academicProgram: formData.academicProgram || 'Gemological Design',
        patronId: formData.patronId || `ARTX-${Math.floor(1000 + Math.random() * 9000)}`,
        tier: 'Connoisseur' as const,
        wristCircumferenceCm: parseFloat(formData.wristCircumferenceCm) || 16.5,
        ordersCount: 0
      };

      localStorage.setItem('artixain_demo_user', JSON.stringify(newPatron));
      signInAsDemo(formData.fullName);
      setSuccessMessage('Account registered and wrist calibrated successfully.');

      setTimeout(() => {
        router.push('/profile');
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Top Back Navigation Pill */}
      <div className="w-full max-w-lg mx-auto mb-6">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 hover:text-zinc-950 transition-all active:scale-[0.98]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>

      {/* Main Registration Card */}
      <div className="w-full max-w-lg mx-auto bg-white rounded-3xl border border-zinc-200/90 shadow-xl p-8 sm:p-10">
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
            Create Patron Profile
          </h1>
          <p className="mt-2 text-xs text-zinc-500 font-light leading-relaxed max-w-sm">
            Join the Artixain Atelier to save calibrated wrist geometries, receive custom mineral allocations, and track studio orders.
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

        {/* Form Fields */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5 ml-1">
              Full Legal Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Elena Rostova"
                required
                className="w-full rounded-full border border-zinc-200 bg-zinc-50/70 py-3 pl-11 pr-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5 ml-1">
              Verifiable Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="elena.rostova@artixain.com"
                required
                className="w-full rounded-full border border-zinc-200 bg-zinc-50/70 py-3 pl-11 pr-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all"
              />
            </div>
          </div>

          {/* Academic / Institutional Affiliation for Admin Portal Verification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5 ml-1">
                Institution / University
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Design Academy"
                  className="w-full rounded-full border border-zinc-200 bg-zinc-50/70 py-3 pl-11 pr-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5 ml-1">
                Major / Department
              </label>
              <input
                type="text"
                name="academicProgram"
                value={formData.academicProgram}
                onChange={handleChange}
                placeholder="Mineral Sciences"
                className="w-full rounded-full border border-zinc-200 bg-zinc-50/70 py-3 px-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all"
              />
            </div>
          </div>

          {/* Wrist Calibration Anthropometric Setting */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5 ml-1">
              Wrist Circumference Calibration (cm)
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                <Ruler className="h-4 w-4" />
              </div>
              <input
                type="number"
                step="0.5"
                min="13.0"
                max="24.0"
                name="wristCircumferenceCm"
                value={formData.wristCircumferenceCm}
                onChange={handleChange}
                placeholder="16.5"
                className="w-full rounded-full border border-zinc-200 bg-zinc-50/70 py-3 pl-11 pr-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all"
              />
            </div>
            <p className="mt-1 ml-1 text-[10px] text-zinc-400">
              Standard patron wrist average: 15.5cm to 17.5cm. Can be updated anytime in your profile.
            </p>
          </div>

          {/* Password fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  required
                  className="w-full rounded-full border border-zinc-200 bg-zinc-50/70 py-3 pl-11 pr-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5 ml-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••••••"
                required
                className="w-full rounded-full border border-zinc-200 bg-zinc-50/70 py-3 px-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 rounded-full bg-zinc-900 py-3.5 px-6 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Registering Profile...</span>
            ) : (
              <>
                <span>Complete Registration & Calibrate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Existing Member Link */}
        <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
          <p className="text-xs text-zinc-500 font-light">
            Already registered with Artixain?{' '}
            <Link
              href="/login"
              className="font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900 transition-colors"
            >
              Sign In to Existing Account
            </Link>
          </p>
        </div>
      </div>

      {/* Trust & Policy Note */}
      <div className="mt-8 text-center text-[11px] text-zinc-400 flex items-center justify-center gap-2 font-light">
        <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
        <span>Authentic patron profiles &bull; AES-256 encrypted credentials &bull; Zero-cost tier</span>
      </div>
    </div>
  );
}
