"use client";

const backPage = () => {
    window.location.href="/"
}

const FormSignup_Navbar = () => {

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                    <div className="flex text-sm bg-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <button type="button" className="text-gray-800 font-medium text-xs py-2text-center" onClick={backPage}>
                            <svg className="w-6 h-6 inline-flex text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="1 2 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                            </svg>
                            <p className="pl-2 inline-flex">back</p>
                        </button>
                    </div>
                    
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"></div>
                </div>
            </nav>
        </>
    );
};
  
export default FormSignup_Navbar;