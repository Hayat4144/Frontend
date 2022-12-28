import React, { Fragment, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { AddressAction } from '../Context/Actions/AddressActions'
import { CREATEADDRESS } from '../Context/Actions/ActionType'
import Navbar from '../UsableComponent/Navbar'

export default function Address() {
    const [Street, setStreet] = useState('')
    const [Area, setArea] = useState('')
    const [city, setCity] = useState('')
    const [State, setState] = useState('')
    const [pincode, setPincode] = useState()
    const [Country, setCountry] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();

    // submitHandler 
    const SubmitHandler = async () => {
        setIsLoading(!isLoading)
        const result = await fetch('http://localhost:5000/v3/api/user/create/address', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Street,
                Area,
                city,
                State,
                pincode,
                Country
            }),
            credentials: 'include'
        })
        const data = await result.json();
        setIsLoading(false)
        if (result.status === 200) {
            dispatch({ type: CREATEADDRESS, payload: data.doc })
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
            <Navbar />
            <div className='address-container'>
                <div className='text-center page-text mb-5'>
                    <h3 className='mx-4 py-1 text-3xl mt-3 font-[1000]'>Add your address</h3>
                </div>
                <div className='address-form sm:mx-auto sm:w-[50%] mt-4 xl:mx-auto
                xl:w-[30%]  lg:mx-auto lg:w-[25%] border md:w-[50%] md:m-auto border-gray-300 shadow-lg 
                    rounded-md px-4 mx-3 mb-2'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        SubmitHandler();
                    }}>
                        <div className='Street_field mt-3'>
                            <label className='Street_label text-sm font-medium text-slate-800 block'>
                                Street
                            </label>
                            <input type={'text'}
                                value={Street}
                                onChange={(e) => {
                                    setStreet(e.target.value)
                                }}
                                className="border border-gray-300 
                            rounded-md my-2 py-[6px] w-full
                            focus:border-indigo-600 focus:ring-indigo-700 
                            bg-inherit focus:border  px-2 outline-none text-sm
                            text-gray-700 placeholder:text-gray-500"
                                placeholder="Enter your Street" />
                        </div>
                        <div className='Area_field'>
                            <label className='Area_label text-sm font-medium text-slate-800 block'>
                                Area
                            </label>
                            <input type={'text'}
                                value={Area}
                                onChange={(e) => {
                                    setArea(e.target.value)
                                }}
                                className="border border-gray-300 rounded-md
                            my-2 py-[6px] w-full focus:border-indigo-600
                            focus:ring-indigo-700 bg-inherit focus:border 
                            px-2 outline-none text-sm text-gray-700
                            placeholder:text-gray-500"
                                placeholder="Enter your Area" />
                        </div>
                        <div className='City_field'>
                            <label className='City_label text-sm font-medium text-slate-800 block'>
                                City
                            </label>
                            <input type={'text'}
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value)
                                }}
                                className="border border-gray-300 rounded-md my-2 py-[6px] 
                            w-full focus:border-indigo-600 focus:ring-indigo-700 bg-inherit 
                            focus:border  px-2 outline-none text-sm text-gray-700
                             placeholder:text-gray-500"
                                placeholder="Enter your city" />
                        </div>
                        <div className='Pin code_field'>
                            <label className='Pin code_label text-sm font-medium text-slate-800 block'>
                                Pin code
                            </label>
                            <input type={'number'}
                                value={pincode}
                                onChange={(e) => {
                                    setPincode(e.target.value)
                                }}
                                className="border appearance-none border-gray-300 rounded-md my-2 py-[6px]
                             w-full focus:border-indigo-600 focus:ring-indigo-700 bg-inherit
                              focus:border  px-2 outline-none text-sm text-gray-700
                               placeholder:text-gray-500"
                                placeholder="Enter your pin code" />
                        </div>
                        <div className='State_field'>
                            <label className='State_label text-sm font-medium text-slate-800 block'>
                                State
                            </label>
                            <input type={'text'}
                                value={State}
                                onChange={(e) => {
                                    setState(e.target.value)
                                }}
                                className="border border-gray-300 rounded-md my-2 py-[6px] 
                            w-full focus:border-indigo-600 focus:ring-indigo-700 bg-inherit 
                            focus:border  px-2 outline-none text-sm text-gray-700
                            placeholder:text-gray-500"
                                placeholder="Enter your State" />
                        </div>
                        <div className='Country_field'>
                            <label className='Country_label text-sm font-medium text-slate-800 block'>
                                Country
                            </label>
                            <input type={'text'}
                                value={Country}
                                onChange={(e) => {
                                    setCountry(e.target.value)
                                }}
                                className="border border-gray-300 rounded-md my-2 
                            py-[6px] w-full focus:border-indigo-600 focus:ring-indigo-700 
                            bg-inherit focus:border  px-2 outline-none text-sm text-gray-700
                             placeholder:text-gray-500"
                                placeholder="Enter your Country" />
                        </div>
                        <div className='submit_btn mb-5 my-2'>
                            {!isLoading ? <button type='submit' className='w-24 h-10 text-center
                             text-white outline-none  text-bold bg-indigo-800 rounded-md
                              hover:bg-indigo-700'>Submit</button> : <button type="button"
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

            </div>
        </Fragment>
    )
}
