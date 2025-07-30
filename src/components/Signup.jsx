import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    // Frosted glass + animated border/shadow
    const cardAnim = `
      @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(40px) scale(0.98); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes cardGlow {
        0%, 100% { box-shadow: 0 4px 32px 0 rgba(56,189,248,0.10), 0 0 0 0 rgba(56,189,248,0.16); border-color: rgba(56,189,248,0.18); }
        50% { box-shadow: 0 8px 48px 0 rgba(56,189,248,0.18), 0 0 24px 4px rgba(56,189,248,0.22); border-color: rgba(56,189,248,0.32); }
      }
    `;

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-transparent">
            <style>{cardAnim}</style>
            <div className="w-full max-w-md flex flex-col items-center">
                <div
                    className="w-full bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-cyan-200 flex flex-col items-center animate-fadeInUp hover:scale-[1.015] transition-all duration-300"
                    style={{
                        animation: 'fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both, cardGlow 3.5s ease-in-out infinite',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                    }}
                >
                    <div className="mb-4 flex justify-center w-full">
                        <Logo width={72} height={72} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2 tracking-tight">
                        Create Account
                    </h2>
                    <p className="text-center text-gray-600 text-base mb-8">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-cyan-500 hover:text-cyan-400 transition-colors duration-200"
                        >
                            Sign In
                        </Link>
                    </p>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-6 text-center text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(create)} className="space-y-6 w-full text-left">
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            className="bg-white/60 border border-cyan-100 text-gray-900 placeholder-gray-400 focus:bg-white/80 focus:border-cyan-400"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            className="bg-white/60 border border-cyan-100 text-gray-900 placeholder-gray-400 focus:bg-white/80 focus:border-cyan-400"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            className="bg-white/60 border border-cyan-100 text-gray-900 placeholder-gray-400 focus:bg-white/80 focus:border-cyan-400"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md transition-all duration-300 hover:from-cyan-500 hover:to-blue-600 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        >
                            Create Account
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup