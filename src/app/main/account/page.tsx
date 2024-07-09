"use server";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import PermissionDenied from "@/app/components/permission_denied";
import { Suspense } from "react";
import Loading from "@/app/loading";
import MainNavbar from "@/app/components/main_navbar";
import AccountBody from "@/app/components/account_body";
import Login from "@/app/components/login";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export default async function Account() {
  const session = await getServerSession(authOptions)
  if (session) {
    return (
      <>
        <Suspense fallback={ <Loading /> }>
          <MainNavbar />
          <AccountBody session={session} />
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
