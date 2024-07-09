"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import axios from "axios";
import ApplicationForm_Main from "@/app/components/applicationform_main";
import Login from "@/app/components/login";

export default async function ApplicationForm({ params }: any) {
  const session: any = await getServerSession(authOptions)
  const access_Token = session.accessToken;
  const headers = {
    Authorization: `Bearer ${access_Token}`
  }
  const response = await axios.get(process.env.NEXT_PUBLIC_API_KEY + "/rms/" + params.id, { headers });
  const data = response.data;

  if (session) {
    return (
      <>
        <ApplicationForm_Main session={session} params={params} header={data} />
      </>
    )
  } else {
    return (
      <>
        <Login />
      </>
    )
  }
}