"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import bcrypt from 'bcrypt';
import axios from "axios";

export async function CheckAccount(obj: any) {
    try {
        const headers = { 'Content-Type': 'application/json' }
        const response = await axios.get(process.env.NEXT_PUBLIC_API_KEY + '/rmslogin/admin/' + obj, { headers })
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
        'role': 'ADMIN',
    }
    await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/rmslogin', data, { headers })
}

export async function PatchAccount(obj: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = { Authorization: `Bearer ${access_Token}`, 'Content-Type': 'application/json' }
    const hashedPassword = await bcrypt.hash(obj.password, 10);
    if (obj.password !== '' && obj.password !== null) {
        const data = {
            'password': hashedPassword,
            'firstnameEN': obj.firstnameEN,
            'lastnameEN': obj.lastnameEN,
        }
        await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/rmslogin/' + obj.username, data, { headers })
    } else {
        const data = {
            'firstnameEN': obj.firstnameEN,
            'lastnameEN': obj.lastnameEN,
        }
        await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/rmslogin/' + obj.username, data, { headers })
    }
}

export async function DeleteAccount(username: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = { Authorization: `Bearer ${access_Token}` }
    await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/rmslogin/' + username, { headers })
}