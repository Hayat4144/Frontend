import React, { Fragment, lazy, Suspense, useState } from 'react'
import { BsHandbag } from 'react-icons/bs';
import { CiUser } from 'react-icons/ci'
import { BiSearch } from 'react-icons/bi'
import { createSearchParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Account_List_Modal = lazy(() => import('../Account_List_Modal'))
const MobileSideModal = lazy(() => import('./MobileSideModal'))
const MobileSearchModal = lazy(() => import('../SearchModal'))


export default function Navbar() {
    const [isMobileViewOpen, setIsMobileViewOpen] = useState(false);
    const [IsAccountModalOpen, SetIsAccountModalOpen] = useState(false)
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate();

    // ----------------- stop scrolling if the modal is open ------------------- //
    if(isMobileViewOpen){
        document.body.classList.toggle('modal-open');
    }
    else{
        document.body.classList.remove('modal-open')
    }

    // ---- cart data ----- //
    const { productItems } = useSelector(state => state.Cart)

    // MobileViewOpen Function
    const OpenMobileeView = () => {
        setIsMobileViewOpen(!isMobileViewOpen)
    }

    // ---------------- search modal toggle functions ------------ //
    const SearchModalToggle = (state) => {
        setIsSearchModalOpen(!state)
    }

    // pass this function to child component to change the state of this state 
    const AccountModalToggle = (state) => {
        SetIsAccountModalOpen(!state)
    }

    const MobileSideModalToggle = (state) => {
        setIsMobileViewOpen(!state)
    }

    const SubmitHandler = () => {
        const params = { 'keyword': keyword }
        navigate({
            pathname: '/V2/shop/search',
            search: `?${createSearchParams(params)}`
        })
    }

    return (
        <header className='w-full z-10 shadow-md'>
            <nav className='w-full h-20 flex items-center justify-between px-5 sm:px-4 md:px-6 lg:px-8 '>
                {/* --- Burger --- menu */}
                <div className='mobile_view md:hidden flex items-center space-x-5'>
                    <div className='burger_menu cursor-pointer' onClick={OpenMobileeView}>
                        <div className='burger_line_1 w-5 h-[2px] bg-black m-1'></div>
                        <div className='burger_line_2 w-5 h-[2px] bg-black m-1'></div>
                        <div className='burger_line_3 w-5 h-[2px] bg-black m-1'></div>
                    </div>
                    <div className='search_icon'>
                        <button className='mx-auto text-2xl py-2 focus:text-indigo-800'
                            onClick={() => setIsSearchModalOpen(!isSearchModalOpen)}>
                            <BiSearch className="cursor-pointer" />
                        </button>

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

            <Suspense fallback={<p>loading...</p>}>
                <MobileSideModal mobileModal={isMobileViewOpen} MobileSideModalToggle={MobileSideModalToggle} />
            </Suspense>

            <Suspense fallback={<p>loading..</p>}>
                <MobileSearchModal  SearchModal={isSearchModalOpen} SearchModalToggle={SearchModalToggle}/>
            </Suspense>

            <Suspense fallback={<p>loading...</p>}>
                <Account_List_Modal
                    Modalopen={IsAccountModalOpen}
                    AccountModalToggle={AccountModalToggle}
                />
            </Suspense>
        </header >

    )
}
