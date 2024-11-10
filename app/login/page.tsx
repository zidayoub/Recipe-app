'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from 'react';

export default function LoginPage() {
    const [error, setError] = useState("")
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const username = formData.get("username") as string
        const password = formData.get("password") as string

        if (!username || !password) {
            setError("Please fill in all fields")
            return
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Login failed');
                return;
            }

            router.push('/')

        } catch {
            setError('An error occurred during login');
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
                <div className="mb-8 text-center">
                    <span className="text-2xl font-bold text-[#FF4E7C]">CookBook.</span>
                </div>
                <h1 className="mb-6 text-2xl font-semibold">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="text-sm text-gray-600">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 hover:border-gray-400 focus:border-[#FF4E7C] focus:outline-none focus:ring-1 focus:ring-[#FF4E7C]"
                            placeholder="johndoe"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm text-gray-600">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 hover:border-gray-400 focus:border-[#FF4E7C] focus:outline-none focus:ring-1 focus:ring-[#FF4E7C]"
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full rounded-md bg-[#FF4E7C] px-4 py-2 text-sm font-medium text-white hover:bg-[#FF4E7C]/90 focus:outline-none focus:ring-2 focus:ring-[#FF4E7C] focus:ring-offset-2"
                    >
                        SIGN IN
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-[#FF4E7C] hover:underline">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    )
}