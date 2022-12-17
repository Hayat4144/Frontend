import React, { Fragment } from 'react'
import { ImLocation } from 'react-icons/im'
import { AiOutlineDoubleRight } from 'react-icons/ai'
import { IoIosSend } from 'react-icons/io'
import { MdPermPhoneMsg } from 'react-icons/md'
import { MdEmail } from 'react-icons/md'

export default function Footer() {
    return (
        <Fragment>
            <footer className='footer lg:justify-around lg:flex bg-slate-800 text-white w-full'>
                {/* first column */}
                <div className='column-1 sm:flex sm:items-center sm:justify-around '>
                    {/* first row */}
                    <div className="first-row mx-5  sm:block">
                        {/* contact */}
                        <div className='Contact py-3'>
                            <h2 className='text-xl'>Contact info</h2>
                            <div className='address flex items-center'>
                                <div className='address-logo '>
                                    <span><ImLocation fontSize={'25px'} /></span>
                                </div>
                                <div className='address-info mx-5'>
                                    <h4 className='addess-title translate-y-1'>Address:</h4>
                                    <span className='text-sm address-description'>Canning street ,Bara Bazar Kolkata</span>
                                </div>
                            </div>

                            {/* contact - phone */}
                            <div className='phone flex items-center'>
                                <div className='phone-logo '>
                                    <span><MdPermPhoneMsg fontSize={'25px'} /></span>
                                </div>
                                <div className='phone-info mx-5'>
                                    <h4 className='phone-title translate-y-1'>Phone:</h4>
                                    <span className='text-sm address-description'>(+91 9931410844)</span>
                                </div>
                            </div>
                            {/* contact - email */}
                            <div className='email flex items-center pb-5'>
                                <div className='email-logo '>
                                    <span><MdEmail fontSize={'25px'} /></span>
                                </div>
                                <div className='email-info mx-5'>
                                    <h4 className='email-title translate-y-1'>Email:</h4>
                                    <span className='text-sm email-description'>ihayat4144@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* second row  follow us */}
                    <div className=' row-2 informations mx-5 lg:ml-10 mt-10 sm:m-0'>
                        <div className='follow-us-head-text text-xl uppercase'>Information</div>
                        <ul className='ffollow-us-link text-[15px] my-3'>
                            <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />My Account</li>
                            <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />My Order</li>
                            <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />Cart</li>
                            <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />About us</li>
                            <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />Shopping</li>
                            <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />Terms & Condition</li>
                        </ul>
                    </div>
                </div>


                <div className='column-2 sm:flex sm:justify-around sm:items-center lg:-translate-y-5'>

                    {/* third row */}
                    <div className='row-4  news-letter sm:w-72 py-10 mx-7'>
                        <div className='newsletter-head-text text-xl uppercase'>Newsletter</div>
                        <p className=''>Be the first to know about the latest updates & exclusive promotions from us. No spam, we guarantee!</p>
                        <div className='email-input flex items-center justify-between border border-gray-200 rounded-md my-2 py-[2px]'>
                            <input type={'email'} placeholder="Enter you email" required className='bg-inherit w-[18.8em] px-2 py-[4px] outline-none text-sm text-gray-200 border-none' />
                            <button className='text-[2em] cursor-pointer hover:text-gray-500 hover:text-[2.5em]'><IoIosSend /></button>
                        </div>
                    </div>

                    {/* fourth row */}
                    <div className='row-3 lg:mr-14 lg:order-first mx-5 mt-10 lg:mt-0 mb-2'>
                        <div className='follow-us mx-5'>
                            <div className='follow-us-head-text text-xl uppercase'>Follow us</div>
                            <ul className='ffollow-us-link text-[15px] mt-3'>
                                <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />Instagram</li>
                                <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />printrest</li>
                                <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />Facebook</li>
                                <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />Youtube</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </footer>
        </Fragment>
    )
}
