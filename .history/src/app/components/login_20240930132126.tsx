"use client";
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import useSWR from 'swr';
import Link from "next/link";
import { redirect } from 'next/dist/server/api-utils';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import Image from "next/image";

const fetcher = async (url: any) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const Login = () => {

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const [visibleError, setVisibleError] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            username: credentials.username,
            password: credentials.password,
        });
        if (!result?.error) {
            window.location.href = '/main';
        } else {
            setVisibleError(true);
            setTimeout(() => {
                setVisibleError(false);
            }, 2000)
        }
    };

    return (
        <>

            <div className="flex min-h-screen items-stretch">
                <div className="flex-1 bg-indigo-600 sm:hidden md:block my-auto">
                    <div className="flex items-center justify-center h-screen">
                        <image src="/login.svg" className="w-3/5 mx-auto" alt="Loading..." />
                    </div>
                </div>
                <div className="flex-1 sm:bg-indigo-50">
                    <div className="flex flex-col items-center justify-center h-screen">
                        <div className="w-8/12 tracking-wide">
                            <p className="text-5xl font-bold mb-2 text-indigo-600">RMS</p>
                            <p className="text-lg font-bold mb-4 text-slate-500">Sign In</p>
                            {
                                visibleError ?
                                    <>
                                        <div className="bg-red-100 rounded-[5px] p-1">
                                            <p className="text-[10px] font-bold text-red-700 text-center">Email or password is incorrect!</p>
                                        </div>
                                    </>
                                    :
                                    <>
                                    </>
                            }
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label className="text-xs font-normal text-indigo-700">Email</label>
                                    <input type="text" id="username" name="username" value={credentials.username} maxLength={50} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} className="input-formcontrol" />

                                    <div className="flex mt-2">
                                        <label className="text-xs font-normal text-indigo-700">Password</label>
                                        <button type="button" onClick={togglePasswordVisibility}>
                                            {showPassword ? <FaRegEyeSlash className="pl-1" /> : <FaRegEye className="pl-1" />}
                                        </button>
                                        <Link href="" as={`/forget`} className="text-[11px] text-slate-500 hover:text-purple-600 font-normal tracking-wideer ml-auto">Forget password ?</Link>
                                    </div>
                                    <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={credentials.password} maxLength={50} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} className="input-formcontrol" />
                                    <button type="submit" className="btn btn-login w-full mt-6">Sign In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Login;

