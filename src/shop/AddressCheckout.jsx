import React, { Fragment, lazy, Suspense, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
const Address = lazy(() => import('../Accounts/Address'))
import { CREATEADDRESS } from '../Context/Actions/ActionType'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'

export default function AddressCheckout() {
    const { user_address } = useSelector(state => state.Address)
    const [isAddessBarOpen, setIsAddessBarOpen] = useState(Object.keys(user_address).length > 0 ? true : false)
    const address_data = [user_address]
    const [Street, setStreet] = useState(user_address.Street)
    const [Area, setArea] = useState(user_address.Area)
    const [city, setCity] = useState(user_address.city)
    const [State, setState] = useState(user_address.State)
    const [pincode, setPincode] = useState(user_address.pincode)
    const [Country, setCountry] = useState(user_address.Country)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();

    const navigate = useNavigate();
    // submitHandler 
    const SubmitHandler = async () => {
        setIsLoading(!isLoading)
        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/v3/api/user/create/address`, {
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
            console.log(data.doc)
            const m = dispatch({ type: CREATEADDRESS, payload: data.doc })
            setIsAddessBarOpen(!isAddessBarOpen)
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
            navigate('/V2/shop/checkout/confirm/order')

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
            <div className="checkout_page_component my-5 md:mx-auto mx-2 md:w-[70%] shadow-2xl">

            </div>
            <div className={`show_Address_Box mx-4 sm:mx-auto sm:w-[50%]
                md:w-[50%] lg:w-[30%] mb-10`}>
                <div className='address-container'>
                    <div className='text-center page-text mb-5'>
                        <h3 className='py-1 text-3xl mt-3 font-[1000]'>Shipping Address</h3>
                    </div>
                    <div className={`address-form mx-auto border border-gray-300 shadow-lg 
                    rounded-md px-4 mb-2`}>
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
                            <div className='submit_btn mb-5 my-2 space-x-10'>
                                {!isLoading ? <button type='submit' className='w-full text-center
                             text-white outline-none  text-bold bg-indigo-800 rounded-md
                              hover:bg-indigo-700 py-2'>Continue</button> : <button type="button"
                                    className="inline-flex items-center justify-center py-2  leading-4 
                              text-sm shadow rounded-md text-white bg-indigo-800 hover:bg-indigo-900
                               w-full  text-center transition ease-in-out duration-150 cursor-not-allowed"
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
        </Fragment >
    )
}
