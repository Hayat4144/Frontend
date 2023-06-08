import React, { Fragment } from 'react'
import NavbarSkeleton from './NavbarSkeleton'
import CardSkeleton from './CardSkeleton'

export default function AccountSkeleton() {
    return (
        <Fragment>
            <NavbarSkeleton />
            <div className='w-full'>
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </Fragment>
    )
}
