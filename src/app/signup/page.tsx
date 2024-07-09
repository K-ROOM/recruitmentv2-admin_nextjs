import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import FormSignup_Header from "../components/formsignup_header";
import FormSignup_Navbar from "../components/formsignup_navbar";
import FormSignup_Body from "../components/formsignup_body";

export default async function Signup() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/main");
  } else {
    return (
      <>
        <FormSignup_Navbar />
        <FormSignup_Header />
        <FormSignup_Body />
      </>
    )
  }
}