import React, { Fragment } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SampleProductSkeleton() {
    return (
        <Fragment>
            <div className='sample_product_container_skeleton bg-white mx-2 md:px-5 px-2 py-5 mb-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                {[1, 2, 3, 4].map(item => <div className="product_detaiils" key={item}>
                    <Skeleton className='w-full h-52' />
                    <div className='product_details space-y-2 my-2'
                    >
                        <p className='product_name capitalize w-full 
                        text-[17px] hover:text-indigo-700'>
                            <Skeleton />
                        </p>
                        <p className='product_price text-[18px]'>
                            <span className='currency_symbol'> <Skeleton /> </span>
                        </p>
                    </div>
                </div>)}
            </div>
        </Fragment>
    )
}
