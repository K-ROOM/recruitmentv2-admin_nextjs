import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import PermissionDenied from "../components/permission_denied";
import MainNavbar from "../components/main_navbar";
import MainBody from "../components/main_body";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import axios from "axios";
import { Suspense } from "react";
import Loading from "../loading";
import Login from "../components/login";

export default async function Main() {
  const session: any = await getServerSession(authOptions)
  if (session) {
    return (
      <>  
        <Suspense fallback={ <Loading /> }>
          <MainNavbar />
          <MainBody session={session} />
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
