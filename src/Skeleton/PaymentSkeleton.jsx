import React, { Fragment } from 'react'
import NavbarSkeleton from './NavbarSkeleton'
import Skeleton from 'react-loading-skeleton'
import CartSummarySkelton from './CartSummarySkelton'

export default function PaymentSkeleton() {
    return (
        <Fragment>
            <NavbarSkeleton />
            <section className="payment_container grid grid-cols-1 md:grid-cols-3 mx-5 md:mx-10 my-10 gap-5">
                <div className="payment_option_box md:col-span-2">
                    <Skeleton className='mb-5 h-7' />
                    <Skeleton className='h-20 my-2' />
                    <Skeleton className='h-20 my-2' />
                </div>
                <CartSummarySkelton />
            </section>
        </Fragment>
    )
}
