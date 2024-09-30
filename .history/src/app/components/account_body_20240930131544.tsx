"use client";
import axios from 'axios';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, Chip } from "@nextui-org/react";
import React from 'react';
import { PaginationItem, PaginationCursor } from "@nextui-org/react";
import Image from 'next/image';
import moment from 'moment';
import Loading from '../loading';
import { Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";
import ToggleSwitch from './toggle_switch1';
import { IoWarning } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { CheckAccount, CreateAccount, DeleteAccount, PatchAccount } from '../actions/actionAccount';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Profile_Image from "./profile_image";

const AccountBody = ({ session, header }: any) => {

    const access_Token = session.accessToken;

    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const fetcher = async (url: any) => {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${access_Token}` } });
        const data = await response.data;
        return data;
    };

    const [searchTerm1, setSearchTerm1] = useState('');
    const [searchTerm2, setSearchTerm2] = useState('');
    const [tabState, setTabState]: any = useState('A');

    const [visibleUsername, setVisibleUsername] = useState(false);
    const [visibleConfirmPwd, setVisibleConfirmPwd] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [account, setAccount]: any = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstnameEN: '',
        lastnameEN: '',
        role: 'ADMIN',
    });

    const [checkCreateAccountStatus, setCheckCreateAccountStatus] = useState(false);
    const [checkEditAccountStatus, setCheckEditAccountStatus] = useState(false);
    const [checkDeleteAccountStatus, setCheckDeleteAccountStatus] = useState(false);
    const [showAccountCreateModal, setShowAccountCreateModal] = useState(false);
    const [showAccountEditModal, setShowAccountEditModal] = useState(false);
    const [showAccountDeleteModal, setShowAccountDeleteModal] = useState(false);
    const [accountDelete, setAccountDelete] = useState(null);
    const [isCheckedAccount, setIsCheckedAccount] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const createAccount = (account: any) => {
        CreateAccount(account);
        setCheckCreateAccountStatus(true);
        setTimeout(() => {
            setShowAccountCreateModal(false);
            setCheckCreateAccountStatus(false);
            setAccount({
                username: '',
                password: '',
                confirmPassword: '',
                firstnameEN: '',
                lastnameEN: '',
                role: 'ADMIN',
            })
            setVisibleUsername(false);
            setVisibleConfirmPwd(false);
            setIsCheckedAccount(false);
            setShowPassword(false);
        }, 3000)
    };

    const editAccount = (account: any) => {
        PatchAccount(account);
        setCheckEditAccountStatus(true);
        setTimeout(() => {
            setShowAccountEditModal(false);
            setCheckEditAccountStatus(false);
            setAccount({
                username: '',
                password: '',
                confirmPassword: '',
                firstnameEN: '',
                lastnameEN: '',
                role: 'ADMIN',
            })
            setVisibleUsername(false);
            setVisibleConfirmPwd(false);
            setShowPassword(false);
        }, 3000)
    };

    const closeModal = () => {
        setShowAccountCreateModal(false);
        setVisibleUsername(false);
        setVisibleConfirmPwd(false);
        setShowPassword(false);
        setAccount({
            username: '',
            password: '',
            confirmPassword: '',
            firstnameEN: '',
            lastnameEN: '',
            role: 'ADMIN',
        })
    }

    const deleteAccount = (username: any) => {
        DeleteAccount(username);
        setCheckDeleteAccountStatus(true);
        setTimeout(() => {
            setShowAccountDeleteModal(false);
            setCheckDeleteAccountStatus(false);
        }, 3000)
    };

    const handleInputChangeAccount = async (e: any) => {
        const { name, value } = e.target;
        setAccount((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'username') {
            if (value !== '' && value !== null) {
                const result = await CheckAccount(value);
                if (result !== null && result !== '') {
                    setVisibleUsername(true);
                } else {
                    setVisibleUsername(false);
                }
            } else {
                setVisibleUsername(false);
            }
        }

        if (name === 'password') {
            if (value !== '' && value !== null) {
                if (value === account.confirmPassword) {
                    setVisibleConfirmPwd(true);
                } else {
                    setVisibleConfirmPwd(false);
                }
            }
        }

        if (name === 'confirmPassword') {
            if (value !== '' && value !== null) {
                if (value === account.password) {
                    setVisibleConfirmPwd(true);
                } else {
                    setVisibleConfirmPwd(false);
                }
            }
        }
    };

    const { data: data1, error: error1 } = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/rmslogin/admin', fetcher, { refreshInterval: 2000 });
    const { data: data2, error: error2 } = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/rmslogin/user', fetcher, { refreshInterval: 2000 });

    if (error1 || error2) return <div>Error fetching data</div>;
    if (!data1 || !data2) return <Loading />;

    const filteredData1 = data1.filter((item: any) =>
        item.username?.toLowerCase().includes(searchTerm1.toLowerCase()) ||
        item.firstnameEN?.toLowerCase().includes(searchTerm1.toLowerCase()) ||
        item.lastnameEN?.toLowerCase().includes(searchTerm1.toLowerCase())
    );

    const filteredData2 = data2.filter((item: any) =>
        item.username?.toLowerCase().includes(searchTerm2.toLowerCase()) ||
        item.firstnameEN?.toLowerCase().includes(searchTerm2.toLowerCase()) ||
        item.lastnameEN?.toLowerCase().includes(searchTerm2.toLowerCase())
    );

    return (
        <>
            <div className="container mx-auto pb-8 px-8">
                <div className="grid grid-cols-12 gap-2 mt-4">
                    <div className="col-span-12">
                        <div className="grid grid-cols-12 gap-2 mt-4">
                            {/* <div className="col-span-2 px-5 mr-[20px] bg-purple-600 border-l border-t border-r shadow-sm roundedTop-md">
                                <Tabs
                                    aria-label="Options"
                                    variant="underlined"
                                    classNames={{
                                        tabList: "gap-6 w-full relative rounded-none p-0 border-divider hide-scrollbar",
                                        cursor: "w-full bg-[#ffffff]",
                                        tab: "max-w-fit px-0 h-12 text-white",
                                        tabContent: "group-data-[selected=true]:text-[#ffffff]"
                                    }}
                                    onSelectionChange={setTabState}
                                >
                                    <Tab
                                        key="A"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs font-semibold">Administrator</span>
                                            </div>
                                        }
                                    />
                                    <Tab
                                        key="U"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs font-semibold">User</span>
                                            </div>
                                        }
                                    />
                                </Tabs>
                            </div> */}
                        </div>
                    </div>
                </div>

                {
                    tabState === 'A' ?
                        <>
                            <div className="grid grid-cols-12 gap-2 bg-white border shadow-sm rounded-md roundedTop px-1 py-3">
                                <div className="col-span-1 px-4 py-2 mt-1">
                                    <button
                                        className="bg-purple-500 text-white text-[12px] active:bg-gray-200 font-bold uppercase leading-[19px] px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowAccountCreateModal(true)}
                                    >
                                        ADD
                                    </button>
                                </div>

                                <div className="col-span-2 px-4 py-2">
                                    <p className="text-sm font-bold text-gray-700">Administrator account</p>
                                    <p className="text-xs text-gray-500 inline-flex">total <p className="text-purple-600 font-bold px-1">{filteredData1.length}</p> item</p>
                                </div>

                                <div className="col-span-6 px-4 py-2"></div>

                                <div className="col-span-3 px-4 py-2">
                                    <div className="flex flex-col py-2 rounded-md">
                                        <input
                                            type="text"
                                            placeholder="search"
                                            value={searchTerm1}
                                            onChange={(e) => setSearchTerm1(e.target.value)}
                                            className="bg-gray-100 rounded-lg border-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12">
                                    {filteredData1?.map((item: any) => (
                                        <div key={item.username} className="grid grid-cols-12 gap-2 transition ease-out hover:-translate-x-1 hover:bg-white hover:border hover:rounded-md hover:scale-105 duration-300">
                                            <div className="col-span-3">
                                                <div className="flex items-center px-5 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                    <Profile_Image name={item.firstnameEN + ' ' + item.lastnameEN} />
                                                    <div className="ps-3">
                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Account</div>
                                                        <div className="text-xs font-semibold">{item.username}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-3">
                                                <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="ps-3 mt-[8px]">
                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Name</div>
                                                        <div className="text-xs font-semibold">{item.firstnameEN} {item.lastnameEN}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-2">
                                                <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="ps-3 mt-[8px]">
                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Role</div>
                                                        <div className="text-xs font-semibold">{item.role}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-2">
                                                <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="ps-3 mt-[8px]">
                                                        <div className="text-xs font-semibold">
                                                            {
                                                                session.username === item.username ?
                                                                    <>
                                                                        <MdOutlineEdit className="w-5 h-5 mt-1 inline-flex text-yellow-400 cursor-pointer" onClick={() => {
                                                                            setShowAccountEditModal(true); setAccount({
                                                                                username: item.username,
                                                                                password: '',
                                                                                confirmPassword: '',
                                                                                firstnameEN: item.firstnameEN,
                                                                                lastnameEN: item.lastnameEN,
                                                                            });
                                                                        }} />
                                                                    </>
                                                                    :
                                                                    <>
                                                                        {/* <IoMdClose className="w-5 h-5 mt-1 inline-flex text-red-600 cursor-pointer" onClick={() => { setShowAccountDeleteModal(true); setAccountDelete(item.username); }} /> */}
                                                                    </>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {
                                showAccountCreateModal ?
                                    (<>
                                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                            <div className="relative w-[500px] my-6 mx-auto max-w-3xl">
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    <div className="flex self-center px-5 pt-5 border-solid border-blueGray-200 rounded-t">
                                                        <h3 className="text-xl font-semibold">
                                                            {
                                                                checkCreateAccountStatus ?
                                                                    <>
                                                                        <Image src="/check.gif" alt="Loading..." width={150} height={150} />
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <p className="text-black text-center font-semibold mb-5">Create Account</p>
                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Username
                                                                            {
                                                                                visibleUsername ?
                                                                                    <>
                                                                                        <p className="text-[11px] inline-flex text-red-600 ml-1">username is already in use</p>
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                    </>
                                                                            }
                                                                        </div>
                                                                        <input type="text" id="username" name="username" value={account.username} maxLength={150} onChange={(e) => handleInputChangeAccount(e)} className="bg-gray-100 rounded-lg border-none text-sm w-[300px] mb-3" required />

                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Password
                                                                            {
                                                                                visibleConfirmPwd ?
                                                                                    <>
                                                                                        <p className="text-[11px] inline-flex text-green-500 ml-1">passwords matching</p>
                                                                                    </>
                                                                                    :
                                                                                    <></>
                                                                            }
                                                                        </div>
                                                                        <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={account.password} maxLength={150} onChange={(e) => handleInputChangeAccount(e)} className="bg-gray-100 rounded-lg border-none text-sm w-[300px] mb-3" required />
                                                                        <button type="button" onClick={togglePasswordVisibility}>
                                                                            {showPassword ? <FaRegEyeSlash className="pl-1 pt-2" /> : <FaRegEye className="pl-1 pt-2" />}
                                                                        </button>

                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Confirm Password
                                                                            {
                                                                                visibleConfirmPwd ?
                                                                                    <>
                                                                                        <p className="text-[11px] inline-flex text-green-500 ml-1">passwords matching</p>
                                                                                    </>
                                                                                    :
                                                                                    <></>
                                                                            }
                                                                        </div>
                                                                        <input type={showPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={account.confirmPassword} maxLength={50} onChange={(e) => handleInputChangeAccount(e)} className="bg-gray-100 rounded-lg border-none text-sm w-[300px] mb-3" required />
                                                                        <button type="button" onClick={togglePasswordVisibility}>
                                                                            {showPassword ? <FaRegEyeSlash className="pl-1 pt-2" /> : <FaRegEye className="pl-1 pt-2" />}
                                                                        </button>

                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Firstname EN</div>
                                                                        <input type="text" id="firstnameEN" name="firstnameEN" value={account.firstnameEN} maxLength={50} onChange={(e) => handleInputChangeAccount(e)} className="bg-gray-100 rounded-lg border-none text-sm w-[300px] mb-3" required />

                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Lastname EN</div>
                                                                        <input type="text" id="lastnameEN" name="lastnameEN" value={account.lastnameEN} maxLength={50} onChange={(e) => handleInputChangeAccount(e)} className="bg-gray-100 rounded-lg border-none text-sm w-[300px] mb-3" required />
                                                                    </>
                                                            }
                                                        </h3>
                                                    </div>
                                                    {
                                                        checkCreateAccountStatus ?
                                                            <>
                                                                <div className="relative px-8 py-4 flex-auto text-center">
                                                                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                                        <p className="text-green-500 font-bold">
                                                                            Create success!
                                                                        </p>
                                                                    </p>
                                                                </div>
                                                            </>
                                                            :
                                                            <></>
                                                    }
                                                    <div className="flex items-center justify-center p-6 border-solid border-blueGray-200 rounded-b">
                                                        {
                                                            checkCreateAccountStatus ?
                                                                <></>
                                                                :
                                                                <>
                                                                    {
                                                                        visibleUsername !== true && visibleConfirmPwd === true ?
                                                                            <>
                                                                                <button
                                                                                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                                                                    type="button"
                                                                                    onClick={() => createAccount(account)}
                                                                                >
                                                                                    Create!
                                                                                </button>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <button
                                                                                    className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                                                                    type="button"
                                                                                    onClick={() => createAccount(account)}
                                                                                    disabled
                                                                                >
                                                                                    Create!
                                                                                </button>
                                                                            </>
                                                                    }
                                                                    <button
                                                                        className="bg-gray-100 text-gray-500 active:bg-gray-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                        type="button"
                                                                        onClick={() => closeModal()}
                                                                    >
                                                                        Close
                                                                    </button>
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>)
                                    :
                                    null
                            }

                            {
                                showAccountEditModal ?
                                    (<>
                                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                            <div className="relative w-[500px] my-6 mx-auto max-w-3xl">
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    <div className="flex self-center px-5 pt-5 border-solid border-blueGray-200 rounded-t">
                                                        <h3 className="text-xl font-semibold">
                                                            {
                                                                checkEditAccountStatus ?
                                                                    <>
                                                                        <Image src="/check.gif" alt="Loading..." width={150} height={150} />
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <p className="text-black text-center font-semibold mb-5">Create Account</p>
                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Username</div>
                                                                        <input type="text" id="username" name="username" value={account.username} maxLength={150} onChange={(e) => handleInputChangeAccount(e)} className="bg-gray-100 rounded-lg border-none text-sm w-[300px] mb-3" disabled />

                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Password
                                                                            {
                                                                                visibleConfirmPwd ?
                                                                                    <>
                                                                                        <p className="text-[11px] inline-flex text-green-500 ml-1">passwords matching</p>
                                                                                    </>
                                                                                    :
                                                                                    <></>
                                                                            }
                                                                        </div>
                                                                        <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={account.password} maxLength={150} onChange={(e) => handleInputChangeAccount(e)} className="bg-gray-100 rounded-lg border-none text-sm w-[300px] mb-3" required />
                                                                        <button type="button" onClick={togglePasswordVisibility}>
                                                                            {showPassword ? <FaRegEyeSlash className="pl-1 pt-2" /> : <FaRegEye className="pl-1 pt-2" />}
                                                                        </button>

                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Confirm Password
                                                                            {
                                                                                visibleConfirmPwd ?
                                                                                    <>
                                                                                        <p className="text-[11px] inline-flex text-green-500 ml-1">passwords matching</p>
                                                                                    </>
                                                                                    :
                                                                                    <></>
                                                                            }
                                                                        </div>
                                                                        <input type={showPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={account.confirmPassword} maxLength={50} onChange={(e) => handleInputChangeAccount(e)} className="bg-gray-100 rounded-lg border-none text-sm w-[300px] mb-3" required />
                                                                        <button type="button" onClick={togglePasswordVisibility}>
                                                                            {showPassword ? <FaRegEyeSlash className="pl-1 pt-2" /> : <FaRegEye className="pl-1 pt-2" />}
                                                                        </button>

                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Firstname EN</div>
                                                                        <input type="text" id="firstnameEN" name="firstnameEN" value={account.firstnameEN} maxLength={50} onChange={(e) => handleInputChangeAccount(e)} className="bg-gray-100 rounded-lg border-none text-sm w-[300px] mb-3" required />

                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Lastname EN</div>
                                                                        <input type="text" id="lastnameEN" name="lastnameEN" value={account.lastnameEN} maxLength={50} onChange={(e) => handleInputChangeAccount(e)} className="bg-gray-100 rounded-lg border-none text-sm w-[300px] mb-3" required />
                                                                    </>
                                                            }
                                                        </h3>
                                                    </div>
                                                    {
                                                        checkEditAccountStatus ?
                                                            <>
                                                                <div className="relative px-8 py-4 flex-auto text-center">
                                                                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                                        <p className="text-green-500 font-bold">
                                                                            Change success!
                                                                        </p>
                                                                    </p>
                                                                </div>
                                                            </>
                                                            :
                                                            <></>
                                                    }
                                                    <div className="flex items-center justify-center p-6 border-solid border-blueGray-200 rounded-b">
                                                        {
                                                            checkEditAccountStatus ?
                                                                <></>
                                                                :
                                                                <>
                                                                    {
                                                                        account.password !== '' && account.password !== null ?
                                                                            <>
                                                                                {
                                                                                    visibleConfirmPwd === true ?
                                                                                        <>
                                                                                            <button
                                                                                                className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                                                                                type="button"
                                                                                                onClick={() => editAccount(account)}
                                                                                            >
                                                                                                Change!
                                                                                            </button>
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            <button
                                                                                                className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                                                                                type="button"
                                                                                                onClick={() => editAccount(account)}
                                                                                                disabled
                                                                                            >
                                                                                                Change!
                                                                                            </button>
                                                                                        </>
                                                                                }
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <button
                                                                                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                                                                    type="button"
                                                                                    onClick={() => editAccount(account)}
                                                                                >
                                                                                    Change!
                                                                                </button>
                                                                            </>
                                                                    }

                                                                    <button
                                                                        className="bg-gray-100 text-gray-500 active:bg-gray-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                        type="button"
                                                                        onClick={() => setShowAccountEditModal(false)}
                                                                    >
                                                                        Close
                                                                    </button>
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>)
                                    :
                                    null
                            }

                            {
                                showAccountDeleteModal ?
                                    (<>
                                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                            <div className="relative w-[500px] my-6 mx-auto max-w-3xl">
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    <div className="flex self-center px-5 pt-5 border-solid border-blueGray-200 rounded-t">
                                                        <h3 className="text-xl font-semibold">
                                                            {
                                                                checkDeleteAccountStatus ?
                                                                    <>
                                                                        <Image src="/check.gif" alt="Loading..." width={150} height={150} />
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <IoWarning className="text-yellow-300 w-[100px] h-[100px] mt-[34px]" />
                                                                    </>
                                                            }
                                                        </h3>
                                                        <button
                                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                            onClick={() => setShowAccountDeleteModal(false)}
                                                        >
                                                        </button>
                                                    </div>
                                                    <div className="relative px-8 py-4 flex-auto text-center">
                                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                            {
                                                                checkDeleteAccountStatus ?
                                                                    <>
                                                                        <p className="text-green-500 font-bold">
                                                                            Delete success!
                                                                        </p>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        Do you want delete account : <b>{accountDelete}</b> ?
                                                                    </>
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center p-6 border-solid border-blueGray-200 rounded-b">
                                                        {
                                                            checkDeleteAccountStatus ?
                                                                <></>
                                                                :
                                                                <>
                                                                    <button
                                                                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                                                        type="button"
                                                                        onClick={() => deleteAccount(accountDelete)}
                                                                    >
                                                                        Delete!
                                                                    </button>
                                                                    <button
                                                                        className="bg-gray-100 text-gray-500 active:bg-gray-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                        type="button"
                                                                        onClick={() => setShowAccountDeleteModal(false)}
                                                                    >
                                                                        Close
                                                                    </button>
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>)
                                    :
                                    null
                            }
                        </>
                        :
                        tabState === 'U' ?
                            <>
                                <div className="grid grid-cols-12 gap-2 bg-white border shadow-sm rounded-md roundedTop px-1 py-3">
                                    <div className="col-span-1 px-4 py-2 mt-1">
                                        <button
                                            className="bg-gray-500 text-white text-[12px] active:bg-gray-200 font-bold uppercase leading-[19px] px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-no-drop"
                                            type="button"
                                            disabled
                                        >
                                            ADD
                                        </button>
                                    </div>

                                    <div className="col-span-2 px-4 py-2">
                                        <p className="text-sm font-bold text-gray-700">User account</p>
                                        <p className="text-xs text-gray-500 inline-flex">total <p className="text-purple-600 font-bold px-1">{filteredData2.length}</p> item</p>
                                    </div>

                                    <div className="col-span-6 px-4 py-2"></div>

                                    <div className="col-span-3 px-4 py-2">
                                        <div className="flex flex-col py-2 rounded-md">
                                            <input
                                                type="text"
                                                placeholder="search"
                                                value={searchTerm2}
                                                onChange={(e) => setSearchTerm2(e.target.value)}
                                                className="bg-gray-100 rounded-lg border-none text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-12">
                                        {filteredData2?.map((item: any) => (
                                            <div key={item.username} className="grid grid-cols-12 gap-2 cursor-pointer transition ease-out hover:-translate-x-1 hover:bg-white hover:border hover:rounded-md hover:scale-105 duration-300">
                                                <div className="col-span-3">
                                                    <div className="flex items-center px-5 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                        <Profile_Image name={item.firstnameEN + ' ' + item.lastnameEN} />
                                                        <div className="ps-3">
                                                            <div className="text-xs font-normal mb-[2px] text-gray-600">Account</div>
                                                            <div className="text-xs font-semibold">{item.username}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-span-3">
                                                    <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                        <div className="ps-3 mt-[8px]">
                                                            <div className="text-xs font-normal mb-[2px] text-gray-600">Name</div>
                                                            <div className="text-xs font-semibold">{item.firstnameEN} {item.lastnameEN}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-span-2">
                                                    <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                        <div className="ps-3 mt-[8px]">
                                                            <div className="text-xs font-normal mb-[2px] text-gray-600">Role</div>
                                                            <div className="text-xs font-semibold">{item.role}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-span-2">
                                                    <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                        <div className="ps-3 mt-[8px]">
                                                            <div className="text-xs font-semibold">
                                                                <IoMdClose className="w-5 h-5 mt-1 inline-flex text-red-600 cursor-pointer" onClick={() => { setShowAccountDeleteModal(true); setAccountDelete(item.username); }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {
                                    showAccountDeleteModal ?
                                        (<>
                                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                                <div className="relative w-[500px] my-6 mx-auto max-w-3xl">
                                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                        <div className="flex self-center px-5 pt-5 border-solid border-blueGray-200 rounded-t">
                                                            <h3 className="text-xl font-semibold">
                                                                {
                                                                    checkDeleteAccountStatus ?
                                                                        <>
                                                                            <Image src="/check.gif" alt="Loading..." width={150} height={150} />
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <IoWarning className="text-yellow-300 w-[100px] h-[100px] mt-[34px]" />
                                                                        </>
                                                                }
                                                            </h3>
                                                            <button
                                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                onClick={() => setShowAccountDeleteModal(false)}
                                                            >
                                                            </button>
                                                        </div>
                                                        <div className="relative px-8 py-4 flex-auto text-center">
                                                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                                {
                                                                    checkDeleteAccountStatus ?
                                                                        <>
                                                                            <p className="text-green-500 font-bold">
                                                                                Delete success!
                                                                            </p>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            Do you want delete account : <b>{accountDelete}</b> ?
                                                                        </>
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center justify-center p-6 border-solid border-blueGray-200 rounded-b">
                                                            {
                                                                checkDeleteAccountStatus ?
                                                                    <></>
                                                                    :
                                                                    <>
                                                                        <button
                                                                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                                                            type="button"
                                                                            onClick={() => deleteAccount(accountDelete)}
                                                                        >
                                                                            Delete!
                                                                        </button>
                                                                        <button
                                                                            className="bg-gray-100 text-gray-500 active:bg-gray-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                            type="button"
                                                                            onClick={() => setShowAccountDeleteModal(false)}
                                                                        >
                                                                            Close
                                                                        </button>
                                                                    </>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                        </>)
                                        :
                                        null
                                }
                            </>
                            :
                            <></>
                }
            </div>
        </>
    );
};

export default AccountBody;

