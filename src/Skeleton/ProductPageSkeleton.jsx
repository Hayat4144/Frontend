import React, { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProductPageSkeleton() {
    return (
        <Fragment>
            <div className='proudct-parent my-16 px-2 grid
                    grid-cols-1 md:grid-cols-7 md:gap-5 '>
                <div className='col-span-4 sticky'>
                    <figure className='md:hidden mb-10'>
                        <Skeleton className='w-full h-52' />
                    </figure>
                    <main className='hidden md:flex md:space-x-5'>
                        <aside className='aside-image-for-change-main-image md:col-span-1'>
                            <figure className="overflow-hidden mb-2 rounded-md  ">
                                <Skeleton className=' w-[5rem] h-[5rem]' />
                            </figure>
                            <figure className="overflow-hidden mb-2 rounded-md  ">
                                <Skeleton className=' w-[5rem] h-[5rem]' />
                            </figure>
                            <figure className="overflow-hidden mb-2 rounded-md  ">
                                <Skeleton className=' w-[5rem] h-[5rem]' />
                            </figure>
                        </aside>
                        <figure className='w-full overflow-hidden rounded-lg  col-span-4'>
                            <Skeleton className='w-full h-96' />
                        </figure>
                    </main>
                </div>

                <div className='col-span-3 proudct-info  mx-2 md:mx-5'>
                    <div className='prouduct-name-price font-semibold '>
                        <Skeleton className='lg:text-4xl text-xl' />

                        <div className='my-5'>
                            <Skeleton count={2} />
                        </div>
                    </div>
                    <Skeleton className='h-10 w-full my-2' />
                    <Skeleton className='h-10 w-full my-2' />
                    <Skeleton className='w-full h-16 my-2' />
                    <div className='flex items-center space-x-5'>
                        <Skeleton width={250}  height={40} />
                        <Skeleton width={250}  height={40} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
