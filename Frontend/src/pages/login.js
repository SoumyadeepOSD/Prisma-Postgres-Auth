import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useLogin from '../utils/useLogin';
import { Toaster } from 'react-hot-toast';

// Validation schema
const schema = yup.object().shape({
    email: yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .test('contains-at', 'Email must contain "@"', value => value && value.includes('@')),
    password: yup.string()
        .min(6, 'Length must be 6')
        .required('Password is required'),
});

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { handleLogin, loading } = useLogin();


    return (
        <div className="flex flex-col items-center justify-center p-3 bg-slate-200 h-screen">
            <Toaster/>
            <h1 className="text-2xl font-bold">Signin</h1>
            <form className="flex flex-col items-center justify-center border-2 border-slate-500 w-[400px] h-fit py-5 mt-10 rounded-xl bg-white" onSubmit={handleSubmit(handleLogin)}>
                {/* Email */}
                <div className="flex flex-col items-start justify-center">
                    <label>Email</label>
                    <input
                        {...register("email")}
                        aria-invalid={errors.email ? "true" : "false"}
                        className="border-2 border-slate-500 rounded-lg"
                    />
                    {errors.email && (
                        <p className="text-red-600" role="alert">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="flex flex-col items-start justify-center">
                    <label>Password</label>
                    <input
                        type="password"
                        {...register("password")}
                        aria-invalid={errors.password ? "true" : "false"}
                        className="border-2 border-slate-500 rounded-lg"
                    />
                    {errors.password && (
                        <p className="text-red-600" role="alert">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="text-white bg-blue-800 hover:bg-blue-900 px-16 rounded-xl py-2 mx-auto mt-5">
                    {loading ? "Loading..." : "Signin"}
                </button>
            </form>
            <a href="/signup" className="text-blue-500 text-center mx-auto hover">
                <p>Don't have an account? Signup</p>
            </a>
        </div>
    );
}

export default Login;