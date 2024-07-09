import Login from "./components/login";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/main");
  } else {
    return (
      <>
        <Login />
      </>
    )
  }
}
