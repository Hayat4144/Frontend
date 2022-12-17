import React, { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function NavbarSkeleton() {
    return (
        <Fragment>
            <nav className='w-full h-16 flex items-center justify-between px-5 sm:px-4 md:px-6 lg:px-8 sticky'>
                <div className='mobile_view md:hidden' >
                    <div className='burger_menu cursor-pointer' >
                        <Skeleton width={50} height={40} />
                    </div>
                </div>

                <div className='company_logo text-white text-xl cursor-pointer'><Skeleton width={200} height={40} /></div>
                <div className='nav_search_container hidden md:block w-5/12 '>
                    <div className='search_input_box flex '>
                        <Skeleton width={500} height={40} />

                    </div>
                </div>
                <div className='nav_right_menu flex items-center space-x-8 cursor-pointer'>
                    <div className='Become_seller text-white'>
                        <h3 className='Seller_text hidden md:block'>
                            <Skeleton width={80} height={30} />
                        </h3>
                    </div>
                    <div className='Accounts_&_list md:block hidden text-white'>
                        <h3 className="flex">
                            <Skeleton width={80} height={30} /></h3>

                    </div>
                    <div className='cart text-xl cursor-pointer flex items-center'>
                        <Skeleton width={40} height={30} />
                    </div>
                </div>

            </nav>

        </Fragment>
    )
}
