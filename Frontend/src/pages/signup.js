// Signup.js
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from '../validations/auth';
import useSignup from '../utils/useSignup';
import { useForm } from "react-hook-form";
import { Toaster } from 'react-hot-toast';
import React from 'react';


const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchema),
    });

    const { handleSignup, loading } = useSignup();

    return (
        <div className="flex flex-col items-center justify-center p-3 bg-slate-200 h-screen">
            <Toaster />
            <h1 className="text-[60px] font-bold text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text">Signup</h1>
            <form 
                className="flex flex-col items-center justify-center border-2 border-slate-500 w-[400px] h-[60%] py-5 mt-10 rounded-xl bg-white"
                onSubmit={handleSubmit(handleSignup)}
            >
                {/* Email */}
                <div className="flex flex-col items-start justify-center w-full px-5">
                    <label className="font-semibold text-sm text-black">Email</label>
                    <input
                        {...register("email")}
                        aria-invalid={errors.email ? "true" : "false"}
                        className="border-2 border-slate-500 rounded-lg w-full h-[50px] text-black text-xl px-5"
                    />
                    {errors.email && (
                        <p className="text-red-600" role="alert">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="flex flex-col items-start justify-center w-full px-5 mt-5">
                    <label className="font-semibold text-sm text-black">Password</label>
                    <input
                        type="password"
                        {...register("password")}
                        aria-invalid={errors.password ? "true" : "false"}
                        className="border-2 border-slate-500 rounded-lg w-full h-[50px] text-black text-xl px-5"
                    />
                    {errors.password && (
                        <p className="text-red-600" role="alert">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="text-white bg-blue-800 hover:bg-blue-900 px-16 rounded-xl py-2 mx-auto mt-5">
                    {loading ? "Loading..." : "Signup"}
                </button>
                <a href="/login" className="text-blue-500 text-center mx-auto hover">
                    <p>Don't have an account? Login</p>
                </a>
            </form>
        </div>
    );
}

export default Signup;