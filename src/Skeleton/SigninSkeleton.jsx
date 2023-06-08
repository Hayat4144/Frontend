import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SigninSkeleton() {
    return (
        <div className="Signin_container">
            <div className="my-5 text-center header-text">
                <h2 className="text-2xl font-bold logo">
                    <Skeleton width={150} height={30} />
                </h2>
            </div>
            <div className="text-center page-text mb-5">
                <h3 className="mx-4 py-1 text-3xl mt-3 font-[1000]">
                    <Skeleton width={300} height={40} />
                </h3>
            </div>
            <div className="sm:mx-auto sm:w-[50%] mt-4 xl:mx-auto xl:w-[30%] lg:mx-auto lg:w-[40%] mx-3 mb-2">
                <div className="email_fields mx-4 mt-5 mb-2">
                    <label className="text-sm font-medium  block">
                        <Skeleton width={80} height={20} />
                    </label>
                    <Skeleton height={30} />
                </div>
                <div className="password_field mx-4">
                    <label className="text-sm font-medium block">
                        <Skeleton width={100} height={20} />
                    </label>
                    <Skeleton height={30} />
                </div>
                <Skeleton className='h-10 mx-4 my-4'/>
            </div>

        </div>
    )
}
