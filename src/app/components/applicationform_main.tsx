"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import FormBody1 from "@/app/components/formstep1_body";
import FormBody2 from "@/app/components/formstep2_body";
import FormBody3 from "@/app/components/formstep3_body";
import FormBody4 from "@/app/components/formstep4_body";
import FormBody5 from "@/app/components/formstep5_body";
import FormBody6 from "@/app/components/formstep6_body";
import FormBody7 from "@/app/components/formstep7_body";
import Report from "@/app/components/application_report";
import ConfirmFormBody from "@/app/components/confirmstep_body";
import LastFormBody from "@/app/components/lastform_body";
import { GiHouse, GiWorld } from "react-icons/gi";
import { FaGraduationCap, FaRegIdCard, FaSignature, FaUserAlt, FaUserFriends, FaLocationArrow } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import axios from "axios";
import Loading from "../loading";
import useSWR from "swr";
import { Tabs, Tab } from "@nextui-org/react";
import Profile_Image from "./profile_image";
import ExcelJS from 'exceljs';
import { PatchApplicationHeader } from "../actions/actionForm";
import { MdSaveAs } from "react-icons/md";

const backPage = () => {
    window.location.href = "/main"
}

const home = () => {
    window.location.href = "/main"
}

const position = () => {
    window.location.href = "/main/master_position"
}

const education = () => {
    window.location.href = "/main/master_education"
}

const account = () => {
    window.location.href = "/main/account"
}

