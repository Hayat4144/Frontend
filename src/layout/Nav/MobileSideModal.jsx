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
import { useDispatch, useSelector } from 'react-redux'
import { BiCategory, BiSearch } from 'react-icons/bi'
import { toast } from 'react-toastify'
import {Toast_Config_Option} from '../../global/Toast_Config'
import {LOGOUT, REMOVE_ADDRESS,REMOVE_USERINFO} from '../../Context/Actions/ActionType'

export default function MobileSideModal({ mobileModal, MobileSideModalToggle }) {
    const [isModalOpen, setIsModalOpen] = useState(mobileModal)
    const { IsLogdin } = useSelector(state => state.Signin)
    const { user_data } = useSelector(state => state.User)
    const dispatch = useDispatch();
    useEffect(() => {
        setIsModalOpen(mobileModal)
    }, [mobileModal])

   

    const logoutFunc = async () => {
        await fetch(`${import.meta.env.DEV ? import.meta.env.VITE_BACKEND_DEV_URL : import.meta.env.VITE_BACKEND_URL}/v3/api/user/logout`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
            credentials: 'include'
        }).then(async res => {
            const { data, error } = await res.json();
            if (res.status !== 200) {
                toast.error(error, Toast_Config_Option);
                return;
            }
            dispatch({ type: LOGOUT })
            dispatch({type:REMOVE_ADDRESS})
            dispatch({type:REMOVE_USERINFO})
            toast.success(data, Toast_Config_Option);
        })

    }
    return (
        <Fragment>
            {/* ---- Mobile Menu ----- */}
            <div className={`mobile_menu_dialog_model  fixed md:hidden bg-black w-full
             opacity-100 bg-opacity-30 inset-0 z-50 ${isModalOpen ? 'flex  overscroll-none' : 'hidden'}`}
            >
                {/* ---- Mobile link Menu white background */}
                <div className='w-3/4 h-screen  bg-white'>
                    <div className='user_header text-white h-20 px-5 space-x-5 flex 
                    items-center bg-gray-700'>
                        <div className='user_avtar'>
                            <FaUserCircle fontSize={'28px'} className="cursor-pointer" />
                        </div>
                        <div className='user_name '>
                            <h2 className='user_name_text'>
                                Hello , {IsLogdin ? user_data.name : 'Signin'}
                            </h2>
                        </div>
                    </div>
                    {/* ---- Navigations Menu for mobile */}
                    <div className='mobile_view_link  w-full h-full'>
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
                        <section className='login_logout_btn absolute bottom-5 '>
                            {IsLogdin ? <div className='logout_btn flex space-x-2 px-2'>
                                <button onClick={logoutFunc} className='focus:border focus:border-gray-500 py-2 px-10
                            rounded-md bg-indigo-700 focus:bg-transparent text-white
                            focus:text-black'>Log out</button>
                                <Link to="/V2/auth/sign_up">
                                    <button className='focus:border focus:border-gray-500 px-10 py-2
                                        rounded-md bg-indigo-700 focus:bg-transparent text-white
                                     focus:text-black'>Sign up</button>
                                </Link>

                            </div> :
                                <div className='flex w-full items-center justify-between space-x-2 px-2'>
                                    <Link to={'/V2/auth/sign_in'}>
                                        <button className='focus:border focus:border-gray-500 px-10 py-2
                                        rounded-md bg-indigo-700 focus:bg-transparent text-white
                                      focus:text-black '>Sign in</button>
                                    </Link>
                                    <Link to="/V2/auth/sign_up">
                                        <button className='focus:border focus:border-gray-500 px-10 py-2
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
                        onClick={() => MobileSideModalToggle(isModalOpen)} />
                </div>
            </div>
        </Fragment>
    )
}
