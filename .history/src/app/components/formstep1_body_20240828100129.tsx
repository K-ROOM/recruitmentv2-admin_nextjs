"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { PatchApplicationHeader } from "../actions/actionForm";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaGraduationCap, FaMapMarkerAlt, FaRegIdCard, FaSignature, FaUserFriends } from "react-icons/fa";
import { MdSaveAs } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
import moment from "moment";
import { GiGlobe, GiHouse, GiWorld } from "react-icons/gi";
import { IoLockClosed } from "react-icons/io5";

const Form1_Body = ({ session, header }: any) => {

    const access_Token = session.accessToken;

    const [formData, setformData] = useState({
        recruitmentID: header.recruitmentID,
        expectedSalary: header.expectedSalary,
        sourceOfRecruitment: header.sourceOfRecruitment,
        startingDate: header.startingDate,
        selectIDPP: header.selectIDPP,
        idCardno: header.idCardno,
        idPassportno: header.idPassportno,
        prefixth: header.prefixth,
        firstnameth: header.firstnameth,
        lastnameth: header.lastnameth,
        nicknameth: header.nicknameth,
        prefixeng: header.prefixeng,
        firstnameeng: header.firstnameeng,
        lastnameeng: header.lastnameeng,
        nicknameeng: header.nicknameeng,
        dateofBirth: header.dateofBirth,
        age: header.age,
        height: header.height,
        weight: header.weight,
        nationality: header.nationality,
        bloodGroup: header.bloodGroup,
        email: header.email,
        mobileno: header.mobileno,
        militaryStatus: header.militaryStatus,
        ownerorRental: header.ownerorRental,
        permanentAddress: header.permanentAddress,
        presentAddress: header.presentAddress,
        samePresentaddress: header.samePresentaddress,
        trackingStatus: header.trackingStatus,
        hr_SubmitStatus: header.hr_SubmitStatus,
    });

    const [textInputSalary, setTextInputSalary] = useState(header.expectedSalary);
    const [textInputIDCard, setTextInputIDCard] = useState(header.idCardno);
    const [textInputPassport, setTextInputPassport] = useState(header.idPassportno);
    const [textInputFirstnameTH, setTextInputFirstnameTH] = useState(header.firstnameth);
    const [textInputLastnameTH, setTextInputLastnameTH] = useState(header.lastnameth);
    const [textInputNicknameTH, setTextInputNicknameTH] = useState(header.nicknameth);
    const [textInputFirstnameEN, setTextInputFirstnameEN] = useState(header.firstnameeng);
    const [textInputLastnameEN, setTextInputLastnameEN] = useState(header.lastnameeng);
    const [textInputNicknameEN, setTextInputNicknameEN] = useState(header.nicknameeng);
    const [textInputAge, setTextInputAge] = useState(header.age);
    const [textInputHeight, setTextInputHeight] = useState(header.height);
    const [textInputWeight, setTextInputWeight] = useState(header.weight);

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        const inputText = e.target.value;
        const numbersOnly = inputText.replaceAll(/\D/g, '');
        const englishOnly = inputText.replaceAll(/[^a-zA-Z\s]/g, '');
        const thaiOnly = inputText.replaceAll(/[^ก-๙เแโใไะาึเ็ิืุูเ์ฯๆ\s]/g, '');
        if (name === 'selectIDPP') {
            if (value === 'ID Card') {
                setformData((prevData) => ({
                    ...prevData,
                    idPassportno: null,
                    passportExpiredDate: null,
                }));
            } else if (value === 'Passport') {
                setformData((prevData) => ({
                    ...prevData,
                    idCardno: null,
                    expiredDate: null,
                    prefixth: null,
                    firstnameth: null,
                    lastnameth: null,
                    nicknameth: null,
                }));
            } else {
                setformData((prevData) => ({
                    ...prevData,
                    idCardno: null,
                    expiredDate: null,
                    idPassportno: null,
                    passportExpiredDate: null,
                }));
            }
        }
        if (name === 'idCardno') {
            setTextInputIDCard(numbersOnly);
            if (value !== '') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: numbersOnly,
                }));
            }
        }
        if (name === 'idPassportno') {
            setTextInputPassport(numbersOnly);
            if (value !== '') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: numbersOnly,
                }));
            }
        }
        if (name === 'prefixth') {
            if (value !== 'นาย') {
                setformData((prevData) => ({
                    ...prevData,
                    militaryStatus: null,
                }));
            }
            if (value === 'นาย') {
                formData.prefixeng = 'Mr.';
            } else if (value === 'นาง') {
                formData.prefixeng = 'Mrs.';
            } else if (value === 'นางสาว') {
                formData.prefixeng = 'Ms.';
            } else {
                formData.prefixeng = '';
            }
        }
        if (name === 'prefixeng') {
            if (value !== 'Mr.') {
                setformData((prevData) => ({
                    ...prevData,
                    militaryStatus: null,
                }));
            }
            if (formData.selectIDPP === 'ID Card') {
                if (value === 'Mr.') {
                    formData.prefixth = 'นาย';
                } else if (value === 'Mrs.') {
                    formData.prefixth = 'นาง';
                } else if (value === 'Ms.') {
                    formData.prefixth = 'นางสาว';
                } else {
                    formData.prefixth = '';
                }
            }
        }
        if (name === 'firstnameth') {
            setTextInputFirstnameTH(thaiOnly);
            if (value !== '') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: thaiOnly,
                }));
            }
        }
        if (name === 'lastnameth') {
            setTextInputLastnameTH(thaiOnly);
            if (value !== '') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: thaiOnly,
                }));
            }
        }
        if (name === 'nicknameth') {
            setTextInputNicknameTH(thaiOnly);
            if (value !== '') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: thaiOnly,
                }));
            }
        }
        if (name === 'firstnameeng') {
            setTextInputFirstnameEN(englishOnly);
            if (value !== '') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: englishOnly,
                }));
            }
        }
        if (name === 'lastnameeng') {
            setTextInputLastnameEN(englishOnly);
            if (value !== '') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: englishOnly,
                }));
            }
        }
        if (name === 'nicknameeng') {
            setTextInputNicknameEN(englishOnly);
            if (value !== '') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: englishOnly,
                }));
            }
        }
        if (name === 'startingDate') {
            if (value != '') {
                const formattedDate = moment(value).format('YYYY-MM-DD');
                setformData((prevData) => ({
                    ...prevData,
                    [name]: formattedDate,
                }));
            } else {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: null,
                }));
            }
        }
        if (name === 'expiredDate') {
            if (value != '') {
                const formattedDate = moment(value).format('YYYY-MM-DD');
                setformData((prevData) => ({
                    ...prevData,
                    [name]: formattedDate,
                }));
            } else {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: null,
                }));
            }
        }
        if (name === 'passportExpiredDate') {
            if (value != '') {
                const formattedDate = moment(value).format('YYYY-MM-DD');
                setformData((prevData) => ({
                    ...prevData,
                    [name]: formattedDate,
                }));
            } else {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: null,
                }));
            }
        }
        if (name === 'dateofBirth') {
            if (value != '') {
                const formattedDate = moment(value).format('YYYY-MM-DD');
                setformData((prevData) => ({
                    ...prevData,
                    [name]: '1995-09-',
                }));
            } else {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: null,
                }));
            }
        }
        if (name === 'samePresentaddress') {
            if (value === 'N') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else {
                setformData((prevData) => ({
                    ...prevData,
                    samePresentaddress: value,
                    presentAddress: null,
                }));
            }
        } else {
            setformData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        if (name === 'expectedSalary' ||
            name === 'age' ||
            name === 'height' ||
            name === 'weight') {
            setTextInputSalary(numbersOnly);
            setTextInputAge(numbersOnly);
            setTextInputHeight(numbersOnly);
            setTextInputWeight(numbersOnly);
            if (value != '') {
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
        console.log(formData);
    };

    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const fetcherMasterPrefixTH = async (url: any) => {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${access_Token}` } });
        const data = await response.data;
        return data;
    };

    const fetcherMasterPrefixENG = async (url: any) => {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${access_Token}` } });
        const data = await response.data;
        return data;
    };

    const fetcherMasterMilitary = async (url: any) => {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${access_Token}` } });
        const data = await response.data;
        return data;
    };

    const { data: data1, error: error1 }: any = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/master_prefixth', fetcherMasterPrefixTH);
    const { data: data2, error: error2 }: any = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/master_prefixeng', fetcherMasterPrefixENG);
    const { data: data3, error: error3 }: any = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/master_militarystatus', fetcherMasterMilitary);

    if (error1 || error2 || error3) return <div>Error fetching data</div>;
    if (!data1 || !data2 || !data3) return <div></div>;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 sm:grid-cols-2 gap-4">
                    <div className="col-span-4 sm:col-span-full">
                        <p className="text-title">Position Desired<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                        <input type="text" id="positionDesired" name="positionDesired" value={header.positionDesired} maxLength={50} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                    </div>

                    <div className="col-span-2 sm:col-span-full">
                        <p className="text-title">Expected Salary <span className="text-[10px]">(THB)</span></p>
                        <input type="text" id="expectedSalary" name="expectedSalary" value={formData.expectedSalary === null ? '' : formData.expectedSalary} maxLength={6} onChange={handleInputChange} className="input-formcontrol" required />
                    </div>

                    <div className="col-span-4 sm:col-span-full">
                        <p className="text-title">Source of Recruitment</p>
                        <input type="text" id="sourceOfRecruitment" name="sourceOfRecruitment" value={formData.sourceOfRecruitment} maxLength={100} onChange={handleInputChange} className="input-formcontrol" required />
                    </div>

                    <div className="col-span-2 sm:col-span-full">
                        <p className="text-title">Starting Date</p>
                        <input type="date" id="startingDate" name="startingDate" value={formData.startingDate === null ? '' : formData.startingDate} onChange={handleInputChange} className="input-formcontrol" required />
                    </div>
                </div>

                <div className="grid grid-cols-12 sm:grid-cols-2 gap-4 mt-6">
                    <div className="col-span-4 sm:col-span-full">
                        <p className="text-title">ID Card / Passport</p>
                        <select id="selectIDPP" name="selectIDPP" className="input-formcontrol px-2" value={formData.selectIDPP} onChange={handleInputChange} required>
                            <option value="">Select</option>
                            <option value="ID Card">ID Card / บัตรประจำตัวประชาชน</option>
                            <option value="Passport">Passport / หนังสือเดินทาง</option>
                        </select>
                    </div>

                    {
                        formData.selectIDPP == 'ID Card' ?
                            <>
                                <div className="col-span-2 sm:col-span-full">
                                    <p className="text-title">ID Card Number</p>
                                    <input type="text" id="idCardno" name="idCardno" value={textInputIDCard} maxLength={13} onChange={handleInputChange} className="input-formcontrol" required />
                                </div>

                                <div className="col-span-2 sm:col-span-full">
                                    <p className="text-title">Passport Number<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    <input type="text" id="idPassportno" name="idPassportno" value={formData.idPassportno} maxLength={9} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                                </div>
                            </>
                            :
                            formData.selectIDPP == 'Passport' ?
                                <>
                                    <div className="col-span-2 sm:col-span-full">
                                        <p className="text-title">ID Card Number<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <input type="text" id="idCardno" name="idCardno" value={formData.idCardno} maxLength={13} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                                    </div>

                                    <div className="col-span-2 sm:col-span-full">
                                        <p className="text-title">Passport Number</p>
                                        <input type="text" id="idPassportno" name="idPassportno" value={textInputPassport} maxLength={9} onChange={handleInputChange} className="input-formcontrol" required />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-span-2 sm:col-span-full">
                                        <p className="text-title">ID Card Number<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <input type="text" id="idCardno" name="idCardno" value={formData.idCardno} maxLength={13} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                                    </div>

                                    <div className="col-span-2 sm:col-span-full">
                                        <p className="text-title">Passport Number<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <input type="text" id="idPassportno" name="idPassportno" value={formData.idPassportno} maxLength={9} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                                    </div>
                                </>
                    }

                    <div className="col-span-2 sm:col-span-full">
                        <p className="text-title">Nationality</p>
                        <input type="text" id="nationality" name="nationality" value={formData.nationality} maxLength={20} onChange={handleInputChange} className="input-formcontrol" required />
                    </div>

                    <div className="col-span-2 sm:col-span-full">
                        <p className="text-title">Blood Group</p>
                        <select id="bloodGroup" name="bloodGroup" className="input-formcontrol px-2" value={formData.bloodGroup} onChange={handleInputChange} required>
                            <option value="">Select</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="O">O</option>
                            <option value="AB">AB</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4 mt-6">
                    {
                        formData.selectIDPP == 'ID Card' ?
                            <>
                                <div className="col-span-2 sm:col-span-full">
                                    <p className="text-title">Title TH</p>
                                    <select id="prefixth" name="prefixth" className="input-formcontrol px-2" value={formData.prefixth} onChange={handleInputChange} required>
                                        <option value="">Select</option>
                                        {data1.map((item: any) => (
                                            <option key={item.prefixTH} value={item.prefixTH}>
                                                {item.prefixTH}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-4  sm:col-span-full">
                                    <p className="text-title">First Name TH</p>
                                    <input type="text" id="firstnameth" name="firstnameth" value={textInputFirstnameTH} maxLength={50} onChange={handleInputChange} className="input-formcontrol" required />
                                </div>

                                <div className="col-span-4 sm:col-span-full ">
                                    <p className="text-title">Last Name TH</p>
                                    <input type="text" id="lastnameth" name="lastnameth" value={textInputLastnameTH} maxLength={50} onChange={handleInputChange} className="input-formcontrol" required />
                                </div>

                                <div className="col-span-2 sm:col-span-full">
                                    <p className="text-title">Nick Name TH</p>
                                    <input type="text" id="nicknameth" name="nicknameth" value={textInputNicknameTH} maxLength={15} onChange={handleInputChange} className="input-formcontrol" required />
                                </div>
                            </>
                            :
                            <>
                                <div className="col-span-2 sm:col-span-full ">
                                    <p className="text-title">Title TH<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    <select id="prefixth" name="prefixth" className="input-formcontrol px-2 cursor-no-drop" value={formData.prefixth} onChange={handleInputChange} disabled>
                                        <option value="">Select</option>
                                        {data1.map((item: any) => (
                                            <option key={item.prefixTH} value={item.prefixTH}>
                                                {item.prefixTH}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-4 sm:col-span-full ">
                                    <p className="text-title">First Name TH<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    <input type="text" id="firstnameth" name="firstnameth" value={formData.firstnameth} maxLength={50} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                                </div>

                                <div className="col-span-4 sm:col-span-full ">
                                    <p className="text-title">Last Name TH<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    <input type="text" id="lastnameth" name="lastnameth" value={formData.lastnameth} maxLength={50} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                                </div>

                                <div className="col-span-2 sm:col-span-full">
                                    <p className="text-title">Nick Name TH<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    <input type="text" id="nicknameth" name="nicknameth" value={formData.nicknameth} maxLength={15} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                                </div>
                            </>
                    }
                </div>

                <div className="grid grid-cols-12 gap-4 mt-6">
                    <div className="col-span-2 sm:col-span-full ">
                        <p className="text-title">Title EN</p>
                        <select id="prefixeng" name="prefixeng" className="input-formcontrol px-2" value={formData.prefixeng} onChange={handleInputChange}>
                            <option value="">Select</option>
                            {data2.map((item: any) => (
                                <option key={item.prefixENG} value={item.prefixENG}>
                                    {item.prefixENG}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-4 sm:col-span-full ">
                        <p className="text-title">First Name EN</p>
                        <input type="text" id="firstnameeng" name="firstnameeng" value={textInputFirstnameEN} maxLength={50} onChange={handleInputChange} className="input-formcontrol" />
                    </div>

                    <div className="col-span-4 sm:col-span-full ">
                        <p className="text-title">Last Name EN</p>
                        <input type="text" id="lastnameeng" name="lastnameeng" value={textInputLastnameEN} maxLength={50} onChange={handleInputChange} className="input-formcontrol" />
                    </div>

                    <div className="col-span-2 sm:col-span-full">
                        <p className="text-title">Nick Name EN</p>
                        <input type="text" id="nicknameeng" name="nicknameeng" value={textInputNicknameEN} maxLength={15} onChange={handleInputChange} className="input-formcontrol" />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4 mt-6">
                    <div className="col-span-2 sm:col-span-full ">
                        <p className="text-title">Date of Birth</p>
                        <input type="date" id="dateofBirth" name="dateofBirth" value={formData.dateofBirth === null ? '' : formData.dateofBirth} onChange={handleInputChange} className="input-formcontrol" required />
                    </div>

                    <div className="col-span-4 sm:col-span-full ">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-4 sm:col-span-full ">
                                <p className="text-title">Age</p>
                                <input type="text" id="age" name="age" value={formData.age === null ? '' : formData.age} maxLength={3} onChange={handleInputChange} className="input-formcontrol" required />
                            </div>
                            <div className="col-span-4 sm:col-span-full ">
                                <p className="text-title">Height</p>
                                <input type="text" id="height" name="height" value={formData.height === null ? '' : formData.height} maxLength={3} onChange={handleInputChange} className="input-formcontrol" required />
                            </div>
                            <div className="col-span-4 sm:col-span-full ">
                                <p className="text-title">Weight</p>
                                <input type="text" id="weight" name="weight" value={formData.weight === null ? '' : formData.weight} maxLength={3} onChange={handleInputChange} className="input-formcontrol" required />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 sm:col-span-full ">
                        <p className="text-title">Email</p>
                        <input type="text" id="email" name="email" value={formData.email} maxLength={50} onChange={handleInputChange} className="input-formcontrol" required />
                    </div>

                    <div className="col-span-2 sm:col-span-full ">
                        <p className="text-title">Mobile Number</p>
                        <input type="text" id="mobileno" name="mobileno" value={formData.mobileno} maxLength={10} onChange={handleInputChange} className="input-formcontrol" required />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4 mt-6">
                    {
                        formData.prefixth == 'นาย' || formData.prefixeng == 'Mr.' ?
                            <>
                                <div className="col-span-4 sm:col-span-full ">
                                    <p className="text-title">Military Status</p>
                                    <select id="militaryStatus" name="militaryStatus" className="input-formcontrol px-2" value={formData.militaryStatus} onChange={handleInputChange} required>
                                        <option value="">Select</option>
                                        {data3.map((item: any) => (
                                            <option key={item.militaryStatus} value={item.militaryStatus}>
                                                {item.militaryStatus}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                            :
                            <>
                                <div className="col-span-4 sm:col-span-full ">
                                    <p className="text-title">Military Status<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    <select id="militaryStatus" name="militaryStatus" className="input-formcontrol px-2 cursor-no-drop" value={formData.militaryStatus} onChange={handleInputChange} disabled>
                                        <option value="">Select</option>
                                        {data3.map((item: any) => (
                                            <option key={item.militaryStatus} value={item.militaryStatus}>
                                                {item.militaryStatus}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                    }

                    <div className="col-span-3 sm:col-span-full ">
                        <p className="text-title">Address Status</p>
                        <select id="ownerorRental" name="ownerorRental" className="input-formcontrol px-2" value={formData.ownerorRental} onChange={handleInputChange} required>
                            <option value="">SELECT</option>
                            <option value="Own House">Own House / เจ้าของ</option>
                            <option value="Rental">Rental / เช่า</option>
                        </select>
                    </div>

                    <div className="col-span-5 sm:col-span-full ">
                        <p className="text-title">Permanent Address</p>
                        <input type="text" id="permanentAddress" name="permanentAddress" value={formData.permanentAddress} maxLength={200} onChange={handleInputChange} className="input-formcontrol" />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4 mt-6">
                    <div className="col-span-3 sm:col-span-full">
                        <p className="text-title">Present Addess</p>
                        <select id="samePresentaddress" name="samePresentaddress" className="input-formcontrol px-2" value={formData.samePresentaddress} onChange={handleInputChange} required>
                            <option value="">SELECT</option>
                            <option value="Y">Same as Permanent / ตามทะเบียนบ้าน</option>
                            <option value="N">Other / อื่นๆ</option>
                        </select>
                    </div>

                    <div className="col-span-5 sm:col-span-full ">
                        {
                            formData.samePresentaddress === "N" ?
                                <>
                                    <p className="text-title">Present Address</p>
                                    <input type="text" id="presentAddress" name="presentAddress" value={formData.presentAddress} maxLength={200} onChange={handleInputChange} className="input-formcontrol" />
                                </>
                                :
                                <>
                                    <p className="text-title">Present Address<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    <input type="text" id="presentAddress" name="presentAddress" value={formData.presentAddress} maxLength={200} onChange={handleInputChange} className="input-formcontrol cursor-no-drop" disabled />
                                </>
                        }</div>
                </div>

                <div className="grid grid-cols-12 gap-4 mt-6">
                    <div className="col-span-12 sm:col-span-full">
                        <button type="submit" className="btn btn-purple">Save<MdSaveAs className="inline-flex ms-1" /></button>
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

export default Form1_Body;