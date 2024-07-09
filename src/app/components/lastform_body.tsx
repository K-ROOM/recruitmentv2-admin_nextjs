"use client";
import { useState } from "react";
import { PatchApplicationHeader } from "../actions/actionForm";

const Confirm_Body = ({ session, header }: any) => {

    const access_Token = session.accessToken;

    const headers = { 
        Authorization: `Bearer ${access_Token}`
    }

    const my_application = () => {
        window.location.href="/main/my_application"
    }

    return (
        <>  
            <div className="grid grid-cols-12 gap-2 mt-4">
                <div className="col-span-2 mt-1">
                    
                    </div>
                    <div className="col-span-12">

                        <div className="grid grid-cols-12 gap-2 mt-9">
                            <div className="col-span-12"></div>
                            <div className="col-span-12"></div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 mt-6">
                            <div className="col-span-12 text-center">
                                <p className="text-[12px] font-normal text-gray-700">ทางบริษัทได้รับใบสมัครของท่านแล้ว</p>
                                <p className="text-[12px] font-normal text-gray-700">ขอขอบคุณท่าน <b>{header.firstnameth} {header.lastnameth}</b> ที่สนใจร่วมงานกับเรา โปรดรอการติดต่อกลับ</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 mt-6">
                            <div className="col-span-12 text-center">
                                <p className="text-[12px] font-normal inline-flex text-gray-700 mr-1">สามารถเช็คสถานะใบสมัครได้</p>
                                <button type="button" className="text-gray-800 font-bold text-xs py-2 text-center" onClick={my_application}>
                                    ที่นี่
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
};
  
export default Confirm_Body;