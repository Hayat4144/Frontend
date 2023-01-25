import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsCartCheck } from 'react-icons/bs'
import { AiOutlineSetting } from 'react-icons/ai'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineSell } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { BiCategory, BiSearch } from 'react-icons/bi'

export default function MobileSideModal({ mobileModal ,MobileSideModalToggle }) {
    const [isModalOpen, setIsModalOpen] = useState(mobileModal)
    const { IsLogdin } = useSelector(state => state.Signin)
    useEffect(() => {
        setIsModalOpen(!isModalOpen)
    } , [mobileModal])
    return (
        <Fragment>
            {/* ---- Mobile Menu ----- */}
            <div className={`mobile_menu_dialog_model fixed md:hidden bg-black w-full
             opacity-100 bg-opacity-30 inset-0 z-50 ${isModalOpen ? 'flex' : 'hidden'}`}
            >
                {/* ---- Mobile link Menu white background */}
                <div className='w-3/4 h-screen bg-white'>
                    <div className='user_header text-white h-20 px-5 space-x-5 flex 
                    items-center bg-gray-700'>
                        <div className='user_avtar'>
                            <FaUserCircle fontSize={'28px'} className="cursor-pointer" />
                        </div>
                        <div className='user_name '>
                            <h2 className='user_name_text'>
                                Hello , {IsLogdin ? 'Hayat ilyas' : 'Signin'}
                            </h2>
                        </div>
                    </div>
                    {/* ---- Navigations Menu for mobile */}
                    <div className='mobile_view_link '>
                        <ul className=' cursor-pointer px-5  py-5'>
                            <Link to="/">
                                <li className='flex items-center pb-5 space-x-5'>
                                    <AiOutlineHome className='text-2xl' />
                                    <span className='font-bold'>Home</span>
                                </li>
                            </Link>

                            <Link to="/">
                                <li className='flex items-center pb-5 space-x-5'>
                                    <AiOutlineHeart className='text-2xl' />
                                    <span className='font-bold'>Whishlist</span>
                                </li>
                            </Link>

                            <Link to="/V2/user/cart">
                                <li className='flex items-center pb-5  space-x-5'>
                                    <BsCartCheck className='text-2xl' />
                                    <span className='font-bold'>Cart</span>
                                </li>
                            </Link>

                            <Link to="/">
                                <li className='flex items-center  pb-5 space-x-5'>
                                    <BiCategory className='text-2xl' />
                                    <span className='font-bold'>Category</span>
                                </li>
                            </Link>

                            <Link to="/V2/user/account/order/history">
                                <li className='flex items- pb-5 space-x-5'>
                                    <HiOutlineShoppingBag className='text-2xl' />
                                    <span className='font-bold'>Order & History</span>
                                </li>
                            </Link>

                            <Link to="/V2/user/account">
                                <li className='flex items-center pb-5 space-x-5'>
                                    <AiOutlineUser className='text-2xl' />
                                    <span className='font-bold'>Account</span>
                                </li>
                            </Link>

                            <Link to="/">
                                <li className='flex items-center pb-5 space-x-5'>
                                    <MdOutlineSell className='text-2xl' />
                                    <span className='font-bold'>Sell on Taj</span>
                                </li>
                            </Link>

                            <Link to="/">
                                <li className='flex items-center pb-5 space-x-5'>
                                    <AiOutlineSearch className='text-2xl' />
                                    <span className='font-bold'>Search products</span>
                                </li>
                            </Link>

                            <Link to="/">
                                <li className='flex items-center pb-5 space-x-5'>
                                    <AiOutlineSetting className='text-2xl' />
                                    <span className='font-bold'>Settings</span>
                                </li>
                            </Link>

                        </ul>
                        <section className='login_logout_btn absolute bottom-5 px-5'>
                            {IsLogdin ? <div className='button_group'>
                                <button className='focus:border focus:border-gray-500 px-10 py-1.5
                            rounded-md bg-indigo-700 focus:bg-transparent text-white
                            focus:text-black w-full'>Log out</button>
                            </div> :
                                <div className='space-x-5'>
                                    <Link to={'/V2/auth/sign_in'}>
                                        <button className='focus:border focus:border-gray-500 px-10 py-1.5
                                        rounded-md bg-indigo-700 focus:bg-transparent text-white
                                      focus:text-black '>Sign in</button>
                                    </Link>
                                    <Link to="/V2/auth/sign_up">
                                        <button className='focus:border focus:border-gray-500 px-10 py-1.5
                                        rounded-md bg-indigo-700 focus:bg-transparent text-white
                                     focus:text-black'>Sign up</button>
                                    </Link>

                                </div>}

                        </section>
                    </div>
                </div>

                {/*  ---- Close Mobile Menu Button */}
                <div className='close_icon ml-5 mt-5 text-white'>
                    <AiOutlineCloseCircle className='text-4xl cursor-pointer' 
                    onClick={()=> MobileSideModalToggle(isModalOpen)} />
                </div>
            </div>
        </Fragment>
    )
}
