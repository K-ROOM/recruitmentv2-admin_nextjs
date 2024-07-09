"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { format, toZonedTime, fromZonedTime } from 'date-fns-tz';
import axios from "axios";

export async function CreateMasterEducation(obj: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = { Authorization: `Bearer ${access_Token}` }
    await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/master_education/', obj, { headers })
}

export async function MasterEducationToggle(educationEN: any, status: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = { Authorization: `Bearer ${access_Token}` }
    const data = {
        'status': status,
    }
    await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/master_education/' + educationEN, data, { headers })
}

export async function DeleteMasterEducation(educationEN: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = { Authorization: `Bearer ${access_Token}` }
    await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/master_education/' + educationEN, { headers })
}

export async function PostAndPatchMasterPosition(obj: any, obj_details: any, obj_otherdetails: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = { Authorization: `Bearer ${access_Token}` }
    let data: any = '';
    const timeZone = 'Asia/Bangkok';
    const now = new Date();
    const zonedDate = toZonedTime(now, timeZone);
    if (obj.positionStatus === true) {
        data = {
            'positionDesired': obj.positionDesired,
            'propertyAge': obj.propertyAge,
            'propertyEducation': obj.propertyEducation,
            'propertyExp': obj.propertyExp,
            'positionStatus': obj.positionStatus,
            'positionActiveDate': format(zonedDate, 'yyyy-MM-dd HH:mm:ss'),
            'positionDetailNo': obj.positionDetailNo,
            'positionOtherDetailNo': obj.positionOtherDetailNo,
            'salaryMin': obj.salaryMin,
            'salaryMax': obj.salaryMax,
        }
    } else {
        data = {
            'positionDesired': obj.positionDesired,
            'propertyAge': obj.propertyAge,
            'propertyEducation': obj.propertyEducation,
            'propertyExp': obj.propertyExp,
            'positionStatus': obj.positionStatus,
            'positionActiveDate': null,
            'positionDetailNo': obj.positionDetailNo,
            'positionOtherDetailNo': obj.positionOtherDetailNo,
            'salaryMin': obj.salaryMin,
            'salaryMax': obj.salaryMax,
        }
    }

    if (obj.positionID !== null && obj.positionID !== '') {
        await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/master_position/' + obj.positionID, data, { headers })
        if (obj.positionDetailNo !== 0) {
            await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/master_positiondetails/' + obj.positionID, { headers })
            for (let i = 0; i < obj_details.length; i++) {
                const data_details = [{
                    'positionResponsibility': obj_details[i].positionResponsibility,
                    'positionID': obj.positionID,
                }]
                if (!data_details) {
                    await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/master_positiondetails', data_details, { headers })
                } else {
                    await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/master_positiondetails', data_details, { headers })
                }
            }
        } else {
            await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/master_positiondetails/' + obj.positionID, { headers })
        }

        if (obj.positionOtherDetailNo !== 0) {
            await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/master_positionotherdetails/' + obj.positionID, { headers })
            for (let i = 0; i < obj_otherdetails.length; i++) {
                const data_details = [{
                    'propertyOther': obj_otherdetails[i].propertyOther,
                    'positionID': obj.positionID,
                }]
                if (!data_details) {
                    await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/master_positionotherdetails', data_details, { headers })
                } else {
                    await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/master_positionotherdetails', data_details, { headers })
                }
            }
        } else {
            await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/master_positionotherdetails/' + obj.positionID, { headers })
        }
    } else {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/master_position/', data, { headers })
        if (obj.positionDetailNo !== 0) {
            await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/master_positiondetails/' + response.data.positionID, { headers })
            for (let i = 0; i < obj_details.length; i++) {
                const data_details = [{
                    'positionResponsibility': obj_details[i].positionResponsibility,
                    'positionID': response.data.positionID,
                }]
                if (!data_details) {
                    await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/master_positiondetails', data_details, { headers })
                } else {
                    await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/master_positiondetails', data_details, { headers })
                }
            }
        } else {
            await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/master_positiondetails/' + response.data.positionID, { headers })
        }

        if (obj.positionOtherDetailNo !== 0) {
            await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/master_positionotherdetails/' + response.data.positionID, { headers })
            for (let i = 0; i < obj_otherdetails.length; i++) {
                const data_details = [{
                    'propertyOther': obj_otherdetails[i].propertyOther,
                    'positionID': response.data.positionID,
                }]
                if (!data_details) {
                    await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/master_positionotherdetails', data_details, { headers })
                } else {
                    await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/master_positionotherdetails', data_details, { headers })
                }
            }
        } else {
            await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/master_positionotherdetails/' + response.data.positionID, { headers })
        }
    }
}

export async function MasterPositionToggle(positionID: any, status: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = { Authorization: `Bearer ${access_Token}` }
    let data: any = '';
    const timeZone = 'Asia/Bangkok';
    const now = new Date();
    const zonedDate = toZonedTime(now, timeZone);
    if (status === true) {
        data = {
            'positionStatus': status,
            'positionActiveDate': format(zonedDate, 'yyyy-MM-dd HH:mm:ss'),
        }
    } else {
        data = {
            'positionStatus': status,
            'positionActiveDate': null,
        }
    }
    await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/master_position/' + positionID, data, { headers })
}

export async function DeleteMasterPosition(positionID: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = { Authorization: `Bearer ${access_Token}` }
    await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/master_positiondetails/' + positionID, { headers })
    await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/master_positionotherdetails/' + positionID, { headers })
    await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/master_position/' + positionID, { headers })
}
