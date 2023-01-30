import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import DecodeJwtToken from '../utils/DecodeJwtToken'

export default function Signin() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [showPassword, setshowpassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const EmailChange = (e) => {
        setemail(e.target.value)
    }
    const PasswordChange = (e) => {
        setpassword(e.target.value)
    }


    const SigninFunc = async () => {
        setIsLoading(!isLoading)
        await fetch(`${import.meta.env.DEV ? import.meta.env.VITE_BACKEND_DEV_URL : import.meta.env.VITE_BACKEND_URL}/v3/api/user/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(async res => {
            const data = await res.json();
            // console.log(document.cookie)
            setIsLoading(false)
            if (res.status !== 200) {
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
                return;
            }
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
            DecodeJwtToken(dispatch);
            searchParams.get('next') ? navigate(searchParams.get('next')) : navigate('/')

        }).catch(err=>console.log(err))
    }

    return (
        <Fragment>
            <div className='Signin_container'>
                <div className='my-5 text-center header-text'>
                    <h2 className='text-2xl font-bold logo'>Taj Jwellery</h2>
                </div>
                <div className='text-center page-text mb-5'>
                    <h3 className='mx-4 py-1 text-3xl mt-3 font-[1000]'>Sign in to your account</h3>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    SigninFunc();
                }}>
                    <div className='sm:mx-auto sm:w-[50%] mt-4 xl:mx-auto xl:w-[30%]  lg:mx-auto 
                    lg:w-[40%] signin-form border md:w-[50%] md:m-auto border-gray-300 shadow-lg 
                    rounded-md  mx-3 mb-2'>
                        <div className='email_fields mx-4 mt-5 mb-2'>
                            <label className='text-sm font-medium text-gray-700 block'>Email</label>
                            <input type={'email'} value={email} onChange={EmailChange}
                                placeholder="Enter you email" className='border border-gray-300 
                                rounded-md my-2 py-[6px] w-full focus:border-indigo-600
                                 focus:ring-indigo-700 bg-inherit focus:border  px-2 outline-none 
                                 text-sm text-gray-700 placeholder:text-gray-500' />
                        </div>

                        <div className='password_field mx-4'>
                            <label className='text-sm font-medium text-gray-700 block'>
                                password</label>
                            <input type={showPassword ? 'text' : 'password'} value={password}
                                onChange={PasswordChange} placeholder="Enter you password"
                                className='border border-gray-300 rounded-md my-2 py-[6px] w-full
                                 focus:border-indigo-600 focus:ring-indigo-700 bg-inherit focus:border
                                px-2 outline-none text-sm text-gray-700 placeholder:text-gray-500'
                            />
                            <h3 className='text-sm cursor-pointer bg-red-500'
                                onClick={(e) => {
                                    setshowpassword(!showPassword)
                                }}><span className='relative bottom-[35px] float-right right-2'>{showPassword ? ' hide' : 'show'}</span></h3>

                        </div>
                        {/* forgot passsword link */}
                        <div className='mx-4'>
                            <h3 className='relative left-6 float-right mb-5 text-sm text-indigo-700 hover:text-indigo-900 
                        hover:underline cursor-pointer'>Forgot Password ?</h3>
                        </div>

                        {/* Signin button */}
                        <div className='sumbit-btn mx-4 my-5'>
                            {!isLoading ? <button type='submit' className='w-full h-10 text-center
                             text-white outline-none text-bold bg-indigo-800 rounded-md
                              hover:bg-indigo-700'>Sign in</button> : <button type="button"
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

                    </div>
                </form>

                <div className='create_new_account sm:mx-auto  sm:w-[50%] mt-4 xl:mx-auto  
                lg:mx-auto lg:w-[40%] md:w-[50%] xl:w-[30%]'>
                    <h3 className='dont_have_account  mx-4 before:bg-gray-400 before:lg:w-[100px]
                    after:lg:w-[100px] after:bg-gray-400 my-10 text-center relative 
                    ax-w-[600px] before:md:w-[80px] after:md:w-[80px] before:sm:w-[75px] after:sm:w-[75px]'>Don't have any account ?</h3>
                    <div className='new_accoutn_btn mx-4 my-10'>
                        <button className='w-full bg-indigo-800 py-2 px-6 rounded-md mb-2
                         text-white hover:bg-indigo-900'>
                            <Link to={"/V2/auth/sign_up"}>Create new account</Link>
                        </button>

                    </div>
                </div>

            </div >
        </Fragment >
    )
}
