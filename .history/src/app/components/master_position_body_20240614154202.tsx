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

const MasterPosition_Body = ({ session, header }: any) => {

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

    const [positionDetails, setPositionDetails]: any = useState([]);
    const [positionOtherDetails, setPositionOtherDetails]: any = useState([]);
    const [mPosition, setMPosition] = useState({
        positionID: '',
        positionDesired: '',
        positionStatus: false,
        propertyAge: '',
        propertyExp: '',
        propertyEducation: '',
        positionDetailNo: null,
        positionOtherDetailNo: null,
        salaryMin: null,
        salaryMax: null,
    });

    const [countPositionDetailNo, setCountPositionDetailNo] = useState(0);
    const [countPositionOtherDetailNo, setCountPositionOtherDetailNo] = useState(0);

    const [checkCreatePositionStatus, setCheckCreatePositionStatus] = useState(false);
    const [checkEditPositionStatus, setCheckEditPositionStatus] = useState(false);
    const [checkDeletePositionStatus, setCheckDeletePositionStatus] = useState(false);
    const [showPositionCreateModal, setShowPositionCreateModal] = useState(false);
    const [showPositionEditModal, setShowPositionEditModal] = useState(false);
    const [showPositionDeleteModal, setShowPositionDeleteModal] = useState(false);
    const [isCheckedPosition, setIsCheckedPosition] = useState(false);
    const [positionDelete, setPositionDelete]: any = useState({
        positionID: '',
        positionDesired: '',
    });

    const closeModalPosition = () => {
        setShowPositionCreateModal(false);
        setShowPositionEditModal(false);
        setCountPositionDetailNo(0);
        setCountPositionOtherDetailNo(0);
        setMPosition({
            positionID: '',
            positionDesired: '',
            positionStatus: false,
            propertyAge: '',
            propertyExp: '',
            propertyEducation: '',
            positionDetailNo: null,
            positionOtherDetailNo: null,
            salaryMin: null,
            salaryMax: null,
        })
        setPositionDetails([]);
        setPositionOtherDetails([]);
        setIsCheckedPosition(false);
    }

    const createPosition = (mPosition: any) => {
        mPosition.positionDetailNo = countPositionDetailNo;
        mPosition.positionOtherDetailNo = countPositionOtherDetailNo;
        PostAndPatchMasterPosition(mPosition, positionDetails, positionOtherDetails);
        setCheckCreatePositionStatus(true);
        setTimeout(() => {
            setShowPositionCreateModal(false);
            setCheckCreatePositionStatus(false);
            setCountPositionDetailNo(0);
            setCountPositionOtherDetailNo(0);
            setMPosition({
                positionID: '',
                positionDesired: '',
                positionStatus: false,
                propertyAge: '',
                propertyExp: '',
                propertyEducation: '',
                positionDetailNo: null,
                positionOtherDetailNo: null,
                salaryMin: null,
                salaryMax: null,
            })
            setPositionDetails([]);
            setPositionOtherDetails([]);
            setIsCheckedPosition(false);
        }, 3000)
    };

    const editPosition = (mPosition: any) => {
        mPosition.positionDetailNo = countPositionDetailNo;
        mPosition.positionOtherDetailNo = countPositionOtherDetailNo;
        PostAndPatchMasterPosition(mPosition, positionDetails, positionOtherDetails);
        setCheckEditPositionStatus(true);
        setTimeout(() => {
            setShowPositionEditModal(false);
            setCheckEditPositionStatus(false);
            setCountPositionDetailNo(0);
            setCountPositionOtherDetailNo(0);
            setMPosition({
                positionID: '',
                positionDesired: '',
                positionStatus: false,
                propertyAge: '',
                propertyExp: '',
                propertyEducation: '',
                positionDetailNo: null,
                positionOtherDetailNo: null,
                salaryMin: null,
                salaryMax: null,
            })
            setPositionDetails([]);
            setPositionOtherDetails([]);
            setIsCheckedPosition(false);
        }, 3000)
    };

    const deletePosition = (positionID: any) => {
        DeleteMasterPosition(positionID);
        setCheckDeletePositionStatus(true);
        setTimeout(() => {
            setShowPositionDeleteModal(false);
            setCheckDeletePositionStatus(false);
        }, 3000)
    };

    const handleInputChangePosition = (e: any) => {
        const { name, value } = e.target;
        const inputText = e.target.value;
        const numbersOnly = inputText.replaceAll(/\D/g, '');
        if (name === 'salaryMin') {
            setMPosition((prevData) => ({
                ...prevData,
                [name]: numbersOnly,
            }));
        } else if (name === 'salaryMax') {
            setMPosition((prevData) => ({
                ...prevData,
                [name]: numbersOnly,
            }));
        } else {
            setMPosition((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleTogglePosition = () => {
        setIsCheckedPosition(!isCheckedPosition);
        setMPosition((prevData) => ({
            ...prevData,
            positionStatus: !isCheckedPosition,
        }));
    };

    const addPositionDetails = () => {
        setPositionDetails((positionDetails: any) => [...positionDetails,
        {
            positionResponsibility: '',
        }]);
        let prevCount = 1;
        setCountPositionDetailNo((prevCount: any) => prevCount + 1);
    }

    const removePositionDetails = (index: any) => {
        setPositionDetails((positionDetails: any[]) => {
            return positionDetails.filter((_, i) => i !== index)
        })
        setCountPositionDetailNo((prevCount: any) => prevCount - 1);
    }

    const handleChangeInputPositionDetails = async (e: { target: { name: any; value: any } }, index: any) => {
        const arr = [...positionDetails]
        arr[index] = { ...arr[index], [e.target.name]: e.target.value }
        setPositionDetails(arr);
    }

    const addPositionOtherDetails = () => {
        setPositionOtherDetails((positionOtherDetails: any) => [...positionOtherDetails,
        {
            propertyOther: '',
        }]);
        let prevCount = 1;
        setCountPositionOtherDetailNo((prevCount: any) => prevCount + 1);
    }

    const removePositionOtherDetails = (index: any) => {
        setPositionOtherDetails((positionOtherDetails: any[]) => {
            return positionOtherDetails.filter((_, i) => i !== index)
        })
        setCountPositionOtherDetailNo((prevCount: any) => prevCount - 1);
    }

    const handleChangeInputPositionOtherDetails = async (e: { target: { name: any; value: any } }, index: any) => {
        const arr = [...positionOtherDetails]
        arr[index] = { ...arr[index], [e.target.name]: e.target.value }
        setPositionOtherDetails(arr);
    }

    const { data: data1, error: error1 } = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/master_position', fetcher, { refreshInterval: 3000 });
    const { data: data2, error: error2 } = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/master_position/active', fetcher, { refreshInterval: 3000 });

    if (error1 || error2) return <div>Error fetching data</div>;
    if (!data1 || !data2) return <Loading />;

    const filteredData = data1.filter((item: any) =>
        item.positionID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.positionDesired?.toLowerCase().includes(searchTerm.toLowerCase())
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
                            onClick={() => setShowPositionCreateModal(true)}
                        >
                            ADD
                        </button>
                    </div>

                    <div className="col-span-2 px-4 py-2">
                        <p className="text-sm font-bold text-gray-700">Master Position</p>
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
                            <div key={item.positionID} className="grid grid-cols-12 gap-2">
                                <div className="col-span-4">
                                    <div className="flex items-center px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="border-l-[5px] border-l-purple-700 ml-3 ps-3 mt-[21px]">
                                            <div className="text-xs font-normal mb-[2px] text-gray-600">Position</div>
                                            <div className="text-xs font-semibold">{item.positionDesired}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="ps-3 mt-[21px]">
                                            <div className="text-xs font-normal mb-[2px] text-gray-600">Position ID</div>
                                            <div className="text-xs font-semibold">{item.positionID}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-1">
                                    <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="ps-3 mt-[21px]">
                                            <div className="text-xs font-normal mb-[2px] text-gray-600">Open Date</div>
                                            {
                                                item.positionActiveDate ?
                                                    <>
                                                        <div className="text-xs font-semibold">{moment(item.positionActiveDate).format('DD MMM YYYY')}</div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="text-xs font-semibold">-</div>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-1">
                                    <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="ps-3 mt-[21px]">
                                            {
                                                item.positionStatus ?
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
                                            <ToggleSwitch2 positionID={item.positionID} status={item.positionStatus} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="ps-3 mt-[21px]">
                                            <div className="text-xs font-semibold">
                                                <MdOutlineEdit className="w-5 h-5 mt-1 inline-flex text-yellow-400 cursor-pointer mr-4" onClick={() => {
                                                    setShowPositionEditModal(true); setMPosition({
                                                        positionID: item.positionID,
                                                        positionDesired: item.positionDesired,
                                                        positionStatus: item.positionStatus,
                                                        propertyAge: item.propertyAge,
                                                        propertyExp: item.propertyExp,
                                                        propertyEducation: item.propertyEducation,
                                                        positionDetailNo: item.positionDetailNo,
                                                        positionOtherDetailNo: item.positionOtherDetailNo,
                                                        salaryMin: item.salaryMin,
                                                        salaryMax: item.salaryMax,
                                                    }); setIsCheckedPosition(item.positionStatus);
                                                    setPositionDetails(item.rmsMasterPositiondetail);
                                                    setPositionOtherDetails(item.rmsMasterPositionotherdetail);
                                                    setCountPositionDetailNo(item.positionDetailNo);
                                                    setCountPositionOtherDetailNo(item.positionOtherDetailNo);
                                                }} />
                                                <svg className="w-5 h-5 mt-1 text-red-600 inline-flex dark:text-white cursor-pointer" onClick={() => {
                                                    setShowPositionDeleteModal(true); setPositionDelete({
                                                        positionID: item.positionID,
                                                        positionDesired: item.positionDesired,
                                                    });
                                                }} aria-hidden="true" xmlns="http://www.w3.org/3000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
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
                    showPositionCreateModal ?
                        (<>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-[1200px] h-[800px] my-6 mx-[10px]">
                                    <div className="border-0 rounded-lg shadow-lg bg-white outline-none focus:outline-none">
                                        <div className="px-5 pt-5 border-solid border-blueGray-200 rounded-t">
                                            <h3 className="text-xl font-semibold flex justify-center">
                                                {
                                                    checkCreatePositionStatus ?
                                                        <>
                                                            <img src="/check.gif" alt="Loading..." style={{ width: 150, height: 150, textAlign: 'center' }} />
                                                        </>
                                                        :
                                                        <>
                                                            <p className="text-black text-center font-semibold mb-5">Create Master Position</p>
                                                        </>
                                                }
                                            </h3>
                                            <div className="">
                                                {
                                                    checkCreatePositionStatus ?
                                                        <></>
                                                        :
                                                        <>
                                                            <div className="grid grid-cols-12 sm:grid-cols-1 gap-4">
                                                                <div className="col-span-4">
                                                                    <div>
                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Position Desired</div>
                                                                        <input type="text" id="positionDesired" name="positionDesired" value={mPosition.positionDesired} maxLength={150} onChange={handleInputChangePosition} className="bg-gray-100 rounded-lg border-none text-sm mb-3 w-full" required />
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Property Age</div>
                                                                        <input type="text" id="propertyAge" name="propertyAge" value={mPosition.propertyAge} maxLength={50} onChange={handleInputChangePosition} className="bg-gray-100 rounded-lg border-none text-sm mb-3 w-full" required />
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Property Education</div>
                                                                        <input type="text" id="propertyEducation" name="propertyEducation" value={mPosition.propertyEducation} maxLength={150} onChange={handleInputChangePosition} className="bg-gray-100 rounded-lg border-none text-sm mb-3 w-full" required />
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Property Experience</div>
                                                                        <input type="text" id="propertyExp" name="propertyExp" value={mPosition.propertyExp} maxLength={150} onChange={handleInputChangePosition} className="bg-gray-100 rounded-lg border-none text-sm mb-3 w-full" required />
                                                                    </div>

                                                                    <div className="grid grid-cols-12">
                                                                        <div className="col-span-5">
                                                                            <div className="text-xs font-normal mb-[2px] text-gray-600">Salary Min</div>
                                                                            <input type="text" id="salaryMin" name="salaryMin" value={mPosition.salaryMin === null ? '' : mPosition.salaryMin} maxLength={6} onChange={handleInputChangePosition} className="bg-gray-100 rounded-lg border-none text-sm mb-3 w-full" required />
                                                                        </div>

                                                                        <div className="col-span-1 text-center self-center">
                                                                            <div className="text-xs font-normal mb-[2px] text-gray-600">~</div>
                                                                        </div>

                                                                        <div className="col-span-5">
                                                                            <div className="text-xs font-normal mb-[2px] text-gray-600">Salary Max</div>
                                                                            <input type="text" id="salaryMax" name="salaryMax" value={mPosition.salaryMax === null ? '' : mPosition.salaryMax} maxLength={6} onChange={handleInputChangePosition} className="bg-gray-100 rounded-lg border-none text-sm mb-3 w-full" required />
                                                                        </div>

                                                                        <div className="col-span-1 text-center self-center">
                                                                            <div className="text-xs font-normal mb-[2px] text-gray-600">THB</div>
                                                                        </div>
                                                                    </div>

                                                                    <label className="switch mt-2">
                                                                        <input type="checkbox" checked={isCheckedPosition} onChange={handleTogglePosition} />
                                                                        <span className="slider"></span>
                                                                        {
                                                                            isCheckedPosition ?
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
                                                                </div>

                                                                <div className="col-span-4">
                                                                    <div>
                                                                        <div className="text-xs font-normal text-gray-600">Position Details
                                                                            {
                                                                                countPositionDetailNo >= 10 ?
                                                                                    <>
                                                                                        <IoIosAddCircle className="text-gray-500 inline-flex font-medium ml-2 w-[19px] h-[19px]" />
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        <IoIosAddCircle className="text-green-500 inline-flex font-medium ml-2 w-[19px] h-[19px]" onClick={addPositionDetails} />
                                                                                    </>
                                                                            }
                                                                        </div>
                                                                        {positionDetails.map((e: any, index: any) => (
                                                                            <Fragment key={index}>
                                                                                <input type="text" id="positionResponsibility" name="positionResponsibility" value={e.positionResponsibility} maxLength={100} onChange={(e) => handleChangeInputPositionDetails(e, index)} className="bg-gray-100 rounded-lg border-none text-sm mb-[29px] w-[90%]" required /><IoCloseCircle className="text-red-600 inline-flex font-medium ml-2 w-[19px] h-[19px]" onClick={() => removePositionDetails(index)} />
                                                                            </Fragment>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <div className="col-span-4">
                                                                    <div>
                                                                        <div className="text-xs font-normal text-gray-600">Position Other Details
                                                                            {
                                                                                countPositionOtherDetailNo >= 10 ?
                                                                                    <>
                                                                                        <IoIosAddCircle className="text-gray-500 inline-flex font-medium ml-2 w-[19px] h-[19px]" />
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        <IoIosAddCircle className="text-green-500 inline-flex font-medium ml-2 w-[19px] h-[19px]" onClick={addPositionOtherDetails} />
                                                                                    </>
                                                                            }
                                                                        </div>
                                                                        {positionOtherDetails.map((e: any, index: any) => (
                                                                            <Fragment key={index}>
                                                                                <input type="text" id="propertyOther" name="propertyOther" value={e.propertyOther} maxLength={100} onChange={(e) => handleChangeInputPositionOtherDetails(e, index)} className="bg-gray-100 rounded-lg border-none text-sm mb-[29px] w-[90%]" required /><IoCloseCircle className="text-red-600 inline-flex font-medium ml-2 w-[19px] h-[19px]" onClick={() => removePositionOtherDetails(index)} />
                                                                            </Fragment>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        {
                                            checkCreatePositionStatus ?
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
                                                checkCreatePositionStatus ?
                                                    <></>
                                                    :
                                                    <>
                                                        <button
                                                            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => createPosition(mPosition)}
                                                        >
                                                            Create!
                                                        </button>
                                                        <button
                                                            className="bg-gray-100 text-gray-500 active:bg-gray-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => closeModalPosition()}
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
                    showPositionEditModal ?
                        (<>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-[1200px] h-[800px] my-6 mx-[10px]">
                                    <div className="border-0 rounded-lg shadow-lg bg-white outline-none focus:outline-none">
                                        <div className="px-5 pt-5 border-solid border-blueGray-200 rounded-t">
                                            <h3 className="text-xl font-semibold flex justify-center">
                                                {
                                                    checkEditPositionStatus ?
                                                        <>
                                                            <img src="/check.gif" alt="Loading..." style={{ width: 150, height: 150, textAlign: 'center' }} />
                                                        </>
                                                        :
                                                        <>
                                                            <p className="text-black text-center font-semibold mb-5">Update Master Position</p>
                                                        </>
                                                }
                                            </h3>

                                            <div className="">
                                                {
                                                    checkEditPositionStatus ?
                                                        <>
                                                        </>
                                                        :
                                                        <>
                                                            <div className="grid grid-cols-12 sm:grid-cols-1 gap-4">
                                                                <div className="col-span-4">
                                                                    <div>
                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Position Desired</div>
                                                                        <input type="text" id="positionDesired" name="positionDesired" value={mPosition.positionDesired} maxLength={150} onChange={handleInputChangePosition} className="bg-gray-100 rounded-lg border-none text-sm mb-3 w-full" required />
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Property Age</div>
                                                                        <input type="text" id="propertyAge" name="propertyAge" value={mPosition.propertyAge} maxLength={50} onChange={handleInputChangePosition} className="bg-gray-100 rounded-lg border-none text-sm mb-3 w-full" required />
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Property Education</div>
                                                                        <input type="text" id="propertyEducation" name="propertyEducation" value={mPosition.propertyEducation} maxLength={150} onChange={handleInputChangePosition} className="bg-gray-100 rounded-lg border-none text-sm mb-3 w-full" required />
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-xs font-normal mb-[2px] text-gray-600">Property Experience</div>
                                                                        <input type="text" id="propertyExp" name="propertyExp" value={mPosition.propertyExp} maxLength={150} onChange={handleInputChangePosition} className="bg-gray-100 rounded-lg border-none text-sm mb-3 w-full" required />
                                                                    </div>

                                                                    <div className="grid grid-cols-12">
                                                                        <div className="col-span-5">
                                                                            <div className="text-xs font-normal mb-[2px] text-gray-600">Salary Min</div>
                                                                            <input type="text" id="salaryMin" name="salaryMin" value={mPosition.salaryMin === null ? '' : mPosition.salaryMin} maxLength={6} onChange={handleInputChangePosition} className="bg-gray-100 rounded-lg border-none text-sm mb-3 w-full" required />
                                                                        </div>

                                                                        <div className="col-span-1 text-center self-center">
                                                                            <div className="text-xs font-normal mb-[2px] text-gray-600">~</div>
                                                                        </div>

                                                                        <div className="col-span-5">
                                                                            <div className="text-xs font-normal mb-[2px] text-gray-600">Salary Max</div>
                                                                            <input type="text" id="salaryMax" name="salaryMax" value={mPosition.salaryMax === null ? '' : mPosition.salaryMax} maxLength={6} onChange={handleInputChangePosition} className="bg-gray-100 rounded-lg border-none text-sm mb-3 w-full" required />
                                                                        </div>

                                                                        <div className="col-span-1 text-center self-center">
                                                                            <div className="text-xs font-normal mb-[2px] text-gray-600">THB</div>
                                                                        </div>
                                                                    </div>

                                                                    <label className="switch mt-2">
                                                                        <input type="checkbox" checked={isCheckedPosition} onChange={handleTogglePosition} />
                                                                        <span className="slider"></span>
                                                                        {
                                                                            isCheckedPosition ?
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
                                                                </div>

                                                                <div className="col-span-4">
                                                                    <div>
                                                                        <div className="text-xs font-normal text-gray-600">Position Details
                                                                            {
                                                                                countPositionDetailNo >= 10 ?
                                                                                    <>
                                                                                        <IoIosAddCircle className="text-gray-500 inline-flex font-medium ml-2 w-[19px] h-[19px]" />
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        <IoIosAddCircle className="text-green-500 inline-flex font-medium ml-2 w-[19px] h-[19px]" onClick={addPositionDetails} />
                                                                                    </>
                                                                            }
                                                                        </div>
                                                                        {positionDetails.map((e: any, index: any) => (
                                                                            <Fragment key={index}>
                                                                                <input type="text" id="positionResponsibility" name="positionResponsibility" value={e.positionResponsibility} maxLength={100} onChange={(e) => handleChangeInputPositionDetails(e, index)} className="bg-gray-100 rounded-lg border-none text-sm mb-[29px] w-[90%]" required /><IoCloseCircle className="text-red-600 inline-flex font-medium ml-2 w-[19px] h-[19px]" onClick={() => removePositionDetails(index)} />
                                                                            </Fragment>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <div className="col-span-4">
                                                                    <div>
                                                                        <div className="text-xs font-normal text-gray-600">Position Other Details
                                                                            {
                                                                                countPositionOtherDetailNo >= 10 ?
                                                                                    <>
                                                                                        <IoIosAddCircle className="text-gray-500 inline-flex font-medium ml-2 w-[19px] h-[19px]" />
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        <IoIosAddCircle className="text-green-500 inline-flex font-medium ml-2 w-[19px] h-[19px]" onClick={addPositionOtherDetails} />
                                                                                    </>
                                                                            }
                                                                        </div>
                                                                        {positionOtherDetails.map((e: any, index: any) => (
                                                                            <Fragment key={index}>
                                                                                <input type="text" id="propertyOther" name="propertyOther" value={e.propertyOther} maxLength={100} onChange={(e) => handleChangeInputPositionOtherDetails(e, index)} className="bg-gray-100 rounded-lg border-none text-sm mb-[29px] w-[90%]" required /><IoCloseCircle className="text-red-600 inline-flex font-medium ml-2 w-[19px] h-[19px]" onClick={() => removePositionOtherDetails(index)} />
                                                                            </Fragment>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        {
                                            checkEditPositionStatus ?
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
                                                checkEditPositionStatus ?
                                                    <></>
                                                    :
                                                    <>
                                                        <button
                                                            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => editPosition(mPosition)}
                                                        >
                                                            Change!
                                                        </button>
                                                        <button
                                                            className="bg-gray-100 text-gray-500 active:bg-gray-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => closeModalPosition()}
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
                    showPositionDeleteModal ?
                        (<>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-[500px] my-6 mx-auto max-w-3xl">
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <div className="flex self-center px-5 pt-5 border-solid border-blueGray-200 rounded-t">
                                            <h3 className="text-xl font-semibold">
                                                {
                                                    checkDeletePositionStatus ?
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
                                                onClick={() => setShowPositionDeleteModal(false)}
                                            >
                                            </button>
                                        </div>
                                        <div className="relative px-8 py-4 flex-auto text-center">
                                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                {
                                                    checkDeletePositionStatus ?
                                                        <>
                                                            <p className="text-green-500 font-bold">
                                                                Delete success!
                                                            </p>
                                                        </>
                                                        :
                                                        <>
                                                            Do you want delete position : <b>{positionDelete.positionDesired}</b> ?
                                                        </>
                                                }
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-center p-6 border-solid border-blueGray-200 rounded-b">
                                            {
                                                checkDeletePositionStatus ?
                                                    <></>
                                                    :
                                                    <>
                                                        <button
                                                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => deletePosition(positionDelete.positionID)}
                                                        >
                                                            Delete!
                                                        </button>
                                                        <button
                                                            className="bg-gray-100 text-gray-500 active:bg-gray-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => setShowPositionDeleteModal(false)}
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

            </div>
        </>
    );
};

export default MasterPosition_Body;

