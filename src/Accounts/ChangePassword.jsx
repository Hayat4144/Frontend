import React, { Fragment, useState } from 'react'
import { toast } from 'react-toastify'

export default function ChangePassword() {
    const [currentpassword, setcurrentpassword] = useState('')
    const [newpassword, setNewpassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // submitHandler 
    const SubmitHandler = async () => {
        setIsLoading(!isLoading)
        const result = await fetch('http://localhost:5000/v3/api/user/change/password', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currentpassword,
                newpassword,
                confirmpassword
            }),
            credentials: 'include'
        })
        const data = await result.json();
        setIsLoading(false)
        if (result.status === 200) {
            console.log(data)
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
            <div className='password_change_container'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    SubmitHandler();
                }}>
                    <div className='OldPassword_field'>
                        <label className='OldPassword_label text-sm font-medium text-slate-800 block'>
                            Old Password
                        </label>
                        <input
                            value={currentpassword}
                            onChange={(e) => {
                                setcurrentpassword(e.target.value)
                            }}
                            className="border border-gray-300 rounded-md my-2 py-[6px] 
                            w-full focus:border-indigo-600 focus:ring-indigo-700 
                            bg-inherit focus:border  px-2 outline-none text-sm text-gray-700
                             placeholder:text-gray-500"
                            placeholder="Enter your old password" />
                    </div>
                    <div className='NewPassword_field'>
                        <label className='OldPassword_label text-sm font-medium text-slate-800 block'>
                            New Password
                        </label>
                        <input
                            value={newpassword}
                            onChange={(e) => {
                                setNewpassword(e.target.value)
                            }}
                            className="border border-gray-300 rounded-md my-2 py-[6px] w-full
                             focus:border-indigo-600 focus:ring-indigo-700 bg-inherit focus:border 
                            px-2 outline-none text-sm text-gray-700 placeholder:text-gray-500"
                            placeholder="Enter your new password" />
                    </div>
                    <div className='NewPassword_field'>
                        <label className='OldPassword_label text-sm font-medium text-slate-800 block'>
                            Re-enter Password
                        </label>
                        <input
                            value={confirmpassword}
                            onChange={(e) => {
                                setConfirmpassword(e.target.value)
                            }}
                            className="border border-gray-300 rounded-md my-2 py-[6px] w-full
                             focus:border-indigo-600 focus:ring-indigo-700 bg-inherit focus:border 
                            px-2 outline-none text-sm text-gray-700 placeholder:text-gray-500"
                            placeholder="Re-enter your password" />
                    </div>
                    <div className='submit_btn my-2'>
                        {!isLoading ? <button type='submit' className='w-24 h-10 text-center
                             text-white outline-none  text-bold bg-indigo-800 rounded-md
                              hover:bg-indigo-700'>Sign in</button> : <button type="button"
                            className="inline-flex items-center justify-center py-2  leading-4 
                              text-sm shadow rounded-md text-white bg-indigo-800 hover:bg-indigo-900
                               w-24 text-center transition ease-in-out duration-150 cursor-not-allowed"
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
        </Fragment>
    )
}
