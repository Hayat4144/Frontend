import React, { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CartIemSkeleton() {
    return (
        <section className="product-items-details md:col-span-2 rounded-lg">
            <Skeleton className='h-10 w-full' />
            {[1, 2].map((item) => (
                <Fragment>
                    <div
                        key={item}
                        className="product-image&detailst px-2 my-5"
                    >
                        <div className='flex space-x-2'>
                            <figure className="product-imaga-contianer overflow-hidden w-[20%] rounded-md">
                                <Skeleton className='h-28 w-full' />
                            </figure>
                            <div className="product-name&quantity px-2 w-[60%] grid grid-cols-1 md:grid-cols-2 ">
                                <div className="product-info">
                                    <div className="name-info-container lg:px-5">
                                        <Skeleton className='h-5' />
                                        <Skeleton className='h-5 my-3 w-40' />
                                        <Skeleton className='h-5 my-1 w-40' />
                                    </div>
                                </div>
                                <Skeleton className='my-2 flex 
                  items-center justify-between px-2 h-8 rounded-md'/>
                            </div>

                            <div className="each-price text-end ml-32 sm:w-[23%]">
                                <Skeleton className='h-5 w-full' />
                            </div>
                        </div>
                    </div>
                </Fragment>
            ))
            }
        </section >
    )
}
