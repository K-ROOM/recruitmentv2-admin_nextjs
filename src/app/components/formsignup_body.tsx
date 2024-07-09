"use client";
import { Fragment, useState } from "react";
import { CheckAccount, CreateAccount } from "../actions/actionMain";

const FormSignup_Body = () => {

    const [formData, setformData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        firstnameEN: "",
        lastnameEN: "",
    });

    const [visibleUsername, setVisibleUsername] = useState(false);
    const [visibleConfirmPwd, setVisibleConfirmPwd] = useState(false);

    const handleChangeHeader = async (e: any) => {
        const { name, value } = e.target;
        setformData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'username') {
            if (value !== '') {
                const result = await CheckAccount(value);
                console.log(result);
                if (result !== null && result !== '') {
                    setVisibleUsername(true);
                } else {
                    setVisibleUsername(false);
                }
            }
        }

        if (name === 'password') {
            if (value !== '') {
                if (value === formData.confirmPassword) {
                    setVisibleConfirmPwd(true);
                } else {
                    setVisibleConfirmPwd(false);
                }
            }
        }

        if (name === 'confirmPassword') {
            if (value !== '') {
                if (value === formData.password) {
                    setVisibleConfirmPwd(true);
                } else {
                    setVisibleConfirmPwd(false);
                }
            }
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        CreateAccount(formData);
    };

    return (
        <>  
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-2 mt-4">
                    <div className="col-span-2 mt-1"></div>
                    <div className="col-span-6 ml-2">
                        <label className="text-[11px] font-normal inline-flex text-gray-700">Email Address
                        {
                            visibleUsername ?
                            <>
                                <p className="text-[11px] text-red-600 ml-1">email is already in use</p>
                            </>
                            :
                            <>
                            </>
                        }
                        </label>
                        <input type="text" id="username" name="username" value={formData.username} maxLength={150} onChange={(e) => handleChangeHeader(e)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div className="col-span-4 mt-1"></div>
                </div>

                <div className="grid grid-cols-12 gap-2 mt-4">
                    <div className="col-span-2 mt-1"></div>
                    <div className="col-span-6 ml-2">
                        <label className="text-[11px] font-normal inline-flex text-gray-700">Password
                        {
                            visibleConfirmPwd ?
                            <>
                                <svg className="w-4 h-4 text-green-500 ml-1 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
                                </svg>
                            </>
                            :
                            <>
                            </>
                        }
                        </label>
                        <input type="password" id="password" name="password" value={formData.password} maxLength={150} onChange={(e) => handleChangeHeader(e)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div className="col-span-4 mt-1"></div>
                </div>

                <div className="grid grid-cols-12 gap-2 mt-4">
                    <div className="col-span-2 mt-1"></div>
                    <div className="col-span-6 ml-2">
                        <label className="text-[11px] font-normal inline-flex text-gray-700">Confirm Password
                        {
                            visibleConfirmPwd ?
                            <>
                                <svg className="w-4 h-4 text-green-500 ml-1 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
                                </svg>
                            </>
                            :
                            <>
                            </>
                        }
                        </label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} maxLength={50} onChange={(e) => handleChangeHeader(e)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div className="col-span-4 mt-1"></div>
                </div>

                <div className="grid grid-cols-12 gap-2 mt-4">
                    <div className="col-span-2 mt-1"></div>
                    <div className="col-span-6 ml-2">
                        <label className="text-[11px] font-normal inline-flex text-gray-700">First Name</label>
                        <input type="text" id="firstnameEN" name="firstnameEN" value={formData.firstnameEN} maxLength={50} onChange={(e) => handleChangeHeader(e)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div className="col-span-4 mt-1"></div>
                </div>

                <div className="grid grid-cols-12 gap-2 mt-4">
                    <div className="col-span-2 mt-1"></div>
                    <div className="col-span-6 ml-2">
                        <label className="text-[11px] font-normal inline-flex text-gray-700">Last Name</label>
                        <input type="text" id="lastnameEN" name="lastnameEN" value={formData.lastnameEN} maxLength={50} onChange={(e) => handleChangeHeader(e)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div className="col-span-4 mt-1"></div>
                </div>

                <div className="grid grid-cols-12 gap-2 mt-6">
                    <div className="col-span-2 mt-1"></div>
                    <div className="col-span-6 ml-2">
                        {
                            visibleUsername === false && visibleConfirmPwd === true ?
                            <>
                                <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Create</button>
                            </>
                            :
                            <>
                                <button type="submit" className="text-white bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4" disabled>Create</button>
                            </>
                        } 
                    </div>
                    <div className="col-span-4 mt-1"></div>
                </div>
            </form>
        </>
    );
};
  
export default FormSignup_Body;