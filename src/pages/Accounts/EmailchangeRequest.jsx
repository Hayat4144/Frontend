import React, { Fragment, useState, Suspense, lazy } from 'react'
const Navbar = lazy(() => import('../../layout/Nav/Navbar'))
import NavbarSkeleton from '../../Skeleton/NavbarSkeleton'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'

export default function EmailchangeRequest() {
    const [email, setemail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // submitHandler 
    const SubmitHandler = async () => {
        setIsLoading(!isLoading)
        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/v3/api/user/change/email/request`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                current_email: email
            }),
            credentials: 'include'
        })
        const data = await result.json();
        setIsLoading(false)
        if (result.status === 200) {
            console.log(data)
            setemail('')
            toast.success(data.data, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast.error(data.error, {
                position: 'bottom-center',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
    }
    return (
        <Fragment>
            <Helmet>
                <title>Taj Jwellery | Request Email Change</title>
            </Helmet>
            <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </Suspense>
            <div className="emailchangeRequestpage">
                <div className='text-center page-text mb-5'>
                    <h3 className='mx-4 py-1 text-3xl mt-3 font-[1000]'>Email Change Request</h3>
                </div>

                <div className="emailchange_container sm:mx-auto sm:w-[50%] mt-4 xl:mx-auto xl:w-[30%]  lg:mx-auto 
                    lg:w-[25%] border md:w-[50%] md:m-auto border-gray-300 shadow-lg 
                    rounded-md px-4 mx-3 mb-2">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        SubmitHandler();
                    }}>
                        <div className='Email_field mt-4'>
                            <label className='Email_label text-sm font-medium text-slate-800 block'>
                                Email
                            </label>
                            <input
                                type={'email'}
                                value={email}
                                onChange={(e) => {
                                    setemail(e.target.value)
                                }}
                                className="border border-gray-300 rounded-md my-2 py-[6px] 
                            w-full focus:border-indigo-600 focus:ring-indigo-700 
                            bg-inherit focus:border  px-2 outline-none text-sm text-gray-700
                             placeholder:text-gray-500"
                                placeholder="Enter your email" />
                        </div>
                        <div className='submit_btn my-5'>
                            {!isLoading ? <button type='submit' className='w-full h-10 text-center
                             text-white outline-none  text-bold bg-indigo-800 rounded-md
                              hover:bg-indigo-700'>Submit</button> : <button type="button"
                                className="inline-flex items-center justify-center py-2  leading-4 
                              text-sm shadow rounded-md text-white bg-indigo-800 hover:bg-indigo-900
                               w-full text-center transition ease-in-out duration-150 cursor-not-allowed"
                                disabled="">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-500"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="pacity-25 text-white" cx="12" cy="12" r="10"
                                        stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 
                                    018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
                                    3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing ...
                            </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
