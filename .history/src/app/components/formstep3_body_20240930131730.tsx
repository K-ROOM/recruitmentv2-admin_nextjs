"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import useSWR from "swr";
import { PostAndPatchApplicationEducationAndWorkExperience } from "../actions/actionForm";
import moment from "moment";
import { MdSaveAs } from "react-icons/md";
import { FaCirclePlus, FaCircleXmark } from "react-icons/fa6";

const Form3_Body = ({ session, header }: any) => {

    const access_Token = session.accessToken;

    const [formData, setformData] = useState({
        recruitmentID: header.recruitmentID,
        educationNo: header.educationNo,
        newGraduate: header.newGraduate,
        workExperienceNo: header.workExperienceNo,
        internship: header.internship,
        internshipNo: header.internshipNo,
        trackingStatus: header.trackingStatus,
        presentJobOrProject: header.presentJobOrProject,
        hr_SubmitStatus: header.hr_SubmitStatus,
    });

    const [countEducationNo, setCountEducationNo] = useState(header.educationNo);
    const [educationDetails, setEducationDetails] = useState(header.rmsEducation);
    const [countWorkExperienceNo, setCountWorkExperienceNo] = useState(header.workExperienceNo);
    const [workExperienceDetails, setWorkExperienceDetails] = useState(header.rmsWorkexperience);
    const [countInternshipNo, setCountInternshipNo] = useState(header.internshipNo);
    const [internshipDetails, setInternshipDetails] = useState(header.rmsInternship);

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);

    const addEducation = () => {
        setEducationDetails((educationDetails: any) => [...educationDetails,
        {
            degreeobtained: '',
            eduFrom: '',
            eduTo: '',
            education: '',
            gpa: '',
            institute: '',
            major: '',
            recruitmentID: header.recruitmentID,
        }]);
        let prevCount = 1;
        setCountEducationNo((prevCount: any) => prevCount + 1);
    }

    const removeEducation = (index: any) => {
        setEducationDetails((educationDetails: any[]) => {
            return educationDetails.filter((_, i) => i !== index)
        })
        setCountEducationNo((prevCount: any) => prevCount - 1);
    }

    const addWorkExperience = () => {
        setWorkExperienceDetails((workExperienceDetails: any) => [...workExperienceDetails,
        {
            company: '',
            currentlyWorking: '',
            lastSalary: '',
            position: '',
            responsibility: '',
            reasonofLeaving: '',
            typeofBusiness: '',
            workExpFrom: '',
            workExpTo: '',
            recruitmentID: header.recruitmentID,
        }]);
        let prevCount = 1;
        setCountWorkExperienceNo((prevCount: any) => prevCount + 1);
    }

    const removeWorkExperience = (index: any) => {
        setWorkExperienceDetails((workExperienceDetails: any[]) => {
            return workExperienceDetails.filter((_, i) => i !== index)
        })
        setCountWorkExperienceNo((prevCount: any) => prevCount - 1);
    }

    const addInternship = () => {
        setInternshipDetails((internshipDetails: any) => [...internshipDetails,
        {
            internshipCompany: '',
            internshipPosition: '',
            internshipTypeofBusiness: '',
            internshipExpFrom: '',
            internshipExpTo: '',
            recruitmentID: header.recruitmentID,
        }]);
        let prevCount = 1;
        setCountInternshipNo((prevCount: any) => prevCount + 1);
    }

    const removeInternship = (index: any) => {
        setInternshipDetails((internshipDetails: any[]) => {
            return internshipDetails.filter((_, i) => i !== index)
        })
        setCountInternshipNo((prevCount: any) => prevCount - 1);
    }

    const handleChangeInputEducation = async (e: { target: { name: any; value: any } }, index: any) => {
        const arr = [...educationDetails]
        if (e.target.name === 'gpa') {
            const inputText = e.target.value;
            const numbersOnly = inputText.replaceAll(/[^\d.]/g, '');
            arr[index] = { ...arr[index], [e.target.name]: numbersOnly }
        } else if (e.target.name === 'eduFrom') {
            const formattedDate = moment(e.target.value).format('YYYY-MM');
            arr[index] = { ...arr[index], [e.target.name]: formattedDate }
        } else if (e.target.name === 'eduTo') {
            const formattedDate = moment(e.target.value).format('YYYY-MM');
            arr[index] = { ...arr[index], [e.target.name]: formattedDate }
        } else {
            arr[index] = { ...arr[index], [e.target.name]: e.target.value }
        }
        setEducationDetails(arr);
    }

    const handleChangeInputWorkExperience = async (e: { target: { name: any; value: any } }, index: any) => {
        const arr = [...workExperienceDetails]
        if (e.target.name === 'lastSalary') {
            const inputText = e.target.value;
            const numbersOnly = inputText.replaceAll(/\D/g, '');
            arr[index] = { ...arr[index], [e.target.name]: numbersOnly }
        } else {
            arr[index] = { ...arr[index], [e.target.name]: e.target.value }
        }
        setWorkExperienceDetails(arr);
    }

    const handleChangeInputInternship = async (e: { target: { name: any; value: any } }, index: any) => {
        const arr = [...internshipDetails]
        arr[index] = { ...arr[index], [e.target.name]: e.target.value }
        setInternshipDetails(arr);
    }

    const handleChangeHeader = (e: any) => {
        const { name, value } = e.target;
        setformData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (name === 'newGraduate') {
            if (value === 'Y') {
                setWorkExperienceDetails([]);
                setCountWorkExperienceNo(0);
            }
        }
        if (name === 'internship') {
            if (value === 'N') {
                setInternshipDetails([]);
                setCountInternshipNo(0);
            }
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        formData.educationNo = countEducationNo;
        if (formData.newGraduate === 'N') {
            formData.workExperienceNo = countWorkExperienceNo;
            formData.presentJobOrProject = null;
        } else {
            formData.workExperienceNo = 0;
            setCountWorkExperienceNo(0);
        }
        if (formData.internship === 'Y') {
            formData.internshipNo = countInternshipNo;
        } else {
            formData.internshipNo = 0;
            setCountInternshipNo(0);
        }
        
        if (formData.hr_SubmitStatus === 'Accept') {
            formData.trackingStatus = 'AC';
        } else if (formData.hr_SubmitStatus === 'Reject') {
            formData.trackingStatus = 'RE';
        } else {
            formData.trackingStatus = 'R';
        }

        try {
            await PostAndPatchApplicationEducationAndWorkExperience(formData, educationDetails, workExperienceDetails, internshipDetails);
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

    const fetcherMasterEducation = async (url: any) => {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${access_Token}` } });
        const data = await response.data;
        return data;
    };

    const { data, error }: any = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/master_education/active', fetcherMasterEducation);

    if (error) return <div>Error fetching data</div>;
    if (!data) return <div></div>;

    console.log(workExperienceDetails)

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="col-span-10">
                    <div className="grid grid-cols-12 mb-3 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-purple-100 border-purple-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Applicant education</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12">
                        <div className="col-span-3">
                            <div className="flex items-center pr-5 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                {
                                    countEducationNo >= 3 ?
                                        <>
                                            <FaCirclePlus className="inline-flex text-gray-400 bg-white w-[35px] h-[35px] hover:text-gray-500 cursor-no-drop" />
                                        </>
                                        :
                                        <>
                                            <FaCirclePlus className=" inline-flex text-green-500 bg-white w-[35px] h-[35px] hover:text-green-700 cursor-pointer" onClick={addEducation} />
                                        </>
                                }
                                <div className="ps-3">
                                    <div className="text-sm text-gray-700 font-medium">Education</div>
                                    <div className="text-xs text-red-600 font-medium">Please add education at least 1</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        {educationDetails.map((e: any, index: any) => (
                            <Fragment key={index}>
                                <div className="grid grid-cols-12 gap-2 mt-6">
                                    <div className="col-span-4 mr-2">
                                        <p className="text-title">Education</p>
                                        <select id="education" name="education" className="input-formcontrol px-2" value={e.education} onChange={(e) => handleChangeInputEducation(e, index)} required>
                                            <option value="">Select</option>
                                            {data.map((item: any) => (
                                                <option key={item.educationEN} value={item.educationEN + ' / ' + item.educationTH}>
                                                    {item.educationEN} / {item.educationTH}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-span-4 mr-2">
                                        <p className="text-title">Institute</p>
                                        <input type="text" id="institute" name="institute" value={e.institute} maxLength={1000} onChange={(e) => handleChangeInputEducation(e, index)} className="input-formcontrol" required />
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">From</p>
                                        <input type="month" id="eduFrom" name="eduFrom" value={moment(e.eduFrom).format('YYYY-MM') === null ? '' : moment(e.eduFrom).format('YYYY-MM')} onChange={(e) => handleChangeInputEducation(e, index)} className="input-formcontrol" required />
                                    </div>

                                    <div className="col-span-2">
                                        <p className="text-title">To</p>
                                        <input type="month" id="eduTo" name="eduTo" value={moment(e.eduTo).format('YYYY-MM') === null ? '' : moment(e.eduTo).format('YYYY-MM')} onChange={(e) => handleChangeInputEducation(e, index)} className="input-formcontrol" required />
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Degree Obtained</p>
                                        <input type="text" id="degreeobtained" name="degreeobtained" value={e.degreeobtained} maxLength={100} onChange={(e) => handleChangeInputEducation(e, index)} className="input-formcontrol" required />
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Major</p>
                                        <input type="text" id="major" name="major" value={e.major} maxLength={100} onChange={(e) => handleChangeInputEducation(e, index)} className="input-formcontrol" required />
                                    </div>

                                    <div className="col-span-1 mr-2">
                                        <p className="text-title">GPA</p>
                                        <input type="text" id="gpa" name="gpa" value={e.gpa} maxLength={4} onChange={(e) => handleChangeInputEducation(e, index)} className="input-formcontrol" required />
                                    </div>

                                    <div className="col-span-1">
                                        <p className="text-xs font-medium mt-5 text-gray-700"></p>
                                        <FaCircleXmark className="text-red-600 bg-white w-[35px] h-[35px] hover:text-red-700 ml-2 cursor-pointer" onClick={() => removeEducation(index)} />
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </div>

                    <div className="grid grid-cols-12 my-6 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-purple-100 border-purple-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Applicant work experience</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-3 mr-2">
                            <p className="text-title font-medium inline-flex text-gray-700">You are a new graduate</p>
                            <select id="newGraduate" name="newGraduate" className="input-formcontrol px-2" value={formData.newGraduate} onChange={handleChangeHeader} required>
                                <option value="">SELECT</option>
                                <option value="Y">Yes / ใช่</option>
                                <option value="N">No / ไม่ใช่</option>
                            </select>
                            {
                                formData.newGraduate === "N" ?
                                    <>
                                        <p className="text-xs mb-1 font-medium inline-flex text-red-600">Please add children at least 1 person</p>
                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </div>


                        {
                            formData.newGraduate === "N" ?
                                <>
                                    {
                                        countWorkExperienceNo >= 3 ?
                                            <>
                                                <div className="col-span-2 mr-2">
                                                    <p className="text-xs font-medium mt-6 text-gray-700"></p>
                                                    <FaCirclePlus className=" text-gray-400 bg-white w-[35px] h-[35px] mt-1 hover:text-gray-500 cursor-no-drop" />
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="col-span-2 mr-2">
                                                    <p className="text-xs font-medium mt-6 text-gray-700"></p>
                                                    <FaCirclePlus className=" text-green-500 bg-white w-[35px] h-[35px] mt-1 hover:text-green-700 cursor-pointer" onClick={addWorkExperience} />
                                                </div>
                                            </>
                                    }
                                </>
                                :
                                <>
                                </>
                        }
                    </div>

                    {
                        formData.newGraduate === "N" ?
                            <>
                                <div className="card-body">
                                    {workExperienceDetails.map((e: any, index: any) => (
                                        <Fragment key={index}>
                                            <div className="grid grid-cols-12 gap-2 mt-6">
                                                <div className="col-span-3 mr-2">
                                                    <p className="text-title">Company</p>
                                                    <input type="text" id="company" name="company" value={e.company} maxLength={50} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <p className="text-title">Business Type</p>
                                                    <input type="text" id="typeofBusiness" name="typeofBusiness" value={e.typeofBusiness} maxLength={50} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                </div>

                                                <div className="col-span-3 mr-2">
                                                    <p className="text-title">Position</p>
                                                    <input type="text" id="position" name="position" value={e.position} maxLength={50} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <p className="text-title">From</p>
                                                    <input type="month" id="workExpFrom" name="workExpFrom" value={moment(e.workExpFrom).format('YYYY-MM') === null ? '' : moment(e.workExpFrom).format('YYYY-MM')} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <p className="text-title">To</p>
                                                    <input type="month" id="workExpTo" name="workExpTo" value={moment(e.workExpTo).format('YYYY-MM') === null ? '' : moment(e.workExpTo).format('YYYY-MM')} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <p className="text-title">Salary</p>
                                                    <input type="text" id="lastSalary" name="lastSalary" value={e.lastSalary === null ? '' : e.lastSalary} maxLength={6} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                </div>

                                                <div className="col-span-3">
                                                    <p className="text-title">Responsibility</p>
                                                    <input type="text" id="responsibility" name="responsibility" value={e.responsibility} maxLength={100} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                </div>

                                                <div className="col-span-3">
                                                    <p className="text-title">Reason of Leaving</p>
                                                    <input type="text" id="reasonofLeaving" name="reasonofLeaving" value={e.reasonofLeaving} maxLength={100} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <p className="text-title">Currently Working</p>
                                                    <select id="currentlyWorking" name="currentlyWorking" className="input-formcontrol px-2" value={e.currentlyWorking} onChange={(e) => handleChangeInputWorkExperience(e, index)} required>
                                                        <option value="">SELECT</option>
                                                        <option value="Y">Yes / ใช่</option>
                                                        <option value="N">No / ไม่ใช่</option>
                                                    </select>
                                                </div>

                                                <div className="col-span-1">
                                                    <p className="text-xs font-medium mt-5 text-gray-700"></p>
                                                    <FaCircleXmark className="text-red-600 bg-white w-[35px] h-[35px] hover:text-red-700 ml-2 cursor-pointer" onClick={() => removeWorkExperience(index)} />
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                            </>
                            :
                            <>
                                <div className="card-body">
                                    <div className="grid grid-cols-12 gap-2 mt-6">
                                        <div className="col-span-12 mr-2">
                                            <p className="text-title">Present job or project and internship responsibility</p>
                                            <textarea id="presentJobOrProject" name="presentJobOrProject" value={formData.presentJobOrProject} maxLength={500} onChange={handleChangeHeader} rows={16} cols={50} className="input-formcontrol resize-none" />
                                        </div>
                                    </div>
                                </div>
                            </>
                    }

                    <div className="grid grid-cols-12 my-6 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-purple-100 border-purple-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Applicant internship</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-4 mr-2">
                            <p className="text-title font-medium inline-flex text-gray-700">Internship</p>
                            <select id="internship" name="internship" className="input-formcontrol px-2" value={formData.internship} onChange={handleChangeHeader} required>
                                <option value="">SELECT</option>
                                <option value="Y">I&apos;ve had an internship / เคยฝึกงาน</option>
                                <option value="N">I&apos;ve never had an internship / ไม่เคยฝึกงาน</option>
                            </select>
                            {
                                formData.internship === "Y" ?
                                    <>
                                        <p className="text-xs mb-1 font-medium inline-flex text-red-600">Please add internship at least 1</p>
                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </div>

                        {
                            formData.internship === "Y" ?
                                <>
                                    {
                                        countInternshipNo >= 3 ?
                                            <>
                                                <div className="col-span-2 mr-2">
                                                    <p className="text-xs font-medium mt-6 text-gray-700"></p>
                                                    <FaCirclePlus className=" text-gray-400 bg-white w-[35px] h-[35px] mt-1 hover:text-gray-500 cursor-no-drop" />
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="col-span-2 mr-2">
                                                    <p className="text-xs font-medium mt-6 text-gray-700"></p>
                                                    <FaCirclePlus className=" text-green-500 bg-white w-[35px] h-[35px] mt-1 hover:text-green-700 cursor-pointer" onClick={addInternship} />
                                                </div>
                                            </>
                                    }
                                </>
                                :
                                <>
                                </>
                        }
                    </div>

                    {
                        formData.internship === "Y" ?
                            <>
                                <div className="card-body">
                                    {internshipDetails.map((e: any, index: any) => (
                                        <Fragment key={index}>
                                            <div className="grid grid-cols-12 gap-2 mt-6">
                                                <div className="col-span-3 mr-2">
                                                    <label className="text-title">Company</label>
                                                    <input type="text" id="internshipCompany" name="internshipCompany" value={e.internshipCompany} maxLength={50} onChange={(e) => handleChangeInputInternship(e, index)} className="input-formcontrol" required />
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <label className="text-title">Business Type</label>
                                                    <input type="text" id="internshipTypeofBusiness" name="internshipTypeofBusiness" value={e.internshipTypeofBusiness} maxLength={50} onChange={(e) => handleChangeInputInternship(e, index)} className="input-formcontrol" required />
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <label className="text-title">Division</label>
                                                    <input type="text" id="internshipPosition" name="internshipPosition" value={e.internshipPosition} maxLength={50} onChange={(e) => handleChangeInputInternship(e, index)} className="input-formcontrol" required />
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <label className="text-title">From</label>
                                                    <input type="month" id="internshipExpFrom" name="internshipExpFrom" value={moment(e.internshipExpFrom).format('YYYY-MM') === null ? '' : moment(e.internshipExpFrom).format('YYYY-MM')} onChange={(e) => handleChangeInputInternship(e, index)} className="input-formcontrol" required />
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <label className="text-title">To</label>
                                                    <input type="month" id="internshipExpTo" name="internshipExpTo" value={moment(e.internshipExpTo).format('YYYY-MM') === null ? '' : moment(e.internshipExpTo).format('YYYY-MM')} onChange={(e) => handleChangeInputInternship(e, index)} className="input-formcontrol" required />
                                                </div>

                                                <div className="col-span-1">
                                                    <p className="text-xs mb-1 font-medium inline-flex text-gray-700"></p>
                                                    <FaCircleXmark className="text-red-600 bg-white w-[35px] h-[35px] hover:text-red-700 ml-2 cursor-pointer" onClick={() => removeInternship(index)} />
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                            </>
                            :
                            <>
                            </>
                    }

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-12 mr-2">
                            {
                                formData.newGraduate === "N" && formData.internship === "N" ?
                                    <>
                                        {
                                            countWorkExperienceNo !== 0 ?
                                                <>
                                                    {
                                                        countEducationNo !== 0 ?
                                                            <>
                                                                <button type="submit" className="btn btn-purple">Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                            </>
                                                            :
                                                            <>
                                                                <button type="submit" className="btn btn-gray" disabled>Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                            </>
                                                    }
                                                </>
                                                :
                                                <>
                                                    <button type="submit" className="btn btn-gray" disabled>Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                </>
                                        }
                                    </>
                                    :
                                    formData.newGraduate === "Y" && formData.internship === "N" ?
                                        <>
                                            {
                                                countWorkExperienceNo === 0 ?
                                                    <>
                                                        {
                                                            countEducationNo !== 0 ?
                                                                <>
                                                                    <button type="submit" className="btn btn-purple">Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                                </>
                                                                :
                                                                <>
                                                                    <button type="submit" className="btn btn-gray" disabled>Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                                </>
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        <button type="submit" className="btn btn-gray" disabled>Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                    </>
                                            }
                                        </>
                                        :
                                        formData.newGraduate === "N" && formData.internship === "Y" ?
                                            <>
                                                {
                                                    countInternshipNo !== 0 && countWorkExperienceNo === 0 ?
                                                        <>
                                                            {
                                                                countEducationNo !== 0 ?
                                                                    <>
                                                                        <button type="submit" className="btn btn-gray" disabled>Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <button type="submit" className="btn btn-gray" disabled>Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                                    </>
                                                            }
                                                        </>
                                                        :
                                                        countInternshipNo !== 0 && countWorkExperienceNo !== 0 ?
                                                            <>
                                                                {
                                                                    countEducationNo !== 0 ?
                                                                        <>
                                                                            <button type="submit" className="btn btn-purple">Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <button type="submit" className="btn btn-gray" disabled>Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                                        </>
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                <button type="submit" className="btn btn-gray" disabled>Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                            </>
                                                }
                                            </>
                                            :
                                            <>
                                                {
                                                    formData.newGraduate === "Y" && formData.internship === "Y" ?
                                                        <>
                                                            {
                                                                countInternshipNo !== 0 ?
                                                                    <>
                                                                        {
                                                                            countEducationNo !== 0 ?
                                                                                <>
                                                                                    <button type="submit" className="btn btn-purple">Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <button type="submit" className="btn btn-gray" disabled>Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                                                </>
                                                                        }
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <button type="submit" className="btn btn-gray" disabled>Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                                    </>
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            {
                                                                countEducationNo !== 0 ?
                                                                    <>
                                                                        <button type="submit" className="btn btn-purple">Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <button type="submit" className="btn btn-gray" disabled>Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                                    </>
                                                            }
                                                        </>
                                                }
                                            </>
                            }
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
                                                        <Image src="/error.gif" alt="Loading..." style={{ width: 100, height: 100 }} width={150} height={150} />
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

export default Form3_Body;