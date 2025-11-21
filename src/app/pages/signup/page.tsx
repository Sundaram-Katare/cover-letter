"use client";

'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

export default function SignInPage() {
  const router = useRouter();
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      // @ts-ignore
      const data = await res.json();
      if(!res.ok) throw new Error(data?.error || 'Signup Failed');

      setSuccess('Acount Created');

      const signInResult = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  } 

  return (
    <div className="min-h-screen bg-gray-100/40 px-6 md:px-16 py-10 flex items-center justify-center">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full bg-white rounded-2xl shadow-xl p-6 md:p-12">

        {/* LEFT IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hidden md:block"
        >
          <img src="/images/signin.png" className="rounded-2xl w-full h-full object-cover shadow-md" />
        </motion.div>

        {/* RIGHT FORM SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl font-semibold font-poppins mb-2">
            Welcome back to <span className="text-[#F0B246]">Nucleus</span>
          </h2>

          <p className="text-gray-600 max-w-sm font-poppins mb-8">
            Build personalized cover letters 10X faster with our smart AI generator.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5 max-w-sm">
            <div className="flex flex-col space-y-4">

                <input
                required
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0B246]"
                placeholder="Name"
              />

              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0B246]"
                placeholder="Email"
              />

              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0B246]"
                placeholder="Password"
              />
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#F0B246] text-white rounded-xl font-poppins shadow hover:opacity-90 transition"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>

              <button
                type="button"
                onClick={() => router.push('/pages/signin')}
                className="text-sm text-gray-600 underline mx-auto"
              >
                Login
              </button>
            </div>

            {error && <p className="text-red-600 text-sm pt-2">{error}</p>}
          </form>
        </motion.div>

      </div>
    </div>
  );
}
