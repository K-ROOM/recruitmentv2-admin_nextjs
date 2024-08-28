"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import axios from "axios";
import { redirect } from "next/navigation";
import { ServerResponse } from "http";

export async function PatchApplicationHeader(obj: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    console.log();

    try {
        const response = await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/rms/' + obj.recruitmentID, obj, { headers })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function PostAndPatchApplicationRelationshipAndAddress(obj_header: any, obj_children: any, obj_sibling: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const data = {
        'header': {
            'maritalStatus': obj_header.maritalStatus,
            'spouseFirstname': obj_header.spouseFirstname,
            'spouseLastname': obj_header.spouseLastname,
            'spouseAge': obj_header.spouseAge,
            'spouseNationality': obj_header.spouseNationality,
            'spouseMobileno': obj_header.spouseMobileno,
            'spousePlaceofWork': obj_header.spousePlaceofWork,
            'spouseOccupation': obj_header.spouseOccupation,
            'children': obj_header.children,
            'childrenNo': obj_header.childrenNo,
            'fatherFirstname': obj_header.fatherFirstname,
            'fatherLastname': obj_header.fatherLastname,
            'fatherAge': obj_header.fatherAge,
            'fatherLivingStatus': obj_header.fatherLivingStatus,
            'fatherOccupation': obj_header.fatherOccupation,
            'fatherPlaceofWork': obj_header.fatherPlaceofWork,
            'fatherMobileno': obj_header.fatherMobileno,
            'motherFirstname': obj_header.motherFirstname,
            'motherLastname': obj_header.motherLastname,
            'motherAge': obj_header.motherAge,
            'motherLivingStatus': obj_header.motherLivingStatus,
            'motherOccupation': obj_header.motherOccupation,
            'motherPlaceofWork': obj_header.motherPlaceofWork,
            'motherMobileno': obj_header.motherMobileno,
            'sibling': obj_header.sibling,
            'siblingNo': obj_header.siblingNo,
            'formStep2': obj_header.formStep2,
            'trackingStatus': obj_header.trackingStatus,
        },
        'rmsChildren': obj_children,
        'rmsSibling': obj_sibling,
    }

    try {
        const response = await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/rms/transaction_step2/' + obj_header.recruitmentID, data, { headers })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function PostAndPatchApplicationEducationAndWorkExperience(obj_header: any, obj_education: any, obj_workexperience: any, obj_internship: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const data = {
        'header': {
            'educationNo': obj_header.educationNo,
            'newGraduate': obj_header.newGraduate,
            'workExperienceNo': obj_header.workExperienceNo,
            'internship': obj_header.internship,
            'internshipNo': obj_header.internshipNo,
            'formStep3': obj_header.formStep3,
            'trackingStatus': obj_header.trackingStatus,
            'presentJobOrProject': obj_header.presentJobOrProject,
        },
        'rmsEducation': obj_education,
        'rmsWorkexperience': obj_workexperience,
        'rmsInternship': obj_internship,
    }

    try {
        const response = await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/rms/transaction_step3/' + obj_header.recruitmentID, data, { headers })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function PostAndPatchApplicationTrainingSeminarAndCertificate(obj_header: any, obj_training: any, obj_certificate: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const data = {
        'header': {
            'trainingSeminar': obj_header.trainingSeminar,
            'trainingSeminarNo': obj_header.trainingSeminarNo,
            'certificate': obj_header.certificate,
            'certificateNo': obj_header.certificateNo,
            'formStep4': obj_header.formStep4,
            'trackingStatus': obj_header.trackingStatus,
        },
        'rmsTrainingseminar': obj_training,
        'rmsCertificate': obj_certificate,
    }

    try {
        const response = await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/rms/transaction_step4/' + obj_header.recruitmentID, data, { headers })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function DeleteApplicationFileupload(obj_header: any, filename: any, filetype: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = {
        Authorization: `Bearer ${access_Token}`
    }
    await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/rms/' + obj_header.recruitmentID + '/' + filename + '/' + filetype, { headers })
    await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/rms/' + obj_header.recruitmentID, obj_header, { headers })

    redirect("/main/application_form/" + obj_header.recruitmentID);
}

export async function DownloadApplicationFileupload(recruitmentID: any, filename: any, filetype: any) {
    const session: any = await getServerSession(authOptions);
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
}

