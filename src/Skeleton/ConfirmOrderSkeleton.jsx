import React, { Fragment } from 'react'
import NavbarSkeleton from './NavbarSkeleton'
import Skeleton from 'react-loading-skeleton'
import CartIemSkeleton from './CartIemSkeleton'
import CartSummarySkelton from './CartSummarySkelton'

export default function ConfirmOrderSkeleton() {
    return (
        <Fragment>
            <NavbarSkeleton />
            <div className="confirm_order_container my-10 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="comfirm_box_data px-5 my-5 md:col-span-2">
                    <div className=''>
                        <Skeleton className="h-10" />
                        <div className='mt-3 px-2  md:flex md:items-center md:justify-between'>
                            <Skeleton className='h-10 w-full md:w-80' />
                            <Skeleton className='h-8 w-40' />
                        </div>
                    </div>
                    <section className="product_details my-5">
                        <div className="product_details my-5">
                            <CartIemSkeleton />
                        </div>
                    </section>
                </div>
                <div className='w-full'>
                    <CartSummarySkelton />
                </div>
            </div>
        </Fragment>
    )
}
