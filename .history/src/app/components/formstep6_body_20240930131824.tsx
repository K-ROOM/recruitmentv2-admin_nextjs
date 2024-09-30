"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import useSWR from "swr";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { PatchApplicationHeader } from "../actions/actionForm";
import moment from "moment";
import { MdSaveAs } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";

const Form6_Body1 = ({ session, header }: any) => {

    const [formData, setformData] = useState({
        recruitmentID: header.recruitmentID,
        workUpcountry: header.workUpcountry,
        overseastripandTraining: header.overseastripandTraining,
        underlyingDisease: header.underlyingDisease,
        underlyingDiseaseDetail: header.underlyingDiseaseDetail,
        physicalDisability: header.physicalDisability,
        physicalDisabilityDetail: header.physicalDisabilityDetail,
        lawsuitorConvicted: header.lawsuitorConvicted,
        lawsuitorConvictedDetail: header.lawsuitorConvictedDetail,
        sackedFromJob: header.sackedFromJob,
        workingOverTime: header.workingOverTime,
        usedtoWorkinNEC: header.usedtoWorkinNEC,
        foRinNEC: header.foRinNEC,
        foRinNECname: header.foRinNECname,
        foRinNECposition: header.foRinNECposition,
        foRinNECrelationship: header.foRinNECrelationship,
        joinOurCompany: header.joinOurCompany,
        firstnameRef: header.firstnameRef,
        lastnameRef: header.lastnameRef,
        addressRef: header.addressRef,
        telephoneRef: header.telephoneRef,
        occupationRef: header.occupationRef,
        firstnameEmergency: header.firstnameEmergency,
        lastnameEmergency: header.lastnameEmergency,
        relationshipEmergency: header.relationshipEmergency,
        addressEmergency: header.addressEmergency,
        telnoEmergency: header.telnoEmergency,
        inquiriesFromPreEmp: header.inquiriesFromPreEmp,
        trackingStatus: header.trackingStatus,
        hr_SubmitStatus: header.hr_SubmitStatus,
    });

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);

    const handleChangeHeader = (e: any) => {
        const { name, value } = e.target;
        const inputText = e.target.value;
        const numbersOnly = inputText.replaceAll(/\D/g, '');
        if (name === 'underlyingDisease') {
            if (value === 'Y') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else {
                setformData((prevData) => ({
                    ...prevData,
                    underlyingDisease: value,
                    underlyingDiseaseDetail: '',
                }));
            }
        } else if (name === 'physicalDisability') {
            if (value === 'Y') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else {
                setformData((prevData) => ({
                    ...prevData,
                    physicalDisability: value,
                    physicalDisabilityDetail: '',
                }));
            }
        } else if (name === 'lawsuitorConvicted') {
            if (value === 'Y') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else {
                setformData((prevData) => ({
                    ...prevData,
                    lawsuitorConvicted: value,
                    lawsuitorConvictedDetail: '',
                }));
            }
        } else if (name === 'foRinNEC') {
            if (value === 'Y') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else {
                setformData((prevData) => ({
                    ...prevData,
                    foRinNEC: value,
                    foRinNECname: '',
                    foRinNECposition: '',
                    foRinNECrelationship: '',
                }));
            }
        } else if (name === 'telephoneRef') {
            setformData((prevData) => ({
                ...prevData,
                [name]: numbersOnly,
            }));
        } else if (name === 'telnoEmergency') {
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (formData.underlyingDisease === 'N') {
            formData.underlyingDiseaseDetail = null;
        }
        if (formData.physicalDisability === 'N') {
            formData.physicalDisabilityDetail = null;
        }
        if (formData.lawsuitorConvicted === 'N') {
            formData.lawsuitorConvictedDetail = null;
        }
        if (formData.foRinNEC === 'N') {
            formData.foRinNECname = null;
            formData.foRinNECposition = null;
            formData.foRinNECrelationship = null;
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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="col-span-10">
                    <div className="grid grid-cols-12 mb-6 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-purple-100 border-purple-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Question and answer</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-4 mr-2 mt-1">
                            <p className="text-title">Are you willing to work upcountry if necessary ?</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <select id="workUpcountry" name="workUpcountry" value={formData.workUpcountry} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Yes / ได้</option>
                                <option value="N">No / ไม่ได้</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mt-6 gap-2">
                        <div className="col-span-4 mr-2 mt-1">
                            <p className="text-title">Are you free for overseas trip and training ?</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <select id="overseastripandTraining" name="overseastripandTraining" value={formData.overseastripandTraining} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Yes / ได้</option>
                                <option value="N">No / ไม่ได้</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mt-6 gap-2">
                        <div className="col-span-4 mr-2 mt-1">
                            <p className="text-title">What underlying disease do you have ?</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <select id="underlyingDisease" name="underlyingDisease" value={formData.underlyingDisease} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Have / มี</option>
                                <option value="N">Do not have / ไม่มี</option>
                            </select>
                        </div>

                        {
                            formData.underlyingDisease === "Y" ?
                                <>
                                    <div className="col-span-1 mr-2 mt-1"></div>

                                    <div className="col-span-2 mr-2 mt-1">
                                        <p className="text-title">Please specify</p>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <input type="text" id="underlyingDiseaseDetail" name="underlyingDiseaseDetail" value={formData.underlyingDiseaseDetail} maxLength={50} onChange={handleChangeHeader} className="input-formcontrol" required />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-span-1 mr-2 mt-1"></div>

                                    <div className="col-span-2 mr-2 mt-1">
                                        <p className="text-title">Please specify<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    </div>

                                    <div className="col-span-2 inline-flex mr-2">
                                        <input type="text" id="underlyingDiseaseDetail" name="underlyingDiseaseDetail" value={formData.underlyingDiseaseDetail} maxLength={50} onChange={handleChangeHeader} className="input-formcontrol cursor-no-drop" disabled />
                                    </div>
                                </>
                        }
                    </div>

                    <div className="grid grid-cols-12 mt-6 gap-2">
                        <div className="col-span-4 mr-2 mt-1">
                            <p className="text-title">Have you are any physical disability ?</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <select id="physicalDisability" name="physicalDisability" value={formData.physicalDisability} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Have / มี</option>
                                <option value="N">Do not have / ไม่มี</option>
                            </select>
                        </div>

                        {
                            formData.physicalDisability === "Y" ?
                                <>
                                    <div className="col-span-1 mr-2 mt-1"></div>

                                    <div className="col-span-2 mr-2 mt-1">
                                        <p className="text-title">Please specify</p>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <input type="text" id="physicalDisabilityDetail" name="physicalDisabilityDetail" value={formData.physicalDisabilityDetail} maxLength={50} onChange={handleChangeHeader} className="input-formcontrol" required />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-span-1 mr-2 mt-1"></div>

                                    <div className="col-span-2 mr-2 mt-1">
                                        <p className="text-title">Please specify<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    </div>

                                    <div className="col-span-2 inline-flex mr-2">
                                        <input type="text" id="physicalDisabilityDetail" name="physicalDisabilityDetail" value={formData.physicalDisabilityDetail} maxLength={50} onChange={handleChangeHeader} className="input-formcontrol cursor-no-drop" disabled />
                                    </div>
                                </>
                        }
                    </div>

                    <div className="grid grid-cols-12 mt-6 gap-2">
                        <div className="col-span-4 mr-2 mt-1">
                            <p className="text-title">Have you ever been charged with a criminal charged ?</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <select id="lawsuitorConvicted" name="lawsuitorConvicted" value={formData.lawsuitorConvicted} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Ever / เคย</option>
                                <option value="N">Never / ไม่เคย</option>
                            </select>
                        </div>

                        {
                            formData.lawsuitorConvicted === "Y" ?
                                <>
                                    <div className="col-span-1 mr-2 mt-1"></div>

                                    <div className="col-span-2 mr-2 mt-1">
                                        <p className="text-title">Please specify</p>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <input type="text" id="lawsuitorConvictedDetail" name="lawsuitorConvictedDetail" value={formData.lawsuitorConvictedDetail} maxLength={50} onChange={handleChangeHeader} className="input-formcontrol" required />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-span-1 mr-2 mt-1"></div>

                                    <div className="col-span-2 mr-2 mt-1">
                                        <p className="text-title">Please specify<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                    </div>

                                    <div className="col-span-2 inline-flex mr-2">
                                        <input type="text" id="lawsuitorConvictedDetail" name="lawsuitorConvictedDetail" value={formData.lawsuitorConvictedDetail} maxLength={50} onChange={handleChangeHeader} className="input-formcontrol cursor-no-drop" disabled />
                                    </div>
                                </>
                        }
                    </div>

                    <div className="grid grid-cols-12 mt-6 gap-2">
                        <div className="col-span-4 mr-2 mt-1">
                            <p className="text-title">Have you ever been fired from a job ?</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <select id="sackedFromJob" name="sackedFromJob" value={formData.sackedFromJob} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Ever / เคย</option>
                                <option value="N">Never / ไม่เคย</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mt-6 gap-2">
                        <div className="col-span-4 mr-2 mt-1">
                            <p className="text-title">If you work in this company, You can working overtime ?</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <select id="workingOverTime" name="workingOverTime" value={formData.workingOverTime} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Yes / ได้</option>
                                <option value="N">No / ไม่ได้</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mt-6 gap-2">
                        <div className="col-span-4 mr-2 mt-1">
                            <p className="text-title">Do you used to work in nec group of companies ?</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <select id="usedtoWorkinNEC" name="usedtoWorkinNEC" value={formData.usedtoWorkinNEC} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Ever / เคย</option>
                                <option value="N">Never / ไม่เคย</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-7 mr-2 mt-1">
                            <p className="text-title">Do you have any friend of relative presently - employed by nec/nippon express group of companies ?</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <select id="foRinNEC" name="foRinNEC" value={formData.foRinNEC} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Have / มี</option>
                                <option value="N">Do not have / ไม่มี</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2">
                        {
                            formData.foRinNEC === "Y" ?
                                <>
                                    <div className="col-span-4 mt-6 mr-2">
                                        <p className="text-title">Full Name</p>
                                        <input type="text" id="foRinNECname" name="foRinNECname" value={formData.foRinNECname} maxLength={100} onChange={handleChangeHeader} className="input-formcontrol" required />
                                    </div>

                                    <div className="col-span-3 mt-6 mr-2">
                                        <p className="text-title">Position</p>
                                        <input type="text" id="foRinNECposition" name="foRinNECposition" value={formData.foRinNECposition} maxLength={50} onChange={handleChangeHeader} className="input-formcontrol" required />
                                    </div>

                                    <div className="col-span-2 mt-6 mr-2">
                                        <p className="text-title">Relationship</p>
                                        <input type="text" id="foRinNECrelationship" name="foRinNECrelationship" value={formData.foRinNECrelationship} maxLength={20} onChange={handleChangeHeader} className="input-formcontrol" required />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-span-4 mt-6 mr-2">
                                        <p className="text-title">Full Name<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <input type="text" id="foRinNECname" name="foRinNECname" value={formData.foRinNECname} maxLength={100} onChange={handleChangeHeader} className="input-formcontrol cursor-no-drop" disabled />
                                    </div>

                                    <div className="col-span-3 mt-6 mr-2">
                                        <p className="text-title">Position<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <input type="text" id="foRinNECposition" name="foRinNECposition" value={formData.foRinNECposition} maxLength={50} onChange={handleChangeHeader} className="input-formcontrol" disabled />
                                    </div>

                                    <div className="col-span-2 mt-6 mr-2">
                                        <p className="text-title">Relationship<IoLockClosed className="inline-flex text-red-500 text-[12px] ms-1" /></p>
                                        <input type="text" id="foRinNECrelationship" name="foRinNECrelationship" value={formData.foRinNECrelationship} maxLength={20} onChange={handleChangeHeader} className="input-formcontrol" disabled />
                                    </div>
                                </>
                        }
                    </div>

                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-9 mt-6 mr-2">
                            <p className="text-title">Provide your reason for interesting to join our company ?</p>
                            <textarea id="joinOurCompany" name="joinOurCompany" value={formData.joinOurCompany} maxLength={500} onChange={handleChangeHeader} rows={16} cols={50} className="input-formcontrol resize-none" />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 my-6 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-purple-100 border-purple-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Applicant personal references</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mt-6 gap-2">
                        <div className="col-span-3 mr-2">
                            <p className="text-title">First Name</p>
                            <input type="text" id="firstnameRef" name="firstnameRef" value={formData.firstnameRef} maxLength={50} onChange={handleChangeHeader} className="input-formcontrol" />
                        </div>

                        <div className="col-span-3 mr-2">
                            <p className="text-title">Last Name</p>
                            <input type="text" id="lastnameRef" name="lastnameRef" value={formData.lastnameRef} maxLength={50} onChange={handleChangeHeader} className="input-formcontrol" />
                        </div>

                        <div className="col-span-6">
                            <p className="text-title">Address</p>
                            <input type="text" id="addressRef" name="addressRef" value={formData.addressRef} maxLength={150} onChange={handleChangeHeader} className="input-formcontrol" />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mt-6 gap-2">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Mobile Number</p>
                            <input type="text" id="telephoneRef" name="telephoneRef" value={formData.telephoneRef} maxLength={10} onChange={handleChangeHeader} className="input-formcontrol" />
                        </div>

                        <div className="col-span-4 mr-2">
                            <p className="text-title">Occupation</p>
                            <input type="text" id="occupationRef" name="occupationRef" value={formData.occupationRef} maxLength={10} onChange={handleChangeHeader} className="input-formcontrol" />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 my-6 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-purple-100 border-purple-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Applicant in case of emergency notify</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mt-6 gap-2">
                        <div className="col-span-3 mr-2">
                            <p className="text-title">First Name</p>
                            <input type="text" id="firstnameEmergency" name="firstnameEmergency" value={formData.firstnameEmergency} maxLength={50} onChange={handleChangeHeader} className="input-formcontrol" />
                        </div>

                        <div className="col-span-3 mr-2">
                            <p className="text-title">Last Name</p>
                            <input type="text" id="lastnameEmergency" name="lastnameEmergency" value={formData.lastnameEmergency} maxLength={50} onChange={handleChangeHeader} className="input-formcontrol" />
                        </div>

                        <div className="col-span-6">
                            <p className="text-title">Address</p>
                            <input type="text" id="addressEmergency" name="addressEmergency" value={formData.addressEmergency} maxLength={150} onChange={handleChangeHeader} className="input-formcontrol" />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mt-6 gap-2">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Mobile Number</p>
                            <input type="text" id="telnoEmergency" name="telnoEmergency" value={formData.telnoEmergency} maxLength={10} onChange={handleChangeHeader} className="input-formcontrol" />
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Relationship</p>
                            <input type="text" id="relationshipEmergency" name="relationshipEmergency" value={formData.relationshipEmergency} maxLength={20} onChange={handleChangeHeader} className="input-formcontrol" />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-5 mt-1 mr-2">
                            <p className="text-title">May inquiries be made from your present employer ?</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <select id="inquiriesFromPreEmp" name="inquiriesFromPreEmp" value={formData.inquiriesFromPreEmp} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Yes / ได้</option>
                                <option value="N">No / ไม่ได้</option>
                            </select>
                        </div>
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
                                                        <Image src="/error.gif" alt="Loading..." style={{ width: 100, height: 100 }} />
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

export default Form6_Body1;