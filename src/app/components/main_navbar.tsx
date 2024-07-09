"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Profile_Image from "./profile_image";

const MainNavbar = () => {

    const { data: session }: any = useSession()

    const home = () => {
        window.location.href = "/main"
    }

    const position = () => {
        window.location.href = "/main/master_position"
    }

    const education = () => {
        window.location.href = "/main/master_education"
    }

    const account = () => {
        window.location.href = "/main/account"
    }

    return (
        <>
            <div className="container mx-auto px-8 pt-8">
                <nav className="dark:bg-gray-900">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                        <div className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <Profile_Image name={session?.firstname + ' ' + session?.lastname} />
                            <p className="font-medium text-xs text-gray-800 pt-4 pl-4">{session?.firstname} {session?.lastname}</p>
                        </div>

                        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <button type="button" className="text-gray-800 font-medium text-xs py-2 text-center" onClick={home}>
                                Home
                            </button>
                            <div className="px-6"></div>
                            <button type="button" className="text-gray-800 font-medium text-xs py-2 text-center" onClick={position}>
                                Position
                            </button>
                            <div className="px-6"></div>
                            <button type="button" className="text-gray-800 font-medium text-xs py-2 text-center" onClick={education}>
                                Education
                            </button>
                            <div className="px-6"></div>
                            <button type="button" className="text-gray-800 font-medium text-xs py-2 text-center" onClick={account}>
                                Account
                            </button>
                            <div className="px-6"></div>
                            <button type="button" className="text-gray-800 font-medium text-xs py-2 text-center" onClick={() => signOut({ callbackUrl: 'http://localhost:3002' })}>
                                Sign out
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default MainNavbar;