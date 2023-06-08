import React, { Fragment } from 'react'
import NavbarSkeleton from './NavbarSkeleton'
import Skeleton from 'react-loading-skeleton'

export default function ChangeRequestSkeleton() {
    return (
        <Fragment>
            <NavbarSkeleton />
            <div className='text-center page-text mb-5'>
                <Skeleton className='mx-4 py-1 text-3xl mt-3 w-80 font-[1000]' />
            </div>
            <div className="emailchange_container sm:mx-auto sm:w-[50%] mt-4 xl:mx-auto xl:w-[30%]  lg:mx-auto 
                    lg:w-[25%] border md:w-[50%] md:m-auto border-gray-300 shadow-lg 
                    rounded-md px-4 mx-3 mb-2">
                <div className="email_fields mx-4 mt-5 mb-2">
                    <label className="text-sm font-medium  block">
                        <Skeleton width={80} height={20} />
                    </label>
                    <Skeleton height={30} />
                </div>
                <Skeleton className='h-10 mx-4 my-4' />
            </div>
        </Fragment>
    )
}