const ApplicationForm_Main = ({ session, params, header }: any) => {

    const access_Token = session.accessToken;

    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const fetcher = async (url: any) => {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${access_Token}` } });
        const data = await response.data;
        return data;
    };

    const [tabState, setTabState]: any = useState('S1');
    const [formData, setFormData]: any = useState({
        recruitmentID: '',
        trackingStatus: '',
        hr_SubmitStatus: header.hr_SubmitStatus,
        hr_StartingDate: header.hr_StartingDate,
    });

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);

    type children_new = {
        firstname: string,
        lastname: string,
        age: string,
        gender: string,
        occupation: string,
        recruitmentID: string,
    }

    type sibling_new = {
        firstname: string,
        lastname: string,
        age: string,
        gender: string,
        occupation: string,
        recruitmentID: string,
    }

    type education_new = {
        degreeobtained: string,
        eduFrom: Date,
        eduTo: Date,
        education: string,
        gpa: number,
        institute: string,
        major: string,
        recruitmentID: string,
    }

    type workexperience_new = {
        company: string,
        currentlyWorking: string,
        lastSalary: number,
        position: string,
        responsibility: string,
        reasonofLeaving: string,
        typeofBusiness: string,
        workExpFrom: Date,
        workExpTo: Date,
        recruitmentID: string,
    }

    type internship_new = {
        internshipCompany: string,
        internshipPosition: string,
        internshipTypeofBusiness: string,
        internshipExpFrom: Date,
        internshipExpTo: Date,
        recruitmentID: string,
    }

    type trainingseminar_new = {
        trainingCourse: string,
        trainingInstitute: string,
        trainingPeriod: number,
        trainingYear: Date,
        recruitmentID: string,
    }

    type certificate_new = {
        certificate: string,
        certificateDetail: string,
        recruitmentID: string,
    }

    const handleSubmitStatus = async (e: any) => {
        const { name, value } = e.target;
        if (name === 'hr_SubmitStatus') {
            if (value === 'Accept') {
                setFormData((prevData: any) => ({
                    ...prevData,
                    trackingStatus: 'AC',
                    hr_SubmitStatus: 'Accept',
                    hr_StartingDate: value,
                }));
            } else if (value === 'Reject') {
                setFormData((prevData: any) => ({
                    ...prevData,
                    trackingStatus: 'RE',
                    hr_SubmitStatus: 'Reject',
                    hr_StartingDate: null,
                }));
            } else {
                setFormData((prevData: any) => ({
                    ...prevData,
                    trackingStatus: 'R',
                    hr_SubmitStatus: null,
                    hr_StartingDate: null,
                }));
            }
        } else {
            setFormData((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmitTrackingStatus = async () => {
        formData.recruitmentID = params.id;
        if (formData.hr_SubmitStatus === 'Accept') {
            formData.trackingStatus = 'AC';
        } else if (formData.hr_SubmitStatus === 'Reject') {
            formData.trackingStatus = 'RE';
        } else {
            formData.trackingStatus = 'R';
        }
        await PatchApplicationHeader(formData);
    };

    const handleSubmitHRStatus = async () => {
        formData.recruitmentID = params.id;
        if (formData.hr_SubmitStatus === 'Accept' || formData.hr_SubmitStatus === 'Reject') {
            formData.hr_SubmitStatus_Date = new Date();
        } else {
            formData.hr_SubmitStatus_Date = null;;
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

    const { data, error, isValidating } = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/rms/admin/application/' + params.id, fetcher);


    if (error) return <div>Error fetching data</div>;
    if (!data) return <Loading />;

    const children_Data: children_new[] = data.rmsChildren.map((item: {
        detailID: number,
        firstname: string,
        lastname: string,
        age: number,
        gender: string,
        occupation: string,
        recruitmentID: string
    }) => ({
        firstname: item.firstname,
        lastname: item.lastname,
        age: item.age,
        gender: item.gender,
        occupation: item.occupation,
        recruitmentID: item.recruitmentID,
    }));
    data.rmsChildren = children_Data;

    const sibling_Data: sibling_new[] = data.rmsSibling.map((item: {
        detailID: number,
        firstname: string,
        lastname: string,
        age: number,
        gender: string,
        occupation: string,
        recruitmentID: string
    }) => ({
        firstname: item.firstname,
        lastname: item.lastname,
        age: item.age,
        gender: item.gender,
        occupation: item.occupation,
        recruitmentID: item.recruitmentID,
    }));
    data.rmsSibling = sibling_Data;

    const education_Data: education_new[] = data.rmsEducation.map((item: {
        detailID: number,
        degreeobtained: string;
        eduFrom: Date;
        eduTo: Date;
        education: string;
        gpa: number;
        institute: string;
        major: string;
        recruitmentID: string;
    }) => ({
        degreeobtained: item.degreeobtained,
        eduFrom: item.eduFrom,
        eduTo: item.eduTo,
        education: item.education,
        gpa: item.gpa,
        institute: item.institute,
        major: item.major,
        recruitmentID: item.recruitmentID,
    }));
    data.rmsEducation = education_Data;

    const workexperience_Data: workexperience_new[] = data.rmsWorkexperience.map((item: {
        detailID: number,
        company: string,
        currentlyWorking: string,
        lastSalary: number,
        position: string,
        responsibility: string,
        reasonofLeaving: string,
        typeofBusiness: string,
        workExpFrom: Date,
        workExpTo: Date,
        recruitmentID: string,
    }) => ({
        company: item.company,
        currentlyWorking: item.currentlyWorking,
        lastSalary: item.lastSalary,
        position: item.position,
        responsibility: item.responsibility,
        reasonofLeaving: item.reasonofLeaving,
        typeofBusiness: item.typeofBusiness,
        workExpFrom: item.workExpFrom,
        workExpTo: item.workExpTo,
        recruitmentID: item.recruitmentID,
    }));
    data.rmsWorkexperience = workexperience_Data;

    const internship_Data: internship_new[] = data.rmsInternship.map((item: {
        detailID: number,
        internshipCompany: string,
        internshipPosition: string,
        internshipTypeofBusiness: string,
        internshipExpFrom: Date,
        internshipExpTo: Date,
        recruitmentID: string,
    }) => ({
        internshipCompany: item.internshipCompany,
        internshipPosition: item.internshipPosition,
        internshipTypeofBusiness: item.internshipTypeofBusiness,
        internshipExpFrom: item.internshipExpFrom,
        internshipExpTo: item.internshipExpTo,
        recruitmentID: item.recruitmentID,
    }));
    data.rmsInternship = internship_Data;

    const trainingseminar_Data: trainingseminar_new[] = data.rmsTrainingseminar.map((item: {
        detailID: number,
        trainingCourse: string,
        trainingInstitute: string,
        trainingPeriod: number,
        trainingYear: Date,
        recruitmentID: string,
    }) => ({
        trainingCourse: item.trainingCourse,
        trainingInstitute: item.trainingInstitute,
        trainingPeriod: item.trainingPeriod,
        trainingYear: item.trainingYear,
        recruitmentID: item.recruitmentID,
    }));
    data.rmsTrainingseminar = trainingseminar_Data;

    const certificate_Data: certificate_new[] = data.rmsCertificate.map((item: {
        detailID: number,
        certificate: string,
        certificateDetail: string,
        recruitmentID: string,
    }) => ({
        certificate: item.certificate,
        certificateDetail: item.certificateDetail,
        recruitmentID: item.recruitmentID,
    }));
    data.rmsCertificate = certificate_Data;

    return (
        <>
            <div className="container mx-auto p-8">
                <nav className="bg-[#f5f5f7] border-gray-200 dark:bg-gray-900">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                        <div className="flex text-sm md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" header-dropdown-toggle="user-dropdown" header-dropdown-placement="bottom">
                            <div className="ml-0">
                                <button type="button" className="bg-purple-200 px-3 py-2 text-purple-700 hover:bg-purple-300 rounded-md font-medium text-xs text-center" onClick={backPage}>
                                    <svg className="w-6 h-6 inline-flex text-purple-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="1 1 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                                    </svg>
                                    <p className="pl-2 inline-flex">back</p>
                                </button>
                            </div>

                            <div className="px-2" onClick={handleSubmitTrackingStatus}>
                                <Report data={data} />
                            </div>

                            <div className="px-2 py-2">
                                <div className="text-xs font-normal inline-flex">application ticket / </div>
                                <div className="text-xs font-semibold inline-flex text-purple-700 pl-1">{params.id}</div>
                            </div>
                        </div>

                        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <button type="button" className="text-gray-800 font-medium text-xs py-2 text-center" onClick={home}>
                                Home
                            </button>
                            <div className="px-6"></div>
                            <button type="button" className="text-gray-800 font-medium text-xs py-2 text-center" onClick={position}>
                                Position
                            </button>
                            <div className="px-6"></div>
                            <button type="button" className="text-gray-800 font-medium text-xs py-2 text-center" onClick={education}>
                                Education
                            </button>
                            <div className="px-6"></div>
                            <button type="button" className="text-gray-800 font-medium text-xs py-2 text-center" onClick={account}>
                                Account
                            </button>
                            <div className="px-6"></div>
                            <button type="button" className="text-gray-800 font-medium text-xs py-2 text-center" onClick={() => signOut({ callbackUrl: 'http://localhost:3002' })}>
                                Sign out
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-3">
                        <div className="flex items-center px-5 py-4 text-gray-900 whitespace-nowrap dark:text-white">

                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div className="grid grid-cols-12">
                            <div className="col-span-6 text-center self-center bg-white border shadow-sm rounded-md px-1 py-6">
                                <Tabs
                                    aria-label="Options"
                                    variant="solid"
                                    radius="full"
                                    classNames={{
                                        tabList: "w-full relative rounded-md gap-0 p-0 border-divider hide-scrollbar",
                                        cursor: "w-full bg-[#7e3af2]",
                                        tab: "max-w-fit mx-[8px] h-9",
                                        tabContent: "group-data-[selected=true]:text-[#ffffff]"
                                    }}
                                    onSelectionChange={setTabState}
                                >
                                    <Tab
                                        key="S1"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[11px] font-semibold">STEP 1</span>
                                            </div>
                                        }
                                    />
                                    <Tab
                                        key="S2"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[11px] font-semibold">STEP 2</span>
                                            </div>
                                        }
                                    />
                                    <Tab
                                        key="S3"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[11px] font-semibold">STEP 3</span>
                                            </div>
                                        }
                                    />
                                    <Tab
                                        key="S4"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[11px] font-semibold">STEP 4</span>
                                            </div>
                                        }
                                    />
                                    <Tab
                                        key="S5"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[11px] font-semibold">STEP 5</span>
                                            </div>
                                        }
                                    />
                                    <Tab
                                        key="S6"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[11px] font-semibold">STEP 6</span>
                                            </div>
                                        }
                                    />
                                    <Tab
                                        key="S7"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[11px] font-semibold">STEP 7</span>
                                            </div>
                                        }
                                    />
                                </Tabs>
                            </div>

                            <div className="col-span-1"></div>
                            <div className="col-span-5 text-center self-center bg-white border shadow-sm rounded-md px-4 py-3">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-4">
                                        <p className="text-xs font-bold text-left text-purple-600">Result</p>
                                        <select id="hr_SubmitStatus" name="hr_SubmitStatus" value={formData.hr_SubmitStatus === null ? '' : formData.hr_SubmitStatus} className="input-formcontrol-custom" onChange={handleSubmitStatus} required>
                                            <option value="">Select</option>
                                            <option value="Accept">Accept</option>
                                            <option value="Reject">Reject</option>
                                        </select>
                                    </div>

                                    <div className="col-span-5 ml-4">
                                        <p className="text-xs font-bold text-left text-purple-600">Actual Starting Date</p>
                                        {
                                            formData.hr_SubmitStatus === 'Accept' ?
                                            <>
                                                <input type="date" id="hr_StartingDate" name="hr_StartingDate" value={formData.hr_StartingDate === null ? '' : formData.hr_StartingDate} onChange={handleSubmitStatus} className="input-formcontrol" required />
                                            </>
                                            :
                                            <>
                                                <input type="date" id="hr_StartingDate" name="hr_StartingDate" value="" className="input-formcontrol" disabled />
                                            </>
                                        }
                                    </div>

                                    <div className="col-span-3 ml-4">
                                        <p className="text-xs font-bold text-left text-purple-600">&nbsp;</p>
                                        <button type="button" className="btn btn-purple w-full" onClick={() => handleSubmitHRStatus()}>Save<MdSaveAs className="inline-flex ms-1" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-2">

                </div>


                <div className="grid grid-cols-12 gap-2">
                    {/* <div className="col-span-2">
                    <div className="flex items-center pl-5 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <Image style={{ borderRadius: 15, width: 115, height: 140 }} src={data.imageBase64} alt="Jese image" width={0} height={0} />
                    </div>
                </div> */}
                    <div className="col-span-12">
                        <div className="grid grid-cols-12 gap-2 pl-3 pr-5 py-1 mt-4 border-l-[6px] border-purple-800">
                            <div className="col-span-12">
                                {
                                    tabState === 'S1' ?
                                        <>
                                            <p className="text-sm text-purple-700 font-bold">PERSONAL DETAILS</p>
                                        </>
                                        :
                                        tabState === 'S2' ?
                                            <>
                                                <p className="text-sm text-purple-700 font-bold">RELATIONSHIP AND ADDRESS</p>
                                            </>
                                            :
                                            tabState === 'S3' ?
                                                <>
                                                    <p className="text-sm text-purple-700 font-bold">EDUCATION AND WORKEXPERIENCE</p>
                                                </>
                                                :
                                                tabState === 'S4' ?
                                                    <>
                                                        <p className="text-sm text-purple-700 font-bold">TRAINING AND SEMINAR</p>
                                                    </>
                                                    :
                                                    tabState === 'S5' ?
                                                        <>
                                                            <p className="text-sm text-purple-700 font-bold">LANGUAGE AND ABILITY</p>
                                                        </>
                                                        :
                                                        tabState === 'S6' ?
                                                            <>
                                                                <p className="text-sm text-purple-700 font-bold">QUESTION AND REFERENCES</p>
                                                            </>
                                                            :
                                                            tabState === 'S7' ?
                                                                <>
                                                                    <p className="text-sm text-purple-700 font-bold">PROFILE AND ATTACHMENT</p>
                                                                </>
                                                                :
                                                                <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-2 gap-2 mt-4 bg-white py-6 border shadow-sm rounded-md">
                    <div className="col-span-12 sm:col-span-2 px-5 sm:ml-0">
                        {
                            tabState === 'S1' ?
                                <>
                                    <FormBody1 session={session} header={data} />
                                </>
                                :
                                tabState === 'S2' ?
                                    <>
                                        <FormBody2 session={session} header={data} />
                                    </>
                                    :
                                    tabState === 'S3' ?
                                        <>
                                            <FormBody3 session={session} header={data} />
                                        </>
                                        :
                                        tabState === 'S4' ?
                                            <>
                                                <FormBody4 session={session} header={data} />
                                            </>
                                            :
                                            tabState === 'S5' ?
                                                <>
                                                    <FormBody5 session={session} header={data} />
                                                </>
                                                :
                                                tabState === 'S6' ?
                                                    <>
                                                        <FormBody6 session={session} header={data} />
                                                    </>
                                                    :
                                                    tabState === 'S7' ?
                                                        <>
                                                            <FormBody7 session={session} header={data} />
                                                        </>
                                                        :
                                                        <></>
                        }
                    </div>
                </div>
            </div>

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
                                                        <img src="/check.gif" alt="Loading..." style={{ width: 150, height: 150 }} />
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
                                                        <img src="/error.gif" alt="Loading..." style={{ width: 100, height: 100 }} />
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

export default ApplicationForm_Main;