"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import axios from "axios";
import { redirect } from "next/navigation";
import bcrypt from 'bcrypt';
import { useState } from "react";

export async function CreateApplication(positionDesired: any, username: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = { Authorization: `Bearer ${access_Token}` }
    const data = {
        'positionDesired': positionDesired,
        'email': username,
        'inputBy': username,
        'registrationDate': new Date(),
    }
    const response = await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/rms', data, { headers })
    if (response.status === 201) {
        redirect("/main/application_form/" + response.data.recruitmentID);
    } else {
        redirect("/");
    }
}

export async function CheckAccount(obj: any) {
    try {
        const headers = { 'Content-Type': 'application/json' }
        const response = await axios.get(process.env.NEXT_PUBLIC_API_KEY + '/rmslogin/' + obj, { headers })
        if (response.data != null) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function CreateAccount(obj: any) {
    const hashedPassword = await bcrypt.hash(obj.password, 10);
    const headers = { 'Content-Type': 'application/json' }
    const data = {
        'username': obj.username,
        'password': hashedPassword,
        'firstnameEN': obj.firstnameEN,
        'lastnameEN': obj.lastnameEN,
        'role': 'USER',
    }

    const response = await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/rmslogin', data, { headers })
    if (response.status === 201) {
        redirect("/");
    } else {
        
    }
}