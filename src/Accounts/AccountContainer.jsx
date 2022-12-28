import React, { Fragment, lazy, Suspense } from 'react'
import AccoutnImage from '../assets/images/account.png'
import SecurityImage from '../assets/images/security.png'
import OrderImage from '../assets/images/Order.webp'
import WishlistImage from '../assets/images/Wishlist.png'
import { Link } from 'react-router-dom'
import NavbarSkeleton from '../Skeleton/NavbarSkeleton'
import Footer from '../UsableComponent/Footer'
const Navbar = lazy(() => import('../UsableComponent/Navbar'))
export default function AccountContainer() {

    return (
        <Fragment>
            <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </Suspense>
            <div className='Account_Container my-10 px-5 md:mx-auto md:w-[80%]'>
                <h3 className='text-2xl mb-5'>Your Account</h3>
                <div className='account_container_grid_box grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                    <Link to={'/V2/auth/sign_in'}>
                        <div className='account_box border hover:bg-gray-100 border-gray-300 rounded-md px-5 py-2 flex  space-x-5 cursor-pointer'>
                            <figure>
                                <img src={SecurityImage} className="w-[80px]" />
                            </figure>
                            <div className='loging&security_text'>
                                <h3 className='text-bold'>Login & Security</h3>
                                <p className='text-gray-700 text-sm'>
                                    Login , apply security to your account
                                </p>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/V2/account/address'}>
                        <div className='address_box border hover:bg-gray-100 border-gray-300 rounded-md px-5 py-2 flex  space-x-5 cursor-pointer'>

                            <figure>
                                <img src={AccoutnImage} className="w-[80px]" />
                            </figure>
                            <div className='address_text'>
                                <h3 className='text-bold'>Your Address</h3>
                                <p className='text-gray-700 text-sm'>
                                    Manage, add, edit your address
                                </p>
                            </div>


                        </div>
                    </Link>


                    <div className='account_box border hover:bg-gray-100 border-gray-300 rounded-md px-5 py-2 flex  space-x-5 cursor-pointer'>
                        <figure className='w-[80px] h-[30px]'>
                            <img src={OrderImage} className="rounded-full" />
                        </figure>
                        <div className='profile_text'>
                            <h3 className='text-bold'>Your Orders</h3>
                            <p className='text-gray-700 text-sm'>
                                Track your orders, buy things again
                            </p>
                        </div>
                    </div>
                    <Link to={'/V2/account/profile'}>
                        <div className='account_box border hover:bg-gray-100 border-gray-300 rounded-md px-5 py-2 flex  space-x-5'>
                            <figure>
                                <img src={AccoutnImage} className="w-[128px]" />
                            </figure>
                            <div className='profile_text'>
                                <h3 className='text-bold'>Your Profiles</h3>
                                <p className='text-gray-700 text-sm'>
                                    Manage, add or remove user profile for personalized experiences
                                </p>
                            </div>
                        </div>
                    </Link>
                    <div className='whishlist_box border hover:bg-gray-100 border-gray-300 rounded-md px-5 py-2 flex  space-x-5'>
                        <figure>
                            <img src={WishlistImage} className="w-[128px]" />
                        </figure>
                        <div className='wishlist_text'>
                            <h3 className='text-bold'>Your Wishlist</h3>
                            <p className='text-gray-700 text-sm'>
                                Add your favourite or wish product to wishlist
                            </p>
                        </div>
                    </div>


                </div>
            </div>
            <div className="absolute bottom-0 w-full">
                <Footer />
            </div>

        </Fragment>
    )
}
