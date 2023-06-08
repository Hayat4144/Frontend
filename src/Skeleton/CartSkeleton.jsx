import React, { Fragment } from 'react'
import NavbarSkeleton from './NavbarSkeleton'
import CartIemSkeleton from './CartIemSkeleton'
import CartSummarySkelton from './CartSummarySkelton'

export default function CartSkeleton() {
    return (
        <Fragment>
            <NavbarSkeleton />
            <div className='w-full mt-10 mb-20'>
                <div className='grid grid-cols-1 md:grid-cols-3 mx-2 gap-10 md:gap-5 '>
                    <CartIemSkeleton />
                    <CartSummarySkelton />
                </div>
            </div>
        </Fragment>
    )
}
