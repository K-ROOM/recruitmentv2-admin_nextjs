"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import useSWR from "swr";
import { PatchApplicationHeader } from "../actions/actionForm";
import moment from "moment";
import { MdSaveAs } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";

const Form5_Body = ({ session, header }: any) => {

    const access_Token = session.accessToken;

    const [formData, setformData] = useState({
        recruitmentID: header.recruitmentID,
        interestsandHobbies: header.interestsandHobbies,
        listeningTH: header.listeningTH,
        speakingTH: header.speakingTH,
        readingTH: header.readingTH,
        writingTH: header.writingTH,
        listeningEN: header.listeningEN,
        speakingEN: header.speakingEN,
        readingEN: header.readingEN,
        writingEN: header.writingEN,
        languageOTH: header.languageOTH,
        listeningOTH: header.listeningOTH,
        speakingOTH: header.speakingOTH,
        readingOTH: header.readingOTH,
        writingOTH: header.writingOTH,
        toeicScore: header.toeicScore,
        ieltsScore: header.ieltsScore,
        otherLanguageTest: header.otherLanguageTest,
        msword: header.msword,
        msexcel: header.msexcel,
        mspowerpoint: header.mspowerpoint,
        chkcar1: header.chkcar1,
        chkcar2: header.chkcar2,
        chkcar3: header.chkcar3,
        carLicenseno: header.carLicenseno,
        carIssuesDate: header.carIssuesDate,
        carExpiredDate: header.carExpiredDate,
        chkMotorcycle1: header.chkMotorcycle1,
        chkMotorcycle2: header.chkMotorcycle2,
        chkMotorcycle3: header.chkMotorcycle3,
        motorcycleLicenseno: header.motorcycleLicenseno,
        motorcycleIssuesDate: header.motorcycleIssuesDate,
        motorcycleExpiredDate: header.motorcycleExpiredDate,
        trackingStatus: header.trackingStatus,
        hr_SubmitStatus: header.hr_SubmitStatus,
    });

    const [fileData, setFileData] = useState({
        image_FileName: header.image_FileName,
        toeic_FileName: header.toeic_FileName,
        ielts_FileName: header.ielts_FileName,
        other_FileName: header.other_FileName,
        resume_FileName: header.resume_FileName,
        imageBase64: header.imageBase64,
    })

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

    const [textInputToeicScore, setTextInputToeicScore] = useState(header.toeicScore);
    const [textInputIeltsScore, setTextInputIeltsScore] = useState(header.ieltsScore);

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);

    const handleChangeHeader = (e: any) => {
        const { name, value } = e.target;
        const inputText = e.target.value;
        const numbersOnly = inputText.replaceAll(/[^\d.]/g, '');
        const numbersOnly1 = inputText.replaceAll(/\D/g, '');
        if (name === 'toeicScore') {
            setTextInputToeicScore(numbersOnly);
            if (value !== '' || value !== null) {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: numbersOnly,
                }));
            }
        }
        if (name === 'ieltsScore') {
            setTextInputIeltsScore(numbersOnly);
            if (value !== '' || value !== null) {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: numbersOnly,
                }));
            }
        } else {
            setformData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        if (name === 'otherLanguageTest') {
            if (value === 'IELTS') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else {
                setformData((prevData) => ({
                    ...prevData,
                    ieltsScore: null,
                }));
            }
        }

        if (name === 'driving') {
            if (value === 'N') {
                formData.chkcar1 = null;
                formData.chkcar2 = null;
                formData.chkcar3 = null;
                formData.carLicenseno = null;
                formData.carIssuesDate = null;
                formData.carExpiredDate = null;
                formData.chkMotorcycle1 = null;
                formData.chkMotorcycle2 = null;
                formData.chkMotorcycle3 = null;
                formData.motorcycleLicenseno = null;
                formData.motorcycleIssuesDate = null;
                formData.motorcycleExpiredDate = null;
            }
        }
        if (name === 'carLicenseno') {
            setformData((prevData) => ({
                ...prevData,
                [name]: numbersOnly1,
            }));
        } else if (name === 'motorcycleLicenseno') {
            setformData((prevData) => ({
                ...prevData,
                [name]: numbersOnly1,
            }));
        } else {
            setformData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (formData.toeicScore === '') {
            formData.toeicScore = null;
        }
        if (formData.ieltsScore === '') {
            formData.ieltsScore = null;
        }
        if (formData.otherLanguageTest === '') {
            formData.otherLanguageTest = null;
        }

        if (formData.hr_SubmitStatus === 'Accept') {
            formData.trackingStatus = 'AC';
        } else if (formData.hr_SubmitStatus === 'Reject') {
            formData.trackingStatus = 'RE';
        } else {
            formData.trackingStatus = 'R';
        }

        try {
            await PatchApplicationHeader(formData);
            setShowSubmitModal(true);
            setSubmitStatus(true);
            setTimeout(() => {
                setShowSubmitModal(false);
            }, 3000)
        } catch (err) {
            setShowSubmitModal(true);
            setSubmitStatus(false);
            setTimeout(() => {
                setShowSubmitModal(false);
            }, 3000)
        }
    };

    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const fetcherMasterLanguageTest = async (url: any) => {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${access_Token}` } });
        const data = await response.data;
        return data;
    };

    const { data, error }: any = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/master_languageTest', fetcherMasterLanguageTest);

    if (error) return <div>Error fetching data</div>;
    if (!data) return <div></div>;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="col-span-10">
                    <div className="grid grid-cols-12 mb-6 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-purple-100 border-purple-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Applicant language ability and hobbies</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 mr-2">
                        <div className="col-span-8">
                            <p className="text-title">Interests and Hobbies</p>
                            <input type="text" id="interestsandHobbies" name="interestsandHobbies" value={formData.interestsandHobbies} onChange={handleChangeHeader} className="input-formcontrol" />
                        </div>
                    </div>

                    {/* <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Language<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                            <input type="text" id="" name="" value="Thai" className="input-formcontrol cursor-no-drop" disabled />
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Listening</p>
                            <select id="listeningTH" name="listeningTH" value={formData.listeningTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Speaking</p>
                            <select id="speakingTH" name="speakingTH" value={formData.speakingTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Reading</p>
                            <select id="readingTH" name="readingTH" value={formData.readingTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Writing</p>
                            <select id="writingTH" name="writingTH" value={formData.writingTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                        </div>
                    </div> */}

                    <div className="grid grid-cols-12 mt-6 gap-2">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Language<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                            <input type="text" id="" name="" value="English" className="input-formcontrol cursor-no-drop" disabled />
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Listening</p>
                            <select id="listeningEN" name="listeningEN" value={formData.listeningEN} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Speaking</p>
                            <select id="speakingEN" name="speakingEN" value={formData.speakingEN} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Reading</p>
                            <select id="readingEN" name="readingEN" value={formData.readingEN} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Writing</p>
                            <select id="writingEN" name="writingEN" value={formData.writingEN} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mt-6 gap-2">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Language</p>
                            <input type="text" id="languageOTH" name="languageOTH" value={formData.languageOTH} className="input-formcontrol" onChange={handleChangeHeader} />
                        </div>

                        {
                            formData.languageOTH !== null && formData.languageOTH !== '' ?
                                <>
                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Listening</p>
                                        <select id="listeningOTH" name="listeningOTH" value={formData.listeningOTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Speaking</p>
                                        <select id="speakingOTH" name="speakingOTH" value={formData.speakingOTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Reading</p>
                                        <select id="readingOTH" name="readingOTH" value={formData.readingOTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Writing</p>
                                        <select id="writingOTH" name="writingOTH" value={formData.writingOTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Listening<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <select id="listeningOTH" name="listeningOTH" value={formData.listeningOTH} className="input-formcontrol cursor-no-drop px-2" onChange={handleChangeHeader} disabled>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Speaking<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <select id="speakingOTH" name="speakingOTH" value={formData.speakingOTH} className="input-formcontrol cursor-no-drop px-2" onChange={handleChangeHeader} disabled>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Reading<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <select id="readingOTH" name="readingOTH" value={formData.readingOTH} className="input-formcontrol cursor-no-drop px-2" onChange={handleChangeHeader} disabled>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Writing<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <select id="writingOTH" name="writingOTH" value={formData.writingOTH} className="input-formcontrol cursor-no-drop px-2" onChange={handleChangeHeader} disabled>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                    </div>
                                </>
                        }
                    </div>

                    <div className="grid grid-cols-12 my-6 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-purple-100 border-purple-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Applicant language test</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Language Test<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                            <input type="text" id="" name="" value="TOEIC" maxLength={6} className="input-formcontrol cursor-no-drop" disabled />
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Score</p>
                            <input type="text" id="toeicScore" name="toeicScore" value={textInputToeicScore} maxLength={3} onChange={handleChangeHeader} className="input-formcontrol" />
                        </div>

                        <div className="col-span-2 mr-2">
                            {
                                fileData.toeic_FileName !== '' && fileData.toeic_FileName !== null ?
                                    <>
                                        <button type="button" onClick={() => downloadFile(formData.recruitmentID, fileData.toeic_FileName, 'TOEIC')} className=" text-white bg-purple-700 hover:bg-purple-800 mt-5 focus:outline-none font-medium rounded text-xs p-2.5 text-center inline-flex items-center me-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                            <svg className="w-4 h-4 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                            </svg>
                                            Download
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button type="button" onClick={() => downloadFile(formData.recruitmentID, fileData.toeic_FileName, 'TOEIC')} className="text-white cursor-no-drop bg-gray-500 mt-5 focus:outline-none font-medium rounded text-xs p-2.5 text-center inline-flex items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" disabled>
                                            <svg className="w-4 h-4 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                            </svg>
                                            Download
                                        </button>
                                    </>
                            }
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Language Test</p>
                            <select id="otherLanguageTest" name="otherLanguageTest" className="input-formcontrol px-2" value={formData.otherLanguageTest} onChange={handleChangeHeader}>
                                <option value="">SELECT</option>
                                {data.map((item: any) => (
                                    <option key={item.languageTest} value={item.languageTest}>
                                        {item.languageTest}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-2 mr-2">
                            {
                                formData.otherLanguageTest === 'IELTS' ?
                                    <>
                                        <p className="text-title">Score</p>
                                        <input type="text" id="ieltsScore" name="ieltsScore" value={textInputIeltsScore} maxLength={3} onChange={handleChangeHeader} className="input-formcontrol" required />
                                    </>
                                    :
                                    <>
                                        <p className="text-title">Score<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <input type="text" id="ieltsScore" name="ieltsScore" value="" maxLength={3} onChange={handleChangeHeader} className="input-formcontrol cursor-no-drop" disabled />
                                    </>
                            }
                        </div>

                        <div className="col-span-2 mr-2">
                            {
                                formData.otherLanguageTest === 'IELTS' ?
                                    <>
                                        {
                                            fileData.ielts_FileName !== '' && fileData.ielts_FileName !== null ?
                                                <>
                                                    <button type="button" onClick={() => downloadFile(formData.recruitmentID, fileData.toeic_FileName, 'IELTS')} className="text-white bg-purple-700 hover:bg-purple-800 mt-5 focus:outline-none font-medium rounded text-xs p-2.5 text-center inline-flex items-center me-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                                        <svg className="w-4 h-4 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                                        </svg>
                                                        Download
                                                    </button>
                                                </>
                                                :
                                                <>
                                                    <button type="button" onClick={() => downloadFile(formData.recruitmentID, fileData.toeic_FileName, 'IELTS')} className="text-white cursor-no-drop bg-gray-500 mt-5 focus:outline-none font-medium rounded text-xs p-2.5 text-center inline-flex items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" disabled>
                                                        <svg className="w-4 h-4 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                                        </svg>
                                                        Download
                                                    </button>
                                                </>
                                        }
                                    </>
                                    :
                                    <>
                                        {
                                            fileData.other_FileName !== '' && fileData.other_FileName !== null ?
                                                <>
                                                    <button type="button" onClick={() => downloadFile(formData.recruitmentID, fileData.toeic_FileName, 'OTHER')} className="text-white bg-purple-700 hover:bg-purple-800 mt-5 focus:outline-none font-medium rounded text-xs p-2.5 text-center inline-flex items-center me-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                                        <svg className="w-4 h-4 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                                        </svg>
                                                        Download
                                                    </button>
                                                </>
                                                :
                                                <>
                                                    <button type="button" onClick={() => downloadFile(formData.recruitmentID, fileData.toeic_FileName, 'OTHER')} className="text-white cursor-no-drop bg-gray-500 mt-5 focus:outline-none font-medium rounded text-xs p-2.5 text-center inline-flex items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" disabled>
                                                        <svg className="w-4 h-4 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                                        </svg>
                                                        Download
                                                    </button>
                                                </>
                                        }
                                    </>
                            }
                        </div>
                    </div>

                    <div className="grid grid-cols-12 my-6 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-purple-100 border-purple-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Applicant software ability</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6 mr-2">
                        <div className="col-span-3">
                            <p className="text-title">Software Ability<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                            <input type="text" id="" name="" value="Microsoft Word" className="input-formcontrol cursor-no-drop" disabled />
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Level</p>
                            <select id="msword" name="msword" value={formData.msword} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="B">Basic / พื้นฐาน</option>
                                <option value="I">Intermediate / ระดับกลาง</option>
                                <option value="A">Advanced / ขั้นสูง </option>
                                <option value="AAT">Advanced and able to training to other / ขั้นสูงและสอนคนอื่นได้</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6 mr-2">
                        <div className="col-span-3">
                            <p className="text-title">Software Ability<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                            <input type="text" id="" name="" value="Microsoft Excel" className="input-formcontrol cursor-no-drop" disabled />
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Level</p>
                            <select id="msexcel" name="msexcel" value={formData.msexcel} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="B">Basic / พื้นฐาน</option>
                                <option value="I">Intermediate / ระดับกลาง</option>
                                <option value="A">Advanced / ขั้นสูง </option>
                                <option value="AAT">Advanced and able to training to other / ขั้นสูงและสอนคนอื่นได้</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6 mr-2">
                        <div className="col-span-3">
                            <p className="text-title">Software Ability<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                            <input type="text" id="" name="" value="Microsoft PowerPoint" className="input-formcontrol cursor-no-drop" disabled />
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Level</p>
                            <select id="mspowerpoint" name="mspowerpoint" value={formData.mspowerpoint} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="B">Basic / พื้นฐาน</option>
                                <option value="I">Intermediate / ระดับกลาง</option>
                                <option value="A">Advanced / ขั้นสูง </option>
                                <option value="AAT">Advanced and able to training to other / ขั้นสูงและสอนคนอื่นได้</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 my-6 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-purple-100 border-purple-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Applicant car details</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mt-4 gap-2">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Driving can be</p>
                            <select id="chkcar1" name="chkcar1" value={formData.chkcar1} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Yes / ใช่</option>
                                <option value="N">No / ไม่ใช่</option>
                            </select>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Have a license</p>
                            <select id="chkcar2" name="chkcar2" value={formData.chkcar2} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Have / มี</option>
                                <option value="N">Do not have / ไม่มี</option>
                            </select>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Have a vehicle</p>
                            <select id="chkcar3" name="chkcar3" value={formData.chkcar3} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Have / มี</option>
                                <option value="N">Do not have / ไม่มี</option>
                            </select>
                        </div>

                        {
                            formData.chkcar2 === "Y" ?
                                <>
                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">License No</p>
                                        <input type="text" id="carLicenseno" name="carLicenseno" value={formData.carLicenseno} maxLength={8} className="input-formcontrol" onChange={handleChangeHeader} required />
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Issues Date</p>
                                        <input type="date" id="carIssuesDate" name="carIssuesDate" value={formData.carIssuesDate} className="input-formcontrol" onChange={handleChangeHeader} required />
                                    </div>

                                    <div className="col-span-2">
                                        <p className="text-title">Expired Date</p>
                                        <input type="date" id="carExpiredDate" name="carExpiredDate" value={formData.carExpiredDate} className="input-formcontrol" onChange={handleChangeHeader} required />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">License No<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <input type="text" id="carLicenseno" name="carLicenseno" value={formData.carLicenseno} className="input-formcontrol cursor-no-drop" disabled />
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Issues Date<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <input type="date" id="carIssuesDate" name="carIssuesDate" value={formData.carIssuesDate} className="input-formcontrol cursor-no-drop" disabled />
                                    </div>

                                    <div className="col-span-2">
                                        <p className="text-title">Expired Date<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <input type="date" id="carExpiredDate" name="carExpiredDate" value={formData.carExpiredDate} className="input-formcontrol cursor-no-drop" disabled />
                                    </div>
                                </>
                        }
                    </div>

                    <div className="grid grid-cols-12 my-6 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-purple-100 border-purple-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Applicant motorcycle details</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mt-4 gap-2">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Driving can be</p>
                            <select id="chkMotorcycle1" name="chkMotorcycle1" value={formData.chkMotorcycle1} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Yes / ใช่</option>
                                <option value="N">No / ไม่ใช่</option>
                            </select>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Have a license</p>
                            <select id="chkMotorcycle2" name="chkMotorcycle2" value={formData.chkMotorcycle2} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Have / มี</option>
                                <option value="N">Do not have / ไม่มี</option>
                            </select>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Have a vehicle</p>
                            <select id="chkMotorcycle3" name="chkMotorcycle3" value={formData.chkMotorcycle3} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Have / มี</option>
                                <option value="N">Do not have / ไม่มี</option>
                            </select>
                        </div>

                        {
                            formData.chkMotorcycle2 === "Y" ?
                                <>
                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">License No</p>
                                        <input type="text" id="motorcycleLicenseno" name="motorcycleLicenseno" value={formData.motorcycleLicenseno} maxLength={8} className="input-formcontrol" onChange={handleChangeHeader} required />
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Issues Date</p>
                                        <input type="date" id="motorcycleIssuesDate" name="motorcycleIssuesDate" value={formData.motorcycleIssuesDate} className="input-formcontrol" onChange={handleChangeHeader} required />
                                    </div>

                                    <div className="col-span-2">
                                        <p className="text-title">Expired Date</p>
                                        <input type="date" id="motorcycleExpiredDate" name="motorcycleExpiredDate" value={formData.motorcycleExpiredDate} className="input-formcontrol" onChange={handleChangeHeader} required />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">License No<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <input type="text" id="motorcycleLicenseno" name="motorcycleLicenseno" value={formData.motorcycleLicenseno} className="input-formcontrol cursor-no-drop" disabled />
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Issues Date<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <input type="date" id="motorcycleIssuesDate" name="motorcycleIssuesDate" value={formData.motorcycleIssuesDate} className="input-formcontrol cursor-no-drop" disabled />
                                    </div>

                                    <div className="col-span-2">
                                        <p className="text-title">Expired Date<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <input type="date" id="motorcycleExpiredDate" name="motorcycleExpiredDate" value={formData.motorcycleExpiredDate} className="input-formcontrol cursor-no-drop" disabled />
                                    </div>
                                </>
                        }
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-12 mr-2">
                            <button type="submit" className="btn btn-purple">Save<MdSaveAs className="inline-flex ms-2" /></button>
                        </div>
                    </div>
                </div>
            </form>

            {
                showSubmitModal ?
                    (<>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-[500px] my-6 mx-auto max-w-3xl">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {
                                        submitStatus ?
                                            <>
                                                <div className="flex self-center px-5 pt-5 border-solid border-blueGray-200 rounded-t">
                                                    <h3 className="text-xl font-semibold">
                                                        <Image src="/check.gif" alt="Loading..." width={150} height={150} />
                                                    </h3>
                                                </div>
                                                <div className="relative px-8 pt-4 pb-8 flex-auto text-center">
                                                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                        <p className="text-green-500 font-bold">
                                                            บันทึกสำเร็จ!
                                                        </p>
                                                    </p>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="flex self-center px-5 pt-9 pb-6 border-solid border-blueGray-200 rounded-t">
                                                    <h3 className="text-xl font-semibold">
                                                        <Image src="/error.gif" alt="Loading..." width={100} height={100} />
                                                    </h3>
                                                </div>
                                                <div className="relative px-8 pt-4 pb-8 flex-auto text-center">
                                                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                        <p className="text-red-600 font-bold">
                                                            บันทึกล้มเหลว โปรดลองอีกครั้ง!
                                                        </p>
                                                    </p>
                                                </div>
                                            </>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>)
                    :
                    null
            }
        </>
    );
};

export default Form5_Body;