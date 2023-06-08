import React, { Fragment } from 'react'
import NavbarSkeleton from './NavbarSkeleton'
import AddressformSkeleton from './AddressformSkeleton'

export default function AddressCheckoutSkeleton() {
    return (
        <Fragment>
            <NavbarSkeleton />
            <div className='mx-auto my-5 sm:w-5/6 md:w-2/4 lg:w-[30%]'>
                <AddressformSkeleton />
            </div>
        </Fragment>
    )
}
