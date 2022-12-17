import React, { Fragment } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function NotFoundSkeleton() {
    console.log(1)
    return (
        <Fragment>

            <div className='Not-found-page lg:flex  md:justify-center lg:items-center h-screen w-screen'>

                {/* Not found image */}
                <div className='not-found-image md:w-[60%] sm:w-80 w-3/4 mx-auto  my-10'>
                    <figure className='mx-10'>
                        <Skeleton height={500} />
                    </figure>
                </div>

                {/* Not Found text and buttons */}
                <div className='Not-found-page-text mx-10 md:mx-auto md:w-4/6 md:pr-16'>
                    <h3 className='text-xl text-justify pb-5'><span className='font-bold text-2xl text-slate-700'><Skeleton /> </span>
                        <Skeleton /></h3>
                    <p className='pb-9 text-justify font-sans'><Skeleton /></p>

                    {/* buttons */}
                    <div className='buttons flex space-x-5'>
                        <a href="/" className=''>
                            <Skeleton width={120} height={40} />
                        </a>
                        <a href="/" onClick={(e) => {
                            e.preventDefault();
                            window.history.back();
                        }} className='w-6 h-10 '>
                            <Skeleton width={120} height={40} />
                        </a>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}
