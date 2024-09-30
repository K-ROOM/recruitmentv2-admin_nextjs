"use client";
import Image from "next/image";
import { useState } from "react";
import { DownloadApplicationFileupload } from "../actions/actionForm";
import axios from "axios";

const Form7_Body = ({ session, header }: any) => {

    const [formData, setformData] = useState({
        recruitmentID: header.recruitmentID,
        image_FileName: header.image_FileName,
        toeic_FileName: header.toeic_FileName,
        ielts_FileName: header.ielts_FileName,
        other_FileName: header.other_FileName,
        resume_FileName: header.resume_FileName,
        imageBase64: header.imageBase64,
    });

    const downloadFile = async (recruitmentID: any, filename: any, filetype: any) => {
        const access_Token = session.accessToken;
        const headers = {
            Authorization: `Bearer ${access_Token}`,
        }
        const response = await axios.get(process.env.NEXT_PUBLIC_API_KEY + '/rms/download/' + recruitmentID + '/' + filename + '/' + filetype, { headers, responseType: 'blob' });
        const fileName = filename;
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
    };

    return (
        <>
            <div className="col-span-10 mt-1">
                <div className="grid grid-cols-12 gap-2">
                    {
                        formData.image_FileName !== '' && formData.image_FileName !== null ?
                            <>
                                <div className="col-span-3 mr-2">
                                    <Image style={{ borderRadius: 15 }} src={formData.imageBase64} alt="Jese image" width={135} height={165} />
                                </div>
                            </>
                            :
                            <>
                                <div className="col-span-3 mr-2"></div>
                            </>
                    }

                    <div className="col-span-9">
                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-5">
                                <p className="text-title">TOEIC Certificate</p>
                                {
                                    formData.toeic_FileName !== '' && formData.toeic_FileName !== null ?
                                        <>
                                            <button type="button" onClick={() => downloadFile(formData.recruitmentID, formData.toeic_FileName, 'TOEIC')} className="text-white bg-purple-700 hover:bg-purple-800 mt-2 focus:outline-none font-medium rounded text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                                <svg className="w-4 h-4 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                                </svg>
                                                Download
                                            </button>
                                        </>
                                        :
                                        <>
                                            <button type="button" onClick={() => downloadFile(formData.recruitmentID, formData.toeic_FileName, 'TOEIC')} className="text-white cursor-no-drop bg-gray-500 mt-2 focus:outline-none font-medium rounded text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" disabled>
                                                <svg className="w-4 h-4 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                                </svg>
                                                Download
                                            </button>
                                        </>
                                }
                            </div>
                            <div className="col-span-5">
                                <p className="text-title">IELTS Certificate</p>
                                {
                                    formData.ielts_FileName !== '' && formData.ielts_FileName !== null ?
                                        <>
                                            <button type="button" onClick={() => downloadFile(formData.recruitmentID, formData.toeic_FileName, 'IELTS')} className="text-white bg-purple-700 hover:bg-purple-800 mt-2 focus:outline-none font-medium rounded text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                                <svg className="w-4 h-4 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                                </svg>
                                                Download
                                            </button>
                                        </>
                                        :
                                        <>
                                            <button type="button" onClick={() => downloadFile(formData.recruitmentID, formData.toeic_FileName, 'IELTS')} className="text-white cursor-no-drop bg-gray-500 mt-2 focus:outline-none font-medium rounded text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" disabled>
                                                <svg className="w-4 h-4 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                                </svg>
                                                Download
                                            </button>
                                        </>
                                }
                            </div>
                            <div className="col-span-2"></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-3"></div>
                    <div className="col-span-9">
                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-5">
                                <p className="text-title">OTHER Certificate</p>
                                {
                                    formData.other_FileName !== '' && formData.other_FileName !== null ?
                                        <>
                                            <button type="button" onClick={() => downloadFile(formData.recruitmentID, formData.toeic_FileName, 'OTHER')} className="text-white bg-purple-700 hover:bg-purple-800 mt-2 focus:outline-none font-medium rounded text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                                <svg className="w-4 h-4 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                                </svg>
                                                Download
                                            </button>
                                        </>
                                        :
                                        <>
                                            <button type="button" onClick={() => downloadFile(formData.recruitmentID, formData.toeic_FileName, 'OTHER')} className="text-white cursor-no-drop bg-gray-500 mt-2 focus:outline-none font-medium rounded text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" disabled>
                                                <svg className="w-4 h-4 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                                </svg>
                                                Download
                                            </button>
                                        </>
                                }
                            </div>
                            <div className="col-span-5">
                                <p className="text-title">RESUME</p>
                                {
                                    formData.resume_FileName !== '' && formData.resume_FileName !== null ?
                                        <>
                                            <button type="button" onClick={() => downloadFile(formData.recruitmentID, formData.toeic_FileName, 'RESUME')} className="text-white bg-purple-700 hover:bg-purple-800 mt-2 focus:outline-none font-medium rounded text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                                <svg className="w-4 h-4 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                                </svg>
                                                Download
                                            </button>
                                        </>
                                        :
                                        <>
                                            <button type="button" onClick={() => downloadFile(formData.recruitmentID, formData.toeic_FileName, 'RESUME')} className="text-white cursor-no-drop bg-gray-500 mt-2 focus:outline-none font-medium rounded text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" disabled>
                                                <svg className="w-4 h-4 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                                </svg>
                                                Download
                                            </button>
                                        </>
                                }
                            </div>
                            <div className="col-span-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Form7_Body;