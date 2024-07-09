"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Form_Header = ({ header }: any) => {

    return (
        <>
            <div className="grid grid-cols-12 gap-2 my-4">
                <div className="col-span-10 col-start-3 ml-2 mb-4">
                        {
                                header.formStep1 === false && header.formStep2 === false && header.formStep3 === false && header.formStep4 === false && header.formStep5 === false && header.formStep6 === false && header.formStep7 === false && header.formStep8 === false ?
                                <>
                                    <p className="text-lg font-bold text-gray-700">Personal Details</p>
                                </>
                                :
                                header.formStep1 === true && header.formStep2 === false && header.formStep3 === false && header.formStep4 === false && header.formStep5 === false && header.formStep6 === false && header.formStep7 === false && header.formStep8 === false ?
                                <>
                                    <p className="text-base font-medium inline-flex text-gray-700">Relationship and Address</p>
                                    {
                                        header.formStep2_1 === false && header.formStep2_2 === false && header.formStep2_3 === false && header.formStep2_4 === false && header.formStep2_5 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">1 of 5</p>
                                        </>
                                        :
                                        header.formStep2_1 === true && header.formStep2_2 === false && header.formStep2_3 === false && header.formStep2_4 === false && header.formStep2_5 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">2 of 5</p>
                                        </>
                                        :
                                        header.formStep2_1 === true && header.formStep2_2 === true && header.formStep2_3 === false && header.formStep2_4 === false && header.formStep2_5 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">3 of 5</p>
                                        </>
                                        :
                                        header.formStep2_1 === true && header.formStep2_2 === true && header.formStep2_3 === true && header.formStep2_4 === false && header.formStep2_5 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">4 of 5</p>
                                        </>
                                        :
                                        header.formStep2_1 === true && header.formStep2_2 === true && header.formStep2_3 === true && header.formStep2_4 === true && header.formStep2_5 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">5 of 5</p>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                </>
                                :
                                header.formStep1 === true && header.formStep2 === true && header.formStep3 === false && header.formStep4 === false && header.formStep5 === false && header.formStep6 === false && header.formStep7 === false && header.formStep8 === false ?
                                <>
                                    <p className="text-base font-medium inline-flex text-gray-700">Education and Work</p>
                                    {
                                        header.formStep3_1 === false && header.formStep3_2 === false && header.formStep3_3 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">1 of 3</p>
                                        </>
                                        :
                                        header.formStep3_1 === true && header.formStep3_2 === false && header.formStep3_3 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">2 of 3</p>
                                        </>
                                        :
                                        header.formStep3_1 === true && header.formStep3_2 === true && header.formStep3_3 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">3 of 3</p>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                </>
                                :
                                header.formStep1 === true && header.formStep2 === true && header.formStep3 === true && header.formStep4 === false && header.formStep5 === false && header.formStep6 === false && header.formStep7 === false && header.formStep8 === false ?
                                <>
                                    <p className="text-base font-medium inline-flex text-gray-700">Training and Seminar</p>
                                    {
                                        header.formStep4_1 === false && header.formStep4_2 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">1 of 2</p>
                                        </>
                                        :
                                        header.formStep4_1 === true && header.formStep4_2 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">2 of 2</p>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                </>
                                :
                                header.formStep1 === true && header.formStep2 === true && header.formStep3 === true && header.formStep4 === true && header.formStep5 === false && header.formStep6 === false && header.formStep7 === false && header.formStep8 === false ?
                                <>
                                    <p className="text-base font-medium inline-flex text-gray-700">Language and Ability</p>
                                    {
                                        header.formStep5_1 === false && header.formStep5_2 === false && header.formStep5_3 === false && header.formStep5_4 === false && header.formStep5_5 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">1 of 5</p>
                                        </>
                                        :
                                        header.formStep5_1 === true && header.formStep5_2 === false && header.formStep5_3 === false && header.formStep5_4 === false && header.formStep5_5 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">2 of 5</p>
                                        </>
                                        :
                                        header.formStep5_1 === true && header.formStep5_2 === true && header.formStep5_3 === false && header.formStep5_4 === false && header.formStep5_5 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">3 of 5</p>
                                        </>
                                        :
                                        header.formStep5_1 === true && header.formStep5_2 === true && header.formStep5_3 === true && header.formStep5_4 === false && header.formStep5_5 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">4 of 5</p>
                                        </>
                                        :
                                        header.formStep5_1 === true && header.formStep5_2 === true && header.formStep5_3 === true && header.formStep5_4 === true && header.formStep5_5 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">5 of 5</p>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                </>
                                :
                                header.formStep1 === true && header.formStep2 === true && header.formStep3 === true && header.formStep4 === true && header.formStep5 === true && header.formStep6 === false && header.formStep7 === false && header.formStep8 === false ?
                                <>
                                    <p className="text-base font-medium inline-flex text-gray-700">Question and References</p>
                                    {
                                        header.formStep6_1 === false && header.formStep6_2 === false && header.formStep6_3 === false && header.formStep6_4 === false && header.formStep6_5 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">1 of 5</p>
                                        </>
                                        :
                                        header.formStep6_1 === true && header.formStep6_2 === false && header.formStep6_3 === false && header.formStep6_4 === false && header.formStep6_5 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">2 of 5</p>
                                        </>
                                        :
                                        header.formStep6_1 === true && header.formStep6_2 === true && header.formStep6_3 === false && header.formStep6_4 === false && header.formStep6_5 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">3 of 5</p>
                                        </>
                                        :
                                        header.formStep6_1 === true && header.formStep6_2 === true && header.formStep6_3 === true && header.formStep6_4 === false && header.formStep6_5 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">4 of 5</p>
                                        </>
                                        :
                                        header.formStep6_1 === true && header.formStep6_2 === true && header.formStep6_3 === true && header.formStep6_4 === true && header.formStep6_5 === false ?
                                        <>
                                            <p className="text-xs font-normal inline-flex text-gray-600 ml-3">5 of 5</p>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                </>
                                :
                                header.formStep1 === true && header.formStep2 === true && header.formStep3 === true && header.formStep4 === true && header.formStep5 === true && header.formStep6 === true && header.formStep7 === false && header.formStep8 === false ?
                                <>
                                    <p className="text-base font-medium inline-flex text-gray-700">Profile and Attachment</p>
                                </>
                                :
                                header.formStep1 === true && header.formStep2 === true && header.formStep3 === true && header.formStep4 === true && header.formStep5 === true && header.formStep6 === true && header.formStep7 === true && header.formStep8 === false ?
                                <>
                                    <p className="text-base font-medium inline-flex text-gray-700">Terms and Conditions</p>
                                </>
                                :
                                header.formStep1 === true && header.formStep2 === true && header.formStep3 === true && header.formStep4 === true && header.formStep5 === true && header.formStep6 === true && header.formStep7 === true && header.formStep8 === true ?
                                <>
                                    <p className="text-base font-medium inline-flex text-gray-700">Confirm Information</p>
                                </>
                                :
                                <>
                                </>
                            }
                        </div>
                    </div>
        </>
    );
};
  
export default Form_Header;