"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/auth";
import { Suspense } from "react";
import Loading from "../../../app/loading";
import MainNavbar from "../../../app/components/main_navbar";
import Login from "../../../app/components/login";
import MasterPosition_Body from "../../../app/components/master_position_body";

export default async function Master() {
  const session = await getServerSession(authOptions)
  if (session) {
    return (
      <>
        <Suspense fallback={ <Loading /> }>
          <MainNavbar />
          <MasterPosition_Body session={session} />
        </Suspense>
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
