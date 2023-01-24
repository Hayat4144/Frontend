import React, { Fragment, lazy, Suspense, useState } from 'react'
import { BsCart } from 'react-icons/bs'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { BiCategory, BiSearch } from 'react-icons/bi'
import { MdArrowDropDown } from 'react-icons/md'
import { BsHandbag } from 'react-icons/bs';
import { CiUser } from 'react-icons/ci'
import { createSearchParams, Link, Navigate, useNavigate } from 'react-router-dom'
import FetchCategory from '../shop/Category/FetchCategory'
import { AiOutlineHome } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsCartCheck } from 'react-icons/bs'
import { AiOutlineSetting } from 'react-icons/ai'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineSell } from 'react-icons/md'
import { useSelector } from 'react-redux'
const Account_List_Modal = lazy(() => import('./Account_List_Modal'))


export default function Navbar() {
    const [isMobileViewOpen, setIsMobileViewOpen] = useState(false);
    const [Islogding, setIslogding] = useState(false)
    const [IsAccountModalOpen, SetIsAccountModalOpen] = useState(false)
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate();

    // ---- cart data ----- //
    const { productItems } = useSelector(state => state.Cart)

    // MobileViewOpen Function
    const OpenMobileeView = () => {
        setIsMobileViewOpen(!isMobileViewOpen)
        console.log(isMobileViewOpen)
    }

    // pass this function to child component to change the state of this state 
    const AccountModalToggle = (state) => {
        SetIsAccountModalOpen(!state)
    }

    const SubmitHandler = () => {
        const params = { 'keyword': keyword }
        navigate({
            pathname: '/V2/shop/search',
            search: `?${createSearchParams(params)}`
        })
    }

    return (
        <header className='w-full z-10 shadow-lg'>
            <nav className='w-full h-20 flex items-center justify-between px-5 sm:px-4 md:px-6 lg:px-8 '>
                {/* --- Burger --- menu */}
                <div className='mobile_view md:hidden' onClick={OpenMobileeView}>
                    <div className='burger_menu cursor-pointer' onClick={OpenMobileeView}>
                        <div className='burger_line_1 w-5 h-[2px] bg-black m-1'></div>
                        <div className='burger_line_2 w-5 h-[2px] bg-black m-1'></div>
                        <div className='burger_line_3 w-5 h-[2px] bg-black m-1'></div>
                    </div>
                </div>


                <div className="main_menu flex items-center space-x-20">
                    {/* ---- Company logo ---- */}
                    <div className='company_logo text-xl cursor-pointer'><Link to={'/'}>Taj Jwellery</Link></div>
                    <div className="list_of_item hidden md:block">
                        <ul className='flex items-center space-x-5 text-[17px]'>
                            <li className='hover:text-indigo-700 hover:border-b-2 
                             hover:border-indigo-700 duration-150 ease-in-out
                             cursor-pointer py-4 '>
                                Home
                            </li>
                            <li className='hover:text-indigo-700 hover:border-b-2 
                             hover:border-indigo-700 font-semibold cursor-pointer duration-300 
                             transition ease-in-out  py-4 '>Mens</li>
                            <li className='hover:text-indigo-700 hover:border-b-2 
                             hover:border-indigo-700 font-semibold cursor-pointer duration-300 
                             transition ease-in-out py-4 '>Earings</li>
                            <li className='hover:text-indigo-700 hover:border-b-2 
                             hover:border-indigo-700 font-semibold cursor-pointer duration-300 
                             transition ease-in-out py-4 '>Shoes</li>
                            <li className='hover:text-indigo-700 hover:border-b-2 
                             hover:border-indigo-700 font-semibold cursor-pointer duration-300 
                             transition ease-in-out py-4 '>Fashion</li>
                        </ul>
                    </div>
                </div>


                {/*  ---- Right menu */}
                <div className="right_menu flex items-center space-x-8">
                    {/*  ---- Search Box */}
                    <div className="search_box hidden md:block">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            SubmitHandler();
                        }} className="flex items-center border 
                        border-gray-300 text-sm rounded-md py-1">
                            <input type={'search'}
                                value={keyword}
                                onChange={(e) => { setKeyword(e.target.value) }}
                                placeholder="Search for products "
                                className="search_box w-full font-[400] text-gray-700
                                outline-none focus:font-[500] px-5 
                           " />
                            <div className='nav_search_btn text-center
                            w-16 search-bar text-gray-500 font-[200]'>
                                <button type={'submit'}>
                                    <BiSearch className="cursor-pointer mx-auto text-2xl" />
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* ---- User Icon  ---- */}
                    <div className="user_icon hidden md:block text-center cursor-pointer
                    hover:text-indigo-700" onMouseEnter={() => AccountModalToggle(IsAccountModalOpen)}>
                        <CiUser className='text-2xl' />
                        <span className='icon_name text-sm font-bold hover:border-b-2
                        border-b-indigo-700 pb-4'>
                            Profile
                        </span>
                    </div>

                    {/* ---- Cart Icon */}
                    <Link to="/V2/user/cart" className="cart_icon  hover:text-indigo-700">

                        <div className='flex'>
                            <BsHandbag className='text-2xl' />
                            <span className='number_of_item_in_cart text-sm -translate-y-2'>{productItems.length}</span>
                        </div>
                        <span className='icon_name hidden md:block text-sm font-bold'>Cart</span>
                    </Link>
                </div>
            </nav>

            {/* ---- Mobile Menu ----- */}
            <div className={`mobile_menu_dialog_model fixed md:hidden bg-black w-full
             opacity-100 bg-opacity-30 inset-0 z-50 ${isMobileViewOpen ? 'flex' : 'hidden'}`}
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
                                Hello , {Islogding ? 'Hayat ilyas' : 'Signin'}
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

                            <Link>
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

                            <Link to="/">
                                <li className='flex items- pb-5 space-x-5'>
                                    <HiOutlineShoppingBag className='text-2xl' />
                                    <span className='font-bold'>Order & History</span>
                                </li>
                            </Link>

                            <Link to="/">
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
                            {Islogding ? <div className='button_group'>
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
                    <AiOutlineCloseCircle className='text-4xl cursor-pointer' onClick={OpenMobileeView} />
                </div>
            </div>

            <Suspense fallback={<p>loading...</p>}>
                <Account_List_Modal
                    Modalopen={IsAccountModalOpen}
                    AccountModalToggle={AccountModalToggle}
                />
            </Suspense>
        </header >

    )
}
