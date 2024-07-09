"use client";
import { useState } from "react";
import { PatchApplicationHeader } from "../actions/actionForm";

const Confirm_Body = ({ session, header }: any) => {

    const access_Token = session.accessToken;

    const headers = { 
        Authorization: `Bearer ${access_Token}`
    }

    const [formData, setformData] = useState({
        recruitmentID: header.recruitmentID,
        confirmAndSendEmail: header.confirmAndSendEmail,
        
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        formData.confirmAndSendEmail = true;
        PatchApplicationHeader(formData);
    };

    return (
        <>  
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-2 mt-4">
                    <div className="col-span-2 mt-1">
                        <p className="text-[12px] text-gray-700 mb-4">Application progress</p>
                        <ol className="text-[11px] font-normal text-gray-600">
                        <li className="mb-2 font-semibold flex">
                                <svg className="w-5 h-5 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <p className="ml-1">Personal details</p>
                            </li>
                            <li className="mb-2 font-semibold flex">
                                <svg className="w-5 h-5 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <p className="ml-1">Relationship and address</p>
                            </li>
                            <li className="mb-2 font-semibold flex">
                                <svg className="w-5 h-5 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <p className="ml-1">Education and work</p>
                            </li>
                            <li className="mb-2 font-semibold flex">
                                <svg className="w-5 h-5 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <p className="ml-1">Training and seminar</p>
                            </li>
                            <li className="mb-2 font-semibold flex">
                                <svg className="w-5 h-5 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <p className="ml-1">Language and ability</p>
                            </li>

                            <li className="mb-2 font-semibold flex">
                                <svg className="w-5 h-5 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <p className="ml-1">Question and references</p>
                            </li>

                            <li className="mb-2 font-semibold flex">
                                <svg className="w-5 h-5 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <p className="ml-1">Profile and attachment</p>
                            </li>

                            <li className="mb-2 font-semibold flex">
                                <svg className="w-5 h-5 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <p className="ml-1">Terms and conditions</p>
                            </li>
                        </ol>
                    </div>
                    <div className="col-span-10 ml-2">

                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-11">
                                <p className="text-[12px] font-normal text-gray-700 mt-1">When confirm information, You can&apos;t change data, Are you sure ?</p>
                            </div>

                            <div className="col-span-9">
                                <p className="text-[12px] font-normal inline-flex text-gray-700">เมื่อคุณยืนยันข้อมูล คุณจะไม่สามารถเปลี่ยนแปลงข้อมูลได้ แน่ใจหรือไม่</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 mt-6">
                            <div className="col-span-4 mr-2">
                                <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Confirm and send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
  
export default Confirm_Body;