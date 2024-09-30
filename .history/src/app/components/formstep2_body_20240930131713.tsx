"use client";
import { Fragment, useState } from "react";
import { PostAndPatchApplicationRelationshipAndAddress } from "../actions/actionForm";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaGraduationCap, FaRegIdCard, FaSignature, FaUserAlt, FaUserFriends, FaLock } from "react-icons/fa";
import { GiHouse, GiWorld } from "react-icons/gi";
import { GrCertificate } from "react-icons/gr";
import { MdSaveAs } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import Image from "next/image";

const Form2_Body = ({ session, header }: any) => {

    const access_Token = session.accessToken;

    const removeNonNumeric = (num: any) => num.toString().replace(/[^0-9]/g, "");

    const [formData, setformData] = useState({
        recruitmentID: header.recruitmentID,
        maritalStatus: header.maritalStatus,
        spouseFirstname: header.spouseFirstname,
        spouseLastname: header.spouseLastname,
        spouseAge: header.spouseAge,
        spouseNationality: header.spouseNationality,
        spouseMobileno: header.spouseMobileno,
        spousePlaceofWork: header.spousePlaceofWork,
        spouseOccupation: header.spouseOccupation,
        children: header.children,
        childrenNo: header.childrenNo,
        fatherFirstname: header.fatherFirstname,
        fatherLastname: header.fatherLastname,
        fatherAge: header.fatherAge,
        fatherLivingStatus: header.fatherLivingStatus,
        fatherOccupation: header.fatherOccupation,
        fatherPlaceofWork: header.fatherPlaceofWork,
        fatherMobileno: header.fatherMobileno,
        motherFirstname: header.motherFirstname,
        motherLastname: header.motherLastname,
        motherAge: header.motherAge,
        motherLivingStatus: header.motherLivingStatus,
        motherOccupation: header.motherOccupation,
        motherPlaceofWork: header.motherPlaceofWork,
        motherMobileno: header.motherMobileno,
        homeAddress: header.homeAddress,
        homeFamilyno: header.homeFamilyno,
        sibling: header.sibling,
        siblingNo: header.siblingNo,
        trackingStatus: header.trackingStatus,
        hr_SubmitStatus: header.hr_SubmitStatus,
    });

    const [countChildrenNo, setCountChildrenNo] = useState(header.childrenNo);
    const [childrenDetails, setChildrenDetails] = useState(header.rmsChildren);
    const [countSiblingNo, setCountSiblingNo] = useState(header.siblingNo);
    const [siblingDetails, setSiblingDetails] = useState(header.rmsSibling);
    const [textInputAge, setTextInputAge] = useState(header.spouseAge);
    const [textInputMobileNo, setTextInputMobileNo] = useState(header.spouseMobileno);

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        const inputText = e.target.value;
        const numbersOnly = inputText.replaceAll(/\D/g, '');
        if (name === 'maritalStatus') {
            if (value !== 'Married') {
                setformData((prevData) => ({
                    ...prevData,
                    spouseFirstname: null,
                    spouseLastname: null,
                    spouseAge: null,
                    spouseNationality: null,
                    spouseMobileno: null,
                    spousePlaceofWork: null,
                    spouseOccupation: null,
                }));
            }
        }

        if (name === 'spouseMobileno') {
            setTextInputMobileNo(numbersOnly);
            if (value !== '') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: numbersOnly,
                }));
            }
        }

        if (name === 'spouseAge') {
            if (value !== '') {
                setTextInputAge(numbersOnly);
                setformData((prevData) => ({
                    ...prevData,
                    [name]: numbersOnly,
                }));
            } else {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: null,
                }));
            }
        } else {
            setformData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }

        if (name === 'children') {
            if (value === 'N') {
                setChildrenDetails([]);
                setCountChildrenNo(0);
            }
        }

        if (name === 'sibling') {
            if (value === 'N') {
                setSiblingDetails([]);
                setCountSiblingNo(0);
            }
        }

        if (name === 'fatherAge') {
            setformData((prevData) => ({
                ...prevData,
                [name]: numbersOnly,
            }));
        } else if (name === 'fatherMobileno') {
            setformData((prevData) => ({
                ...prevData,
                [name]: numbersOnly,
            }));
        } else if (name === 'motherAge') {
            setformData((prevData) => ({
                ...prevData,
                [name]: numbersOnly,
            }));
        } else if (name === 'motherMobileno') {
            setformData((prevData) => ({
                ...prevData,
                [name]: numbersOnly,
            }));
        } else if (name === 'homeFamilyno') {
            setformData((prevData) => ({
                ...prevData,
                [name]: numbersOnly,
            }));
        } else {
            setformData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const addChildren = () => {
        setChildrenDetails((childrenDetails: any) => [...childrenDetails,
        {
            age: '',
            firstname: '',
            lastname: '',
            gender: '',
            occupation: '',
            recruitmentID: header.recruitmentID,
        }]);
        let prevCount = 1;
        setCountChildrenNo((prevCount: any) => prevCount + 1);
    }

    const removeChildren = (index: any) => {
        setChildrenDetails((childrenDetails: any[]) => {
            return childrenDetails.filter((_, i) => i !== index)
        })
        setCountChildrenNo((prevCount: any) => prevCount - 1);
    }

    const handleChangeInputChildren = async (e: { target: { name: any; value: any } }, index: any) => {
        const arr = [...childrenDetails]
        if (e.target.name === 'age') {
            const inputText = e.target.value;
            const numbersOnly = inputText.replaceAll(/\D/g, '');
            arr[index] = { ...arr[index], [e.target.name]: numbersOnly }
        } else {
            arr[index] = { ...arr[index], [e.target.name]: e.target.value }
        }
        setChildrenDetails(arr);
    }

    const addSibling = () => {
        setSiblingDetails((siblingDetails: any) => [...siblingDetails,
        {
            age: '',
            firstname: '',
            lastname: '',
            gender: '',
            occupation: '',
            recruitmentID: header.recruitmentID,
        }]);
        let prevCount = 1;
        setCountSiblingNo((prevCount: any) => prevCount + 1);
    }

    const removeSibling = (index: any) => {
        setSiblingDetails((siblingDetails: any[]) => {
            return siblingDetails.filter((_, i) => i !== index)
        })
        setCountSiblingNo((prevCount: any) => prevCount - 1);
    }

    const handleChangeInputSibling = async (e: { target: { name: any; value: any } }, index: any) => {
        const arr = [...siblingDetails]

        if (e.target.name === 'age') {
            const inputText = e.target.value;
            const numbersOnly = inputText.replaceAll(/\D/g, '');
            arr[index] = { ...arr[index], [e.target.name]: numbersOnly }
        } else {
            arr[index] = { ...arr[index], [e.target.name]: e.target.value }
        }
        setSiblingDetails(arr);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (formData.children === 'Y') {
            formData.childrenNo = countChildrenNo;
        } else {
            formData.childrenNo = 0;
            setCountChildrenNo(0);
        }

        if (formData.sibling === 'Y') {
            formData.siblingNo = countSiblingNo;
        } else {
            formData.siblingNo = 0;
            setCountSiblingNo(0);
        }
        
        if (formData.hr_SubmitStatus === 'Accept') {
            formData.trackingStatus = 'AC';
        } else if (formData.hr_SubmitStatus === 'Reject') {
            formData.trackingStatus = 'RE';
        } else {
            formData.trackingStatus = 'R';
        }

        try {
            await PostAndPatchApplicationRelationshipAndAddress(formData, childrenDetails, siblingDetails);
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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 mb-6 gap-2">
                    <div className="col-span-12 border-l-[6px] bg-purple-100 border-purple-500">
                        <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Applicant information</p>
                    </div>
                </div>

                <div className="grid grid-cols-12 sm:grid-cols-2 gap-4">
                    <div className="col-span-3 sm:col-span-full">
                        <p className="text-title">Marital Status</p>
                        <select id="maritalStatus" name="maritalStatus" className="input-formcontrol px-2" value={formData.maritalStatus} onChange={handleInputChange} required>
                            <option value="">SELECT</option>
                            <option value="Single">Single / โสด</option>
                            <option value="Married">Married / แต่งงาน</option>
                            <option value="Divorced">Divorced / หย่าร้าง</option>
                            <option value="Widowed">Widowed / หม้าย</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-12 sm:grid-cols-2 gap-4 mt-6">
                    {
                        formData.maritalStatus === 'Married' ?
                            <>
                                <div className="col-span-3 sm:col-span-full">
                                    <p className="text-title">Spouse&apos;s First Name</p>
                                    <input type="text" id="spouseFirstname" name="spouseFirstname" value={formData.spouseFirstname} maxLength={50} onChange={handleInputChange} className="input-formcontrol" required />
                                </div>

                                <div className="col-span-3 sm:col-span-full">
                                    <p className="text-title">Spouse&apos;s Last Name</p>
                                    <input type="text" id="spouseLastname" name="spouseLastname" value={formData.spouseLastname} maxLength={500} onChange={handleInputChange} className="input-formcontrol" required />
                                </div>

                                <div className="col-span-1 sm:col-span-full">
                                    <p className="text-title">Age</p>
                                    <input type="text" id="spouseAge" name="spouseAge" value={textInputAge === null ? '' : textInputAge} maxLength={3} onChange={handleInputChange} className="input-formcontrol" required />
                                </div>

                                <div className="col-span-2 sm:col-span-full">
                                    <p className="text-title">Nationality</p>
                                    <input type="text" id="spouseNationality" name="spouseNationality" value={formData.spouseNationality} maxLength={20} onChange={handleInputChange} className="input-formcontrol" required />
                                </div>

                                <div className="col-span-3 sm:col-span-full">
                                    <p className="text-title">Mobile Number</p>
                                    <input type="text" id="spouseMobileno" name="spouseMobileno" value={textInputMobileNo} maxLength={10} onChange={handleInputChange} className="input-formcontrol" required />
                                </div>
                            </>
                            :
                            <>
                                <div className="col-span-3 sm:col-span-full">
                                    <p className="text-title">Spouse&apos;s First Name<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    <input type="text" id="spouseFirstname" name="spouseFirstname" value={formData.spouseFirstname} maxLength={50} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                                </div>

                                <div className="col-span-3 sm:col-span-full">
                                    <p className="text-title">Spouse&apos;s Last Name<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    <input type="text" id="spouseLastname" name="spouseLastname" value={formData.spouseLastname} maxLength={500} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                                </div>

                                <div className="col-span-1 sm:col-span-full">
                                    <p className="text-title">Age<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    <input type="text" id="spouseAge" name="spouseAge" value={formData.spouseAge === null ? '' : formData.spouseAge} maxLength={3} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                                </div>

                                <div className="col-span-2 sm:col-span-full">
                                    <p className="text-title">Nationality<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    <input type="text" id="spouseNationality" name="spouseNationality" value={formData.spouseNationality} maxLength={20} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                                </div>

                                <div className="col-span-3 sm:col-span-full">
                                    <p className="text-title">Mobile Number<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    <input type="text" id="spouseMobileno" name="spouseMobileno" value={formData.spouseMobileno} maxLength={10} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                                </div>
                            </>
                    }
                </div>

                <div className="grid grid-cols-12 gap-4 mt-6">
                    {
                        formData.maritalStatus === 'Married' ?
                            <>
                                <div className="col-span-9 sm:col-span-full">
                                    <p className="text-title">Place of work</p>
                                    <input type="text" id="spousePlaceofWork" name="spousePlaceofWork" value={formData.spousePlaceofWork} maxLength={150} onChange={handleInputChange} className="input-formcontrol" required />
                                </div>

                                <div className="col-span-3 sm:col-span-full">
                                    <p className="text-title">Occupation</p>
                                    <input type="text" id="spouseOccupation" name="spouseOccupation" value={formData.spouseOccupation} maxLength={50} onChange={handleInputChange} className="input-formcontrol" required />
                                </div>
                            </>
                            :
                            <>
                                <div className="col-span-9 sm:col-span-full">
                                    <p className="text-title">Place of work<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    <input type="text" id="spousePlaceofWork" name="spousePlaceofWork" value={formData.spousePlaceofWork} maxLength={150} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                                </div>

                                <div className="col-span-3 sm:col-span-full">
                                    <p className="text-title">Occupation<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    <input type="text" id="spouseOccupation" name="spouseOccupation" value={formData.spouseOccupation} maxLength={50} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                                </div>
                            </>
                    }
                </div>

                <div className="grid grid-cols-12 gap-2 mt-6">
                    <div className="col-span-3 mr-2">
                        <p className="text-title">Children</p>
                        <select id="children" name="children" className="input-formcontrol px-2" value={formData.children} onChange={handleInputChange} required>
                            <option value="">SELECT</option>
                            <option value="Y">Have a child / มีบุตร</option>
                            <option value="N">No children / ไม่มีบุตร</option>
                        </select>
                        {
                            formData.children === "Y" ?
                                <>
                                    <p className="text-xs mb-1 font-medium inline-flex text-red-600">Please add children at least 1 person</p>
                                </>
                                :
                                <>
                                </>
                        }
                    </div>

                    {
                        formData.children === "Y" ?
                            <>
                                {
                                    countChildrenNo >= 3 ?
                                        <>
                                            <div className="col-span-2 mr-2">
                                                <p className="text-xs font-medium mt-5 text-gray-700"></p>
                                                <FaCirclePlus className="text-gray-400 bg-white w-[35px] h-[35px] hover:text-gray-500 cursor-no-drop" />
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="col-span-2 mr-2">
                                                <p className="text-xs font-medium mt-5 text-gray-700"></p>
                                                <FaCirclePlus className="text-green-500 bg-white w-[35px] h-[35px] hover:text-green-700 cursor-pointer" onClick={addChildren} />
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
                    formData.children === "Y" ?
                        <>
                            <div className="card-body">
                                {childrenDetails.map((e: any, index: any) => (
                                    <Fragment key={index}>
                                        <div className="grid grid-cols-12 gap-2 mt-6">
                                            <div className="col-span-3 mr-2">
                                                <label className="text-title font-normal text-gray-700">First Name</label>
                                                <input type="text" id="firstname" name="firstname" value={e.firstname} maxLength={50} onChange={(e) => handleChangeInputChildren(e, index)} className="input-formcontrol" required />
                                            </div>

                                            <div className="col-span-3 mr-2">
                                                <label className="text-title font-normal text-gray-700">Last Name</label>
                                                <input type="text" id="lastname" name="lastname" value={e.lastname} maxLength={50} onChange={(e) => handleChangeInputChildren(e, index)} className="input-formcontrol" required />
                                            </div>

                                            <div className="col-span-1 mr-2">
                                                <label className="text-title font-normal text-gray-700">Age</label>
                                                <input type="text" id="age" name="age" value={e.age === null ? '' : e.age} maxLength={3} onChange={(e) => handleChangeInputChildren(e, index)} className="input-formcontrol" required />
                                            </div>

                                            <div className="col-span-2 mr-2">
                                                <label className="text-title font-normal text-gray-700">Gender</label>
                                                <select id="gender" name="gender" className="input-formcontrol px-2" value={e.gender} onChange={(e) => handleChangeInputChildren(e, index)} required>
                                                    <option value="">SELECT</option>
                                                    <option value="M">Male / ผู้ชาย</option>
                                                    <option value="F">Female / ผู้หญิง</option>
                                                </select>
                                            </div>

                                            <div className="col-span-2 mr-2">
                                                <label className="text-title font-normal text-gray-700">Occupation</label>
                                                <input type="text" id="occupation" name="occupation" value={e.occupation} maxLength={50} onChange={(e) => handleChangeInputChildren(e, index)} className="input-formcontrol" required />
                                            </div>

                                            <div className="col-span-1 mr-2">
                                                <p className="text-xs mb-1 font-medium inline-flex text-gray-700"></p>
                                                <FaCircleXmark className="text-red-600 bg-white w-[35px] h-[35px] hover:text-red-700 ml-2 cursor-pointer" onClick={() => removeChildren(index)} />
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

                <div className="grid grid-cols-12 my-6 gap-2">
                    <div className="col-span-12 border-l-[6px] bg-purple-100 border-purple-500">
                        <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Father&apos;s information</p>
                    </div>
                </div>

                <div className="grid grid-cols-12 mt-4 gap-2">
                    <div className="col-span-3 mr-2">
                        <label className="text-title font-normal text-gray-700">First Name</label>
                        <input type="text" id="fatherFirstname" name="fatherFirstname" value={formData.fatherFirstname} maxLength={50} onChange={handleInputChange} className="input-formcontrol" />
                    </div>

                    <div className="col-span-4 mr-2">
                        <label className="text-title font-normal text-gray-700">Last Name</label>
                        <input type="text" id="fatherLastname" name="fatherLastname" value={formData.fatherLastname} maxLength={50} onChange={handleInputChange} className="input-formcontrol" />
                    </div>

                    <div className="col-span-1 mr-2">
                        <label className="text-title font-normal text-gray-700">Age</label>
                        <input type="text" id="fatherAge" name="fatherAge" value={formData.fatherAge === null ? '' : formData.fatherAge} maxLength={3} onChange={handleInputChange} className="input-formcontrol" />
                    </div>

                    <div className="col-span-2 mr-2">
                        <label className="text-title font-normal text-gray-700">Status</label>
                        <select id="fatherLivingStatus" name="fatherLivingStatus" className="input-formcontrol px-2" value={formData.fatherLivingStatus} onChange={handleInputChange} required>
                            <option value="">SELECT</option>
                            <option value="Alive">Alive / มีชีวิต</option>
                            <option value="Dead">Dead / เสียชีวิต</option>
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="text-title font-normal text-gray-700">Occupation</label>
                        <input type="text" id="fatherOccupation" name="fatherOccupation" value={formData.fatherOccupation} maxLength={50} onChange={handleInputChange} className="input-formcontrol" />
                    </div>
                </div>

                <div className="grid grid-cols-12 mt-6 gap-2">
                    <div className="col-span-3 mr-2">
                        <label className="text-title font-normal text-gray-700">Mobile Number</label>
                        <input type="text" id="fatherMobileno" name="fatherMobileno" value={formData.fatherMobileno} maxLength={10} onChange={handleInputChange} className="input-formcontrol" />
                    </div>

                    <div className="col-span-4 mr-2">
                        <label className="text-title font-normal text-gray-700">Place of work</label>
                        <input type="text" id="fatherPlaceofWork" name="fatherPlaceofWork" value={formData.fatherPlaceofWork} maxLength={50} onChange={handleInputChange} className="input-formcontrol" />
                    </div>
                </div>

                <div className="grid grid-cols-12 my-6 gap-2">
                    <div className="col-span-12 border-l-[6px] bg-purple-100 border-purple-500">
                        <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Mother&apos;s information</p>
                    </div>
                </div>

                <div className="grid grid-cols-12 mt-4 gap-2">
                    <div className="col-span-3 mr-2">
                        <label className="text-title font-normal text-gray-700">First Name</label>
                        <input type="text" id="motherFirstname" name="motherFirstname" value={formData.motherFirstname} maxLength={50} onChange={handleInputChange} className="input-formcontrol" />
                    </div>

                    <div className="col-span-4 mr-2">
                        <label className="text-title font-normal text-gray-700">Last Name</label>
                        <input type="text" id="motherLastname" name="motherLastname" value={formData.motherLastname} maxLength={50} onChange={handleInputChange} className="input-formcontrol" />
                    </div>

                    <div className="col-span-1 mr-2">
                        <label className="text-title font-normal text-gray-700">Age</label>
                        <input type="text" id="motherAge" name="motherAge" value={formData.motherAge === null ? '' : formData.motherAge} maxLength={3} onChange={handleInputChange} className="input-formcontrol" />
                    </div>

                    <div className="col-span-2 mr-2">
                        <label className="text-title font-normal text-gray-700">Status</label>
                        <select id="motherLivingStatus" name="motherLivingStatus" className="input-formcontrol px-2" value={formData.motherLivingStatus} onChange={handleInputChange} required>
                            <option value="">SELECT</option>
                            <option value="Alive">Alive / มีชีวิต</option>
                            <option value="Dead">Dead / เสียชีวิต</option>
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="text-title font-normal text-gray-700">Occupation</label>
                        <input type="text" id="motherOccupation" name="motherOccupation" value={formData.motherOccupation} maxLength={50} onChange={handleInputChange} className="input-formcontrol" />
                    </div>
                </div>

                <div className="grid grid-cols-12 mt-6 gap-2">
                    <div className="col-span-3 mr-2">
                        <label className="text-title font-normal text-gray-700">Mobile Number</label>
                        <input type="text" id="motherMobileno" name="motherMobileno" value={formData.motherMobileno} maxLength={10} onChange={handleInputChange} className="input-formcontrol" />
                    </div>

                    <div className="col-span-4 mr-2">
                        <label className="text-title font-normal text-gray-700">Place of Work</label>
                        <input type="text" id="motherPlaceofWork" name="motherPlaceofWork" value={formData.motherPlaceofWork} maxLength={50} onChange={handleInputChange} className="input-formcontrol" />
                    </div>
                </div>

                <div className="grid grid-cols-12 mt-6 gap-2">
                    <div className="col-span-3 mr-2">
                        <label className="text-title font-normal text-gray-700">Home Number</label>
                        <input type="text" id="homeFamilyno" name="homeFamilyno" value={formData.homeFamilyno} maxLength={9} onChange={handleInputChange} className="input-formcontrol" />
                    </div>

                    <div className="col-span-9">
                        <label className="text-title font-normal text-gray-700">Home Address</label>
                        <input type="text" id="homeAddress" name="homeAddress" value={formData.homeAddress} maxLength={100} onChange={handleInputChange} className="input-formcontrol" />
                    </div>
                </div>

                <div className="grid grid-cols-12 mb-1 gap-2 mt-6">
                    <div className="col-span-12 border-l-[6px] bg-purple-100 border-purple-500">
                        <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Applicant sibling</p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-2 mt-6">
                    <div className="col-span-3 mr-2">
                        <p className="text-xs mb-1 font-medium inline-flex text-gray-700">Brother and Sister</p>
                        <select id="sibling" name="sibling" className="input-formcontrol px-2" value={formData.sibling} onChange={handleInputChange} required>
                            <option value="">SELECT</option>
                            <option value="Y">Have / มี</option>
                            <option value="N">Do not have / ไม่มี</option>
                        </select>
                        {
                            formData.sibling === "Y" ?
                                <>
                                    <p className="text-xs mb-1 font-medium inline-flex text-red-600">Please add sibling at least 1 person</p>
                                </>
                                :
                                <>
                                </>
                        }
                    </div>

                    {
                        formData.sibling === "Y" ?
                            <>
                                {
                                    countSiblingNo >= 4 ?
                                        <>
                                            <div className="col-span-2 mr-2">
                                                <p className="text-xs mb-1 font-medium inline-flex text-gray-700"></p>
                                                <FaCirclePlus className="text-gray-400 bg-white w-[35px] h-[35px] mt-1 hover:text-gray-500 cursor-no-drop" />
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="col-span-2 mr-2">
                                                <p className="text-xs mb-1 font-medium inline-flex text-gray-700"></p>
                                                <FaCirclePlus className="text-green-500 bg-white w-[35px] h-[35px] mt-1 hover:text-green-700 cursor-pointer" onClick={addSibling} />
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
                    formData.sibling === "Y" ?
                        <>
                            <div className="card-body">
                                {siblingDetails.map((e: any, index: any) => (
                                    <Fragment key={index}>
                                        <div className="grid grid-cols-12 gap-2 mt-6">
                                            <div className="col-span-3 mr-2">
                                                <label className="text-title font-normal text-gray-700">First Name</label>
                                                <input type="text" id="firstname" name="firstname" value={e.firstname} maxLength={50} onChange={(e) => handleChangeInputSibling(e, index)} className="input-formcontrol" required />
                                            </div>

                                            <div className="col-span-3 mr-2">
                                                <label className="text-title font-normal text-gray-700">Last Name</label>
                                                <input type="text" id="lastname" name="lastname" value={e.lastname} maxLength={50} onChange={(e) => handleChangeInputSibling(e, index)} className="input-formcontrol" required />
                                            </div>

                                            <div className="col-span-1 mr-2">
                                                <label className="text-title font-normal text-gray-700">Age</label>
                                                <input type="text" id="age" name="age" value={e.age === null ? '' : e.age} maxLength={3} onChange={(e) => handleChangeInputSibling(e, index)} className="input-formcontrol" required />
                                            </div>

                                            <div className="col-span-2 mr-2">
                                                <label className="text-title font-normal text-gray-700">Gender</label>
                                                <select id="gender" name="gender" className="input-formcontrol px-2" value={e.gender} onChange={(e) => handleChangeInputSibling(e, index)} required>
                                                    <option value="">SELECT</option>
                                                    <option value="M">Male / ผู้ชาย</option>
                                                    <option value="F">Female / ผู้หญิง</option>
                                                </select>
                                            </div>

                                            <div className="col-span-2">
                                                <label className="text-title font-normal text-gray-700">Occupation</label>
                                                <input type="text" id="occupation" name="occupation" value={e.occupation} maxLength={50} onChange={(e) => handleChangeInputSibling(e, index)} className="input-formcontrol" required />
                                            </div>

                                            <div className="col-span-1">
                                                <p className="text-xs mb-1 font-medium inline-flex text-gray-700"></p>
                                                <FaCircleXmark className="text-red-600 bg-white w-[35px] h-[35px] hover:text-red-700 ml-2 cursor-pointer" onClick={() => removeSibling(index)} />
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
                    <div className="col-span-12 sm:col-span-full">
                        {
                            formData.children === "N" && formData.sibling === "N" ?
                                <>
                                    <button type="submit" className="btn btn-purple">Save<MdSaveAs className="inline-flex ms-2" /></button>
                                </>
                                :
                                formData.children === "Y" && formData.sibling === "N" ?
                                    <>
                                        {
                                            countChildrenNo !== 0 ?
                                                <>
                                                    <button type="submit" className="btn btn-purple">Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                </>
                                                :
                                                <>
                                                    <button type="submit" className="btn-disabled btn-gray" disabled>Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                </>
                                        }
                                    </>
                                    :
                                    formData.children === "N" && formData.sibling === "Y" ?
                                        <>
                                            {
                                                countSiblingNo !== 0 ?
                                                    <>
                                                        <button type="submit" className="btn btn-purple">Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                    </>
                                                    :
                                                    <>
                                                        <button type="submit" className="btn-disabled btn-gray cursor-no-drop" disabled>Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                countChildrenNo !== 0 && countSiblingNo !== 0 ?
                                                    <>
                                                        <button type="submit" className="btn btn-purple">Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                    </>
                                                    :
                                                    <>
                                                        <button type="submit" className="btn-disabled btn-gray cursor-no-drop" disabled>Save<MdSaveAs className="inline-flex ms-2" /></button>
                                                    </>
                                            }
                                        </>
                        }
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
                                                        <Image src="/error.gif" alt="Loading..." style={{ width: 100, height: 100 }} width={100} height={100} />
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

export default Form2_Body;