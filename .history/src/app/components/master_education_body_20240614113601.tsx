"use client";
import axios from 'axios';
import { Fragment, useMemo, useState } from 'react';
import useSWR from 'swr';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, Chip } from "@nextui-org/react";
import React from 'react';
import { PaginationItem, PaginationCursor } from "@nextui-org/react";
import Image from 'next/image';
import moment from 'moment';
import Loading from '../loading';
import { Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";
import ToggleSwitch1 from './toggle_switch1';
import ToggleSwitch2 from './toggle_switch2';
import { IoWarning } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { CreateMasterEducation, PostAndPatchMasterPosition, DeleteMasterEducation, DeleteMasterPosition } from '../actions/actionMaster';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

const MasterEducation_Body = ({ session, header }: any) => {

    const access_Token = session.accessToken;

    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const fetcher = async (url: any) => {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${access_Token}` } });
        const data = await response.data;
        return data;
    };

    const [searchTerm, setSearchTerm] = useState('');

    const [mEducation, setMEducation] = useState({
        educationEN: '',
        educationTH: '',
        status: false,
    });

    const [checkCreateEducationStatus, setCheckCreateEducationStatus] = useState(false);
    const [checkDeleteEducationStatus, setCheckDeleteEducationStatus] = useState(false);
    const [showEducationCreateModal, setShowEducationCreateModal] = useState(false);
    const [showEducationDeleteModal, setShowEducationDeleteModal] = useState(false);
    const [educationDelete, setEducationDelete] = useState(null);
    const [isCheckedEducation, setIsCheckedEducation] = useState(false);

    const createEducation = (mEducation: any) => {
        CreateMasterEducation(mEducation);
        setCheckCreateEducationStatus(true);
        setTimeout(() => {
            setShowEducationCreateModal(false);
            setCheckCreateEducationStatus(false);
            setMEducation({
                educationEN: '',
                educationTH: '',
                status: false,
            })
            setIsCheckedEducation(false);
        }, 3000)
    };

    const deleteEducation = (educationEN: any) => {
        DeleteMasterEducation(educationEN);
        setCheckDeleteEducationStatus(true);
        setTimeout(() => {
            setShowEducationDeleteModal(false);
            setCheckDeleteEducationStatus(false);
        }, 3000)
    };

    const handleInputChangeEducation = (e: any) => {
        const { name, value } = e.target;
        setMEducation((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleToggleCreateEducation = () => {
        setIsCheckedEducation(!isCheckedEducation);
        setMEducation((prevData) => ({
            ...prevData,
            status: !isCheckedEducation,
        }));
    };

    const { data: data1, error: error1 } = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/master_education', fetcher, { refreshInterval: 3000 });
    const { data: data2, error: error2 } = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/master_education/active', fetcher, { refreshInterval: 3000 });

    if (error1 || error2) return <div>Error fetching data</div>;
    if (!data1 || !data2) return <Loading />;

    const filteredData = data1.filter((item: any) =>
        item.educationEN?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.educationTH?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="container mx-auto pb-8 px-8">
                <div className="grid grid-cols-12 mt-5 mb-3">
                    <div className="col-span-1 px-4 py-4 mt-1 mr-1 text-center bg-white border shadow-sm rounded-md">
                        <p className="text-xs">Total</p>
                        <p className="text-2xl font-bold text-purple-600">{data1.length}</p>
                    </div>

                    <div className="col-span-1 px-4 py-4 mt-1 ml-1 text-center bg-white border shadow-sm rounded-md">
                        <p className="text-xs">Active</p>
                        <p className="text-2xl font-bold text-purple-600">{data2.length}</p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-2 bg-white border shadow-sm rounded-md px-1 py-3">
                    <div className="col-span-1 px-4 py-2 mt-1">
                        <button
                            className="bg-purple-500 text-white text-[12px] active:bg-gray-200 font-bold uppercase leading-[19px] px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowEducationCreateModal(true)}
                        >
                            ADD
                        </button>
                    </div>

                    <div className="col-span-2 px-4 py-2">
                        <p className="text-sm font-bold text-gray-700">Master Education</p>
                        <p className="text-xs text-gray-500 inline-flex">total <p className="text-purple-600 font-bold px-1">{filteredData.length}</p> item</p>
                    </div>

                    <div className="col-span-6 px-4 py-2"></div>

                    <div className="col-span-3 px-4 py-2">
                        <div className="flex flex-col py-2 rounded-md">
                            <input
                                type="text"
                                placeholder="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-gray-100 rounded-lg border-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="col-span-12">
                        {filteredData?.map((item: any) => (
                            <div key={item.educationEN} className="grid grid-cols-12 gap-2">
                                <div className="col-span-3">
                                    <div className="flex items-center px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="border-l-[5px] border-l-purple-700 ml-3 ps-3 mt-[21px]">
                                            <div className="text-xs font-normal mb-[2px] text-gray-600">EN</div>
                                            <div className="text-xs font-semibold">{item.educationEN}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="ps-3 mt-[21px]">
                                            <div className="text-xs font-normal mb-[2px] text-gray-600">TH</div>
                                            <div className="text-xs font-semibold">{item.educationTH}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-1">
                                    <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="ps-3 mt-[21px]">
                                            {
                                                item.status ?
                                                    <>
                                                        <span className="relative inline-flex h-3 w-3 mt-2">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                        </span>
                                                    </>
                                                    :
                                                    <>
                                                        <span className="relative inline-flex h-3 w-3 mt-2">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                                        </span>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="ps-3 mt-[21px]">
                                            <ToggleSwitch1 educationEN={item.educationEN} status={item.status} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="ps-3 mt-[21px]">
                                            <div className="text-xs font-semibold">
                                                <svg className="w-5 h-5 mt-1 text-red-600 dark:text-white cursor-pointer" onClick={() => { setShowEducationDeleteModal(true); setEducationDelete(item.educationEN); }} aria-hidden="true" xmlns="http://www.w3.org/3000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {
                    showEducationCreateModal ?
                        (<>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-[500px] my-6 mx-auto max-w-3xl">
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <div className="flex self-center px-5 pt-5 border-solid border-blueGray-200 rounded-t">
                                            <h3 className="text-xl font-semibold">
                                                {
                                                    checkCreateEducationStatus ?
                                                        <>
                                                            <img src="/check.gif" alt="Loading..." style={{ width: 150, height: 150 }} />
                                                        </>
                                                        :
                                                        <>
                                                            <p className="text-black text-center font-semibold mb-5">Create Master Education</p>
                                                            <div className="text-xs font-normal mb-[2px] text-gray-600">Education EN</div>
                                                            <input type="text" id="educationEN" name="educationEN" value={mEducation.educationEN} maxLength={100} onChange={handleInputChangeEducation} className="bg-gray-100 rounded-lg border-none text-sm w-[300px] mb-3" required />

                                                            <div className="text-xs font-normal mb-[2px] text-gray-600">Education TH</div>
                                                            <input type="text" id="educationTH" name="educationTH" value={mEducation.educationTH} maxLength={100} onChange={handleInputChangeEducation} className="bg-gray-100 rounded-lg border-none text-sm w-[300px] mb-3" required />

                                                            <br></br>
                                                            <label className="switch mt-2">
                                                                <input type="checkbox" checked={isCheckedEducation} onChange={handleToggleCreateEducation} />
                                                                <span className="slider"></span>
                                                                {
                                                                    isCheckedEducation ?
                                                                        <>
                                                                            <span className="label on-label">
                                                                                ON
                                                                            </span>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <span className="label off-label">
                                                                                OFF
                                                                            </span>
                                                                        </>
                                                                }

                                                            </label>
                                                        </>
                                                }
                                            </h3>
                                        </div>
                                        {
                                            checkCreateEducationStatus ?
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
                                                checkCreateEducationStatus ?
                                                    <></>
                                                    :
                                                    <>
                                                        <button
                                                            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => createEducation(mEducation)}
                                                        >
                                                            Create!
                                                        </button>
                                                        <button
                                                            className="bg-gray-100 text-gray-500 active:bg-gray-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => setShowEducationCreateModal(false)}
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
                    showEducationDeleteModal ?
                        (<>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-[500px] my-6 mx-auto max-w-3xl">
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <div className="flex self-center px-5 pt-5 border-solid border-blueGray-200 rounded-t">
                                            <h3 className="text-xl font-semibold">
                                                {
                                                    checkDeleteEducationStatus ?
                                                        <>
                                                            <img src="/check.gif" alt="Loading..." style={{ width: 150, height: 150 }} />
                                                        </>
                                                        :
                                                        <>
                                                            <IoWarning className="text-yellow-300 w-[100px] h-[100px] mt-[34px]" />
                                                        </>
                                                }
                                            </h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setShowEducationDeleteModal(false)}
                                            >
                                            </button>
                                        </div>
                                        <div className="relative px-8 py-4 flex-auto text-center">
                                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                {
                                                    checkDeleteEducationStatus ?
                                                        <>
                                                            <p className="text-green-500 font-bold">
                                                                Delete success!
                                                            </p>
                                                        </>
                                                        :
                                                        <>
                                                            Do you want delete education : <b>{educationDelete}</b> ?
                                                        </>
                                                }
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-center p-6 border-solid border-blueGray-200 rounded-b">
                                            {
                                                checkDeleteEducationStatus ?
                                                    <></>
                                                    :
                                                    <>
                                                        <button
                                                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => deleteEducation(educationDelete)}
                                                        >
                                                            Delete!
                                                        </button>
                                                        <button
                                                            className="bg-gray-100 text-gray-500 active:bg-gray-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => setShowEducationDeleteModal(false)}
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
            </div >
        </>
    );
};

export default MasterEducation_Body;

