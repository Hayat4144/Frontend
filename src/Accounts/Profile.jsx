import React, { Fragment, lazy, Suspense, useState } from 'react'
import Address from './Address'
import ChangePassword from './ChangePassword'
import SecurityImage from '../assets/images/security.png'
const Navbar = lazy(() => import('../UsableComponent/Navbar'))
const Footer = lazy(() => import('../UsableComponent/Footer'))
import NavbarSkeleton from '../Skeleton/NavbarSkeleton'

export default function Profile() {
    const [isLoading, setIsLoading] = useState(false)
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [mobile_number, setMobile_number] = useState(null)
    const [email, setEmail] = useState('')
    const [date_of_birth, setDate_of_birth] = useState(null)

    const submitHandler = async () => {
        const formdata = new FormData();
        fetch('http://localhost:5000/api/user/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formdata,
        })
            .then(async (res) => {
                if (res.status === 200) {
                    const { data } = await res.json();
                    console.log('ok');
                    console.log(data);
                }
                else {
                    const { error } = await res.json();
                    console.log(error);
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <Fragment>
            <div className='profile_page bg-gray-100 w-screen h-screen'>
                <Suspense fallback={<NavbarSkeleton />}>
                    <div className='bg-slate-700 text-white'>
                        <Navbar />
                    </div>
                </Suspense>
                <div className='profile_box my-10 mx-5 sm:w-5/6 md:w-2/4 md:mx-auto bg-white px-5 py-5'>
                    <div className='page_title_image md:flex md:items-center my-5 space-x-3 justify-center'>
                        <figure className='hidden md:block'>
                            <img src={SecurityImage} alt="pic" srcset="" />
                        </figure>
                        <div className='page_text'>
                            <h4 className='text-3xl font-bold'>Profile Information</h4>
                            <p className='page_head'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.

                            </p>
                        </div>

                    </div>
                    <div className="form_contianer">
                        <form className='grid grid-cols-1 md:grid-cols-2 gap-5'
                            onSubmit={(e) => {
                                e.preventDefault();
                                submitHandler();
                            }}>
                            <div className="fname">
                                <label className='font-medium text-gray-700 block'>First Name</label>
                                <input type="text" name="fname" id="fname"
                                    value={firstName}
                                    required
                                    className="border border-gray-300 
                                    rounded-md my-2 py-2 w-full focus:border-indigo-600
                                     focus:ring-indigo-700 bg-inherit focus:border  px-2 outline-none 
                                     text-sm text-gray-700 placeholder:text-gray-500"
                                    placeholder='Enter your first name' />
                            </div>
                            <div className="lname">
                                <label className=' font-medium text-gray-700 block'>Last Name</label>
                                <input type="text" name="fname" id="fname"
                                    value={lastName}
                                    required
                                    className="border border-gray-300 
                                    rounded-md my-2 py-2 w-full focus:border-indigo-600
                                     focus:ring-indigo-700 bg-inherit focus:border  px-2 outline-none 
                                     text-sm text-gray-700 placeholder:text-gray-500"
                                    placeholder='Enter your last name' />
                            </div>
                            <div className="email">
                                <label className=' font-medium text-gray-700 block'>Email</label>
                                <input type="email" name="email" id="email"
                                    value={email}
                                    required
                                    className="border border-gray-300 
                                    rounded-md my-2 py-2 w-full focus:border-indigo-600
                                     focus:ring-indigo-700 bg-inherit focus:border  px-2 outline-none 
                                     text-sm text-gray-700 placeholder:text-gray-500"
                                    placeholder='Enter your email ' />

                            </div>
                            <div className="mobile">
                                <label className='text-sm font-medium text-gray-700 block'>Mobile No.</label>
                                <input type="number" name="mobile" id="mobile"
                                    value={mobile_number}
                                    required
                                    className="border border-gray-300 
                                    rounded-md my-2 py-2 w-full focus:border-indigo-600
                                     focus:ring-indigo-700 bg-inherit focus:border  px-2 outline-none 
                                     text-sm text-gray-700 placeholder:text-gray-500"
                                    placeholder='Enter your Mobile no. ' />
                            </div>
                            <div className="date_of_birth">
                                <label className='font-medium text-gray-700 block'>DOB</label>
                                <input type="date" name="date_of_birth" id="date_of_birth"
                                    value={date_of_birth}
                                    className="border border-gray-300 
                                    rounded-md my-2 py-2 w-full focus:border-indigo-600
                                     focus:ring-indigo-700 bg-inherit focus:border  px-2 outline-none 
                                     text-sm text-gray-700 placeholder:text-gray-500"
                                    placeholder='Enter your date of birth'
                                    required />
                            </div>
                            <div></div>
                            <div className='sumbit-btn my-5'>
                                {!isLoading ? <button type='submit' className='w-full h-10 text-center
                             text-white outline-none text-bold bg-indigo-800 rounded-md
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
            </div>


            <div className="footer_box  w-full">
                <Suspense fallback={<p>loading...</p>}>
                    <Footer />
                </Suspense>
            </div>

        </Fragment>
    )
}
