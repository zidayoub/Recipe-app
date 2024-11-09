'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterPage() {
    const [error, setError] = useState("")
    const router = useRouter()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const username = formData.get("username")
        const password = formData.get("password")
        const confirmPassword = formData.get("confirmPassword")

        if (password !== confirmPassword) {
            setError("The passwords do not match")
            return
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Registration failed');
                return;
            }

            // Store credentials in localStorage
            localStorage.setItem('username', username as string);
            localStorage.setItem('password', password as string);
            localStorage.setItem('userData', JSON.stringify(data.user));

            // Set auth cookie
            document.cookie = `auth=${username}; path=/;`

            // Use router for navigation
            router.push('/')
            router.refresh()
        } catch {
            setError('An error occurred during registration');
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
                <div className="mb-8 text-center">
                    <span className="text-2xl font-bold text-[#FF4E7C]">CookBook.</span>
                </div>
                <h1 className="mb-6 text-2xl font-semibold">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="text-sm text-gray-600">
                            Username *
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 hover:border-gray-400 focus:border-[#FF4E7C] focus:outline-none focus:ring-1 focus:ring-[#FF4E7C]"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm text-gray-600">
                            Password *
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 hover:border-gray-400 focus:border-[#FF4E7C] focus:outline-none focus:ring-1 focus:ring-[#FF4E7C]"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="text-sm text-gray-600">
                            Confirm Password *
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
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
                        Create Account
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#FF4E7C] hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}