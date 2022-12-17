import React, { Fragment, lazy, useState } from 'react'
import { BsCart } from 'react-icons/bs'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { MdArrowDropDown } from 'react-icons/md'
import { createSearchParams, Navigate, useNavigate } from 'react-router-dom'
const Account_List_Modal = lazy(() => import('./Account_List_Modal'))

export default function Navbar() {
    const [isMobileViewOpen, setIsMobileViewOpen] = useState(false);
    const [Islogding, setIslogding] = useState(false)
    const [IsAccountModalOpen, SetIsAccountModalOpen] = useState(false)
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate();

    // MobileViewOpen Function
    const OpenMobileeView = () => {
        setIsMobileViewOpen(!isMobileViewOpen)
        console.log(isMobileViewOpen)
    }

    const Account_LisModelshowFunc = () => {
        SetIsAccountModalOpen(!IsAccountModalOpen)
    }

    const SubmitHandler = () => {
        const params = { 'keyword': keyword }
        navigate({
            pathname: '/V2/shop/search',
            search: `?${createSearchParams(params)}`
        })
    }

    return (
        <Fragment>
            <nav className='bg-slate-800 w-full h-16 flex items-center justify-between px-5 sm:px-4 md:px-6 lg:px-8 sticky'>
                <div className='mobile_view md:hidden' onClick={OpenMobileeView}>
                    <div className='burger_menu cursor-pointer' onClick={OpenMobileeView}>
                        <div className='burger_line_1 w-5 h-[1px] bg-white m-1'></div>
                        <div className='burger_line_2 w-5 h-[1px] bg-white m-1'></div>
                        <div className='burger_line_3 w-5 h-[1px] bg-white m-1'></div>
                    </div>
                </div>

                <div className='company_logo text-white text-xl cursor-pointer'>Taj Jwellery</div>
                <div className='nav_search_container hidden md:block w-5/12 '>
                    <div className='search_input_box'>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            SubmitHandler();
                        }} className="flex items-center">
                            <input type={'search'}
                                value={keyword}
                                onChange={(e) => { setKeyword(e.target.value) }}
                                placeholder="Search the website..."
                                className="search_box w-full text-gray-700 outline-none 
                            py-3 px-2 placeholder:text-gray-700
                           " />
                            <div className='bg-indigo-700 nav_search_btn text-white text-center
                            w-16 py-2 search-bar'>
                                <button type={'submit'}>
                                    <BiSearch className="cursor-pointer mx-auto text-2xl" />
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
                <div className='nav_right_menu flex items-center space-x-8 cursor-pointer'>
                    <div className='Become_seller text-white hidden md:block'>
                        <h3 className='Seller_text'>
                            Become a Seller
                        </h3>
                    </div>
                    <div className='Accounts_&_list md:block hidden text-white'>
                        <h3 className="flex" onClick={() => SetIsAccountModalOpen(!IsAccountModalOpen)} onMouseEnter={Account_LisModelshowFunc}>Accounts & List <MdArrowDropDown fontSize={'20px'} className="cursor-pointer" /> </h3>
                    </div>
                    <div className='cart text-xl cursor-pointer flex items-center text-white'>
                        <BsCart fontSize={'22px'} />
                        <span className='number_of_item_in_cart text-sm -translate-y-2'>1</span>
                    </div>
                </div>

            </nav>
            {IsAccountModalOpen ? <Account_List_Modal /> : ''}

            <div className={`mobile_menu_dialog_model fixed md:hidden bg-black w-full opacity-100 bg-opacity-30 inset-0 ${isMobileViewOpen ? 'flex' : 'hidden'}`}
            >
                <div className='bg-white w-3/4'>
                    <div className='user_header px-5 bg-slate-800 text-white h-12 flex items-center '>
                        <div className='user_avtar'>
                            <FaUserCircle fontSize={'28px'} className="cursor-pointer" />
                        </div>
                        <div className='user_name px-5'>
                            <h2 className='user_name_text'>
                                Hello , {Islogding ? 'Hayat ilyas' : 'Signin'}
                            </h2>
                        </div>
                    </div>
                    <div className='mobile_view_link'>
                        <ul className=' cursor-pointer space-y-2 px-5 py-5'>
                            <li> Home</li>
                            <li> Whishlist</li>
                            <li> Accounts</li>
                            <li> Settings</li>
                            <li> Order</li>
                        </ul>
                    </div>
                </div>
                <div className='close_icon text-white ml-5 mt-5'>
                    <AiOutlineCloseCircle className='text-2xl cursor-pointer' onClick={OpenMobileeView} />
                </div>
            </div>
        </Fragment >

    )
}
